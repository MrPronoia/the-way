# Contributing to The Way

Welcome. If you're reading this, someone trusted you with the keys — this is a shared, living research repository, and you're invited to help it grow.

New here? Read **`ONBOARDING.md`** first — the short brief on what this is, how to browse it, how to hand us material, and what's already in the collection. Then **`README.md`** (navigation) and **`00-OVERVIEW.md`** (reading paths). This file is about *how to contribute* once you're oriented.

---

## The Spirit of This Place

We're not debunking Christianity — we're **recovering** it. The work is collaborative research between people who take the question of *what Jesus actually taught* seriously.

A few ground rules that keep the repo trustworthy:

- **Lead with primary sources.** Quote Jesus's actual words, cite the text, link the source. "Don't take our word for it — read it yourself."
- **Distinguish the layers.** What *Jesus* said ≠ what *Paul* said ≠ what the *institutional church* later codified. Keep them separate.
- **Welcome the person, not just the position.** Acknowledge mainstream views even where we diverge. Honest uncertainty beats false confidence.
- **Cite as you go.** Every claim should be traceable. (See the Source Hierarchy in `CLAUDE.md`.)

---

## Sending Us Material (the no-effort path)

**You don't need GitHub, Markdown, or any AI tool to contribute.** If you have research, send it in whatever form it already exists and we'll convert it. Converting documents to Markdown is fast on our end — it is not worth your time to reformat anything.

**Send as-is:** PDFs (books, papers, scans) · Word documents · Google Docs (link or export) · plain text and Notes exports · photos of book pages · YouTube and web links · a pile of mixed files in one email.

**Flag these before sending:**

| Format | Why |
|---|---|
| Audio or video | Needs transcribing first. We have a pipeline (see `podcast-archive/the-jesus-way/TRANSCRIPT-STATUS.md`) — just tell us it's coming. |
| Scans with no text layer | Readable, but we verify by eye, so turnaround is slower. |
| Handwriting | Works if the photo is legible — send one test page first. |
| Old `.doc` files | Save as `.docx` or PDF first. |
| Anything not yours to share | In-copyright books, paywalled papers, private material. Tell us and we'll cite it rather than copy it. |

### Always include the provenance

The one thing we cannot reconstruct later is **where it came from**: author, title, date, *which translation or edition*, and the chapter or page. Thirty seconds from you saves an hour on our end, and sometimes the trail is genuinely unrecoverable.

This is not bureaucratic. In October 2026 a verification pass found three quotes circulating in this repo's own research that pointed at sources where the text was not present — one attributed to a specific chapter of a document that doesn't contain it, another reversing what the source actually said. See `debate/CITATION-NOTES.md`. **A citation we can't defend is worse than no citation**, because someone eventually opens the book.

---

## What's Already In Here

281 markdown files, ~16 MB. Current as of 2026-10-06.

| Collection | Contents |
|---|---|
| **Primary texts** (`christianity/Incoming/`, `gnosticism/Incoming/`) | Gospel of Thomas, Didache, Clementine Homilies *and* Recognitions (both complete), Q-source reconstruction, Gospel of Philip, Apocryphon of John |
| **Dead Sea Scrolls** (`christianity/dead-sea-scrolls/`) | Curated selections (1QS, CD, 1QM, 1QHa, 4QMMT) with translator attributions, plus overview and cliff notes |
| **Ethiopian canon** (`christianity/ethiopian-bible/`) | 1 Enoch, Jubilees, Meqabyan, Shepherd of Hermas, Didascalia, Epistula Apostolorum |
| **Research & analysis** (`christianity/`, `gnosticism/`) | ~60 files: blood atonement, Trinity construction, the rapture's 1830s origin, Essene–Nazarene–Ebionite lineage, the Moses Scroll, James the Just, textual-criticism deep dives |
| **Debate kit** (`debate/`) | 14 topic cards (evidence, objections, rebuttals, sound bites), a setup playbook, and the citation-corrections log |
| **Lookup tools** | `TOPIC-INDEX.md` (claim → file + section) and `scripts/semantic-search.py` (meaning-based search across the whole repo) |

