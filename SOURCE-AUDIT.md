# Source Audit — what we can verify, and what we can't

**Run 2026-10-07. Complete — all four passes reported.** Independent audits of `christianity/` (split three ways), `gnosticism/`, `extended-library/`, and the 17 English pages of `jesus-site-reference/source/docs/`. Roughly **2,900 attributed claims** in scope. Podcast transcripts were excluded as subjects (they are not quotable by rule) but searched extensively as *origins*.

**Why this exists.** The repo is public. Anyone can check any claim in it. Five fabricated citations were found on 2026-10-06, all with one signature: **quotation marks, a precise-looking citation, and no primary text here to check it against.** This audit hunted that signature across the whole corpus. It found more.

**How to read the buckets:**

| | Meaning |
|---|---|
| **A — Verified** | Grep-confirmed, word for word, against a primary text that is actually in this repo. Quote it freely. |
| **B — Unverifiable here** | Attributed to a real source we don't hold. **Not an error** — just uncheckable without a published edition. The repo contains six primary texts and no Bible, Josephus, Philo, Eusebius, or Epiphanius, so most patristic citations land here by definition. |
| **C — Not found** | The claimed source *is* in this repo and the words are *not in it*. **This is the fabrication signature.** |
| **D — Contradiction** | Two places in the repo asserting incompatible things. |

---

## The headline numbers

| Bucket | Count |
|---|---|
| **A — Verified verbatim** | **~145 quotations** |
| **B — Unverifiable here** (specific citation) | **~185** |
| **B — Unverifiable here** (vague: author only, no work or locus) | **~73 — flagged** |
| **C — Not found / likely fabricated** | **19 new** (on top of the 5 already known) |
| **D — Internal contradictions** | **53** |
| Absolute claims that break on one counterexample | **~50** |
| Quotations whose only traceable origin is a podcast caption | **15** |
| **Famous misattributions** — quotes the internet assigns to people who never said them | **5** |
| Checkable factual errors | **~30** |

**The honest summary:** the primary-text work in this repo is genuinely good. Where we hold the source, the quotations check out — one file verified 40 of 40, another 15 of 15, and the entire Ethiopian canon came out clean on its first ever check. The failures cluster in four places, none of them the core research:

1. **Quotations lifted from podcast captions** and given published citations.
2. **Absolute claims** — "no", "never", "every", "unanimous" — each refutable by one counterexample.
3. **A single translation-attribution error** that propagated Thomas misquotations across the whole site, including onto a public page whose argument depends on the wrong word.
4. **Decorative cross-tradition quotations** inherited from general circulation, three of which are well-known fakes.

The pattern is that the checking got weakest exactly where the stakes felt lowest.

---

## 1. NOT FOUND — treat as fabricated until someone produces the source

Nine new, beyond the five in `questions/CITATION-NOTES.md`. Each confirmed with at least two independent greps.

