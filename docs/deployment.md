# Deployment

## Overview

The portfolio is a static site deployed on Vercel (Free tier), auto-deploying from the GitHub `main` branch. Production is live at **https://alvarocastilladev.vercel.app**. Automated quality checks via GitHub Actions are **planned (Phase 9)** — not yet configured.

## Roadmap (current phase order)

| Phase | Focus                         | Status    |
| ----- | ----------------------------- | --------- |
| 6.6   | Technical Polish              | completed |
| 7     | Deployment (Vercel) + sitemap | completed |
| —     | Final audit + approved fixes  | completed |
| 8     | Testing (Vitest + Playwright) | planned   |
| 9     | CI/CD (GitHub Actions)        | planned   |
| 10    | SEO / Discoverability         | planned   |
| 11    | Final Visual Polish           | planned   |
| 12    | Final Audit                   | planned   |

## Architecture

```
Developer
   ↓
Git (local)
   ↓
GitHub (remote)  — repo: jjcastilla94/alvaro-castilla-portfolio (main)
   ↓
Vercel (CD)                      GitHub Actions (CI)
   ↓   auto-deploy on push        ↓   (Phase 9, planned)
Build (Astro static)          Lint + Typecheck + Tests + Build
   ↓
Production
https://alvarocastilladev.vercel.app
```

## Hosting

- **Provider:** Vercel
- **Tier:** Free
- **Production domain:** https://alvarocastilladev.vercel.app (live)
- **Custom domain:** none — the free `*.vercel.app` domain is the canonical URL. No domain purchase is planned; revisit only if the user acquires one.

> `alvarocastilla.vercel.app` is **not** part of this project (unrelated deployment). It must never be used as the site URL in code, configuration, or documentation.

## Deployment Flow

1. Code is pushed to GitHub (`main`)
2. Vercel detects the push and auto-deploys:
   - `main` branch → production
   - PR/other branches → preview deployment
3. Build: Astro static output (`npm run build`), no server functions, no environment variables
4. No manual deployment steps required

GitHub Actions validation (lint, typecheck, tests, build) is planned for Phase 9 and will run before merges; Vercel keeps building on push until then.

## Preview Deployments

Vercel automatically creates preview deployments for pull requests and non-main branches, so changes can be reviewed on a live URL before merging to production.

## Sitemap & robots.txt

- `@astrojs/sitemap` integration (configured in `astro.config.mjs` with `site: 'https://alvarocastilladev.vercel.app'`) generates at build time:
  - `/sitemap-index.xml` — sitemap index (canonical entry point)
  - `/sitemap-0.xml` — all 10 page URLs
- `public/robots.txt` allows all crawlers and declares `Sitemap: https://alvarocastilladev.vercel.app/sitemap-index.xml`
- A single `/sitemap.xml` is **not** produced (`@astrojs/sitemap` does not support it); no custom endpoint or Vercel rewrite is configured (ADR-030).

## Environment Variables

No environment variables are currently required.

If added in the future, they should be configured in:

- Vercel dashboard (for production/preview)
- `.env.local` (for local development, gitignored)

## HTTPS

Enabled by default on Vercel.

## Custom Domain

Not configured and not planned. The free `*.vercel.app` domain covers canonical/OG/sitemap URLs. If a custom domain is ever purchased:

1. Add the domain in the Vercel dashboard
2. Configure DNS records
3. Vercel handles the SSL certificate automatically
4. Update `SITE.url` (`src/data/site.ts`), `site` (`astro.config.mjs`) and the `Sitemap:` line in `public/robots.txt` in the same change

## Status

Phase 7 completed (2026-10-07): production live, canonical URL wired everywhere, sitemap + robots.txt validated (10/10 URLs, 10/10 routes 200). Next: Phase 8 (testing), then Phase 9 (GitHub Actions CI).
