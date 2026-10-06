# The Way — Contributor Brief

**What this is, how to add to it, and what's already in it.**

A curated research collection on what Jesus actually taught — built so that any claim in it can be traced to a source you can open and read yourself. It's the workshop behind [jesusactuallysaid.com](https://jesusactuallysaid.com).

> New here and want the short version? Read this file. Ready to actually contribute? `CONTRIBUTING.md` has the mechanics.

---

## 1. What a repo actually is

A **repository** is a folder of plain text files, organized into subfolders. That's it. No app, no database, nothing proprietary.

The files are **Markdown** — a text file with light formatting. A `#` makes a heading, a `-` makes a bullet. If you can use Notepad, you can read and write it. Open one in any text editor and it's just words.

Two reasons we built it this way. First, an AI assistant can read the whole thing instantly and quote it back exactly, with the file path — which is what makes *"what's the attestation for that?"* a question we answer in seconds instead of a research project. Second, plain text outlives every platform. This collection will still open in twenty years.

**You don't need to learn any of this to contribute.** Send us what you have in whatever form it's in. We handle the conversion.

---

## 2. How to actually read it — use Obsidian

The files are plain text, so anything opens them. But [Obsidian](https://obsidian.md) is free and makes the whole collection genuinely pleasant to browse.

Download it, choose **"Open folder as vault,"** and point it at the repo folder. You get the folder tree in a sidebar, properly rendered text instead of raw `#` symbols, instant full-text search across all 281 files, and the `[[links]]` between files become clickable.

What you're looking at in that sidebar is *literally the folder structure on your hard drive* — the same thing you'd see in File Explorer. Nothing is hidden in a database. That's the whole point of building it this way.

Two things to know: Obsidian edits the real files on disk, so if you change something it's changed locally — you'd still push it up separately. It's a reader and editor, not a sync tool. And it creates a small `.obsidian/` settings folder, which is already gitignored, so your personal setup never gets committed.

---

## 3. Access: you probably don't need any

The repo is **public**. Everything in it is readable by anyone, right now, with no permission and no invitation.

So the question isn't "can I get in." It's only ever about who can *write directly* to it. Three lanes, and two need nothing from us:

| Lane | What you do | Access needed |
|---|---|---|
| **Send it in** — most people, most of the time | Email or drop us your files. We convert and file them, with your provenance notes attached. | **None** |
| **Read and use** — where most of the value is | Download the whole thing, open it in Obsidian, point Claude at it, ask it anything. Pull updates whenever. | **None** — it's public |
| **Write directly** | Edit and push changes yourself. Useful if you're adding regularly and comfortable with the tools. | Ask Rex or Matt |

We're not handing out write access by default, and that's not gatekeeping — it's that **lane 2 already gives you everything you came for.** If you later find yourself contributing often enough that going through us is the bottleneck, say so and we'll set you up properly.

For the record: nothing here can be permanently broken. Every version of every file is kept, so any mistake is one command away from being undone. The reason to be deliberate about write access isn't fear of losing work — it's just that cleaning up a tangle costs someone an afternoon.

---

## 4. How to send us material

Don't convert anything. Don't reformat anything. Send it exactly as it already exists and we'll turn it into Markdown on our end — that part is genuinely easy and fast.

**Send as-is:** PDFs (books, papers, scans) · Word documents · Google Docs (link or export) · plain text, Markdown, Notes exports · photos of book pages · YouTube and web links · a pile of mixed files in one email.

**Flag these first:**

| Format | Why |
|---|---|
| Audio or video | Needs transcribing before it's usable. We have a pipeline — just tell us it's coming. |
| Scans with no text layer | Readable, but we verify by eye, so expect a slower turnaround. |
| Handwriting | Works if the photo is legible. Send one test page first. |
| Old `.doc` files | Save as `.docx` or PDF first. |
| Anything not yours to share | In-copyright books, paywalled papers, private material. Tell us and we'll cite rather than copy. |

### The one thing we can't recover later

**Where it came from.** Author, title, date, and — critically — *which translation or edition*, plus the chapter or page. Thirty seconds from you saves an hour of detective work on our end, and sometimes it isn't recoverable at all.

This matters more than it sounds. A verification pass in October 2026 found three quotes circulating in this repo's own research that pointed at sources where the text simply wasn't there — one attributed to a specific chapter of a document that doesn't contain it, another reversing what the source actually said. See `questions/CITATION-NOTES.md`. **A citation we can't defend is worse than no citation**, because someone eventually opens the book.

---

## 5. What's already in here

281 files, about 16 MB of text. The primary sources are the backbone — these are full texts, not summaries.

| Collection | Contents |
|---|---|
| **Primary texts** | Gospel of Thomas, the Didache, the Clementine Homilies *and* Recognitions (both complete), a Q-source reconstruction, Dead Sea Scrolls selections, the Gospel of Philip, the Apocryphon of John |
| **Ethiopian canon** | 1 Enoch, Jubilees, Meqabyan, the Shepherd of Hermas, the Didascalia, the Epistula Apostolorum |
| **Research & analysis** | ~60 files — blood atonement, the Trinity's construction, the rapture's 1830s origin, the Essene–Nazarene lineage, the Moses Scroll, James the Just, textual-criticism deep dives |
| **The questions** | 14 cards on the hard questions — the evidence, the pushback people raise, and honest responses — plus a claim-to-file index for fast lookup |

And the transcript archive — raw material for finding threads:

| Source | Scope | Notes |
|---|---|---|
| **The Jesus Way** — Aaron Abke & James Benefico | 65 episodes | Complete. One gap: ep. 045 has captions disabled at the source. |
| **Dr. James Tabor** — his "Paul" playlist | 77 videos | The most processed set here — each file carries a summary, key teachings, scripture citations and scholars cited *plus* the raw transcript. |
| **Kam Waters** — Christspiracy / The Way Skool | 7 videos | Complete channel. One is in Spanish and kept in the original. |

### How we treat transcripts

These are **auto-generated captions**, so they contain typos, mangled names, and garbled Hebrew and Greek. The repo instructs every AI assistant working in it to treat them as **pointers, not proof** — good for finding which thread to pull, never quoted as a source.

Anything we want to actually stand behind gets traced back to a primary text first. That rule is what keeps the collection trustworthy as it grows.

---

## 6. Which AI model to use, and when

The tradeoff is speed against depth. Pick deliberately.

| Model | Speed | Use it for |
|---|---|---|
| **Sonnet** or **Haiku** | Seconds | Looking up a citation, finding the verse, checking a date, "where in the repo is…". Anything where you need the answer while the conversation is still on the topic. |
| **Opus** or **Fable** | A minute or two | Building an argument, weighing competing readings, synthesizing across sources, anything needing real judgment. Noticeably better answers — worth the wait when you have it. |

For anything live — a conversation, a recording, a public Q&A — open **two tabs**: a fast model for lookups and a deep model for the hard questions. You never wait on the slow one for a quick answer, and the deep one keeps its train of thought instead of being interrupted.

One habit that matters more than the model choice: **load the key files before you start.** A cold session has to go searching; a warmed one already has the material in context and answers immediately. `questions/LIVE-SETUP.md` has the exact prompt to paste.

---

## 7. Where this ends up: jesusactuallysaid.com

Matt and Rex built [jesusactuallysaid.com](https://jesusactuallysaid.com) as the public face of this work — 17 pages, each also translated into Spanish.

Think of the two as a **front door and a workshop**. The site is short, plain-language, and built for someone running into these questions for the first time; it makes a claim and shows the verse. The repo behind it holds the full primary texts, the manuscript arguments, the citations, and the places we're still uncertain — everything needed to check the site's homework.

That's the pipeline worth understanding: **material you contribute can end up out there.** Something you send in gets filed with its provenance, gets cross-checked against the primary sources, and if it holds up it can become part of what a stranger reads on a Tuesday night when they start wondering whether what they were taught is actually what Jesus said.

The strongest single page is **the Three Questions** — *Where is God? Where is the Kingdom? How are you saved?* — with Jesus's own words, Paul's answer, and the modern church's answer set side by side. It's the whole thesis on one page, and the fastest way to see what this collection is *for*.

---

## The standard

Every claim traceable to a source, with the layers kept straight — what *Jesus* said, what *Paul* said, and what the institutional church later codified are three different questions.

People are going to come to this with real doubts and real objections. Some will be fundamentalists who want to know what the attestation is, which manuscripts back it up, and what the actual history looks like. That's exactly who it's built for. The goal is that the answer is never "trust us" — it's a file path and a primary text they can open and judge for themselves.

It's open, and we want it to keep growing. Bring what you've got.

---

*Next: `CONTRIBUTING.md` for how to get set up and push changes · `README.md` for navigation · `00-OVERVIEW.md` for reading paths*
