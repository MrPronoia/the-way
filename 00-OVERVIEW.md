# The Way — Overview & Reading Paths

A more detailed orientation than `README.md`. Four reading paths, each pointing to specific files.

**Just need to look something up?** Skip the reading paths and go to `TOPIC-INDEX.md` (claim → exact file and section) or `debate/00-INDEX.md` (14 cards with the evidence and rebuttals already assembled). See **Finding Things Fast** below.

---

## Reading Path 1: The Thesis in 90 Minutes

If you only have an evening, do these in order:

1. **`christianity/what-jesus-actually-said.md`** — The full thesis as a printable essay (~8K words, 30 min read)
2. **`christianity/christconsciousnessvision.md`** — The Christ-consciousness vision (4 min read)
3. **`christianity/the-practice.md`** — How to actually live it (5 min read)
4. **`christianity/cliff-notes-quick-reference.md`** — The 1000-word recap of the whole tradition (10 min)
5. **`jesus-site-reference/source/docs/start-here.md`** — Three questions to ask any Christian (10 min)

That's ~60 minutes of high-density reading. The 90 includes pause time.

---

## Reading Path 2: The Historical Case

For the person who wants the evidence chain:

1. **`christianity/2026-02-25-essene-nazarene-ebionite-lineage.md`** — The continuous Jewish-Christian tradition from before Jesus through 5th century CE
2. **`christianity/dead-sea-scrolls/Incoming/dead-sea-scrolls-selected-texts.md`** — The Essene primary sources
3. **`christianity/flight-to-pella-golden-thread.md`** — How Jesus's followers survived 70 CE
4. **`christianity/clementine-literature-nazarene-writings.md`** — A surviving window into the original community
5. **`christianity/james-the-just-key-to-understanding-jesus.md`** — Jesus's brother as theological hinge pin
6. **`christianity/ethiopian-bible/`** — The canon Ethiopia preserved that Rome rejected
7. **`christianity/Incoming/gospel-of-thomas-full-text.md`** — The 114 sayings (primary text)
8. **`extended-library/essene-gospel-of-peace.md`** — Szekely's text (with provenance caveats — see note in file)

---

## Reading Path 3: The Paul Problem

For the person who's been told "Paul is the foundation of the church" and is starting to wonder:

1. **`christianity/paul-false-prophet-deuteronomy-18-test.md`** — Testing Paul against scripture's own standard
2. **`jesus-site-reference/source/docs/the-paul-problem.md`** — Side-by-side Jesus-vs-Paul comparison
3. **`jesus-site-reference/source/docs/paul-vs-the-twelve.md`** — How Paul positioned himself against Jesus's actual followers
4. **`christianity/blood-atonement-logical-incoherence.md`** — Why the Pauline atonement theology doesn't hold together
5. **`christianity/blood-magic-origins-saturn-sacrifice.md`** — Where blood-saves theology actually comes from
6. **`christianity/acts-15-james-four-decrees.md`** — When the original Twelve laid down their rules for Gentile converts (Paul was forced to comply)

---

## Reading Path 4: The Rapture Deconstruction

For the person raised on Left Behind:

1. **`christianity/2026-03-08-darby-dispensationalism-deep-dive.md`** — John Nelson Darby's 1830s invention, traced step by step
2. **`jesus-site-reference/source/docs/the-rapture.md`** — Compact version of the same case
3. **`christianity/2026-03-09-did-jesus-teach-apocalypse.md`** — What Jesus actually said about end-times vs. what Darby constructed
4. **`christianity/participatory-eschatology.md`** — The Kingdom is built through participation, not extraction
5. **`christianity/2026-03-09-combating-christian-zionism-strategy.md`** — Where this theology leads politically

---

## The Gnosticism Folder

`gnosticism/` contains the Gnostic-gospel content — texts that are *also* Jesus content even though they sit outside the canonical New Testament. Specifically:

- **Gospel of Thomas** — 114 sayings of Jesus, considered by many scholars to preserve earlier, less-edited material than the canonical gospels
- **Gospel of Philip** — Jesus's relationship to Mary Magdalene, sacramental theology
- **Apocryphon of John** — Cosmology of the early Christian movement
- **Other Nag Hammadi texts** — The library discovered in Egypt in 1945

These are not "another tradition" — they're Christianity's mystical wing, suppressed by the institutional church but recovered through archaeology and translation. They're here because they're Jesus content.

See `gnosticism/00-overview.md` for the navigation, `cliff-notes-quick-reference.md` for the synthesis, and `Incoming/` for the primary texts.

---

## What's In jesus-site-reference

