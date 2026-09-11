# alvaro-castilla-portfolio

Personal portfolio for Álvaro Castilla (Backend Developer), showcasing his professional experience, projects and technical skills. Built as a static site with Astro and TypeScript.

## Tech Stack

- **Framework:** Astro (static site generation)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Linting:** ESLint + Prettier
- **Testing:** Vitest + Playwright (introduced in Phase 7)
- **Deployment:** Vercel (auto-deploy from GitHub)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero with code card, About, experience, featured projects, architecture, skills by level, "Lo que construyo", contact |
| `/experience` | Professional experience timeline with animated entries |
| `/projects` | Project listing with full-width cards |
| `/projects/[slug]` | Individual project case studies with visual preview |
| `/contact` | Contact information (email, GitHub, LinkedIn) |

## Project Structure

```
alvaro-castilla-portfolio/
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── components/
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Hero (code card + CTAs), About, Architecture (diagram)
│   │   ├── seo/         # HeadSEO
│   │   └── ui/          # Button, Card, Reveal, Tag, SectionHeading,
│   │                    # SocialLink, ThemeToggle, ProjectCard, Breadcrumbs, ServiceCard
│   ├── data/            # Centralized content (profile, projects, experience, skills, site, about, services, projectStyles)
│   ├── layouts/         # BaseLayout (scroll progress, stats, reveals)
│   ├── pages/           # Route pages
│   ├── styles/          # Global CSS + design tokens + motion system
│   └── utils/           # Utility functions
├── tests/               # Test files (unit + E2E)
├── docs/                # Project documentation
└── .github/workflows/   # CI/CD configuration
```

## Content Management

All of the site's content lives in `src/data/` — no personal strings are hardcoded in components:

- `public/` — Static assets: favicon, `robots.txt`, `og-image.png`, `cv/alvaro-castilla-cv.pdf`
- `site.ts` — Site-wide constants: URL, name, OG image, locale, navigation links (including Inicio)
- `profile.ts` — Name, role, bio, email, social links, CV URL (`cvUrl` + `hasCv()`), stats
- `experience.ts` — Work experience entries (typed)
- `projects.ts` — Project list with color field, optional `longDescription`, `image`, `gallery`, `problem`, `contribution`, `learnings`, `status`, `featured`, and `github` URLs
- `skills.ts` — Skills grouped by level (core / working / exposure)
- `about.ts` — About section content (intro, approach, interests)
- `services.ts` — `CAPABILITIES` (the "Lo que construyo" section)
- `certifications.ts` — Empty until real data is provided
- `projectStyles.ts` — Per-color gradients/patterns for project visuals
- `utils/dates.ts` — Date formatting helpers

To add a new project, add an entry to `src/data/projects.ts` — the listing and detail pages update automatically.

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (foreground)
npm run build      # production build
npm run preview    # preview production build
npm run lint       # ESLint
npm run typecheck  # TypeScript + Astro check
npm run format     # Prettier format
```

To run the dev server in the background (recommended while working on multiple things):

```bash
npx astro dev --background   # start
npx astro dev stop           # stop
npx astro dev status         # status
npx astro dev logs           # logs
```

## Documentation

- `docs/architecture.md` — Architecture and data model
- `docs/decisions.md` — Architecture Decision Records (ADRs)
- `docs/development-log.md` — Phase-by-phase development log
- `docs/testing.md` — Testing strategy
- `docs/deployment.md` — Deployment guide