### The transcript archive (`podcast-archive/`)

| Source | Scope | Notes |
|---|---|---|
| **The Jesus Way** — Aaron Abke & James Benefico | 65 episodes | Complete. One gap: ep. 045 has captions disabled at the source and needs manual transcription. |
| **Dr. James Tabor** — his "Paul" playlist | 77 videos | The most processed set here: each file has a synthesized summary, key teachings, scripture citations and scholars cited, *plus* the raw transcript. See `podcast-archive/dr-tabor/00-overview.md`. |
| **Kam Waters** — Christspiracy / The Way Skool | 7 videos | Complete channel. One video is in Spanish and kept in the original. |

**These are auto-generated captions.** They contain typos, mangled names, and garbled Hebrew/Greek. Treat them as **pointers, not proof** — excellent for finding which thread to pull, never quoted as a source. Anything we stand behind gets traced to a primary text first. `CLAUDE.md` instructs every AI assistant working in this repo to follow that rule.

---

## How to Contribute

### First time: get access + tools
1. **Make a free GitHub account** at [github.com](https://github.com) if you don't have one. Send your **username** to Matt or Rex so they can add you as a collaborator.
2. **Install [GitHub Desktop](https://desktop.github.com/)** — the free app that lets you clone, edit, and push **without the command line**. Easiest path for everyone.
3. In GitHub Desktop: **File → Clone repository → `MrPronoia/the-way`** → pick a local folder. Now you have your own copy on your machine.

### Making changes — two ways

**Quick edit (no app needed):** On [github.com](https://github.com/MrPronoia/the-way), open any file → click the **pencil ✏️** → edit → "Commit changes." Great for fixing a typo or adding a paragraph.

**Real work (GitHub Desktop):**
1. **Pull first** (top bar → "Pull origin") so you have everyone's latest changes.
2. Edit files in your text editor of choice (we use Markdown — plain text with light formatting).
3. Back in GitHub Desktop, write a short **summary** of what you changed → **Commit to main**.
4. Click **Push origin** to share it.

> **Golden rule:** *Pull before you push.* It avoids 95% of conflicts. With a handful of people on a text repo, conflicts are rare and easy to resolve.

### Bigger or experimental changes — use a branch
If you're reworking something substantial, create a **branch** (GitHub Desktop → "Current Branch" → New Branch), do your work there, then open a **Pull Request** on github.com. Matt/Rex review and merge. This keeps `main` clean and gives a natural checkpoint.

---

## Folder & Naming Conventions

Match what's already here so the repo stays navigable:

- **Files & folders:** lowercase, hyphen-separated — `gospel-of-thomas-full-text.md`
- **Primary source texts:** live in an `Incoming/` subfolder or are labeled `*-full-text.md`
- **Section overviews:** `00-overview.md` at the top of a folder
- **Cliff notes:** `cliff-notes-quick-reference.md`
- **Dated research sessions:** `YYYY-MM-DD-topic.md`

Scope stays tight: Jesus directly, early Christianity, the distortion (Paul/Constantine/Augustine/Darby), and the recovery. Broader cross-tradition material lives upstream in `mr-pronoia`, not here — check before adding it.

---

## Using Claude (or any AI assistant) with this repo

This repo ships with a **`CLAUDE.md`** at the root. If you use **[Claude Code](https://claude.com/claude-code)** (or a similar agent) inside the repo folder, it reads that file automatically and gets fully oriented — the thesis, the tone, the source hierarchy, and what *not* to over-promote. That means everyone's AI assistant works from the *same* playbook, so contributions stay consistent instead of drifting.

If you bring an AI assistant into your work here:
- Let it read `CLAUDE.md`, `README.md`, and `00-OVERVIEW.md` first.
- Keep it honest to the source hierarchy — it should cite primary texts, not invent citations.
- Treat its output as a draft you verify, not gospel. Same standard we hold ourselves to.

### Which model, and when

The tradeoff is speed against depth, so pick deliberately:

| Model | Speed | Use it for |
|---|---|---|
| **Sonnet** or **Haiku** | Seconds | Citation lookups, finding a verse, checking a date, "where in the repo is…". Anything you need while a conversation is still on the topic. |
| **Opus** or **Fable** | A minute or two | Building an argument, weighing competing readings, synthesizing across sources. Noticeably better answers — worth the wait when you have it. |

For anything live — a debate, a recording, a public Q&A — open **two sessions**: a fast model for lookups and a deep model for the hard questions. You never wait on the slow one for a quick answer, and the deep one keeps its train of thought instead of being interrupted by lookups.

And **load the key files before you start.** A cold session has to go searching; a warmed one has the material in context and answers immediately. `debate/DEBATE-SETUP.md` has the exact warm-up prompt to paste.

---

## Handle With Care (don't propagate without review)

- **Essene Gospel of Peace (Szekely):** Scholarly consensus questions its provenance. Use with caveats; don't cite it as a verified ancient text.
- **Podcast transcripts** (`podcast-archive/`): Raw working material — research, not authoritative. Verify before quoting.
- **Anything marked `DRAFT`, `WORKING`, or `_private`:** Don't spread it without explicit review.
- **`mr-pronoia` is upstream.** Don't auto-sync between repos. If something here should flow back to mr-pronoia (or vice versa), flag it explicitly to Matt/Rex.

---

## Reading vs. Writing: Who Actually Needs Access

**This repo is public.** Anyone can read, clone, and use every file in it without an invitation — no account, no permission, nothing. That's worth saying plainly to new people, because it means most of them don't need access at all.

Three lanes. Two require nothing from us:

| Lane | What they do | Access needed |
|---|---|---|
| **Send it in** | Hand us files; we convert and file them with their provenance notes. | None |
| **Read and use** | Clone it, browse in Obsidian, point an AI assistant at it, pull updates whenever. | None — it's public |
| **Write directly** | Edit and push themselves. | Collaborator invite |

**Default to the first two.** Don't hand out write access pre-emptively at an onboarding meeting — not as gatekeeping, but because lane 2 already delivers the full value of the collection. Grant Write when someone is contributing often enough that routing through Matt or Rex has become the bottleneck, and they've said so.

Nothing here can be permanently broken — git keeps every version of every file, so any mistake is one `git revert` away. The reason to be deliberate isn't fear of data loss; it's that untangling a messy history costs someone an afternoon.

**If the contributor crew grows past a handful of writers,** turn on branch protection for `main` (Settings → Branches) requiring changes to arrive via Pull Request. That lets you be generous with access and still have every change reviewed before it lands. Anyone can also contribute via **fork + pull request** with no collaborator access at all — the standard open-source path.

### Permission levels

Reserve **Admin** for the core stewards (Rex, Matt, Kam). Admin includes destructive powers — deleting the repo, changing visibility, managing access — so keeping it to the inner circle protects the project while the contributor crew grows freely at Read or Write level.

---

## Reading the Files: Use Obsidian

The files are plain text, so any editor opens them. But [Obsidian](https://obsidian.md) is free and makes the collection genuinely pleasant to browse: choose **"Open folder as vault"** and point it at this repo folder.

You get the folder tree in a sidebar, rendered text instead of raw `#` symbols, instant full-text search across all 281 files, and the `[[links]]` between files become clickable. What's in that sidebar is literally the folder structure on disk — the same thing File Explorer shows. Nothing is hidden in a database.

Two notes: Obsidian edits the real files, so changes are local until you push them (it's a reader/editor, not a sync tool). And it creates a `.obsidian/` settings folder — already in `.gitignore`, so personal setups never get committed.

---

## Questions?

Open an **Issue** on the repo, or reach out to Matt or Rex directly. Welcome aboard — let's recover this thing together.