| Claim | Attributed to | What's actually true |
|---|---|---|
| "There is therefore a measure of **the works of** faith… drives **all dark forces** perfectly from the soul… suggests **inharmonious** thoughts" | *Epistle of Clement to James* | **That epistle IS in this repo and contains none of it.** The real passage is ***Recognitions* 4.18**, with four words different: "faith" not "the works of faith", "the demon" not "all dark forces", "thoughts" not "inharmonious thoughts", "perceptions" not "thoughts". The altered wording appears verbatim in a podcast caption (`029-demonic-possession-dr-marzinsky.md`). **Cite Recognitions 4.18 and use the real wording.** |
| "It is for James that the whole universe has come into being" | Gospel of Thomas 12 | A third non-existent rendering. Repo Lambdin: *"go to James the righteous, for whose sake heaven and earth came into being."* Traces to `09-the-nazarenes...md` caption. |
| "I live on olives and bread, to which I rarely add vegetables" | Clementine Homilies | Real text, *Hom.* 12.6: *"I use only bread and olives, and rarely pot-herbs."* The genuine line is better. |
| "There is absolutely no evidence to support the claim that the Essene Gospel of Peace is an ancient text" | **Florentino García Martínez**, Univ. of Groningen | **No book, article, page, or date.** Appears nowhere else in the repo; García Martínez appears only as a DSS translator in bibliographies. Exact fabrication signature — a real scholar, an uncontroversial claim, an institutional affiliation, and nothing to check. The provenance argument doesn't need it. |
| "Thomas contains **zero apocalyptic content.** No Last Judgment. No cosmic destruction." | — | **Refuted by our own Thomas.** Saying 57 is the wheat-and-tares *judgment* parable; 11 ("this heaven will pass away"); 111 ("the heavens and the earth will be rolled up"); 16 ("fire, sword, and war"); 10 ("I have cast fire upon the world"); 103 (watch-and-be-ready). The narrow claim — no Second Coming, no rapture, no tribulation period — survives. |
| "Jesus responds with a **Gehenna reference**" on Luke 17:37 | J. Richard Middleton | The file quotes Luke 17:37 correctly two lines earlier — *"where the body is, there the vultures will gather."* **There is no Gehenna in that verse.** |
| "The word 'God' was not in this text originally… **and the change was deliberate**" | Isaac Newton, on 1 Tim 3:16 | Reads as flat modern analytical prose, unlike Newton's manifestly authentic 1 John 5:7 quotation two paragraphs later. In exactly two files and nowhere else — the copy-propagation shape. **Treat as paraphrase until checked against the 1754 text.** |
| "Nothing is more precious to a living creature than its own life" | "early Nazarene teaching" | **Podcast origin** — five Jesus Way episodes, including a Will Tuttle interview where the sentiment is Tuttle's (Buddhist/Jain), not Nazarene. In the show notes it's an unquoted editorial bullet; here it gained quotation marks *and* an attribution. |
| "as polluting as the heathen worship of devils" | Clementine Homilies 12.6 | Already retracted 2026-10-06 in the body of its file — but **survived in the same file's summary table and source list** until 2026-10-07. A retraction that doesn't sweep the whole file isn't a retraction. |
| "What God has made alive, let no man kill." | Essene Gospel of Peace, Book 1 | **Zero hits** in our copy of Book 1. Only origin: `019-the-jesus-diet.md` caption, where it's called "the line that transformed Aaron." Used as the capstone of a section. |
| "Death can only produce death, whereas life can only produce life." | Essene Gospel of Peace, Book 1 | **Zero hits** — and the real line *is* in the text, quoted correctly elsewhere in the same file: *"For life comes only from life, and from death comes always death."* |
| "gradually realized on earth, with the transformation of physical nature going hand in hand with the ethical transformation of man" | **Jubilees 23** | This is **R.H. Charles's editorial introduction** — the translator's commentary quoted as scripture. |
| "On that day, the Elect One will sit to judge on the throne of glory which is the throne of the Lord of Spirits himself." | 1 Enoch 45:3 | **Two verses fused.** Charles (the edition we hold) has 45:3 as *"Mine Elect One shall sit on the throne of glory."* The trailing clause is **61:8**. |
| Three fragments of the Apocalypse of Weeks | 1 Enoch | "as a fence", "written off for eternal destruction", and "the old heaven will pass away" — all absent. Charles reads *"the first heaven shall depart and pass away."* |
| "I have reached the inner vision… splendor of eternal light." | Thanksgiving Hymns (Hodayot) | Absent from our DSS selection, and carries **no column or line reference at all**. |
| "…two ways, one good and one evil. If you walk on the good way, he will bless you" | **4Q473** | 4Q473 appears **nowhere in this repo**. The real fragment is heavily bracketed reconstruction; quoting it as continuous prose implies a solidity it doesn't have. |
| "the spirits of **Truth and Falsehood**" / "the time of visitation" | 1QS 3:18-19 | Repo (Vermes) reads *"the spirits of truth and **injustice**"* and *"the time of **His** visitation."* Our own DSS cliff-notes quote it **correctly** — so the repo contradicts itself, and the altered version is the one that reached the public site. |
| "If you bring forth what is within you, what you have will save you…" | Gospel of Thomas 70, "Lambdin" | Not Lambdin. Repo: *"That which you have will save you if you bring it forth from yourselves."* Propagated into four files. |

