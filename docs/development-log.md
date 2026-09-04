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

- Experiencia: "Desarrollador Backend Junior — GRUPO CAJAMAR · Departamento de Apificación · julio 2026 — actualidad" (confirmed by user)
- Email, GitHub, LinkedIn: real data confirmed and embedded

### Commit

`03fef0e` — `feat: add base layout and design system` (Phase 2A + implementation)
`407ce50` — `feat: refine theme system, visual tokens, and real user data` (Phase 2 visual adjustments + ADR-008 amended)

### Status

Completed

---

## Phase 3 — Data Separation

**Date:** 2026-09-04
**Status:** In Progress

### Objective

Separate hardcoded content from components into centralized data files, establishing a clean data architecture that supports future expansion (education, certifications, more projects) without touching component code.

### Implemented

- **`src/data/site.ts`** — Site-wide constants: URL, name, OG image, locale, default description, navigation links
- **`src/data/profile.ts`** — Personal data: name, role, bio, email, social links (GitHub, LinkedIn)
- **`src/data/experience.ts`** — Work experience array with typed `ExperienceEntry` interface (2 entries: Cajamar Junior + Cajamar Prácticas)
- **`src/data/skills.ts`** — Skills grouped by category with typed `SkillCategory` interface (Backend, Frontend, DevOps)
- **`src/data/projects.ts`** — Projects array with typed `Project` interface (Arcadia, DetuBarrio)
- **`Header.astro`** — Imports `NAV_LINKS` from `site.ts` and `PROFILE` from `profile.ts`
- **`Footer.astro`** — Imports `PROFILE` from `profile.ts` for name, role, and social URLs
- **`HeadSEO.astro`** — Imports `SITE` from `site.ts` for URL, name, OG image, locale
- **`index.astro`** — Imports all data files; hero, experience, projects, skills, and contact sections all render from centralized data

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings)
- Build: PASS (1 page, 340ms)
- HTML output verified: all real data present (GitHub URL, LinkedIn URL, email, Cajamar experience, projects)
- Zero hardcoded personal strings remaining in `.astro` component files

### Decisions

- **5 data files** instead of a single monolith — each domain (site, profile, experience, skills, projects) is independently importable
- **TypeScript interfaces exported** from data files — enables type safety in components
- **`as const`** used for profile and site data — ensures literal types for values that won't change
- **Experience filtered by `endDate === null`** on Home page — automatically shows current role without hardcoding which entry is current

### Content Notes

- Education, certifications, and additional projects deferred to future phases
- LinkedIn "Acerca de" text kept as context, not copied literally

### Commit

Pending (awaiting approval)

### Status

Completed
