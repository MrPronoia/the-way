# Debate-Day Setup — How to Run Claude as Your Research Corner

This is the playbook for using this repo + Claude in near-real time during a live debate. The goal: lookup answers in ~10–30 seconds, deep theology answers in under ~2 minutes.

---

## The two-tab pattern

Open **two Claude sessions** in this repo (terminal tabs, or two Claude Desktop conversations — both work):

| Tab | Model | Use it for |
|---|---|---|
| **Tab 1 — "Jamie"** | Sonnet (or Haiku) | Citation lookups, "what's the verse where...", pulling a quote, checking a date. Near-instant. |
| **Tab 2 — Deep** | Fable / Opus | Multi-step theology questions, "how do we respond to X's argument", anything needing judgment. Slower but stronger. |

Tab 1 is the Jamie — *"Jamie, pull that up."* That's exactly the job: somebody off to the side who finds the thing in seconds while the conversation keeps moving. Name it that in your own head and you'll use it correctly, because it tells you what *not* to send there. Jamie pulls up sources. Jamie doesn't build your argument for you — that's Tab 2.

In the terminal: `claude --model sonnet` in one tab, `claude` (default/Fable or Opus) in the other. In Claude Desktop: pick the model per conversation.

Why two tabs: you never wait on the slow model for a fast question, and the deep tab keeps its train of thought instead of being interrupted by lookups.

---

## Warm up BEFORE the debate starts (this is the big one)

A cold session has to search the repo before it can answer. A warmed session already has the key material in its context — many answers then need **zero file reads**.

**15 minutes before start, paste this into BOTH tabs:**

> Read debate/00-INDEX.md, then read every card in the debate/ folder including CITATION-NOTES.md, then read TOPIC-INDEX.md and jesus-site-reference/source/docs/3-questions.md. Don't summarize — just load them. During this debate, answer first and keep it tight: lead with the direct answer and the citation, skip preamble. If you need a file, use TOPIC-INDEX.md to jump straight to it. Never quote a podcast transcript, and respect the do-not-use list in CITATION-NOTES.md.

Then ask each tab one warm-up question to confirm it's responsive. Keep the sessions alive — don't close the tabs; the loaded context is the speed.

---

## Asking questions well (what to tell whoever's typing)

- **Name the topic, quote the opponent.** "He just said the Didache is a 2nd-century document — quick rebuttal + source" beats "what about the Didache".
- **Say which mode you want:** "quick cite" vs. "give me the full argument."
- **One question per message.** Stacked questions slow everything down.
- Trust the cards first — most answers are already on them; the typist can often just read the card.

---

## Division of labor (if you have two people + the speaker)

- Person A watches the debate and fires lookups at Tab 1 (fast).
- Person B queues the harder "how do we frame this" questions to Tab 2 (deep) a question or two ahead of where the debate is going.

---

## Rehearsal (do this at least once before the real thing)

1. Warm up both tabs as above.
2. Fire ~20 likely debate questions, timed. Anything over ~30 s on Tab 1 or ~2 min on Tab 2 means a gap — patch the relevant card.
3. When the organizers confirm the actual debate topics, deepen those specific cards first.

---

## Quality guardrails

- Cards cite **primary sources** (red text, Thomas, DSS, Didache). If Claude answers from a podcast transcript, ask for the primary citation — transcripts are auto-captions and not quotable on stage.
- If an answer feels off, ask "verify that quote against the full text in the repo" — the primary texts are in `christianity/Incoming/` and can be checked in seconds.
