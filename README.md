# alvaro-castilla-portfolio

Personal portfolio, showcasing his professional experience, projects and technical skills. Built as a static site with Astro and TypeScript.

[![CI](https://github.com/jjcastilla94/alvaro-castilla-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/jjcastilla94/alvaro-castilla-portfolio/actions/workflows/ci.yml)

## Tech Stack

- **Framework:** Astro (static site generation)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Linting:** ESLint + Prettier
- **Testing:** Vitest (unit) + Playwright (E2E) — Phase 8, see `docs/testing.md`
- **Deployment:** Vercel (auto-deploy from GitHub `main`) — live at https://alvarocastilladev.vercel.app

## Routes

| Route              | Description                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Home — hero with code card, About, experience, featured projects, architecture, skills by level + certifications, "Lo que construyo", contact |
| `/experience`      | Professional experience timeline with animated entries                                                                                        |
| `/projects`        | Project listing with cards for all projects                                                                                                   |
| `/projects/[slug]` | Case study: status badge, "El problema" / "Mi contribución" / "Lo que aprendí", screenshot gallery with lightbox, repo + live links           |
| `/contact`         | Contact information (email, GitHub, LinkedIn)                                                                                                 |

## Project Structure

```
alvaro-castilla-portfolio/
├── .github/workflows/   # CI (GitHub Actions)
├── public/              # Static assets (favicon, robots.txt + sitemap pointer, og-image, CV)
├── src/
│   ├── assets/          # Images processed by astro:assets (screenshots, avatar)
│   ├── components/
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Hero (code card + CTAs), About, Architecture (diagram), Skills
│   │   ├── seo/         # HeadSEO
│   │   └── ui/          # Button, Card, Reveal, Tag, SectionHeading,
│   │                    # SocialLink, ThemeToggle, ProjectCard, ProjectStatus,
│   │                    # ProjectGallery (lightbox), CertificationCard, Breadcrumbs, ServiceCard
│   ├── data/            # Centralized content (profile, projects, experience, skills, site, about, services, certifications, projectStyles)
│   ├── layouts/         # BaseLayout (scroll progress, stats, reveals)
│   ├── pages/           # Route pages
│   ├── styles/          # Global CSS + design tokens + motion system
│   └── utils/           # Utility functions (dates, projectImages)
├── docs/                # Project documentation
└── tests/               # Unit (Vitest) + E2E (Playwright) tests
```

## Content Management

All of the site's content lives in `src/data/` — no personal strings are hardcoded in components:

- `public/` — Static assets: favicon, `robots.txt` (allows crawling + `Sitemap:` → `sitemap-index.xml`), `og-image.png`, `cv/alvaro-castilla-cv.pdf`
- `site.ts` — Site-wide constants: URL, name, OG image, locale, navigation links (including Inicio)
- `profile.ts` — Name, role, bio, email, social links, CV URL (`cvUrl` + `hasCv()`), stats
- `experience.ts` — Work experience entries (typed)
- `projects.ts` — Project list with color field, optional `longDescription`, `problem`, `contribution`, `learnings`, `status`, `featured`, `github`/`url`, `repositories` (multi-repo projects) and optional `image`/`gallery` overrides
- `skills.ts` — Skills grouped by level (core / working / exposure / complementary)
- `about.ts` — About section content (intro, approach, interests)
- `services.ts` — `CAPABILITIES` (the "Lo que construyo" section)
- `certifications.ts` — Real certifications (Spring Boot/MVC, JavaScript, Sass, AWS AI Practitioner in-progress)
- `projectStyles.ts` — Per-color gradients/patterns for project visuals
- `utils/dates.ts` — Date formatting helpers
- `utils/projectImages.ts` — Build-time gallery scanner (`src/assets/projects/<id>/`, `import.meta.glob` + `astro:assets`)

## Adding a Project

To add a new project, add an entry to `src/data/projects.ts` (fields documented in the
`Project` interface) — the listing and detail pages update automatically. Home only shows
projects marked `featured: true`; `/projects` lists everything. Multi-repo projects use
`repositories: [{ label, url }]` instead of the single `github` field.

Project screenshots live in `src/assets/projects/<id>/` and are picked up automatically
via `import.meta.glob` + `astro:assets` (optimized `<Image />` with WebP, srcset and
automatic dimensions): `main.png` is the cover (cards + detail banner) and the rest are
the click-to-zoom gallery on the detail page. Prefix extra captures with numbers
(`01-`, `02-`, …) to control the gallery order.

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (foreground)
npm run build      # production build
npm run preview    # preview production build
npm run lint        # ESLint
npm run lint:fix    # ESLint (auto-fix)
npm run typecheck   # TypeScript + Astro check
npm run format      # Prettier format
npm run format:check # Prettier (check only, used in CI)
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
