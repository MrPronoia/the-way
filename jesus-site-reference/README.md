# jesus-site-reference

A snapshot of the source code that powers [jesusactuallysaid.com](https://jesusactuallysaid.com) — preserved here as architectural reference and as a starting point if `the-way` ever wants its own standalone published site.

---

## What's In Here

```
jesus-site-reference/
├── README.md                ← this file
├── HOW-ITS-BUILT.md         ← architecture explainer
├── source/                  ← MkDocs source for the public site
│   ├── mkdocs.yml           ← site config (i18n EN + ES, Material theme, plugins)
│   ├── docs/                ← 17 English pages + 17 Spanish translations + assets
│   └── overrides/           ← Material theme overrides (back button, etc.)
├── cloudflare-worker/       ← The reverse proxy that serves jesusactuallysaid.com
│   ├── worker.js            ← URL rewriting from jesusactuallysaid.com → mrpronoia.com/jesus
│   └── wrangler.toml        ← deployment config
└── deploy-workflow/
    └── deploy-site.yml      ← GitHub Action that builds + publishes to mrpronoia.com
```

---

## Important Context

**This is a SNAPSHOT, not the live source.**

The actively-published site is built from `mr-pronoia/jesus-site/` on every push to `mr-pronoia`'s main branch. That deploy workflow:

1. Builds the main mrpronoia.com site from `docs/` + `esoteric-knowledge/` + `extended-library/`
2. Builds `jesus-site/` separately into `site-jesus/`
3. Rsyncs `site-jesus/` into `site/jesus/` and `site/es/jesus/`
4. Deploys the merged `site/` to GitHub Pages → `mrpronoia.com`
5. Cloudflare Worker `jesus-proxy` then serves `jesusactuallysaid.com/*` by fetching from `mrpronoia.com/jesus/*`

This snapshot here is **not wired into any deploy pipeline.** Changes here won't propagate to the live site. If you need to edit the live site, edit `mr-pronoia/jesus-site/` and push to that repo.

---

## Why It's Here

Two reasons:

1. **Reference & notes.** Documenting how the site is structured so future-Matt (or future-Rex, or future-collaborator) can replicate this pattern for a new section, or simply understand the existing one. See `HOW-ITS-BUILT.md`.

2. **Optional future standalone deployment.** If `the-way` ever wants its own public site (e.g., `theway.something.com`), this snapshot is a starting point. ~94 hardcoded links to `mrpronoia.com/...` would need to be rewritten or removed, and a separate deploy pipeline set up — but the content + theme + config is all here.

---

## If You Want to Deploy a Standalone Site From This

High-level steps (~2-3 hours):

1. Move `source/` contents up one level into a new repo (or `the-way/` root, if you want the website *to be* the-way's primary surface)
2. Update `mkdocs.yml` — change `site_name`, `site_url`, navigation
3. Audit + rewrite the ~94 cross-tradition links pointing to `mrpronoia.com/esoteric-knowledge/...` (use grep: `grep -r "mrpronoia.com" .`)
4. Either point them to in-repo equivalents (if you import the cross-tradition content from `cross-traditions/`) or remove the deeper-research footnotes entirely
5. Set up a GitHub Action workflow with `mkdocs-material` + `mkdocs-static-i18n` and the `actions/deploy-pages` action
6. Add a `CNAME` file with your domain
7. Configure DNS at your registrar
8. Verify the org-level domain on GitHub

This is fully documented in `HOW-ITS-BUILT.md`.

---

## What's NOT Standalone-Ready Without Work

- **Chatbot API.** The live site has a chatbot at `/api/chat`. That's a Cloudflare Worker on `mr-pronoia`'s deploy — not included here. If `the-way` wanted a chatbot, you'd need to set up a new Worker pointing at a new knowledge base.
- **Embeddings.** The main mrpronoia.com build uses Gemini embeddings (cached) for semantic search. That requires `GOOGLE_API_KEY` and the `scripts/build-embeddings.py` workflow — also not included here. The standalone `jesus-site` build does NOT use embeddings, so this only matters if you want the chatbot.
- **The 94 cross-tradition links.** These are content-level couplings to `mrpronoia.com/esoteric-knowledge/...` — they'll all 404 on a standalone deploy until rewritten.

---

## See Also

- `HOW-ITS-BUILT.md` — the architecture explainer (read this if you want to understand or replicate the setup)
- `../PROVENANCE.md` — assembly story for this whole repo
- `mr-pronoia/jesus-site/` — the actual live source (separate repo)
