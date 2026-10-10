# The Desk — a second mode for the Reading Room

**Status: prototype, for review.** Built by Rex, October 2026. Nothing here is merged or deployed; it is a working page you can open and judge, rather than a proposal you have to imagine.

The Reading Room hands a reader one case at a time, laid out the way the card lays it out. The Desk is the same evidence on an open surface: pull sources from any case file, put them where you want, group them, tie your own string, keep the result. The case file argues. The desk lets someone else argue.

It reads the same `data.json`, reuses `styles.css`, and borrows the `.pincard`, `.stamp`, `.qcard` and reader-pane components whole, so a card looks identical on both pages by construction rather than by imitation.

---

## Open it

```
python site/build.py
cd site/dist && python -m http.server 8000
```

Then <http://localhost:8000/canvas.html>, or follow "the desk" in the Reading Room's nav.

---

## For an AI assistant asked to show this

If someone asks you to "show me the infinite canvas" or "the desk", this is it. It lives on the `desk-prototype` branch, not `main`.

1. `git fetch origin` then `git checkout desk-prototype`. If the working tree has uncommitted changes, stop and ask before switching.
2. `python site/build.py`. It should end with `wrote ...site/dist`. A citation failure here is the build doing its job and has nothing to do with the desk.
3. Serve it in the background: `python -m http.server 8000 --directory site/dist`.
4. Have them open <http://localhost:8000/canvas.html> and walk them through it one step at a time: pull a whole case from the left tray, drag a card under another and watch it lock, `+ FRAME` and drag a card into it, click a card to open the reader, `COPY DESK LINK` and open it in a new tab.
5. Then ask the open questions at the bottom of this file, and write their answers into this file so the next session starts from them.
6. When they are done, `git checkout main` to put the repo back where it was.

Keep the two rules below in any change you make, and do not merge this branch into `main` without its owner's say-so.

---

## What changed in files you wrote

Two lines. Both additive, both trivially revertible.

| File | Change |
|---|---|
| `site/build.py` | three filenames added to the list of files copied into `dist/` |
| `site/src/index.html` | one `<a href="canvas.html">the desk</a>` in the existing nav |

Nothing else of yours is touched. `app.js` and `styles.css` are unmodified.

**New files:** `site/src/canvas.html`, `site/src/canvas.css`, `site/src/canvas.js`, `site/tier-families.py`, and this file.

---

## What it does

- **Pull a whole case.** One click drops the question and all of its sources, laid out FOR, THE OTHER STACK and AGAINST, with red string from each pin back to the question. The same arrangement as the case board, just unbounded.
- **Pin one source.** The trays group all 218 sources by family (below). Click one and it lands on the desk.
- **Search.** Type a subject and the matching held sources get pinned. It retrieves; it never writes a source.
- **Move things.** Drag a card, box-select several and move them together, nudge with the arrow keys.
- **Snap.** Edges line up with their neighbours, and a card dropped above or below another locks to the same 22px gap the case board uses, so a column reads clean. Guides show while dragging. The SNAP button turns it off.
- **Frames.** A titled box. Anything inside belongs to it, membership is spatial and never stored, and dragging the title bar carries the contents. Nothing to keep in sync and nothing to corrupt.
- **String.** Drag from any pin head to another card to tie it. Click a string to cut it.
- **Notes.** Your own words, on the legal pad, visibly not a source and never stamped.
- **Tidy.** Puts everything loose back into the case-file arrangement. Framed cards stay where they are.
- **Keep it.** The desk saves to this browser and COPY DESK LINK gives a URL that rebuilds it exactly, for anyone. No account, no server, nothing stored anywhere but the link.
- **Click a card** to open the same reader pane, with the same verse text, the same highlighted phrase, the same stamp, and a link back to its case file.
- Undo with Ctrl-Z, delete with Delete, select all with Ctrl-A.

---

## The two rules it keeps

