# HOW jesusactuallysaid.com IS BUILT

A technical reference for the architecture behind [jesusactuallysaid.com](https://jesusactuallysaid.com). Documented so future-Matt (or future-Rex, or any future collaborator) doesn't have to re-discover this. Also useful as a pattern to replicate for new sites.

**Audited & documented:** 2026-05-16

---

## TL;DR

The site is a **MkDocs Material project** (`jesus-site/`) that gets built and merged into the parent `mrpronoia.com` site as a subdirectory (`mrpronoia.com/jesus/`). Then a **Cloudflare Worker** (`jesus-proxy`) reverse-proxies `jesusactuallysaid.com/*` → `mrpronoia.com/jesus/*`, so users see the dedicated domain while the content actually lives on the parent site's GitHub Pages.

This pattern — "dedicated domain via Cloudflare Worker proxy" — is reusable. Could spin up `the-way.com` (or whatever) the same way: build content as a subsection of a parent site, proxy it via Cloudflare.

---

## The Three Pieces

### 1. The MkDocs Site (`source/`)

**What it is:** A standalone MkDocs project with the Material theme.

**Key files:**
- `mkdocs.yml` — site configuration
- `docs/` — 17 English pages + 17 Spanish translations + assets (CSS, JS, fonts)
- `overrides/main.html` — Material theme override (adds a "back" button)

**Configuration highlights** (from `mkdocs.yml`):
- Theme: **Material** (`mkdocs-material`)
- Internationalization: **`mkdocs-static-i18n`** plugin
  - English (default)
  - Spanish (full nav translations + page mirrors with `.es.md` suffix)
- Plugins: `pymdownx.details`, `pymdownx.superfences`, `admonition`, `toc`, `attr_list`
- Custom fonts: Special Elite, Courier Prime, JetBrains Mono (via Google Fonts CSS imports)
- Custom CSS: `docs/stylesheets/extra.css` (~14KB, dark/light theme handling)
- Custom JS:
  - `docs/javascripts/citations.js` — Scripture-reference auto-linker (links Bible refs to BibleGateway)
  - `docs/javascripts/mobile-menu.js` — mobile navigation enhancement

**The site is fully self-contained.** No imports from the parent mrpronoia.com theme. The content has ~94 hardcoded links to `mrpronoia.com/esoteric-knowledge/...` for deeper-research footnotes — those are content-level couplings, not build-time ones.

---

### 2. The Deploy Workflow (`deploy-workflow/deploy-site.yml`)

**What it is:** A GitHub Actions workflow that runs on every push to `main` of the `mr-pronoia` repo. Builds both the main mrpronoia.com site and the jesus-site, then merges them.

**The flow:**

```
push to main
    ↓
[install Python + mkdocs-material + mkdocs-static-i18n + google-genai]
    ↓
[restore embeddings cache, keyed on hash of esoteric-knowledge + extended-library]
    ↓
[copy esoteric-knowledge/ → docs/]
[run scripts/build-search-index.py]
[run scripts/build-embeddings.py with GOOGLE_API_KEY]
    ↓
[mkdocs build] → site/
[stash + restore API output files into site/api/]
    ↓
[cd jesus-site && mkdocs build] → site-jesus/
    ↓
[rsync site-jesus/en/* → site/jesus/]
[rsync site-jesus/es/* → site/es/jesus/]
    ↓
[upload site/ as Pages artifact]
[actions/deploy-pages → mrpronoia.com]
```

**Required secrets:**
- `GOOGLE_API_KEY` (for embeddings — main site only, jesus-site doesn't use this)

**Important:** This workflow is in the **mr-pronoia repo**, not in the-way. The copy here is a reference snapshot.

---

### 3. The Cloudflare Worker (`cloudflare-worker/`)

**What it is:** A reverse proxy. When someone hits `jesusactuallysaid.com/anything`, the Worker fetches the response from `mrpronoia.com/jesus/anything` and serves it back — rewriting URLs in transit so all the assets and internal links resolve correctly.

**Key files:**
- `worker.js` — the URL rewriting logic (~150 lines)
- `wrangler.toml` — Cloudflare deployment config (routes, account_id, name)

**How URL rewriting works:**

| User requests | Worker fetches | Why |
|---|---|---|
| `jesusactuallysaid.com/` | `mrpronoia.com/jesus/` | Map root to the jesus subsection |
| `jesusactuallysaid.com/the-rapture` | `mrpronoia.com/jesus/the-rapture` | Prefix all paths with `/jesus/` |
| `jesusactuallysaid.com/es/the-rapture` | `mrpronoia.com/es/jesus/the-rapture` | Spanish subtree |
| `jesusactuallysaid.com/api/chat` | `mrpronoia.com/api/chat` | API passes through to root (chatbot) |
| `jesusactuallysaid.com/javascripts/foo.js` | `mrpronoia.com/jesus/javascripts/foo.js` | Asset paths get `/jesus/` prefix |
| `jesusactuallysaid.com/stylesheets/extra.css` | `mrpronoia.com/jesus/stylesheets/extra.css` | Same |

**Deploy command** (from local machine):
```bash
cd workers/jesus-proxy
npx wrangler deploy
```

If wrangler isn't authenticated, it'll open a browser to log into Cloudflare.

**DNS side:** `jesusactuallysaid.com` is in Cloudflare. The Worker is bound to that zone via the routes in `wrangler.toml`. Cloudflare's nameservers + the Worker route do the magic — no GitHub-side DNS knows about `jesusactuallysaid.com`.

---

## The Domain Verification Step (One-Time)

Because `jesusactuallysaid.com` is served via Cloudflare, not directly via GitHub Pages, GitHub doesn't need to verify the domain. The verification we did during the org migration (`mrpronoia.com` TXT record) protects the *parent* domain — `jesusactuallysaid.com` is protected by being a Worker-served domain that never touches GitHub directly.

---

## Common Modifications

### Add a new page

1. Edit `source/docs/<new-page>.md` (English)
2. Edit `source/docs/<new-page>.es.md` (Spanish translation — required for i18n to work)
3. Update `mkdocs.yml` navigation in both `nav:` and the `i18n` plugin's `language` section
4. Push to mr-pronoia main → workflow rebuilds, deploys

### Change the theme/styling

- Site-wide CSS: `source/docs/stylesheets/extra.css`
- Theme override: `source/overrides/main.html`
- Fonts: edit the `@import` lines at top of `extra.css`

### Change the proxy behavior (URL rewriting)

- Edit `cloudflare-worker/worker.js`
- Re-deploy via `npx wrangler deploy` from `mr-pronoia/workers/jesus-proxy/`
- *Watch for:* the Spanish `/es/` path needs special handling — there's a known footgun where forgetting the Spanish routing rule causes 404s on Spanish pages.

---

## Replicating This Pattern for a New Site (e.g., `the-way.something.com`)

If you wanted to give `the-way` its own published site:

**Option A — Same pattern (build into parent, proxy via Worker):**
1. Add `the-way-site/` to mr-pronoia (or wherever the canonical content lives)
2. Update `deploy-site.yml` to build it into `site/the-way/`
3. Create a new Cloudflare Worker `the-way-proxy` that fetches `mrpronoia.com/the-way/*`
4. Add a new Cloudflare zone for the new domain
5. Wire the Worker to the zone

**Option B — Standalone site from this repo:**
1. Copy `source/` to a new top-level position (or use the existing repo's content directly)
2. Update `mkdocs.yml` (new `site_name`, `site_url`, nav)
3. Rewrite the ~94 cross-tradition links pointing to `mrpronoia.com/...`
4. Set up a fresh GitHub Action: install mkdocs deps + `actions/deploy-pages`
5. Add a `CNAME` file with your domain
6. Add domain verification at the org level
7. Configure DNS

**Trade-off:** Option A keeps everything under one parent site (single source of truth, single embedding index, single chatbot if you want one). Option B gives `the-way` full independence (own branding, own search, own deploy cadence) at the cost of duplicating infrastructure.

---

## Known Footguns

1. **Cloudflare account pinning.** If you have multiple Cloudflare accounts in your `wrangler` config, deploys can silently go to the wrong account. Always pin `account_id` in `wrangler.toml`.
2. **`wrangler secret put` env interference.** Some shell environment variables can leak into wrangler's prompts. Workaround: `env -i HOME=$HOME PATH=$PATH bash -c "npx wrangler secret put FOO"`.
3. **Spanish routing in the proxy.** Forgetting the `/es/` rewriting rule causes 404s on Spanish pages. The Worker has special handling for this — don't remove it during refactors.
4. **Asset path rewriting.** Mobile menu CSS once broke because the `/javascripts/` pass-through was missing in the Worker — caused 404s on `jesusactuallysaid.com` while `mrpronoia.com/jesus/` worked fine. The fix was adding asset prefixing in `worker.js`.
5. **GitHub Pages cache delays.** After pushing changes, GitHub Pages can take 1-5 minutes to actually serve them. Test with `?nocache=1` query strings if you suspect cache staleness.

---

## Cost

- **GitHub:** $0 for the static site (Pages is free on the Team plan we're on for private repos)
- **Cloudflare:** $0 for Workers up to 100,000 requests/day on the free tier
- **Domain:** ~$10/year for `jesusactuallysaid.com` (registered via Cloudflare Registrar)
- **Google Gemini API (embeddings):** ~$0/month (cached, only re-embeds changed chunks)

Total monthly: essentially $0.

---

## Maintenance

- The Worker is set-and-forget. Only redeploy if `worker.js` changes.
- The site auto-rebuilds on every push to `mr-pronoia/main`. No manual deploy needed.
- The embeddings cache means rebuilds are fast (~2 minutes) and cheap.
- Watch for: GitHub Pages settings can occasionally drop the custom domain after a repo transfer. We hit this during the May 2026 org migration — re-entered `mrpronoia.com` in Settings → Pages and it picked up immediately.

---

*If anything here turns out to be wrong or out of date, update it. This is reference material — its value depends on its accuracy.*
