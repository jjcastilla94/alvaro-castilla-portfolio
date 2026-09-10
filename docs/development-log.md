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
**Status:** Completed

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

`3dc3580` — `feat: separate content into centralized data files`

### Status

Completed

---

## Phase 4 — Individual Pages

**Date:** 2026-09-04
**Status:** Completed

### Objective

Create the internal pages of the portfolio consuming the data files from Phase 3, preserving the existing architecture and Design System.

### Implemented

- **`/experience`** (`src/pages/experience.astro`) — Full professional experience timeline with both Cajamar entries. Shows the current role with an "Actual" badge, formatted dates (`formatDate`/`formatRange` inline helpers), description, bullet highlights, and technology tags.
- **`/projects`** (`src/pages/projects.astro`) — Grid listing of all projects from `projects.ts`, each linking to its individual page.
- **`/projects/[slug]`** (`src/pages/projects/[slug].astro`) — Dynamic pages generated via `getStaticPaths()` from `PROJECTS`. Handles optional `longDescription` (falls back to short description) and optional `github` (button hidden when absent). Uses `throw new Error` for truly invalid slugs (unreachable via generated paths).
- **`/contact`** (`src/pages/contact.astro`) — Contact page using real data from `profile.ts`: email (mailto), GitHub, and LinkedIn. No form (proposed, awaiting decision).
- **`src/data/site.ts`** — Removed `/about` from `NAV_LINKS` (page doesn't exist until Phase 6).
- **`src/data/projects.ts`** — Extended `Project` interface with optional `longDescription` and `github` fields (not filled for the two existing projects).

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings)
- Build: PASS (6 pages, 410ms)
- 6 routes generated: `/`, `/experience`, `/projects`, `/projects/arcadia`, `/projects/detubarrio`, `/contact`
- All real data verified in generated HTML (experience roles/dates, project titles, contact email/URLs)
- `/about` link not present in any page's navigation
- All internal links point to existing routes
- Zero hardcoded personal strings in `.astro` files

### Decisions

- **SSG with `getStaticPaths()`** for dynamic project routes (build-time generation)
- **Slug from `project.id`** — clean URLs without spaces/accents
- **Invalid slug → `throw new Error`** — unreachable via generated paths; no arbitrary redirect
- **`formatDate` helper kept inline** in `experience.astro` — extracted to `src/utils/dates.ts` only if reused later
- **Optional `github`/`longDescription`** — pages handle absence gracefully (no GitHub button, fallback description)
- **No contact form** — direct email + social links; form can be added later without restructuring

### Content Notes

- Complete project data (`longDescription`, `github`) deferred until provided by user
- Education, certifications, and `/about` page deferred to later phases

### Commit

`681c167` — `feat: add individual pages (experience, projects, project detail, contact)` — pushed to `origin/main`, `main` in sync, working tree clean.

### Status

Completed

---

## Phase 5 — Visual Polish + Animations

**Date:** 2026-09-10
**Status:** Completed

### Objective

Increase visual impact and career polish without changing the visual identity, architecture, or stack. Add subtle, professional motion: reveals on scroll, microinteractions, a visual timeline for Experience, indexed Projects, refined Contact, and fast, subtle page transitions via Astro View Transitions.

Scope constraint (approved): Phase 5 is visual only. No changes to `src/data`, stack, configuration, or dependencies. No content/Metrics invented. No Phase 6/7/8 features.

### Implemented

