# The Way — Contributor Brief

**What this is, how to add to it, and what's already in it.**

A curated research collection on what Jesus actually taught — built so that any claim in it can be traced to a source you can open and read yourself. It's the workshop behind [jesusactuallysaid.com](https://jesusactuallysaid.com).

> New here and want the short version? Read this file. Ready to actually contribute? `CONTRIBUTING.md` has the mechanics.

---

## Why this exists

Matt and Rex are gym partners. A lot of this started in the sauna.

We live in Arkansas, in the Bible Belt, and we kept having the same conversation over and over — the same handful of objections, the same proof texts, the same confident claims about what Jesus taught. We'd walk away thinking: *that answer existed, I just couldn't put my hands on it fast enough.* So we started writing things down. Partly to bring better context to the next conversation — and honestly, partly to **fact-check ourselves.** If a position couldn't survive us actually looking it up, it wasn't worth holding.

Then it compounded. The more context we put in, the more useful the whole thing became, and the uses multiplied: we run our own journals against it, one of ours is drafting a book out of it, and it's the research spine behind [jesusactuallysaid.com](https://jesusactuallysaid.com). That's the pattern — you build it out and keep discovering things to do with it that weren't the original point.

This is a new chapter: opening it up to other people who care about this as much as we do.

---

## Scope: what belongs here, and what doesn't

This repo is deliberately tight — **Jesus directly, early Christianity, the distortion, and the recovery.** Red text first, then the earliest sources.

There's a larger repo upstream called **`mr-pronoia`**: a broader esoteric knowledge base spanning multiple schools of thought — perennial philosophy, Hermeticism, comparative mysticism, luminaries from Meister Eckhart to Isaac Newton. Some of that material was deliberately *removed* from this repo in May 2026 to keep the focus sharp.

So cross-tradition and comparative material is genuinely interesting and genuinely welcome — just not in this one. If that's where your passion runs, say so; that conversation is open and we'd love the help. For *this* repo the test is simple:

> **Does it help answer what Jesus actually taught, what happened to it, and how we recover it?**

If yes, it belongs. If it's Eastern philosophy, comparative mysticism, or general esoterica, it belongs upstream — flag it and we'll route it.

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
| **Send it in** — most people, most of the time | Drop files in the shared Drive folder. We convert and file them, with your provenance notes attached. | **None** |
| **Read and use** — where most of the value is | Download the whole thing, open it in Obsidian, point Claude at it, ask it anything. Pull updates whenever. | **None** — it's public |
| **Write directly** | Edit and push changes yourself. Useful if you're adding regularly and comfortable with the tools. | Ask Rex or Matt |

We're not handing out write access on day one, and that's not gatekeeping — it's that **lane 2 already gives you everything you came for.** You can read, search, and use the entire collection without us doing anything.

**And it isn't all-or-nothing.** The honest version: we don't yet know who's going to click with how this thing works. Someone makes three or four contributions that land right where we'd have put them ourselves, and it's obvious — here are the keys, stop waiting on us. Someone else is enthusiastic but keeps pulling in a different direction, and that's fine too; they keep sending material and we keep filing it. Nobody gets told no. People just move at the speed they're actually moving.

So treat the Drive folder as the front door, not a holding pen. It's how it starts for everyone, including us.

For the record: nothing here can be permanently broken. Every version of every file is kept, so any mistake is one command away from being undone. The reason to be deliberate about write access isn't fear of losing work — it's just that cleaning up a tangle costs someone an afternoon.

---

## 4. How to send us material

**Right now, the flow is a shared Drive folder.** Ask Rex or Matt for the link, drop your files in, and we take it from there — Claude reads the folder, converts everything to Markdown, and we file it with your provenance notes attached. No GitHub, no Markdown, no conversion work on your end.

Don't reformat anything. Send it exactly as it already exists.

### ⚠️ One hard rule: no copyrighted books

**This repo is public and open source. Do not put copyrighted books in it.** Not the PDF, not a scanned chapter, not the full text retyped. That's the one thing that could get the project taken down, and it's not worth it.

What's fine, and what the collection already runs on:

| Fine | Why |
|---|---|
| **Short quotations with a citation** | Normal scholarly use. Quote what you need to make the point. |
| **Public-domain texts** | Pre-1929 publications. The Clementine Homilies and Recognitions here are the 1886 Ante-Nicene Fathers edition — that's why we can carry them in full. |
| **Your own notes, summaries, and analysis** | Yours to give. This is often the most valuable thing you have. |
| **Citations and links** to anything else | "Tabor argues X in *Paul and Jesus*, p. 112" costs us nothing and is just as useful. |

One trap that catches almost everybody: **a modern translation has its own copyright, even when the ancient text underneath it is public domain.** The Gospel of Thomas is two thousand years old; a 1980s English translation of it is not in the public domain. So "it's an ancient text" doesn't automatically make a modern edition safe to upload.

If you own a book and it's genuinely important, tell us. We'll pull the specific quotes with page numbers and cite the rest. That gives us the substance without the liability.

**Send as-is:** PDFs (papers, your own scans) · Word documents · Google Docs · plain text, Markdown, Notes exports · photos of book pages · YouTube and web links · a pile of mixed files, unsorted, is completely fine.

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

This matters more than it sounds. A verification pass in October 2026 found three quotes circulating in this repo's own research that pointed at sources where the text simply wasn't there — one attributed to a specific chapter of a document that doesn't contain it, another reversing what the source actually said. See `debate/CITATION-NOTES.md`. **A citation we can't defend is worse than no citation**, because someone eventually opens the book.

---

## 5. What's already in here

281 files, about 16 MB of text. The primary sources are the backbone — these are full texts, not summaries.

| Collection | Contents |
|---|---|
| **Primary texts** | Gospel of Thomas, the Didache, the Clementine Homilies *and* Recognitions (both complete), a Q-source reconstruction, Dead Sea Scrolls selections, the Gospel of Philip, the Apocryphon of John |
| **Ethiopian canon** | 1 Enoch, Jubilees, Meqabyan, the Shepherd of Hermas, the Didascalia, the Epistula Apostolorum |
| **Research & analysis** | ~60 files — blood atonement, the Trinity's construction, the rapture's 1830s origin, the Essene–Nazarene lineage, the Moses Scroll, James the Just, textual-criticism deep dives |
| **Debate kit** | 14 topic cards with evidence, objections and rebuttals, plus a claim-to-file index for fast lookup |

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
| **Sonnet** or **Haiku**<br>*(the Jamie)* | Seconds | Looking up a citation, finding the verse, checking a date, "where in the repo is…". Anything where you need the answer while the conversation is still on the topic. |
| **Opus** or **Fable** | A minute or two | Building an argument, weighing competing readings, synthesizing across sources, anything needing real judgment. Noticeably better answers — worth the wait when you have it. |

For anything live — a debate, a recorded conversation, a public Q&A — open **two tabs**: a fast model for lookups and a deep model for the hard questions. You never wait on the slow one for a quick answer, and the deep one keeps its train of thought instead of being interrupted.

Think of tab one as **the Jamie** — *"Jamie, pull that up."* That's exactly the job: somebody off to the side who finds the thing in seconds while the conversation keeps moving. Naming it that also tells you what *not* to send there. Jamie pulls up sources; Jamie doesn't build your argument — that's tab two.

One habit that matters more than the model choice: **load the key files before you start.** A cold session has to go searching; a warmed one already has the material in context and answers immediately. `debate/DEBATE-SETUP.md` has the exact prompt to paste.

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