---

## 2. The systemic finding — one footnote caused sitewide quotation drift

`gnosticism/gospel-of-thomas/00-overview.md` states that Lambdin's translation appears "in Robinson 1988 **and Meyer 2007**." **Meyer 2007 prints Meyer's own translation; Lambdin is not in it.**

That single error licensed a pattern across the repo: files credit Lambdin in their source footers and then quote Meyer-family wordings throughout. Confirmed in **at least eight files**, including public pages.

The cost is concrete. `jesus-site-reference/source/docs/was-jesus-god.md` credits Lambdin, quotes Thomas 3 as *"you are **children** of the living Father"*, and then argues: *"**Children.** Plural. All of you."* **Lambdin reads "sons."** The load-bearing word isn't in the translation the page claims to use — and `what-jesus-taught.md` quotes the same saying correctly, so the site contains both.

**Thomas 113 — the most-quoted saying on the site — appears in at least six different wordings**, none matching our own Lambdin text (*"the kingdom of the father is spread out upon the earth, and men do not see it"*). Thomas 2, 3, 12, 51, 77 and 108 also drift.

**Fix in two steps:** correct the Meyer-2007 claim at the root, then either re-quote from `christianity/Incoming/gospel-of-thomas-full-text.md` or stop crediting Lambdin and name the translation actually used. `gnosticism/cliff-notes-quick-reference.md` quotes Lambdin exactly throughout — copy that file's practice.

---

## 2b. Famous misattributions — quotes the internet assigns to people who never said them

A distinct failure shape, and the most embarrassing kind, because the debunking is one search away and often has its own Wikipedia section. These entered as cross-tradition garnish rather than load-bearing evidence, which is probably why nobody checked them.

| Quote | Attributed to | Reality |
|---|---|---|
| "What you resist persists." | **Carl Jung** — with *Aion* (1951) and *Psychology and Religion* (1938) cited | A self-help aphorism. **Not in Jung.** Two real book titles bolted onto a modern saying is worse than no citation, because it looks checked. |
| "The time will come when men will look upon the murder of animals as they now look upon the murder of men." | **Leonardo da Vinci** | **Not in the notebooks.** Traced to a Merezhkovsky historical novel. One of the most widely circulated fake quotations in vegetarian literature. |
| "As long as man continues to be the ruthless destroyer of lower beings, he will never know health or peace." | **Ovid**, *Metamorphoses* 15 | **Spurious** — a 20th-century vegetarian-movement line routinely pinned on Pythagoras via Ovid. Not in the text. |
| "I see you, Mara." | **Majjhima Nikaya 36 / Sutta Nipata 3.2** | From modern retellings (Thich Nhat Hanh, Tara Brach), not the Pali canon. Two precise canonical citations on a contemporary paraphrase. |
| "The divine is within you." | **The Upanishads** | No Upanishad says this. Quotation marks around a generic sentiment — **and it's on the public-facing landing page and the print piece.** |

One more of the same family, worth naming separately because it's the purest form: `trinity-fourth-century-construction.md` attributes "evident knowledge and engagement with middle Platonism" to the **journal** *Vigiliae Christianae* — no author, no article, no volume, no year. A quotation credited to a periodical is not a citation.

---

## 3. Absolute claims — the single biggest category of exposure

Roughly 34 found. Each is refutable by one counterexample, and in every case a narrower version makes the same point and survives. The most expensive, all on **public pages**:

