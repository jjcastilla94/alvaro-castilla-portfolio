# Architecture

## Overview

Personal portfolio for Álvaro Castilla, built as a static site with Astro.

## Tech Stack

- **Framework:** Astro (static site generation)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Linting:** ESLint + Prettier
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Deployment:** Vercel (auto-deploy from GitHub)

## Project Structure

```
alvaro-castilla-portfolio/
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── components/      # Astro components (UI, layout, sections)
│   ├── data/            # Professional data (profile, projects, experience)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── styles/          # Global CSS
│   └── utils/           # Utility functions
├── tests/               # Test files (unit + E2E)
├── docs/                # Project documentation
└── .github/workflows/   # CI/CD configuration
```

## Data Model

Professional content is separated from presentation in `src/data/`:

- `profile.ts` — Personal information, contact details
- `experience.ts` — Work experience
- `projects.ts` — Project details and case studies
- `skills.ts` — Technical skills
- `education.ts` — Educational background

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, featured projects, skills preview |
| `/about` | About — background, skills, evolution |
| `/experience` | Professional experience timeline |
| `/projects` | Project listing |
| `/projects/[slug]` | Individual project case studies |
| `/contact` | Contact information |
| `/privacy` | Privacy policy |

## Design System

- Dark mode as primary theme
- Light mode as secondary (toggle)
- Color tokens defined in CSS via Tailwind v4 `@theme`
- Typography: Inter (headings, body), JetBrains Mono (code)

## SEO

- Per-page `<title>` and meta description
- Open Graph and Twitter cards
- Canonical URLs
- JSON-LD structured data
- Sitemap via `@astrojs/sitemap`
- `robots.txt`

## Accessibility

- Semantic HTML
- Keyboard navigation
- Focus visible states
- WCAG contrast compliance
- `prefers-reduced-motion` support

## Responsive Strategy

Mobile-first breakpoints:

| Breakpoint | Target |
|------------|--------|
| < 640px | Mobile (375-430px) |
| 640-768px | Large mobile / small tablet |
| 768-1024px | Tablet |
| 1024-1280px | Desktop |
| 1280px+ | Large desktop |

## CI/CD

```
Push/PR → GitHub Actions → Lint + Typecheck + Tests + Build → Vercel → Production
```

## Deployment

- **Hosting:** Vercel Free
- **Production:** Auto-deploy from `main` branch
- **Preview:** Auto-deploy from PR branches
- **Domain:** alvarocastilla.vercel.app
