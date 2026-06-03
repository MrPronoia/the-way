# Contributing to The Way

Welcome. If you're reading this, someone trusted you with the keys — this is a shared, living research repository, and you're invited to help it grow.

New here? Read **`README.md`** first (what this is), then **`00-OVERVIEW.md`** (reading paths). This file is about *how to contribute* once you're oriented.

---

## The Spirit of This Place

We're not debunking Christianity — we're **recovering** it. The work is collaborative research between people who take the question of *what Jesus actually taught* seriously.

A few ground rules that keep the repo trustworthy:

- **Lead with primary sources.** Quote Jesus's actual words, cite the text, link the source. "Don't take our word for it — read it yourself."
- **Distinguish the layers.** What *Jesus* said ≠ what *Paul* said ≠ what the *institutional church* later codified. Keep them separate.
- **Welcome the person, not just the position.** Acknowledge mainstream views even where we diverge. Honest uncertainty beats false confidence.
- **Cite as you go.** Every claim should be traceable. (See the Source Hierarchy in `CLAUDE.md`.)

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

---

## Handle With Care (don't propagate without review)

- **Essene Gospel of Peace (Szekely):** Scholarly consensus questions its provenance. Use with caveats; don't cite it as a verified ancient text.
- **Podcast transcripts** (`podcast-archive/`): Raw working material — research, not authoritative. Verify before quoting.
- **Anything marked `DRAFT`, `WORKING`, or `_private`:** Don't spread it without explicit review.
- **`mr-pronoia` is upstream.** Don't auto-sync between repos. If something here should flow back to mr-pronoia (or vice versa), flag it explicitly to Matt/Rex.

---

## Questions?

Open an **Issue** on the repo, or reach out to Matt or Rex directly. Welcome aboard — let's recover this thing together.
