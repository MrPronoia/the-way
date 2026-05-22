#!/usr/bin/env python3
"""
Append the raw transcript text to synthesized .md files. For each .md file
that ends with the "Auto-generated transcript..." disclaimer line (no actual
transcript text yet), find the matching .raw.md, extract the transcript (the
longest line in the .raw.md), append it, then delete the .raw.md.
"""
import os
import re

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DIR = os.path.join(OUT_DIR, ".raw")
DISCLAIMER_PREFIX = "*Auto-generated"  # match any auto-gen disclaimer variant


def extract_transcript(raw_path):
    """Get the longest line of the raw .md file (which is the transcript paragraph)."""
    longest = ""
    with open(raw_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.rstrip("\n")
            if len(line) > len(longest):
                longest = line
    return longest


def file_needs_transcript(md_path):
    """True if file ends with the disclaimer but no transcript yet."""
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    # Get last non-empty line
    lines = [l.rstrip() for l in content.split("\n") if l.strip()]
    if not lines:
        return False
    last_line = lines[-1].strip()
    # If last meaningful line is the disclaimer, transcript is missing
    if last_line.startswith(DISCLAIMER_PREFIX):
        return True
    return False


def find_raw_for_index(idx):
    if not os.path.isdir(RAW_DIR):
        return None
    for entry in os.listdir(RAW_DIR):
        if entry.startswith(f"{idx:02d}-") and entry.endswith(".raw.md"):
            return os.path.join(RAW_DIR, entry)
    return None


def main():
    for entry in sorted(os.listdir(OUT_DIR)):
        if not entry.endswith(".md") or entry == "transcript-index.json":
            continue
        m = re.match(r"^(\d+)-", entry)
        if not m:
            continue
        idx = int(m.group(1))
        md_path = os.path.join(OUT_DIR, entry)
        if not file_needs_transcript(md_path):
            continue
        raw_path = find_raw_for_index(idx)
        if not raw_path:
            print(f"[err]  {entry} - no matching .raw file found")
            continue
        transcript = extract_transcript(raw_path)
        if not transcript or len(transcript) < 200:
            print(f"[err]  {entry} - transcript looks empty ({len(transcript)} chars)")
            continue
        with open(md_path, "a", encoding="utf-8") as f:
            f.write("\n" + transcript + "\n")
        os.remove(raw_path)
        print(f"[ok]   {entry} - appended {len(transcript)} chars, deleted raw")


if __name__ == "__main__":
    main()