| Claim | The one-line reply |
|---|---|
| "**200+ million** American evangelicals" (3 public pages) | US evangelicals are ~60–90 million. 200 million is ~60% of the entire country. **Fixed 2026-10-07.** |
| "None of these ideas had ever been taught by **anyone, anywhere**, in the history of Christianity" / "**none of this existed before 1830**" | Morgan Edwards (1744), Manuel Lacunza (1812), Pseudo-Ephraem. All contested — but they exist. *No sustained doctrine, no system, no following before Darby* is true and survives. |
| "**Every** major pre-Constantinian church father… **unanimously**" (pacifism, 4 pages) | Tertullian's *Apologeticus* presupposes Christians already in the legions; *De Corona* concerns a serving soldier; Eusebius records Christians in Diocletian's army. A 300-year *consensus* is defensible. |
| "**No other major mystical tradition** teaches [apocalyptic eschatology]" | Zoroastrian *Frashokereti*, Islamic *Yawm al-Qiyamah*, Hindu Kalki, Buddhist Maitreya, Ragnarök — **and our own Darby file lists three of them by name.** |
| "**Zero for five**… in **every** post-resurrection appearance across **all four** gospels and Acts" | Omits Mark entirely (16:16, "whoever believes and is baptized"), the Emmaus road, and John 20:24-29. |
| "This is **irrefutable**" (offered as a conversation opener) | Inviting the one reply that costs most, in the document designed for first contact. |
| Seven universal negatives about NDEs ("**No** account anywhere reports…") | Bill Wiese's *23 Minutes in Hell*, Don Piper, Rawlings' *Beyond Death's Door*, and the Greyson & Bush distressing-NDE literature report exactly the denied structure. **One title defeats seven sentences.** Fixed 2026-10-07. |
| Revelation "**never uses** the Gospel's key terms — light, truth, grace, life" | False on all four: Rev 21:23, 3:7, 1:4, 2:7. |

---

## 4. Quotations that came from podcast captions

Thirteen found. **This is how two of the five original fabrications entered**, and the mechanism is now documented: a host paraphrases on air → the auto-caption records it → someone lifts it into a research file → quotation marks get added → sometimes the citation is upgraded to a published book.

The clearest case, now corrected. `nde-life-reviews-validate-works-based-salvation.md` presented a Howard Storm quote as from *My Descent Into Death* (2005). The transcript reads: *"I don't need people to **come and** worship me. **What I want you to do is** go back to earth and love the person **that** you're with."* The wording was **tightened** and the citation **upgraded from a caption to a book**. In the same episode the host says on air, *"I'm going to try to quote verbatim exactly what he says"* — so the chain was four removes long before the quotation marks went on.

Seven quotations in that file alone trace only to captions, including three subjects identified by role only — "The Baptist Preacher," "The Devout Baptist Man," "The Female Pastor" — with no name and no source. Three more are in `moses-scroll-deuteronomy-without-sacrifice.md`, including a supposed 1880s remark (*"I'll eat all fifteen of these parchments"*) and a Tabor "99% confident" that is hearsay inside a caption.

---

## 5. Language claims — verdicts

Hebrew and Greek claims have now failed three times. They are high-risk because they sound authoritative and are refutable by anyone with a lexicon.

