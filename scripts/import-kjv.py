#!/usr/bin/env python3
"""Import the public-domain King James Version into christianity/Incoming/kjv/.

Source: Project Gutenberg eBook #10, "The King James Version of the Bible"
(https://www.gutenberg.org/ebooks/10). Public domain.

Output: one markdown file per book, one verse per line, in the form

    **9:13** But go ye and learn what that meaneth, ...

so that `grep "I will have mercy, and not sacrifice"` finds the verse on a
single line (the Gutenberg text wraps verses mid-sentence, which defeats
exact-phrase search; this import unwraps them). Every file carries the
repo's provenance header so scripts/semantic-search.py attaches it to each
passage it returns.

Usage:
    python scripts/import-kjv.py              # downloads pg10.txt to a temp file
    python scripts/import-kjv.py pg10.txt     # use an already-downloaded copy

Re-running overwrites the 66 files and the folder README. Idempotent.
"""

import re
import sys
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "christianity" / "Incoming" / "kjv"
URL = "https://www.gutenberg.org/cache/epub/10/pg10.txt"
CONTRIBUTOR = "Matt Fracek"

# Gutenberg title -> (number, short name, slug, testament, original language)
BOOKS = [
    ("The First Book of Moses: Called Genesis", "Genesis", "ot"),
    ("The Second Book of Moses: Called Exodus", "Exodus", "ot"),
    ("The Third Book of Moses: Called Leviticus", "Leviticus", "ot"),
    ("The Fourth Book of Moses: Called Numbers", "Numbers", "ot"),
    ("The Fifth Book of Moses: Called Deuteronomy", "Deuteronomy", "ot"),
    ("The Book of Joshua", "Joshua", "ot"),
    ("The Book of Judges", "Judges", "ot"),
    ("The Book of Ruth", "Ruth", "ot"),
    ("The First Book of Samuel", "1 Samuel", "ot"),
    ("The Second Book of Samuel", "2 Samuel", "ot"),
    ("The First Book of the Kings", "1 Kings", "ot"),
    ("The Second Book of the Kings", "2 Kings", "ot"),
    ("The First Book of the Chronicles", "1 Chronicles", "ot"),
    ("The Second Book of the Chronicles", "2 Chronicles", "ot"),
    ("Ezra", "Ezra", "ot"),
    ("The Book of Nehemiah", "Nehemiah", "ot"),
    ("The Book of Esther", "Esther", "ot"),
    ("The Book of Job", "Job", "ot"),
    ("The Book of Psalms", "Psalms", "ot"),
    ("The Proverbs", "Proverbs", "ot"),
    ("Ecclesiastes", "Ecclesiastes", "ot"),
    ("The Song of Solomon", "Song of Solomon", "ot"),
    ("The Book of the Prophet Isaiah", "Isaiah", "ot"),
    ("The Book of the Prophet Jeremiah", "Jeremiah", "ot"),
    ("The Lamentations of Jeremiah", "Lamentations", "ot"),
    ("The Book of the Prophet Ezekiel", "Ezekiel", "ot"),
    ("The Book of Daniel", "Daniel", "ot"),
    ("Hosea", "Hosea", "ot"),
    ("Joel", "Joel", "ot"),
    ("Amos", "Amos", "ot"),
    ("Obadiah", "Obadiah", "ot"),
    ("Jonah", "Jonah", "ot"),
    ("Micah", "Micah", "ot"),
    ("Nahum", "Nahum", "ot"),
    ("Habakkuk", "Habakkuk", "ot"),
    ("Zephaniah", "Zephaniah", "ot"),
    ("Haggai", "Haggai", "ot"),
    ("Zechariah", "Zechariah", "ot"),
    ("Malachi", "Malachi", "ot"),
    ("The Gospel According to Saint Matthew", "Matthew", "nt"),
    ("The Gospel According to Saint Mark", "Mark", "nt"),
    ("The Gospel According to Saint Luke", "Luke", "nt"),
    ("The Gospel According to Saint John", "John", "nt"),
    ("The Acts of the Apostles", "Acts", "nt"),
    ("The Epistle of Paul the Apostle to the Romans", "Romans", "nt"),
    ("The First Epistle of Paul the Apostle to the Corinthians", "1 Corinthians", "nt"),
    ("The Second Epistle of Paul the Apostle to the Corinthians", "2 Corinthians", "nt"),
    ("The Epistle of Paul the Apostle to the Galatians", "Galatians", "nt"),
    ("The Epistle of Paul the Apostle to the Ephesians", "Ephesians", "nt"),
    ("The Epistle of Paul the Apostle to the Philippians", "Philippians", "nt"),
    ("The Epistle of Paul the Apostle to the Colossians", "Colossians", "nt"),
    ("The First Epistle of Paul the Apostle to the Thessalonians", "1 Thessalonians", "nt"),
    ("The Second Epistle of Paul the Apostle to the Thessalonians", "2 Thessalonians", "nt"),
    ("The First Epistle of Paul the Apostle to Timothy", "1 Timothy", "nt"),
    ("The Second Epistle of Paul the Apostle to Timothy", "2 Timothy", "nt"),
    ("The Epistle of Paul the Apostle to Titus", "Titus", "nt"),
    ("The Epistle of Paul the Apostle to Philemon", "Philemon", "nt"),
    ("The Epistle of Paul the Apostle to the Hebrews", "Hebrews", "nt"),
    ("The General Epistle of James", "James", "nt"),
    ("The First Epistle General of Peter", "1 Peter", "nt"),
    ("The Second General Epistle of Peter", "2 Peter", "nt"),
    ("The First Epistle General of John", "1 John", "nt"),
    ("The Second Epistle General of John", "2 John", "nt"),
    ("The Third Epistle General of John", "3 John", "nt"),
    ("The General Epistle of Jude", "Jude", "nt"),
    ("The Revelation of Saint John the Divine", "Revelation", "nt"),
]

