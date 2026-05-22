#!/usr/bin/env python3
"""
Structural audit of all dr-tabor/*.md files. Reports issues per file.
Checks: H1 + header block, required H2 sections, cross-link validity,
transcript present at bottom, date format, slug truncation.
"""
import os
import re
import json
import sys

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(OUT_DIR, "..", ".."))

REQUIRED_HEADER_FIELDS = ["Speaker:", "Source:", "Published:", "Duration:", "Playlist:"]
REQUIRED_H2 = [
    "## Summary",
    "## Key Teachings",
    "## Scripture Citations",
    "## Historical Sources & Scholars Cited",
    "## Quotable Moments",
    "## Connection to Other Research",
    "## Books & Resources Mentioned",
    "## Full Transcript",
]
OPTIONAL_H2 = ["## Misconceptions Addressed"]


def check_file(path):
    issues = []
    name = os.path.basename(path)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    lines = content.split("\n")

    # H1 present?
    if not lines or not lines[0].startswith("# "):
        issues.append("missing H1")
    else:
        title = lines[0][2:].strip()
        if not title:
            issues.append("empty H1")

    # Header block fields
    head_block = "\n".join(lines[:15])
    for field in REQUIRED_HEADER_FIELDS:
        if field not in head_block:
            issues.append(f"missing header field: {field}")

    # Date format check — "Published: Month Day, Year" expected
    pub_match = re.search(r"\*\*Published:\*\*\s+(.+)", head_block)
    if pub_match:
        pub_val = pub_match.group(1).strip()
        # Accept "January 30, 2023" or "2023-01-30" or other reasonable forms
        if re.match(r"^\d{4}-\d{2}-\d{2}$", pub_val):
            issues.append(f"unconverted date: {pub_val}")
        elif not re.match(r"^[A-Z][a-z]+ \d{1,2},? \d{4}$", pub_val) and pub_val:
            # not a fatal issue but flag it
            if not re.match(r"^[A-Z][a-z]+ \d{4}$", pub_val):  # accept "March 2022"
                issues.append(f"unusual date format: {pub_val}")

    # Playlist line
    if "**Playlist:** Paul (#" not in head_block:
        issues.append("missing or wrong playlist line")

    # Required H2 sections — allow legitimate variants
    # File size heuristic: ultra-short videos (<10K total) may skip optional sections
    file_size = len(content)
    for h2 in REQUIRED_H2:
        if h2 not in content:
            # Check for known legitimate variants
            if h2 == "## Scripture Citations" and "## Scripture & Scroll Citations" in content:
                continue
            # Ultra-short videos (2-3 min) may skip Scripture Citations / Historical Sources
            if file_size < 10000 and h2 in ("## Scripture Citations", "## Historical Sources & Scholars Cited"):
                continue
            issues.append(f"missing section: {h2}")

    # Slug check — H1 should not end mid-word (no trailing alnum cut-off)
    # also filename slug check
    slug = name[:-3]  # strip .md
    # If slug ends with a partial-looking word like "...meanin" (no full ending), flag
    # Heuristic: short stub at end like "meanin" "rel" "and" might be cut
    parts = slug.split("-")
    if parts:
        last = parts[-1]
        suspicious_stubs = {"meanin", "rel", "phenomen", "incomprehensib", "resurrectio", "theori",
                            "rejecte", "apo", "transformat", "interpretat"}
        if last in suspicious_stubs:
            issues.append(f"truncated slug stub: -{last}")

    # Transcript present? Check that file has at least one very long line
    # (the transcript is joined into one paragraph, typically 1500+ chars)
    max_line_len = max((len(l) for l in lines), default=0)
    if max_line_len < 1500:
        # Short videos may legitimately have short transcripts (2-min clips ~1K chars)
        # Only flag if total file is "synthesis only" (no transcript appended at all)
        file_size = len(content)
        if file_size < 5000:
            issues.append(f"file very short ({file_size} chars) — verify transcript present")
        elif max_line_len < 800:
            issues.append(f"transcript may be missing (max line {max_line_len} chars)")

    # Cross-link validity
    links = re.findall(r"`([a-z][a-zA-Z0-9/_.-]+\.md)`", content)
    for link in set(links):
        # links are relative to repo root
        full = os.path.join(REPO_ROOT, link.replace("/", os.sep))
        if not os.path.exists(full):
            # Also check if it's a same-folder dr-tabor file
            same_folder = os.path.join(OUT_DIR, os.path.basename(link))
            if not os.path.exists(same_folder):
                issues.append(f"broken cross-link: {link}")

    return issues


def main():
    files = sorted([f for f in os.listdir(OUT_DIR) if f.endswith(".md")])
    report = {}
    total_issues = 0
    for f in files:
        path = os.path.join(OUT_DIR, f)
        issues = check_file(path)
        if issues:
            report[f] = issues
            total_issues += len(issues)

    print(f"\n=== AUDIT SUMMARY ===")
    print(f"Files checked: {len(files)}")
    print(f"Files with issues: {len(report)}")
    print(f"Total issue count: {total_issues}")
    print()
    if report:
        for f, issues in report.items():
            print(f"\n{f}:")
            for issue in issues:
                print(f"  - {issue}")

    return report


if __name__ == "__main__":
    main()