A reference snapshot of the source for [jesusactuallysaid.com](https://jesusactuallysaid.com). 17 English pages + 17 Spanish translations, plus the Cloudflare Worker that serves them. (The deploy workflow itself — the private mr-pronoia build pipeline — is documented in prose in `HOW-ITS-BUILT.md` but not snapshotted.)

This is here for two reasons:
1. **Notes on architecture** — See `HOW-ITS-BUILT.md`. Documents how the site is structured (MkDocs + Material theme + i18n + reverse-proxy Worker) for future reference or replication.
2. **Possible future independent deployment** — If `the-way` ever wants its own public-facing website (e.g., theway.something.com), this is the starting point.

The actual published site is still built and served from `mr-pronoia/jesus-site/`. This is a static reference snapshot.

---

## What's In podcast-archive

Three transcript collections:

- **`the-jesus-way/`** — The Jesus Way podcast (Aaron Abke & James Benefico). **65 episodes**, covering Yeshua's true mission, the Moses Scroll, the Two Ways, Essene origins, the Saturn cult, Christ consciousness, the Jesus diet, the Mary rediscovery, NDE life reviews, refuting the rapture, the Trinity debunked, Swedenborg, the Nazarene practices, James rejected Paul, and more. One gap: episode 045 has captions disabled at the source and needs manual transcription.
- **`dr-tabor/`** — Dr. James Tabor's "Paul" YouTube playlist, **77 videos**. The most processed set here: each file carries a summary, key teachings, scripture citations, scholars cited, and quotable moments, *plus* the full raw transcript. See `podcast-archive/dr-tabor/00-overview.md` for the thematic index.
- **`kameron-waters/`** — Kam Waters' channel (Christspiracy, The Way Skool), **7 videos** — the complete channel. One is in Spanish and kept in the original.

**These are auto-generated captions, not polished episodes.** They contain typos, mangled names, and garbled Hebrew/Greek. Treat them as **pointers, not proof** — good for finding which thread to pull, never quoted as a source. Trace anything you want to stand behind back to a primary text first.

See `podcast-archive/README.md` for the full episode list and `podcast-archive/the-jesus-way/TRANSCRIPT-STATUS.md` for how new transcripts get pulled.

---

## Finding Things Fast

Three purpose-built entry points, in this order:

1. **`TOPIC-INDEX.md`** (repo root) — the routing table. A claim or question comes in, you find the row, you open one file at the named section. ~117 entries across nine topic clusters plus the primary texts. Every path and section anchor verified.
2. **`debate/`** — **14 stage-ready cards**: the claim, the strongest primary-source evidence, the objections an apologist actually raises with rebuttals, sound bites, and go-deeper paths. Start at `debate/00-INDEX.md`. **Read `debate/CITATION-NOTES.md` before quoting anything** — it logs three citations found to be fabricated or reversed in our own research, plus a do-not-use list.
3. **`scripts/semantic-search.py`** — semantic (meaning-based) search across the whole repo via Gemini embeddings, for when a question comes from an angle the index doesn't anticipate. One-time setup in `scripts/README.md`.

For live use — a debate, a recording, a public Q&A — `debate/DEBATE-SETUP.md` has the session warm-up prompt and the two-model pattern.

---

## What's Intentionally NOT Here

- **`luminaries/`** — Christian mystics (Eckhart, Newton, Boehme, etc.) and adjacent figures (Plotinus, Ramakrishna, Pythagoras). Removed 2026-05-18 — too tangential. They live upstream in `mr-pronoia/esoteric-knowledge/luminaries/`.
- **`cross-traditions/`** — Perennial philosophy, Hermeticism, Law of One. Removed 2026-05-18 — broader cross-tradition material belongs in mr-pronoia, not here.
- **Matt's personal Christianity notes** (`matt-notes/` in mr-pronoia) — too personal for collaborator-facing repo.
- **The chatbot infrastructure** (Cloudflare Workers for the AI assistant) — stays on mrpronoia.com.
- **Personal/project folders** (for-humanity, intentional-community, x-account) — unrelated parallel projects.
- **Other tradition folders** (Buddhism, Hinduism, Islam, Tao, etc.) — present in mr-pronoia, not relevant here.

The Way is intentionally tight. If you need broader context, the upstream repo has it.

---

## How This Relates to the Mr. Pronoia Project

`the-way` is the **Jesus-and-Christianity-focused subset** of the broader Mr. Pronoia knowledge base.

- Mr. Pronoia covers ~36+ traditions and ~20+ luminaries across world wisdom traditions
- The Way distills the Jesus-and-Christianity-relevant portion only

Both are housed under the `MrPronoia` GitHub organization. Mr. Pronoia is upstream (source of truth for active research); The Way is downstream (curated collaboration surface). Drift between them is expected and managed manually.

---

*"Don't take our word for it — read it yourself."*