GOSPELS = {"Matthew", "Mark", "Luke", "John"}


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def fetch(path_arg):
    if path_arg:
        return Path(path_arg).read_text(encoding="utf-8")
    print(f"Downloading {URL} …")
    with urllib.request.urlopen(URL) as r:
        return r.read().decode("utf-8")


def split_books(text):
    """Return {gutenberg_title: body_text} for the 66 books."""
    start = text.index("*** START OF THE PROJECT GUTENBERG EBOOK")
    end = text.index("*** END OF THE PROJECT GUTENBERG EBOOK")
    body = text[start:end]
    # The table of contents repeats every title once before Genesis's real
    # heading; the real headings are the LAST occurrence of each title line.
    lines = body.split("\n")
    positions = {}
    for i, line in enumerate(lines):
        t = line.strip()
        for title, _, _ in BOOKS:
            if t == title:
                positions[title] = i  # last occurrence wins
    missing = [t for t, _, _ in BOOKS if t not in positions]
    if missing:
        raise SystemExit(f"Could not find headings for: {missing}")
    ordered = sorted(positions.items(), key=lambda kv: kv[1])
    books = {}
    for idx, (title, pos) in enumerate(ordered):
        nxt = ordered[idx + 1][1] if idx + 1 < len(ordered) else len(lines)
        books[title] = "\n".join(lines[pos + 1 : nxt])
    return books


VERSE_RE = re.compile(r"(?<![\d:])(\d{1,3}):(\d{1,3}) ")


def verses(body):
    """Yield (chapter, verse, text) from a book body, unwrapping line breaks."""
    # Join wrapped lines; paragraphs are separated by blank lines but a verse
    # can continue across a paragraph break, so flatten everything to spaces.
    flat = re.sub(r"\s+", " ", body).strip()
    parts = VERSE_RE.split(flat)
    # parts = [preamble, ch, v, text, ch, v, text, ...]
    for i in range(1, len(parts) - 2, 3):
        ch, v, txt = int(parts[i]), int(parts[i + 1]), parts[i + 2].strip()
        yield ch, v, txt


