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
| `/` | Home — hero with code card, featured experience, stats, projects, architecture, skills, contact |
| `/experience` | Professional experience timeline with animated entries |
| `/projects` | Project listing with full-width cards |
| `/projects/[slug]` | Individual project case studies with visual preview |
| `/contact` | Contact information (email, GitHub, LinkedIn) |

> `/about` is intentionally not present in the navigation until it exists (planned for Phase 6).

## Project Structure

```
alvaro-castilla-portfolio/
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── components/
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Hero (code card), Architecture (animated diagram)
│   │   ├── seo/         # HeadSEO
│   │   └── ui/          # Button, Card, Reveal, Tag, SectionHeading,
│   │                    # SocialLink, ThemeToggle, ProjectCard, Breadcrumbs
│   ├── data/            # Centralized content (profile, projects, experience, skills, site)
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

- `site.ts` — Site-wide constants: URL, name, OG image, locale, navigation links (including Inicio)
- `profile.ts` — Name, role, bio, email, social links, stats array
- `experience.ts` — Work experience entries (typed)
- `projects.ts` — Project list with color field, optional `longDescription` and `github` URLs
- `skills.ts` — Skills grouped by category

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
