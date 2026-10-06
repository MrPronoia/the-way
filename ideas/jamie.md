# Jamie — real-time lookup for live conversation

**Status:** idea, not built. Captured 2026-10-06.

Named for Jamie Vernon on the Joe Rogan podcast — the guy off to the side who pulls things up mid-conversation, checks a claim, finds the clip. That's the job description.

---

## The idea

Listen to a live conversation, transcribe it as it happens, and surface relevant material from this repo without being asked: supporting sources for what's being said, the primary text behind a quote, or a quiet correction when a date or attribution is off.

Use cases, in order of how well it fits:

1. **Podcasting** — a second screen with citations arriving as you talk
2. **Debating** — the case the `debate/` cards were built for
3. **Normal conversation** — the Bible Belt sauna problem that started this whole project: having the answer *while* the conversation is still happening, not two hours later

---

## What already exists

**The retrieval half is done.** `scripts/semantic-search.py` takes a natural-language query and returns the most relevant passages in this repo with `file:line` references, scored by meaning rather than keyword. That is precisely the hard half of a fact-checker, and it's working today.

It's also already structured as a library, not just a CLI — `get_embeddings()` and `get_collection()` can be imported directly, so Jamie wouldn't shell out to it, it would call into it.

On top of that, the corpus is unusually well-prepared for this:

- ~11,900 chunks across 16 MB, each carrying its source file and line number
- Primary texts sit in `christianity/Incoming/` so a hit can be traced to the actual document
- The `debate/` cards are pre-digested — a good hit could surface an entire prepared card (claim, evidence, rebuttals) rather than a raw paragraph
- `debate/CITATION-NOTES.md` encodes which quotes are *not* safe to use, so Jamie could warn rather than mislead

## What's missing

| Piece | Difficulty | Notes |
|---|---|---|
| **Live transcription** | Easy — commodity | Local Whisper (`faster-whisper`) runs near-real-time and costs nothing per minute. Deepgram or AssemblyAI streaming are lower-latency if we'd rather pay than tune. |
| **Knowing *when* to speak up** | **Hard — the actual problem** | See below. |
| **Display** | Medium | Glanceable second screen. Reading paragraphs while talking is cognitively expensive; this wants one line, not a card. |
| **Latency budget** | Medium | The whole loop has to land in ~2–5 seconds or it's commenting on a topic you already left. |

### The real problem is precision, not capability

Everything here is buildable. The thing that decides whether Jamie is useful or infuriating is **restraint.**

A version that surfaces something every ten seconds is worse than nothing — it's a distraction competing with the conversation you're trying to have. The real Jamie is valuable precisely because he's *silent* until he has something worth saying. That's a precision problem, and precision problems don't get solved by better retrieval; they get solved by a good gate in front of it.

So the core component isn't the search. It's the classifier that reads the last few sentences and decides: *is there a checkable claim here, and do we actually have something on it?* Almost always the answer should be no.

---

## Staged plan

The useful insight is that **the stages get radically easier in reverse**, and v2 captures most of the value.

**v1 — Transcribe, then review.** No real-time anything. Record the conversation, transcribe it afterwards, produce a report: claims made, what the repo says about each, citations, anything that looks wrong. Zero latency pressure, immediately useful for podcast post-production, and it proves out retrieval quality before any hard engineering. Could be built in an afternoon on top of what exists.

**v2 — Push-to-check.** A hotkey. You hit it, Jamie checks the last ~30 seconds and surfaces what it has; tap again to widen the window. **This skips the hard problem entirely** by keeping a human on the "when" decision — which is also the part humans are much better at than models. Roughly 90% of the value for 20% of the difficulty. *This is probably where to stop unless v3 proves necessary.*

→ **Full build framework for v2: `jamie-mvp.md`.**

**v3 — Autonomous.** Continuous listening with a claim-detection gate. Only worth building if v2 gets used constantly and the hotkey becomes the annoyance.

---

## Open questions

- Scope of the corpus: just this repo, or `mr-pronoia` too? Starting narrow makes precision much easier.
- Does it ever speak, or is it screen-only? Screen-only for a recorded podcast seems obviously right.
- How does it handle *disagreeing* with the host mid-sentence? The "you were off about this date" case is socially delicate and probably wants a different visual treatment than a supporting citation.
- Could the fast/deep split from `debate/DEBATE-SETUP.md` apply here — Jamie handles lookups, and anything needing judgment escalates to a second model on request?
