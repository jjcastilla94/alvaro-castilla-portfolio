# Deployment

## Overview

The portfolio is built as a static site and will be deployed on Vercel. Automated quality checks via GitHub Actions are **planned (Phase 9)** — not yet configured.

## Roadmap (current phase order)

| Phase | Focus                         | Status      |
| ----- | ----------------------------- | ----------- |
| 6.6   | Technical Polish              | in progress |
| 7     | Deployment (Vercel + domain)  | planned     |
| 8     | Testing (Vitest + Playwright) | planned     |
| 9     | CI/CD (GitHub Actions)        | planned     |
| 10    | SEO / Discoverability         | planned     |
| 11    | Final Visual Polish           | planned     |
| 12    | Final Audit                   | planned     |

## Architecture (target state)

```
Developer
   ↓
Git (local)
   ↓
GitHub (remote)
   ↓
GitHub Actions (CI)          Vercel (CD)
   ↓      (Phase 9, planned)    ↓   (Phase 7, planned)
Lint                       Auto-detect
Typecheck                  Build
Tests (Phase 8)            Preview/Production
Build check
   ↓                          ↓
PASS / FAIL                alvarocastilla.vercel.app
```

## Hosting

- **Provider:** Vercel (planned — Phase 7)
- **Tier:** Free
- **Domain:** alvarocastilla.vercel.app (planned)
- **Future domain:** alvarocastilla.dev (not yet purchased)

## Deployment Flow (target state)

1. Code is pushed to GitHub
2. GitHub Actions validates lint, typecheck, tests, and build _(planned, Phase 9)_
3. Vercel auto-deploys _(planned, Phase 7)_:
   - `main` branch → production
   - PR branches → preview deployment
4. No manual deployment steps required

## Preview Deployments

Vercel automatically creates preview deployments for:

- Pull requests
- Non-main branches

This allows reviewing changes before merging to production.

## Environment Variables

No environment variables are currently required.

If added in the future, they should be configured in:

- Vercel dashboard (for production/preview)
- `.env.local` (for local development, gitignored)

## HTTPS

Enabled by default on Vercel.

## Custom Domain

Not configured yet. When ready:

1. Purchase domain (alvarocastilla.dev)
2. Add domain in Vercel dashboard
3. Configure DNS records
4. Vercel handles SSL certificate automatically

## Status

Deployment infrastructure is not yet configured. Vercel connection is the next phase after Technical Polish (Phase 7). GitHub Actions CI comes after tests exist (Phase 9).