| Claim | Verdict |
|---|---|
| Jeremiah 7:22 — "The Hebrew is **unambiguous**: *lo* (not) *tsivviti* (I commanded) *otam* (them)" | ⚠️ **Two errors.** The Hebrew is **one word with a suffix** — צִוִּיתִים — not two. And "unambiguous" is false: the *lo…ki-im* construction running into v. 23 is the standard ground for a relative reading. **Third instance of the *lo* pattern.** |
| Isaiah 11:9 *shachat* "is the same word used for ritual slaughter" | ❌ **False.** שׁחת (destroy) vs שׁחט (slaughter) — different roots, identical only in loose transliteration. Fixed. |
| Hosea 6:6 *lo* "not a comparison" / "can carry the force of 'never'" | ❌ **False.** 6:6b uses comparative *min*. Fixed in most files; one instance remained in `moses-scroll`. |
| θύω "does not mean ordinary killing" | ⚠️ **Overstated.** LSJ also carries plain "slaughter, kill" — Luke 15:23, Acts 10:13, Luke 22:7. An entire file is built on this unqualified. |
| ἕως ("until", Matt 1:25) "implies the situation changed" | ❌ **Wrong as stated.** ἕως οὗ carries no such implication, and this is the most-rehearsed counter in the perpetual-virginity debate. |
| Luke 21:34 Peshitta "a variant not present in the Greek" | ⚠️ **Misleading.** The Greek is present and undisputed (*κραιπάλῃ*); the Syriac is a rendering choice, not a lost variant. |
| ἐντὸς ὑμῶν = "within you" (Luke 17:21) | Contested; commonly "among you." Load-bearing with no concession noted. |
| *airō* / *paralambanō* (Matt 24); *harpazō*, *apantesis*, *chilioi*; ἀδελφός; δεσπόσυνοι; the Ebionite Greek wordplay | ✅ **All correct.** Good work. |

---

## 5b. Two traps for whoever verifies next — read before you grep

Both of these produced **false** fabrication reports during this audit, and both would do it again.

1. **`christianity/ethiopian-bible/didascalia-raw.md` is OCR with the letter "t" systematically dropped.** It reads *"wih us our good and holy broher Paul, he Aposle."* Exact-phrase greps return **zero** on perfectly genuine quotations. One auditor initially scored all three Didascalia quotes as fabricated for this reason. **Grep short fragments without "t", or you will accuse the file of something it didn't do.**
2. **`christianity/ethiopian-bible/unique-ethiopian-texts.md` wraps mid-phrase.** Jubilees 6:22 scored zero on *"as a law for ever unto their generations"* purely because "unto / their generations" broke across a line. The quotation is genuine. **Use short fragments.**

The general lesson: **a zero-hit grep is evidence, not a verdict.** Every "not found" item in this audit was confirmed with at least two different fragment searches before being reported, and that discipline is the only reason these two files weren't wrongly condemned.

---

## 6. Where the primary-text work is genuinely strong

Worth stating, because the list above is lopsided by design — it's a defect report.

- `christianity/essene-gospel-of-peace-cliff-notes.md` — **40 of 40 quotations verified**, provenance caveat stated twice.
- `christianity/cliff-notes-quick-reference.md` — **15 Thomas sayings, exact Lambdin throughout.** The model to copy.
- `gnosticism/cliff-notes-quick-reference.md` — all 12 Apocryphon/Philip quotations exact.
- `gnosticism/nag-hammadi-key-texts-cliff-notes.md` — all 10 Philip quotes verified, and it correctly declines to quote texts we don't hold.
- `christianity/matt-26-28-textual-layers.md` — cleanest analysis file: honest date ranges, correct Didache claim, properly formed bibliography.
- `christianity/2026-02-25-essene-nazarene-ebionite-lineage.md` — states its own corrections, names the podcast origin of a struck claim, separates witness strength. **Reference model for remediation.**
- The **Ethiopian canon came out clean, and nobody had ever checked it before.** Verified verbatim: 1 Enoch 1:1, 1:3-8, 1:9, 46:4-5, 48:2-5, 99:2; Jubilees 6:22, 6:32, 15:25, 23:13-29; Epistula Apostolorum 16, 17, 26, 31, 33, 36; Shepherd of Hermas Mandates 1, 4, 6; Didascalia 1 and 24. The claim that Hermas contains **no blood-atonement language** also checks out — all five occurrences of "blood" are the beast's colours, "guilty of his own blood," and "perish through blood and fire."
- Seventeen Essene Gospel of Peace quotations in `the-essene-diet.md` verified exact, and the Dead Sea Scrolls passages (1QS 6:4-6, 1QS 8:1, CD 1:10-11, CD 19:33-35, 1QM 1:1-3) all check out.

