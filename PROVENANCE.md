# PROVENANCE — How This Repo Was Assembled

A record of where the content in this repo came from, what was copied, what was excluded, and why. So future-you (or future collaborators) can reason about drift, updates, and trust.

---

## Assembled

**Date:** 2026-05-16
**Source repo:** `MrPronoia/mr-pronoia` (private)
**Source commit at assembly:** `71831cc` (the commit that documented the org migration to GitHub Team plan)
**Assembled by:** Matt Fracek (with Claude assistance) — autonomous overnight execution while Matt was away.

---

## Source → Destination Mapping

| In mr-pronoia | Copied to the-way | Notes |
|---|---|---|
| `esoteric-knowledge/christianity/` | `christianity/` | Full mirror — all 39+ root files plus subfolders (Incoming/, dead-sea-scrolls/, ethiopian-bible/, vegetarian-pythagorean-jesys/) |
| `esoteric-knowledge/luminaries/meister-eckhart/` | `luminaries/meister-eckhart/` | Full copy |
| `esoteric-knowledge/luminaries/isaac-newton/` | `luminaries/isaac-newton/` | Full copy |
| `esoteric-knowledge/luminaries/jacob-boehme/` | `luminaries/jacob-boehme/` | Full copy |
| `esoteric-knowledge/luminaries/st-john-of-the-cross/` | `luminaries/st-john-of-the-cross/` | Full copy |
| `esoteric-knowledge/luminaries/william-blake/` | `luminaries/william-blake/` | Full copy |
| `esoteric-knowledge/luminaries/walter-russell/` | `luminaries/walter-russell/` | Full copy |
| `esoteric-knowledge/luminaries/plotinus/` | `luminaries/plotinus/` | Full copy (substantial Christianity-influence material) |
| `esoteric-knowledge/luminaries/ramakrishna/` | `luminaries/ramakrishna/` | Full copy (Ramakrishna practiced Christianity to nirvikalpa samadhi — strongest cross-tradition proof) |
| `esoteric-knowledge/luminaries/pythagoras/` | `luminaries/pythagoras/` | Full copy (mystery school + vegetarian lineage leading to Essene-Nazarene) |
| `extended-library/essene-gospel-of-peace.md` | `extended-library/essene-gospel-of-peace.md` | File copy |
| `extended-library/neville-goddard-complete-works.md` | `extended-library/neville-goddard-complete-works.md` | File copy |
| `extended-library/david-hawkins-map-of-consciousness.md` | `extended-library/david-hawkins-map-of-consciousness.md` | File copy |
| `esoteric-knowledge/perennial-philosophy/` (selected) | `cross-traditions/perennial-philosophy/` | 00-overview.md, essene-ayurveda-dietary-overlay.md, transmission-map.md, feminine-divine-cross-tradition-synthesis.md, perennial-medicine.md, perennial-child-rearing.md, full `patterns/` subfolder |
| `esoteric-knowledge/gnosticism/` | `cross-traditions/gnosticism/` | Full copy (Gospel of Thomas, Gospel of Philip, Nag Hammadi — Christianity-adjacent) |
| `esoteric-knowledge/hermeticism/` | `cross-traditions/hermeticism/` | Full copy (Corpus Hermeticum, Emerald Tablet, Renaissance-Christian synthesis) |
| `esoteric-knowledge/law-of-one/` | `cross-traditions/law-of-one/` | Full copy (Ra Material's Christ Consciousness treatment) |
| `jesus-site/` | `jesus-site-reference/source/` | Snapshot of the jesusactuallysaid.com source |
| `workers/jesus-proxy/` | `jesus-site-reference/cloudflare-worker/` | Snapshot of the Cloudflare Worker |
| `.github/workflows/deploy-site.yml` | `jesus-site-reference/deploy-workflow/deploy-site.yml` | Snapshot of the deploy workflow |
| `private/the-jesus-way/` | `podcast-archive/the-jesus-way/` | 50+ episode raw transcripts (script `_pull_transcripts.py` and `temp-transcript.txt` excluded) |

---

## Explicitly Excluded

The following content from `mr-pronoia` was explicitly NOT copied:

| Source | Why excluded |
|---|---|
| `private/matt-notes/` | **Per Matt's instruction (2026-05-16):** "Let's go ahead and not include Matt's note Christianity content." Personal research journal — not appropriate for collaborator-facing repo. |
| `private/freemasonry/` | Transmission vehicle, not primary Christianity. Referenced in `cross-traditions/perennial-philosophy/transmission-map.md` instead. |
| `private/skool/` | Mr. Pronoia Skool planning — unrelated to collaboration scope. |
| `matt/`, `rex/` | Personal workspaces. |
| `BOARD.md`, `00-roadmap.md` (mr-pronoia versions) | Project-level coordination docs for the upstream repo. |
| `for-humanity/`, `intentional-community/`, `x-account/`, `mr-pronoia-skool/` | Unrelated parallel projects. |
| `esoteric-knowledge/` other traditions (Buddhism, Hinduism root, Islam, Taoism, Zoroastrianism, Native American, Ayurveda, TCM, Greco-Arabic Medicine, Kabbalah) | Not Christianity-relevant as primary content. Cross-tradition Christianity material from Kabbalah is referenced in `cross-traditions/` but the full Kabbalah folder is not duplicated. |
| `extended-library/` items not flagged for Christianity | Only the three Christianity-relevant items copied (Essene Gospel, Neville Goddard, Hawkins). |
| Operational files: scripts, build cache, `.obsidian/`, `.DS_Store`, etc. | Not content. |

---

## Visibility & Permissions Decision

| Setting | Value | Why |
|---|---|---|
| Visibility | **Private** | Per Matt's instruction. Easier to flip public later than the reverse. Collaborators (Kam + circle) not yet invited. |
| Plan | Under `MrPronoia` GitHub Team org ($8/mo for 2 Owners) | Inherited from mr-pronoia org. Private repos on Team unlock Pages if `the-way` ever publishes a site. |
| Collaborators | **None yet** | Just Matt + Rex as org Owners. Kam invitation is a separate decision. |

---

## Drift Risk

This repo is a **snapshot**, not a sync.

Any updates to Christianity research in `mr-pronoia` after 2026-05-16 will NOT automatically appear here. The two repos will drift. Strategy:

- **mr-pronoia** is the upstream / source of truth for active research
- **the-way** is a curated downstream / collaboration surface
- When something important is added to `mr-pronoia/esoteric-knowledge/christianity/`, decide whether it should also land in `the-way/christianity/` — and copy it manually
- Periodic re-sync sessions may be warranted (e.g., monthly review of what's changed in mr-pronoia and what to propagate)

There is no automated sync. Rex's original BOARD plan considered a cross-repo build (workflow in one repo, content checkout from another) but that was for the workspace/research split, not for the-way.

---

## Architecture Override

This repo's existence is an **override** of Rex's recent recommendation. In `MrPronoiaRepoBuildAndContext.md` (May 15, 2026), Rex argued:

> "**Probably no, given Option C.** 'The Way' is mostly a curation/framing of existing research (Christianity, Jesus content) for Kam's audience — not a separate research domain. Once Kam + 5 guys have direct access to the research repo, they're already collaborating on the relevant content."

Matt's call (May 16, 2026): create the separate repo anyway. Possible reasons:
- Cleaner branding/entry point for Kam's audience
- Test architecture before committing to Option C's workspace split
- Allow `the-way` to evolve independently if it grows beyond research curation
- Option of giving Kam admin control of a marketing-focused space (which Rex did allow as a possibility)

The override is documented in `mr-pronoia/BOARD.md` so Rex sees it.

---

## Scope Refinement — 2026-05-18

After initial assembly, Matt reviewed the repo and decided several folders were too tangential to The Way's actual focus (Jesus + Christianity directly). The following were **removed** to tighten the scope:

| Removed | Why |
|---|---|
| `luminaries/` (entire folder, 9 sub-folders) | Christian mystics + Christianity-adjacent figures (Eckhart, Newton, Boehme, St John of the Cross, Blake, Russell, Plotinus, Ramakrishna, Pythagoras). Even the Christian mystics felt one step removed from The Way's actual focus on Jesus's teaching and early Christianity. They still live upstream in `mr-pronoia/esoteric-knowledge/luminaries/`. |
| `cross-traditions/perennial-philosophy/` | Cross-tradition synthesis (essene-ayurveda-overlay, transmission-map, feminine-divine-synthesis, perennial-medicine, perennial-child-rearing, patterns/). Belongs in mr-pronoia where the broader cross-tradition framing lives. |
| `cross-traditions/hermeticism/` | Pre-Christian Hermetic tradition. Not Jesus-focused. |
| `cross-traditions/law-of-one/` | Modern channeled material with a Christ-consciousness section. Tangential. |
| `extended-library/neville-goddard-complete-works.md` | Bible-as-allegorical-psychology — interesting but not directly Jesus-focused. |
| `extended-library/david-hawkins-map-of-consciousness.md` | Modern consciousness framework. Tangential. |

**Kept and moved:**

| Kept | New location |
|---|---|
| `cross-traditions/gnosticism/` | Moved to top-level `gnosticism/`. The Gnostic gospels (Thomas, Philip, Nag Hammadi) ARE Jesus content — Christianity's mystical wing, suppressed by the institutional church. Not "another tradition." Stays. |
| `extended-library/essene-gospel-of-peace.md` | Still in `extended-library/`. Szekely's text — directly Essene-Jesus relevant, kept with provenance caveats. |

**Result:** Repo dropped from ~22 MB / ~250 files to ~19 MB / fewer files. Tighter scope, cleaner focus.

The deletions are in git history (initial commit `f...` includes everything), so if Matt ever changes his mind about wanting Eckhart or the perennial-philosophy material here, it's recoverable. But the default going forward: The Way stays Jesus-focused.

---

## Next Steps (open)

- [ ] Matt reviews the structure and content
- [ ] Decide what content (if any) to scrub before inviting Kam
- [ ] Rex responds to the BOARD architecture question (still pending from earlier in the session)
- [ ] Decide on visibility flip — keep private, or go public once content is reviewed?
- [ ] Decide on Kam invitation flow — when, how, what permission level?
- [ ] Optional: set up a standalone published site from `jesus-site-reference/source/` (see `HOW-ITS-BUILT.md`)

---

*The map is not the territory. This repo is a map of one specific way of approaching the question of what Jesus actually taught. Verify everything against the primary sources.*