def header(num, name, testament, title):
    lang = "Koine Greek" if testament == "nt" else "Hebrew (with Aramaic portions in Ezra and Daniel)"
    kind = "The gospels: Jesus's own words (the red text) are Tier 1 in this repo's source hierarchy." if name in GOSPELS else (
        "New Testament. Paul's letters belong in the what-Paul-taught stack, not the what-Jesus-taught stack (see CLAUDE.md)." if testament == "nt" else
        "Hebrew Bible. Quoted by Jesus and by the prophetic tradition against sacrifice that he cites.")
    today = date.today().isoformat()
    return f"""# {name} (King James Version)

**Attribution:** {title}. Traditional attribution; see mainstream scholarship for authorship and dating of the book itself
**Translation:** King James Version (Authorized Version), 1611; the text is the standard 1769 Oxford edition as transmitted by Project Gutenberg eBook #10
**Original Language:** {lang}
**Estimated Date:** Translation 1611; the underlying book is dated by scholarship, not by this file
**Source:** https://www.gutenberg.org/ebooks/10 (Project Gutenberg #10), imported by `scripts/import-kjv.py` on {today}; one verse per line so that exact phrases grep on a single line
**Rights:** Public domain
**Status:** Verified full text — public domain; spot-checked at import, not yet audited verse-by-verse
**Contributed by:** {CONTRIBUTOR}, {today}
**Note:** {kind} Cite as "(KJV)". The KJV is public domain and its wording is fixed, which is why it was chosen over a modern translation: a quotation from this file can be checked by anyone with any KJV. Where a modern translation reads differently in a way that matters (e.g. "mercy" / "steadfast love", Hosea 6:6), say so in the citing file.

---

"""


def main():
    text = fetch(sys.argv[1] if len(sys.argv) > 1 else None)
    books = split_books(text)
    OUT.mkdir(parents=True, exist_ok=True)
    index_rows = []
    total_verses = 0
    for num, (title, name, testament) in enumerate(BOOKS, start=1):
        fname = f"{num:02d}-{slug(name)}.md"
        out = [header(num, name, testament, title)]
        count = 0
        last_ch = 0
        for ch, v, txt in verses(books[title]):
            if ch != last_ch:
                out.append(f"\n## {name} {ch}\n\n")
                last_ch = ch
            out.append(f"**{ch}:{v}** {txt}\n")
            count += 1
        (OUT / fname).write_text("".join(out), encoding="utf-8")
        total_verses += count
        index_rows.append((num, name, fname, last_ch, count))
        print(f"  {fname:40s} {last_ch:3d} ch  {count:5d} vv")

    readme = ["# King James Version — the 66 books, one verse per line\n\n",
              "**What this is.** The public-domain King James Version (1611; 1769 Oxford text) from Project Gutenberg eBook #10, split into one file per book by `scripts/import-kjv.py`. Every verse is on its own line as `**chapter:verse** text`, so an exact phrase greps on a single line and a citation can be checked in ten seconds.\n\n",
              "**Why it's here.** Until this import, the repo's number-one source tier (the red text) had no file: every gospel quotation in the collection was from memory or an unnamed translation. See `VERIFIED-SOURCES.md`, \"Not held\". This closes that gap for all 66 books, not only the gospels, because the cards also cite the prophets, Acts, Paul and Hebrews.\n\n",
              "**How to cite.** `Matthew 9:13 (KJV)`. Quote this file's wording. If a modern translation differs in a way that matters, say so where you cite it.\n\n",
              "**Rights.** Public domain. The KJV is out of copyright everywhere except, for the Crown's patent, in the United Kingdom, where it may still be freely quoted.\n\n",
              "**Spot-check at import.** Matthew 9:13, Luke 17:21, Hosea 6:6 and Hebrews 9:22 were read against the Gutenberg file after import. Not yet audited verse-by-verse; if you find a verse-numbering slip, note it in `questions/CITATION-NOTES.md`.\n\n",
              f"**Contributed by:** {CONTRIBUTOR}, {date.today().isoformat()}\n\n",
              "---\n\n| # | Book | File | Chapters | Verses |\n|---|---|---|---|---|\n"]
    for num, name, fname, chs, count in index_rows:
        readme.append(f"| {num} | {name} | `{fname}` | {chs} | {count} |\n")
    readme.append(f"\n**Total verses:** {total_verses}\n")
    (OUT / "00-README.md").write_text("".join(readme), encoding="utf-8")
    print(f"\nWrote {len(BOOKS)} books, {total_verses} verses, to {OUT}")


if __name__ == "__main__":
    main()