### Two scholars misnamed, in a way that looks authoritative

Worth separating because it's a different kind of error than a bad quotation:

- ***Pythagoreans and Essenes: Structural Parallels*** (Peeters, 2004) is by **Justin** Taylor. Three files credit **Joan** Taylor — who is a real and well-known Dead Sea Scrolls scholar, which is exactly what makes the error survive. A reader who knows the field sees a plausible name attached to the wrong book.
- **Michael Knibb is cited as confirming** that the Ge'ez Old Testament was translated "directly from Hebrew and Aramaic sources." Knibb demonstrated the opposite — that Ethiopic Enoch descends from a **Greek** intermediary. Two load-bearing claims in `christianity/ethiopian-bible/00-overview.md` rest on a scholar who argued against them. (Relatedly: the same file's "no Nicene filtering" framing sits awkwardly with Ethiopia converting around 330 CE, *after* Nicaea, in communion with Alexandria.)
- **Idan Dershowitz is placed at Harvard** in two files; he has held the Hebrew Bible chair at **Potsdam** since 2019/20, which is where the Shapira work was published from.

---

## 7. One case where our own primary text undercuts us

`christianity/cliff-notes-quick-reference.md` presents the Epistula Apostolorum as anti-Paul evidence: Paul comes *"to root up the church,"* God will *"turn back"* his *"evil desire,"* Paul is *"the last of the last."* All four fragments are verbatim.

But the same two chapters in our own `christianity/ethiopian-bible/epistula-apostolorum.md` are **strongly pro-Paul**. "Root up the church" is his *pre-conversion* intent, which Jesus then reverses — and "the last of the last" opens a sentence of commendation:

> "…he shall abide with the elect, as **a chosen vessel and a wall that shall not be overthrown**, yea, **the last of the last shall become a preacher unto the Gentiles, made perfect by the will of my Father**."

A load-bearing claim refuted by the very file cited for it. This is the pattern to watch for hardest, because every quotation in it is technically accurate.

---

## What to do about all this

Ordered by cost of being wrong, highest first. Tracked in `ROADMAP.md`.

1. **Fix the public pages.** They're read by strangers who owe us no benefit of the doubt. The absolutes and the Thomas-translation problem are the two biggest.
2. **Fix the Meyer-2007 claim at the root**, then reconcile every Thomas quotation against our own Lambdin text.
3. **Retire or source the 13 podcast-origin quotations.** Where a real published source exists, get the page number. Where the subject is identified only by role, don't quote it at all.
4. **Downgrade every absolute to its narrow true version.** In every single case examined, the narrow version made the same point.
5. **Add loci to the 53 vague citations**, or drop the quotation marks.
6. **Finish the remediations that stalled.** Several documented fixes reached one file and not its neighbours — and in one case not even the rest of the same file.

---

## The pattern worth internalizing

Every failure in this audit is one of five shapes:

1. **A paraphrase that acquired quotation marks**, usually in transit from a podcast caption.
2. **An absolute where a narrow claim would have done** — and the narrow claim was always available.
3. **A precise-looking citation to something nobody could check**, which is why it survived so long.
4. **A correction that reached one file and stopped.**
5. **A quotation inherited from general circulation** — the Jung, da Vinci and Ovid lines — where nobody checked because everybody "knows" it.

None of these come from carelessness about the *substance*. They come from the gap between believing something is true and having checked it, and that gap is widest exactly where a claim feels least controversial. Three of the worst items here are decorative cross-tradition garnish nobody was leaning on; one is a translator's own introduction mistaken for scripture; one is the same sentence quoted correctly in one file and wrongly in another.

The repo's own standing rule covers all five: **primary text beats our notes, our notes beat memory.** When a quote matters enough to say out loud, grep it first — and when a grep comes back empty, search twice before concluding anything, because two files here were nearly condemned for an OCR artifact.