**1. Nothing on the desk is generated.** The search box is retrieval over the sources `build.py` already verified. A card arrives carrying the stamp it was built with and the note the card wrote. There is no model in this page, no API key, and nothing to leak. The seam for a future grounded answer is where you already planned it in `site/README.md` phase 3 — and if that ever lands, a generated card should be drawn as something that obviously is not a pinned source, or the stamp stops meaning anything.

**2. Families are derived, never hand-assigned.** `familyOf()` in `canvas.js` is a pure function from the tier string to one of thirteen families. Add a card and it files itself. There is no list to maintain and nothing to forget.

---

## The finding worth having either way

`tier` is doing two jobs. It names the kind of source, and it annotates that particular use of it. Both are worth keeping, but mixing them has a cost:

```
218 sources   120 distinct tier strings   13 families
```

Most tier strings occur exactly once. Anything that groups or filters by `tier` gets a hundred near-empty buckets, which is why the trays group by family instead.

`site/tier-families.py` prints what every existing tier maps to, so the grouping can be argued with before anything depends on it:

```
python site/tier-families.py            # the full report
python site/tier-families.py --check    # exit 1 if anything is unfiled
```

Current shape:

| Family | Sources | Distinct tiers |
|---|---|---|
| RED TEXT | 92 | 32 |
| THOMAS | 21 | 14 |
| EARLY CHURCH | 21 | 15 |
| PAUL | 16 | 5 |
| THE ARGUMENT | 14 | 14 |
| JOHN | 12 | 10 |
| DEAD SEA SCROLLS | 8 | 3 |
| JERUSALEM CHURCH | 8 | 6 |
| HEBREW BIBLE | 8 | 4 |
| THE MANUSCRIPTS | 7 | 7 |
| ACTS | 4 | 4 |
| SCHOLARSHIP | 4 | 3 |
| ETHIOPIAN CANON | 3 | 3 |

The sub-label is kept, not discarded. "red text · earliest gospel · Mark's aside" is RED TEXT with "earliest gospel · Mark's aside" intact, because that annotation is often the most interesting thing on the card.

THE ARGUMENT is the catch-all, and it earns its place: the charges, the controls, the concessions, the demoted cards. Those genuinely are not source types. If a better home exists for any of them, the report is where to see them all at once.

**If this grouping is right,** `family_of` moves into `build.py` and writes a `family` field beside `tier`. The Reading Room could then colour and filter by it. Until then, `canvas.js` and `tier-families.py` each carry a copy of the table and have to be kept in step — that duplication is a reason to adopt it, not a reason to like it.

---

## What was checked

A browser harness drives the real page in a real viewport: 39 assertions covering layout, snapping, frames, string, search, the share link, the reader, and a 390px phone. It found four genuine bugs, all fixed:

- **Column spacing was 2px out on every card.** `document.fonts.ready` resolved before the Google Fonts stylesheet had registered any face, so it promised nothing, and every card measured 2px taller than it ended up. The gate now waits for the sheet and then asks for the three faces by name, with a 3s fallback and a late-arrival reflow.
- **String could not be tied by dragging a pin.** A captured pointer retargets every event to the capturing element, so the drop target has to be found by coordinate, not by `event.target`.
- **Cards leaned twice.** `--tilt` inherits, so `.pincard` was rotating on top of `.node`.
- **Frames were invisible and ungrabbable** behind the cards. They now draw above, outline-only, with no fill and no pointer events, so they bound the evidence without covering it.

Two more were my test being wrong rather than the page: the question-card offset and framed cards are both meant to sit outside the tidied columns.

---

## Open questions for you

1. **Does this belong on the site at all,** or is it a side door that dilutes "pull a card, read the answer"? It costs one nav link to find out and one line to remove.
2. **The reader pane is duplicated.** `canvas.js` carries its own copy so `app.js` stays untouched. If the desk stays, the two should become one shared module, and that is a change to your file.
3. **Mobile.** The desk tells a phone to use the Reading Room instead. That seems right for an infinite canvas, but it is a judgment call.
4. **Should a desk be shareable into the repo** as a saved layout, the way a card is? The share link already encodes one completely, so a `desks/` folder of JSON would need no new machinery.