- **[data-reveal]** reveal-on-scroll system driven by `IntersectionObserver` (native API, no library). Content is visible by default (no-JS safe); the hidden starting state only applies when JS is active (`html.js`) and motion is allowed. Guarded by `prefers-reduced-motion`.
- **`Reveal.astro`** — new UI primitive: thin wrapper (`div[data-reveal]`) with optional `delay` (ms) via `--reveal-delay`. Used for staggered entrance of cards on grids.
- **Staggered Hero** — name, role, bio, CTAs and social links enter in sequence (0/70/140/210/280 ms).
- **Ambient glow** — theme-aware radial glow (`.glow-accent`, uses `--color-accent` via `color-mix`) behind Hero and final Contact card. Low opacity, decorative only, `pointer-events: none`, no layout impact.
- **Experience timeline** (`/experience`) — vertical timeline line with dots; the current role dot has a subtle pulse (`dot-pulse` keyframe). Cards unchanged structurally.
- **Projects (home, `/projects`)** — mono index numbers ("01", "02"), staggered reveals, `h-full` cards for equal heights.
- **Microinteractions** — Button (arrow drift on CTAs, primary/secondary lift + accent shadow), Card (hover/focus-within accent border + lift + soft shadow), Tag (color/border hover), back-link on project detail (`←` arrow drift).
- **Active navigation indicator** — header underline (`scaleX` origin-left) for the current route in desktop nav; active color state in mobile menu.
- **Contact page** — index heading, staggered card entrance, real email shown on the Email card (from `profile.ts`, not invented), `focus-visible` added to the "Redes" links.
- **Footer** — minor hover refinement only (focus ring rounding).
- **View Transitions (Astro)** — `<ClientRouter />` in `BaseLayout` with a fast 160 ms root cross-fade. No external library.
- **Reduced motion policy** — movement disabled (reveals, keyframes, smooth scroll, page transitions), non-problematic state transitions (color, background, border, shadow, opacity) preserved. Content is never hidden.

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings) — removed non-Astro `key` prop on `Reveal` (2 errors found and fixed)
- Build: PASS (6 pages, 736ms) — same 6 routes as Phase 4
- Format: modified/created files formatted with Prettier (pre-existing formatting debt in unrelated files left untouched: `README.md`, `eslint.config.js`, and a few components not in Phase 5 scope)
- Running dev server: all 6 routes return HTTP 200
- Compiled CSS verified: reveal rules, `html.js [data-reveal]`, reduced-motion block, `.dot-pulse`, `.glow-accent`, view-transition rules present
- HTML verified: `data-reveal` attributes + staggered delays emitted; active nav indicator on each route; `/about` still absent from every navigation
- View Transitions enabled on all pages (`astro-view-transitions-enabled` meta + ClientRouter module)
- Reduced motion: reveals forced visible, animations killed, page transitions disabled, `scroll-behavior` auto, transform transitions removed while color/state transitions are preserved
- Responsive reasoning: glow clipped to section width (`min(640px, 100%)`), timeline column `pl-9`, no fixed-width overflow sources; verified mobile-first classes throughout

### Decisions

- **Native `IntersectionObserver` over an animation library** — no dependency added. GSAP/Motion One/motion rejected as over-engineering (ADR-012).
- **View Transitions via Astro `<ClientRouter />`** — fast 160 ms fade; integrated, no external library. Removed immediately if they caused navigation/theme/menu/accessibility issues (they did not) (ADR-013).
- **`[data-reveal]` visible-by-default, hidden only under `html.js`** — guarantees no-JS and reduced-motion users never see hidden content (ADR-012).
- **`prefers-reduced-motion` blocks movement but keeps color/state transitions** — per explicit user requirement (ADR-014).
- **Single central reveal script in `BaseLayout`** listening to `astro:page-load` + initial load — works across View Transitions without per-component scripts.
- **`html.js` class added in the head inline script** (only when motion allowed) so the hidden state is applied before first paint, enabling the Hero entrance while remaining no-JS safe.

### Content Notes

- No content, metrics, jobs, technologies, or URLs invented.
- The visible email on `/contact` comes from `PROFILE.email` (existing data).
- Section indices ("01", "02", …) are presentational labels, not personal data.

### Commit

Pending (committed together with Phase 6)

### Status

Completed

---

## Phase 5.5 — Visual QA + Bug Fixes

**Date:** 2026-09-10
**Status:** Completed

### Objective

Manual visual review of the finished Phase 5 site on the running dev server (all 6 routes), covering layout, dark/light, animations, reduced motion, navigation, links, and responsive structure. Small, safe correctness fixes only — no new development phase, no new content.

### QA performed

