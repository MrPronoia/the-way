# Jamie MVP — build framework

**Status:** spec, not built. Written 2026-10-06.
**Concept doc:** `jamie.md` · **Scope:** the v2 "push-to-check" design, which skips the hard problem by keeping a human on the when-to-speak decision.

---

## What it does

You're mid-conversation. You tap a hotkey. Within a couple of seconds, a second screen shows what this repo has on whatever was just said — the primary text behind a quote, a prepared debate card, or nothing at all if we've got nothing worth showing.

Tap again to widen the window. One tap looks back 30 seconds, each additional tap adds another 30, up to 2 minutes.

---

## The one design problem in tap-to-widen, and the fix

The obvious implementation waits to see whether a second tap is coming before acting — which means **every lookup pays a debounce delay, including the single-tap case you'll use 90% of the time.** That's backwards: it taxes the common path to support the rare one.

**Fire immediately on the first tap, then widen in place.**

```
tap 1  →  instantly query the last 30s, render results
tap 2  →  re-query at 60s, replace/extend the same result panel
tap 3  →  re-query at 90s
tap 4  →  re-query at 120s
```

Results appear fast and then get *better* if you keep tapping. No debounce, no penalty, and it preserves exactly the behavior you described. Taps inside ~2s of each other count as widening the same request; after that it's a new one.

**Visible state matters here.** The panel should show the window it's currently answering — `⟵ 30s` / `⟵ 60s` — so you know whether another tap is worth it.

---

## Architecture

```
  mic ──► ring buffer (memory only, last 180s)
            │
            ├──► rolling transcription  ──► text buffer (always current)
            │      faster-whisper, 10s windows
            │
  hotkey ──►├──► slice last N seconds of TEXT
            │          │
            │          ▼
            │    claim extraction  ──►  0–3 clean search queries
            │      small fast model      (or "nothing checkable" → stay silent)
            │          │
            │          ▼
            │    semantic_search()  ──►  dedupe, threshold, rank
            │      reuse scripts/semantic-search.py
            │          │
            └──────────┴──────────────►  display (local web page)
```

### Why transcribe continuously instead of on demand

Transcribing only when the hotkey fires means eating 1–2 seconds of Whisper latency on every press. Running transcription continuously in 10-second windows keeps a **text buffer that's always current**, so the hotkey slices text rather than audio and feels instant.

The cost is steady modest CPU. Worth it — and it's also the thing that makes a future v3 (autonomous mode) a feature flag rather than a rewrite.

### Query formulation is the quality lever

Do **not** embed the raw transcript. Real speech looks like:

> "yeah I mean so like the thing about Paul is he never actually met Jesus right, like in person"

Embedding that returns mush. A small fast model turns the window into clean queries — *"Did Paul meet Jesus in person?"*, *"Paul's authority from revelation rather than the apostles"* — and that same call decides whether there's anything checkable here at all. One cheap model call per press, and it's where most of the output quality lives.

### Ranking: what gets shown first

1. **A matching `questions/` card** — pre-digested, with the evidence and the responses already assembled. Highest value by far.
2. **A primary text passage** — `christianity/Incoming/`, Dead Sea Scrolls, Ethiopian canon.
3. **An analysis file passage.**

Two filters before anything renders:

- **Score threshold.** Below a similarity floor, show nothing. Showing nothing is a feature; showing something irrelevant costs you attention mid-sentence, which is the scarcest thing you have.
- **Citation safety.** If a hit touches something flagged in `questions/CITATION-NOTES.md`, render it as a *warning* ("this quote doesn't check out — see notes") rather than as support. Jamie keeping you from using a bad citation on air is arguably the single highest-value thing it can do.

---

## Stack

Matches what's already installed, so there's no new dependency story:

| Piece | Choice | Why |
|---|---|---|
| Language | Python 3.12 | Same as `scripts/`, and `chromadb` + `google-genai` are already the dependency set |
| Mic capture | `sounddevice` | Simple ring-buffer friendly API |
| Transcription | `faster-whisper`, `base` or `small` | Local, no per-minute cost, no audio leaves the machine |
| Retrieval | `scripts/semantic-search.py` | Already importable — `get_embeddings()`, `get_collection()` |
| Hotkey | `pynput` | Global hotkey, works when unfocused |
| Display | FastAPI + one static page, server-sent events | Open on a second monitor or a phone browser |

---

## Milestones

Each one is independently testable and leaves something working.

| # | Deliverable | Proves |
|---|---|---|
| **M0** | Ring buffer + hotkey → dump the last 30s of audio to a WAV | Capture and the global hotkey work at all |
| **M1** | Rolling transcription → hotkey prints the last N seconds of *text* | Transcription keeps up in real time |
| **M2** | Claim extraction + semantic search → results in the console | **The whole value proposition.** If the hits aren't good here, stop and fix retrieval before building any UI |
| **M3** | Web display on a second screen | It's usable without looking at a terminal |
| **M4** | Tap-to-widen, score threshold, card priority, citation warnings | It's pleasant rather than noisy |

**M2 is the real gate.** Everything before it is plumbing; everything after is polish. If console output at M2 is genuinely useful during a test conversation, the rest is worth building. If it isn't, no amount of UI saves it.

---

## Deliberately out of scope for MVP

- **Speaker diarization** (who said what) — useful eventually, irrelevant to whether the core works
- **Autonomous mode** — that's v3, and it needs the claim-detection gate to be excellent first
- **Cloud transcription** — local keeps cost at zero and audio on the machine
- **History and persistence** — nothing saved unless explicitly asked
- **Proactive corrections** — the "you were off about that date" case is socially delicate and wants its own design pass. MVP shows what we *have*; it doesn't volunteer that you're wrong.

---

## Privacy, and why it's a design constraint not a footnote

This thing holds an always-on microphone.

- The ring buffer is **memory-only**. Nothing touches disk unless you explicitly save it.
- Local transcription means **no audio ever leaves the machine.** Only the extracted query text goes out, and only to the embedding API.
- A visible indicator when the mic is live. Always.
- For conversations with other people: **tell them.** Not a legal note — a basic decency one. The sauna conversation that started this project would have gone differently if one party were silently recording it.

---

## Open questions

- Is the tap-to-widen gesture better than just two hotkeys (one for 30s, one for 2 minutes)? Tapping is more elegant; two keys are more predictable under pressure.
- Should it ever surface *audio*-free notifications — a soft chime when it has something, so you can choose when to glance?
- Corpus scope: this repo only, or `mr-pronoia` too? Starting narrow makes precision much easier and precision is the whole game.
- Does the debate-card hit want to be the whole card or just its claim line? Probably the claim line plus a "press to expand."
