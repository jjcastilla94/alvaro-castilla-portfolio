# Deployment

## Overview

The portfolio is a static site deployed on Vercel (Free tier), auto-deploying from the GitHub `main` branch. Production is live at **https://alvarocastilladev.vercel.app**. Automated quality checks (format, lint, typecheck, tests, build) run via GitHub Actions on every push and pull request to `main` (`.github/workflows/ci.yml`, Phase 9).

## Roadmap (current phase order)

| Phase | Focus                         | Status    |
| ----- | ----------------------------- | --------- |
| 6.6   | Technical Polish              | completed |
| 7     | Deployment (Vercel) + sitemap | completed |
| —     | Final audit + approved fixes  | completed |
| 8     | Testing (Vitest + Playwright) | completed |
| 9     | CI/CD (GitHub Actions)        | completed |
| 10    | SEO / Discoverability         | completed |
| 11    | Final Visual Polish           | completed |
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
   ↓   auto-deploy on push        ↓   every push/PR to main (Phase 9)
Build (Astro static)          Format + Lint + Typecheck + Tests + Build
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

GitHub Actions validation (format, lint, typecheck, unit tests, build, Playwright E2E) runs automatically on every push and pull request to `main` (Phase 9); Vercel builds on push independently — CI does not gate the deployment, it flags failures on the repository.

## Preview Deployments

Vercel automatically creates preview deployments for pull requests and non-main branches, so changes can be reviewed on a live URL before merging to production.

## Sitemap & robots.txt

- `@astrojs/sitemap` integration (configured in `astro.config.mjs` with `site: 'https://alvarocastilladev.vercel.app'`) generates at build time:
  - `/sitemap-index.xml` — sitemap index (canonical entry point)
  - `/sitemap-0.xml` — all 10 page URLs, each with a `<lastmod>` from the hand-maintained content dates in `src/data/pageDates.ts` (never the build clock — ADR-033)
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

Phase 7 completed (2026-10-07): production live, canonical URL wired everywhere, sitemap + robots.txt validated (10/10 URLs, 10/10 routes 200). Phases 8 and 9 completed the same day: automated test suite and GitHub Actions CI (`.github/workflows/ci.yml`) validating format, lint, typecheck, unit tests, build and E2E on every push/PR to `main`. Phase 10 (SEO / Discoverability) completed the same day: JSON-LD per route, unique build-time social image per page, h1→h2→h3 heading hierarchy and content-based sitemap `lastmod`. Phase 11 (Final Visual Polish) completed the same day: motion-token + focus-ring consolidation, wrapping/dark-light parity fixes (badges now pass AA in light mode) and the automated keyboard-focus and reduced-motion E2E specs (`focus.spec.ts`, `reduced-motion.spec.ts`; 84/84 E2E), with the Phase 10 SEO output byte-identical. Phase 12 (Final Audit) completed: the `ProjectStatus` badge over project-card screenshots now sits on an opaque `bg-surface` backing so it reaches AA in both themes, test counts in the docs were synced, and the remaining minor findings were documented (the SEO output stays identical to Phase 10).