- **All 6 pages fetched from dev server (HTTP 200)** and audited: `/`, `/experience`, `/projects`, `/projects/arcadia`, `/projects/detubarrio`, `/contact`.
- **Compiled production CSS audited** after build: every utility class used by Phase 5 templates generates (checked variants, hover/focus forms, arbitrary values, escaped selector forms). All present.
- **Motion system verified in compiled output** — reveal rules (`html.js [data-reveal]:not(.is-visible)`, `translateY(16px)`, `--reveal-delay`), `.glow-accent` (radial-gradient + blur), `dot-pulse`, view-transition duration 160 ms, and the full `prefers-reduced-motion` block are emitted.
- **Reveal counts / stagger delays** verified in served HTML (Hero 0/70/140/210/280 ms; Projects cards `i*60`; Experience `i*70`; Contact 40/100/160/220 ms).
- **Active nav indicator verified on all 6 routes** — correct link active on `/experience`, `/projects` + both details, `/contact`; none active on `/`; `/about` absent everywhere.
- **Dark/light verified** — server HTML defaults to `class="dark"`, head inline script applies stored/OS preference before first paint (no FOUC), `ThemeToggle` toggles `dark`/`light` + `localStorage`, light tokens override via `html.light`, `dark:` variant uses class strategy (`@custom-variant`).
- **Links / wiring** — internal links only point to existing routes; back-to-top `#top` present; mobile menu markup + `aria-expanded` logic present; `mailto` on Contact and home CTA uses real `PROFILE.email`; View Transitions meta + ClientRouter on all pages.
- **Contrast audit (WCAG)** — light theme passes (≥ 4.53). Dark theme flagged: white on `--color-accent` CTA buttons = 3.68:1 and the `--color-accent-hover` hover state = 2.54:1 (below AA). Pre-existing token values; fixing them changes the approved palette, so left for explicit user decision.
- **No placeholders** — no TODO/lorem/example URLs in `src/`.

### Issues found and fixed

1. **Duplicate canonicals (all pages → homepage)** — every page emitted `rel="canonical" href="https://alvarocastilla.vercel.app/"`. Fixed by passing an explicit canonical per page: `/experience`, `/projects`, `/projects/{id}`, `/contact` (`index` keeps the site root). Verified in built HTML.
2. **Broken og:image / twitter:image references** — pointed to `og-image.png`, which does not exist in `public/`. Fixed by removing those meta tags from `HeadSEO` (SocialLink/OG image card restored later with a real asset).
3. **Cosmetic whitespace** — hardcoded `04 · Contacto` label trimmed to `04 · Contacto`.
4. **Dark-mode primary CTA contrast (WCAG AA)** — white text on `--color-accent` (3.68:1) and hover `--color-accent-hover` (2.54:1) failed AA. Fixed with two component-specific tokens used only in dark mode (ADR-015): `--color-accent-cta` `#1d4ed8` (blue-700) and `--color-accent-cta-hover` `#2563eb` (blue-600), applied via `dark:` only on the primary Button. Verified contrast: base 6.70:1, hover 5.17:1 (both ≥ 4.5). Light mode untouched (already AA: 6.70 base, 8.72 hover).

### Issues found, left open (need user decision / Phase 6)

- **`--color-text-dim` in dark** — #64748b ≈ 3.9–4.2:1 (borderline for small labels).
- **Favicon** — still the default Astro icon; branded favicon is an asset-creation task.
- **Projects have no GitHub URLs** — "Ver en GitHub" button on detail pages is hidden until real repo URLs are provided (Phase 6 content).

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings)
- Build: PASS (6 pages, 519ms)
- Prettier: changed files formatted
- Built HTML re-verified: correct per-page canonicals, no `og:image`/`twitter:image`, no `/about` links
- Re-validated after CTA accessibility fix: lint PASS, typecheck PASS (0/0/0), build PASS (6 pages), all 6 routes HTTP 200, CTA contrast measured at base 6.70:1 and hover 5.17:1, canonicals unique and correct, no broken og:image/twitter:image references

### Commit

Pending (committed together with Phase 6)

### Status

Completed

---

## Phase 6 — Visual Identity & Impact

**Date:** 2026-09-10
**Status:** Completed

### Objective

Transform the portfolio from "correct and professional" to "professional and memorable." Add visual impact for recruiters following the reference site (sergio-perez-planells.netlify.app), while maintaining the established identity, stack, and professional credibility.

### Implemented

