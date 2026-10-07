# Roadmap

Working to-do list for The Way. Current as of 2026-10-07.

**The governing fact:** this repo is **public**. Anyone can read it, clone it, quote it, and check it. That changes the priority order — a wrong claim here is not a private note we'll tidy up later, it's something a stranger can screenshot. Accuracy work outranks new content.

---

## P0 — Do before inviting more people in

| # | Item | Why it's P0 | Status |
|---|---|---|---|
| 1 | **Source audit — the list of what we can't verify** | Five fabricated citations were found on 2026-10-06, all with the same signature: quotation marks plus a precise-looking citation and no primary text to check it against. We don't yet know how many more there are. Output goes to `SOURCE-AUDIT.md`. | **In progress** |
| 2 | **Run the semantic search for the first time** | It has never been run. One of the three lookup tools in `ONBOARDING.md` doesn't actually work yet, which is a poor first impression for new contributors. Needs a `GOOGLE_API_KEY` and one `--rebuild`. | Blocked on Rex (API key) |
| 3 | **Add provenance headers to the 14 files that lack them** | `scripts/semantic-search.py` now carries each file's source block into every search result, so a file with no header returns "(no source header — unverified provenance)". Mostly `cliff-notes-quick-reference.md` files. **Only from what each file already documents** — never infer a source. | Not started |

---

## P1 — Content gaps worth closing

| # | Item | Notes |
|---|---|---|
| 4 | **Hell / afterlife has no research file** | The only one of the nine topic clusters with no `christianity/` home. `questions/hell-afterlife.md` is all there is behind it. If the subject comes up publicly, that's the thinnest ground in the collection. |
| 5 | **Acts 21:23-26 — James funds Temple sacrifices** | Appears nowhere outside podcast transcripts. It is the strongest counter-evidence to the sacrifice claim and currently has no prepared treatment. See `questions/nazarene-sect-sacrifice-and-diet.md`. |
| 6 | **Isaiah 56:7 is quoted truncated in five files** | The omitted first half reads "their burnt offerings and their sacrifices will be accepted on my altar" — the opposite of how we use the verse. Needs fixing at the source, not just noting on a card. |
| 7 | **Episode 045 transcript** | The one gap in the Jesus Way archive. Captions are disabled at the source, so it needs Whisper or manual transcription from audio. |
| 8 | **Matthew 2:23 has zero coverage** | "He shall be called a Nazarene" — no such OT prophecy exists verbatim. It's the first thing a prepared critic raises about the Nazarene claim and the repo says nothing about it. |

---

## P2 — Infrastructure and polish

| # | Item | Notes |
|---|---|---|
| 9 | **Ray Pritz, *Nazarene Jewish Christianity*** | The standard monograph on exactly our central claim, and it's absent from the bibliography. Cite it rather than copying it (see the copyright rule in `CONTRIBUTING.md`). |
| 10 | **Jamie — push-to-check lookup tool** | Spec'd and ready to build in `ideas/jamie-mvp.md`. Milestone M2 (console output from real retrieval) is the gate: everything before it is plumbing, everything after is polish. |
| 11 | **Delete the merged `questions-not-debate` branch** | Fully merged into `main`; it'll read as work-in-progress to new contributors. Matt's branch, Matt's call. |
| 12 | **Spanish mirrors drift** | 17 `*.es.md` files translate the English pages. When an English page is corrected, the Spanish needs the same fix — there's no automation, so it has to be deliberate. |

---

## Standing practices (not tasks — how we work)

- **Primary text beats our notes. Our notes beat memory.** Verify in `christianity/Incoming/` before quoting. It takes ten seconds.
- **Cite the distinctive phrase, not the line number.** Line numbers shift the moment anyone edits a file above them. A grep for `"neither be purified by atonement"` works forever.
- **Podcast transcripts are pointers, not proof.** Two of the five fabricated citations entered the repo by being lifted from an auto-caption with quotation marks added.
- **Prefer the narrow claim.** Every overclaim caught so far had a true, narrower version that made the same point and would have survived scrutiny — "no sacrifice," "nowhere else," "not a comparison."
- **No copyrighted books.** Short attributed excerpts, public-domain texts, and our own notes. `christianity/dead-sea-scrolls/Incoming/dead-sea-scrolls-selected-texts.md` is the house model.
- **Put your name on what you contribute.** `**Contributed by:**` rides along into search results — credit, and a person to ask when a citation needs checking.

---

## Done recently (2026-10-06 / 10-07)

- Jesus Way archive brought current: 55 → 65 episodes. Kam Waters' channel archived (7 videos). Episode 045 diagnosed as captions-disabled-at-source rather than merely missing.
- `questions/` built out to 18 files, including four cards that exist specifically to stop us being ambushed on method (how we read John, the Gospel of Thomas, criteria, and what we actually offer).
- `TOPIC-INDEX.md` — ~117 claim→file routing entries, every path and anchor verified.
- `scripts/semantic-search.py` ported, with three fixes to the upstream version: a chunker that was silently dropping 35% of the text, provenance carried into every search result, and `.gitignore` honoured so a local-only book can never reach the embedding API.
- Five fabricated or reversed citations found and corrected, propagated across 24 files including the published site source in both languages. Logged in `questions/CITATION-NOTES.md`.
- `ONBOARDING.md` and `CONTRIBUTING.md` written for the incoming contributor crew.
