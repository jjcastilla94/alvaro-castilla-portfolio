# Deployment

## Overview

The portfolio is deployed as a static site using Vercel, with automated quality checks via GitHub Actions.

## Architecture

```
Developer
   ↓
Git (local)
   ↓
GitHub (remote)
   ↓
GitHub Actions (CI)         Vercel (CD)
   ↓                          ↓
Lint                       Auto-detect
Typecheck                  Build
Tests                      Preview/Production
Build check
   ↓                          ↓
PASS / FAIL                alvarocastilla.vercel.app
```

## Hosting

- **Provider:** Vercel
- **Tier:** Free
- **Domain:** alvarocastilla.vercel.app
- **Future domain:** alvarocastilla.dev (not yet purchased)

## Deployment Flow

1. Code is pushed to GitHub
2. GitHub Actions validates lint, typecheck, tests, and build
3. Vercel auto-deploys:
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

Deployment infrastructure is not yet configured. Vercel connection will be set up in Phase 8.