- **Hero redesign** (`Hero.astro`): 2-column layout with name (Space Grotesk up to `text-7xl`), bio, CTAs, social links. Right column: static `Developer.java` code card with syntax highlighting, mac-window dots, 3D tilt on hover, scroll indicator.
- **Space Grotesk display font** (`HeadSEO.astro`): Added via Google Fonts. Token `--font-display` in `global.css`. Applied to Hero name, section headings, experience roles, stat values.
- **Project cards** (`ProjectCard.astro`): Full-width cards with CSS gradient/pattern placeholders (Arcadia: violet/indigo; DetuBarrio: orange/amber), index numbers, hover effects (scale, arrow drift, glow border).
- **Architecture section** (`Architecture.astro`): "Como construyo" section with animated diagram (Client -> BFF -> Gateway -> Service -> Database), staggered nodes, animated line drawing, flow dots, 3 principle cards.
- **Scroll progress bar** (`BaseLayout.astro`): Theme-aware gradient bar at the top, grows with scroll position. Present on all pages.
- **Section headings** (`SectionHeading.astro`): Number prefix + gradient rule (replacing flat `border-b`) + `font-display`.
- **Animated stats** (`BaseLayout.astro`): Row of stats on home (Desde en Grupo Cajamar 2026, 2 proyectos, 6+ tecnologias, REST APIs). Count-up animation with `data-count`/`data-suffix`, easing on intersection.
- **Experience timeline improvements** (`experience.astro`): `slide-right` reveal per entry, pulse-ring on current-role dot, `>` marker highlights, `font-display` on roles, gradient line. Year labels repositioned to avoid dot overlap.
- **Breadcrumbs** (`Breadcrumbs.astro`): New component for subpage navigation. "Inicio / Section" on all internal pages. On project detail: "Inicio / Proyectos / ProjectName".
- **Nav updated** (`site.ts`, `Header.astro`): "Inicio" added as first navigation link, highlighted only on home page.
- **SPA theme fix** (`HeadSEO.astro`): `applyTheme()` re-executed on `astro:page-load` to re-apply stored theme after SPA navigation.
- **Theme toggle fix** (`ThemeToggle.astro`): Event delegation on `document` for survival across SPA navigation.
- **Data enrichment**: `profile.ts` gained `stats` array (typed `Stat` interface). `projects.ts` gained `color` field and `github` URLs. `site.ts` gained Inicio nav link.
- **Reduced motion coverage**: All new keyframes (glow-breathe, pill-enter, arch-node-enter, draw-line, flow-dot, slide-in-right, tag-pop, pulse-ring, scroll-bounce) covered under `prefers-reduced-motion`.

### Validation

- Lint: PASS
- Typecheck: PASS (0 errors, 0 warnings, 0 hints)
- Build: PASS (6 pages, 376ms)
- Headless browser test (puppeteer-core): theme toggle works across SPA navigation, nav "Inicio" present, breadcrumbs render on all subpages, code-window/scroll-progress/stats present, timeline year at left 0px (no overlap), no JS errors

### Decisions

- **Space Grotesk as display font** (ADR-016)
- **Static code card in Hero** (ADR-017) - communicates technical competence without fake terminal effects
- **Animated stats counters** (ADR-018) - subtle number animations for professional metrics
- **Breadcrumbs on all subpages** (ADR-019) - full navigation trail replacing isolated back-links

### Commit

`438d261` — `feat: add visual identity and impact (Phase 5.5 + 6)` — working tree clean, not pushed.

### Status

Completed

---

## Phase 6.5 — Refinement & Content Finalization (PLANNED)

**Date:** pending
**Status:** Planned — scheduled before Phase 7 (Testing)

### Objective

Refine and finalize the design and content before automated tests are written, so Phase 7 tests are written once against the definitive design. Leaving the UI/content unfinalized would make tests break and require rework.

### Scope (agreed with the user)

1. **Specifications** — define the exact data and structure for new content sections.
2. **Refinement of design and content** — adjust existing pages based on review.
3. **New section: Certificaciones** — new `src/data/certifications.ts` (name, issuer, date, optional URL) and a section/page to display them.
4. **New section: Servicios** — new `src/data/services.ts` (title, description, involved technologies) and a section/page to display them.

### Placement decision (pending confirmation)

- **Certificaciones:** after Experience, before Projects.
- **Servicios:** after Projects, before Contact.

Both can live as home sections, dedicated pages, or both — to be decided in the specs step.

### Constraint

This phase is the last one that can touch design/content cheaply. After it, Phase 7 (testing) must target a fixed UI/content, and Phase 8 (CI/CD + deploy) must not be blocked by further design changes.

### Status

Planned (starting tomorrow)
