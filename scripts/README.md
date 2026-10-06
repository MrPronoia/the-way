# scripts/

Local tooling for The Way. Nothing here is required to read the repo — these
are optional research aids that run on your own machine.

---

## semantic-search.py — search the whole collection by meaning

Keyword search (`grep`, GitHub search) only finds the words you already
thought of. This finds passages by *concept*:

```
python scripts/semantic-search.py "what did Jesus say about the kingdom being within?"
```

...and returns the most relevant passages across `christianity/`,
`gnosticism/`, `debate/`, `podcast-archive/`, `jesus-site-reference/`,
`extended-library/`, and the root orientation docs — ranked, with
`file:line` citations so you can go read the source.

### Setup

```bash
pip install google-genai chromadb
```

Then set a Google AI API key (get one at https://aistudio.google.com/apikey):

```powershell
# PowerShell — current session
$env:GOOGLE_API_KEY = "your-key-here"

# PowerShell — persist for future sessions
setx GOOGLE_API_KEY "your-key-here"
```

```bash
# bash / git-bash
export GOOGLE_API_KEY="your-key-here"
```

The script exits immediately if `GOOGLE_API_KEY` is unset. Nothing else is
configured — no config file, no service to run.

Requires Python 3.12+. Dependencies are `google-genai` and `chromadb`;
everything else is stdlib.

### The three commands

**1. Build the index** (do this first, and again whenever content changes):

```bash
python scripts/semantic-search.py --rebuild
```

**2. Search:**

```bash
python scripts/semantic-search.py "blood atonement was not what Jesus taught"
python scripts/semantic-search.py "Ebionites and James" --top-k 10
python scripts/semantic-search.py "Nag Hammadi kingdom within" --full
```

| Flag | Effect |
|---|---|
| `--top-k N` | Number of results (default 5) |
| `--full` | Print the entire matched chunk instead of a 200-char excerpt — useful for live debate lookups where you need the actual quote, not a teaser |

**3. Inspect the index:**

```bash
python scripts/semantic-search.py --stats
```

Prints the collection size plus chunk and file counts per top-level folder.

### What gets indexed

Every `*.md` file in the repo, except:

- `.git/`, `.claude/`, `.vector-db/`, `.venv/`, `node_modules/`,
  `__pycache__/`, `scripts/`
- `*.es.md` — the 17 Spanish mirrors in `jesus-site-reference/` are skipped,
  since they would return a duplicate hit alongside every English result
- binaries and site assets (`.pdf`, `.html`, `.png`, `.svg`, ...)

Current scope: **257 markdown files, ~16 MB, ~11,900 chunks.**

| folder | chunks (approx) |
|---|---|
| `podcast-archive/` | 8,050 |
| `christianity/` | 3,235 |
| `gnosticism/` | 241 |
| `jesus-site-reference/` | 194 |
| `debate/` | 145 |
| root `*.md` | 55 |
| `extended-library/` | 17 |

### How chunking works

Files are split on `#`/`##`/`###` headers, one chunk per section, 2000 chars
max per chunk, no overlap. Sections longer than 2000 chars are **split into
sequential parts** (labelled `header (part 2/14)`), not truncated — the
podcast transcripts run 100-700 KB per file with sparse headers, so
truncating would discard most of the corpus. Current coverage is ~99.9% of
all source characters.

Each result reports the chunk's starting line number in the source file.

### Rebuild cost and timing

- **Cold rebuild:** ~11,900 chunks in ~120 batches of 100. On a paid/billed
  API key expect roughly **10-20 minutes**. On a free-tier key the per-minute
  token limit will trigger 429 backoff — the script waits and retries
  automatically (5 attempts per batch, honoring the server's suggested
  retry delay), but a cold build can stretch to **well over an hour**.
  Progress prints per batch with a running ETA.
- **Incremental rebuild:** tracked by MD5 content hash per file in
  `.vector-db/file_metadata.json`. Re-running `--rebuild` after editing a
  handful of files only re-embeds those files (seconds), deletes their stale
  chunks first, and drops chunks for files that were deleted.
- **Interrupted rebuild:** safe to Ctrl-C. Progress is checkpointed every 10
  batches, chunk IDs are deterministic, and writes use `upsert`, so re-running
  `--rebuild` resumes rather than duplicating. If any batch fails outright the
  script says so and that file is retried on the next run.
- If the API rejects a batch for size reasons, lower `BATCH_SIZE` near the top
  of the script.

Embedding model: `gemini-embedding-001` at 768 dimensions.

### `.vector-db/` is a local build artifact

The index is written to `.vector-db/` at the repo root and is **gitignored —
never committed**. It is derived data: anyone can regenerate it with
`--rebuild` using their own API key. Don't try to share it; if you move
machines, just rebuild.

To start completely over, delete `.vector-db/` and run `--rebuild` again.

### Privacy note

Running `--rebuild` sends the text of every indexed file to Google's
embedding API, and each search sends your query. Everything committed to this
repo is intended to be public, so that's fine here.

The one exception is handled explicitly: the repo-root `Incoming/` folder is
gitignored local-only staging ("stays on Rex's laptop, never pushed/made
public"), so it is listed in `SKIP_ROOT_DIRS` and is never walked. The tracked
primary-text folders — `christianity/Incoming/`, `gnosticism/Incoming/`,
`christianity/dead-sea-scrolls/Incoming/` — are *not* affected and are indexed
normally. If you add any other local-only material, add it to `SKIP_ROOT_DIRS`
before rebuilding.
