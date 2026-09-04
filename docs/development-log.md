# Development Log

## Phase 1 — Foundation

**Date:** 2026-09-04
**Status:** Completed

### Objective

Initialize the project with Astro, TypeScript, Tailwind CSS, ESLint, Prettier, and project documentation.

### Implemented

- Astro 7.3.1 project with TypeScript strict mode
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- ESLint + Prettier configuration
- `.gitignore` updated for all generated files
- `package.json` scripts for dev, build, lint, typecheck, format
- `docs/` directory with architecture, decisions, development log, testing, deployment docs
- Global CSS with Tailwind v4 `@theme` design tokens

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings)
- Build: PASS (1 page, 275ms)

### Decisions

- Tailwind v4 CSS-first configuration (no `tailwind.config.js`)
- Data files over content collections for professional data
- No client-side framework (React/Vue) — minimal vanilla JS only
- `no-explicit-any` set to `warn` (pragmatic for Astro frontmatter)

### Commit

`7d31cae` — `chore: initialize portfolio foundation`
`7353436` — `docs: update development log with Phase 1 completion`

### Status

Completed

---

## Phase 2 — Design System + Layout

**Date:** 2026-09-04
**Status:** Completed

### Objective

Create the visual foundation and reusable layout components, establishing an identity visual propia for the portfolio.

### Process

Phase 2 was split into two steps:

1. **Phase 2A — Design exploration / planning:** Analyzed a Stitch visual reference (not treated as a specification). Proposed a visual direction.
2. **Implementation:** After approval, built the design system and layout.

### Implemented

- Design tokens in `global.css` (colors, typography, spacing via `@theme`)
- `HeadSEO.astro` — base SEO metadata + flash-free theme initialization
- `BaseLayout.astro` — semantic HTML layout with Header + Footer
- `Header.astro` — responsive navigation (horizontal desktop, hamburger mobile)
- `Footer.astro` — minimalist footer with social links
- UI primitives: `Button`, `Card`, `Tag`, `SectionHeading`, `ThemeToggle`, `SocialLink`
- Home page visual structure (Hero → Experiencia → Proyectos → Skills → Contacto)

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings)
- Build: PASS (1 page, 426ms)
- HTTP 200 on `/`
- Dark mode default applied, no flash (theme init inline script)
- Tailwind color tokens and glassmorphism compiled into production CSS
- `prefers-reduced-motion` CSS present

### Decisions

- **Dark mode as primary** with light mode as alternative via toggle
- **Inter + JetBrains Mono** — no serif editorial font
- **Accent `#38bdf8` (sky-400)** instead of generic `#3b82f6` for differentiation
- **Glassmorphism only on floating/overlay elements** (navbar, contact card), solid surfaces for content
- **Experience before projects** in Home to give Cajamar professional experience prominence
- **Traditional navigation** with links, no tab switcher
- **Minimal animations**, all respecting `prefers-reduced-motion`

### Content Notes

- Experiencia: "Desarrollador Backend Junior — GRUPO CAJAMAR · julio 2026 — actualidad" (confirmed by user)
- Email placeholder `contacto@alvarocastilla.dev` in contact section — pending confirmation

### Commit

Pending (will be made after Phase 2 reviewed and approved for commit)

### Status

Completed
