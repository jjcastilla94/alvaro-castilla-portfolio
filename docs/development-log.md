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

1. **Duplicate canonicals (all pages → homepage)** — every page emitted `rel="canonical" href="https://alvarocastilla.vercel.app/"` (the placeholder URL used before the production domain existed). Fixed by passing an explicit canonical per page: `/experience`, `/projects`, `/projects/{id}`, `/contact` (`index` keeps the site root). Verified in built HTML.
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

## Phase 6.5 — Refinement & Content Finalization

**Date:** 2026-09-11

### Objective

Refine and finalize the design and content before automated tests are written, so Phase 8 tests are written once against the definitive design. Leaving the UI/content unfinalized would make tests break and require rework.

### Constraint (from the plan)

This phase is the last one that can touch design/content cheaply. After it, Phase 8 (testing) must target a fixed UI/content, and Phase 9 (CI/CD) must not be blocked by further design changes.

### Execution (agreed blocks)

Work was executed in blocks A–H, each validated with `lint` + `typecheck` + `build`. A–F completed as part of this log; G (docs, this file) and H (Git) follow.

#### Block A — Accessibility & Semantic Foundation

| Step | Description                                                                                                             |
| ---- | ----------------------------------------------------------------------------------------------------------------------- |
| A1   | Skip link "Saltar al contenido" in `BaseLayout.astro` linking to `main#main-content`.                                   |
| A2   | Added `<div id="top">` anchor target; footer aside now links `#top`.                                                    |
| A3   | `SectionHeading.astro` accepts `level` prop (1–6, default 2) with conditional h1/h2/h3 (resolves Astro tag type error). |
| A4   | `projects.astro`, `experience.astro`, `contact.astro` use `level={1}` for the page H1.                                  |
| A5   | `aria-current="page"` on active nav link in `Header.astro` and `Breadcrumbs.astro`.                                     |
| A6   | Dark `--color-text-dim` fixed to `#7e8fa6` (WCAG AA on `#090a0f`).                                                      |

Validation: lint 0, typecheck 0, build 6 pages.

#### Block B — Data Architecture

Low-level data now lives in typed collections, decoupled from components:

- `src/utils/dates.ts` — `formatDate`, `formatRange`, `getYear`; `experience.astro` and `index.astro` use them (inline date math removed).
- `src/data/projectStyles.ts` — centralized per-color gradients/patterns; removed duplicated maps in `ProjectCard.astro` and `projects/[slug].astro`.
- `src/data/certifications.ts` — empty array (`TODO_ALVARO`), no section rendered until real data.
- `src/data/about.ts` — intro, current, approach, interests, personalNote (Spanish).
- `src/data/services.ts` — `CAPABILITIES` (4 areas framed as "Lo que construyo").
- `src/data/skills.ts` — rewritten with `core`/`working`/`exposure` levels.
- `src/data/projects.ts` — extended model (optional `image`, `gallery`, `problem`, `contribution`, `learnings`, `status`, `featured`); DetuBarrio URL fixed to `github.com/DetuBarrio/DetuBarrio`; content aligned to confirmed data.
- `src/data/profile.ts` — `shortRole`, `tagline`, `stack`, `cvUrl` + `hasCv()`, stats; CV activated later (see Block G).

Validation: lint 0, typecheck 0, build OK.

#### Block C — New Sections (Home)

- `src/components/sections/About.astro` (home 01) — principles grid, interests, personal note.
- `src/components/ui/ServiceCard.astro` + "Lo que construyo" grid (home 06).
- Skills section (home 05) grouped by level, `core` items accented.
- `Architecture.astro` refactored to use `SectionHeading`, dead `icon` prop removed.
- Home renumbered: 01 About, 02 Experience, 03 Projects, 04 Architecture, 05 Skills, 06 Lo que construyo, 07 Contact.

Validation: lint 0, typecheck 0, build 6 pages.

#### Block D — Project Detail

- D1: redundant `longDescription`+`description` paragraph pair replaced with `longDescription || description` (single authoritative paragraph).

#### Block E — Visual Polish

- E1: Hero rewritten — 3 CTAs (**Ver proyectos** primary → `/projects`, **Contactar** secondary → `/contact`, **Descargar CV** secondary + download icon, rendered only when `hasCv()`), stack line (Java · Spring Boot · REST APIs · MySQL · Docker), reveal delays reworked, CTA row responsive (primary full-width on mobile, secondary pair shares a row).
- E2: Footer redesigned to 3 columns (brand/role · nav links · links + back-to-top) with bottom bar (© year, "Construido con Astro").
- E3: Contact "Redes" card reuses `SocialLink.astro`.
- E4: dead CSS removed — `.dot-pulse`, `.tech-pill`/`pill-enter`, `--color-accent-2` fallback.
- E5–E8: manual QA on dev server — all pages render, CTA conditional works (CV button active once `cvUrl` is set), pills/footer/code window present, `prefers-reduced-motion` intact.

Validation: lint 0, typecheck 0, build 6 pages.

#### Block F — SEO & Social

- `public/og-image.png` generated (1200×630, dark placeholder + accent bar).
- `HeadSEO.astro` — restored `og:image` (with width/height/alt) and `twitter:image` (`summary_large_image`), absolute URL `${SITE.url}${SITE.ogImage}`.
- `public/robots.txt` created (allow all).

Validation: lint 0, typecheck 0, build 6 pages; `dist` contains `og-image.png` and `robots.txt`.

#### Block G — Documentation

- `docs/decisions.md` — ADR-020 to ADR-025 (junior title, services framing, hero CTA strategy, certifications deferred, longDescription fix, skills levels).
- `README.md`, `docs/architecture.md` and this log updated to reflect Blocks A–F.

#### Block G2 — CV finalization

The user provided the CV. Applied:

- `public/cv/alvaro-castilla-cv.pdf` added (144 KB) — served at `/cv/alvaro-castilla-cv.pdf` (status 200, `application/pdf`).
- `src/data/profile.ts` — `cvUrl: '/cv/alvaro-castilla-cv.pdf'` (replaces `undefined`/`TODO_ALVARO`).
- Hero **Descargar CV** button now renders and opens the PDF in a new tab (`target="_blank"` + `rel="noopener noreferrer"`, same-origin asset; the PDF viewer offers save/download).
- Verified on dev server: button present, link correct, PDF served.
- Docs updated so CV references reflect the real state (no longer "pending").

#### Block H — Git

- Committed and pushed as `cb78eac` — `feat: refine data, sections, hero and SEO (Phase 6.5)` (33 files, +736/−258). Working tree clean at that point.

#### Block 6.5-B — Copy refinement

- `PROFILE.bio` → "Desarrollo APIs REST para entornos empresariales con Java y Spring Boot, con foco en código claro y mantenible a largo plazo." (short hero paragraph, no company mention — distinct role from About intro).
- About intro (6.5-F) later replaced per user request by the "Cómo abordo el desarrollo" paragraph (understanding the problem before coding, maintainable/evolving solutions, principles intro) — heading 01 already carried that title; principles remain intact.
- Experience/projects/build descriptions rewritten, clichés removed ("crecimiento continuo", "demuestran mi capacidad", "aprender y crecer").
- Contact Home/CTA and contact page description rewritten (avoids freelance/agency tone).
- Naming unified to "Cajamar Tecnología": stats label, Experience section/page company (`experience.ts`, both entries), Hero decorative code window (was "GRUPO CAJAMAR").
- Tagline, hero stack pills, title, Skills and Architecture descriptions unchanged.

#### Block 6.5-D — Certifications

- `src/data/certifications.ts` reworked — schema with optional `description?`, `skills[]`, `date?`; 4 real certifications (Spring Boot/MVC 5 2026-05, JavaScript Asincronía/Prototipos/Clases 2026-04, Sass 2026-03, AWS AI Practitioner in-progress; "SAP Workflow" autocomplete error removed).
- `src/components/ui/CertificationCard.astro` new; "Formación & Certificaciones" sub-block added to Skills section (Home) inside `border-t`, grid `sm:grid-cols-2`, status badges (Obtenida/En curso), "Ver credencial" links.
- `src/utils/dates.ts` — `formatMonthYear()` (full Spanish month names).
- Priority: certifications are complementary to the About, not the center of the profile.

#### Block 6.5-F — Personality / About

- `src/data/about.ts` — final user-authored text: intro, current, 6 principles, future (exploration of cloud/DevOps/AI/Data as exploration, not specialization decision), personalNote (gym).
- `About.astro` renders "Dónde quiero ir" block (`border-l-2`).
- Verified cliché-free.

#### Block 6.5-G — Skills / Stack técnico (visual proposal)

- `src/data/skills.ts` — new model: flat `Skill[]` (`level`, `category`, `name`). Levels: `core` / `working` / `exposure` / `complementary`.
- `src/components/sections/Skills.astro` — Home section 05 extracted from `index.astro` (includes the certifications sub-block):
  - Core: accent tags row (Java · Spring Boot · REST APIs · MySQL/SQL · Docker · Git).
  - Working: grouped by category with mono micro-labels (Backend, Frontend, Bases de datos, Herramientas); backend enriched with Hibernate, Spring Security, Spring Data JPA, Lombok, JUnit.
  - Explorando: small, dimmer tags (AWS · Microservicios · DevOps · IA), no dominance implied.
  - Complementarias: native collapsible `<details>` (Angular, Bootstrap, Sass, Python, FastAPI, PHP, Laravel) with description referencing "mi formación" instead of DAW.
  - No progress bars/percentages (user rule); hierarchy via size/contrast/grouping.
- Feedback applied: featured cards removed from Core (all core items are equal-weight accent tags); Working expanded with tooling (IntelliJ IDEA, MySQL Workbench) and database category; complementary description now "…durante mi formación y otros proyectos". `featured` field dropped from the model (unused). Follow-up adds (user-confirmed): GitHub in Working · Tools; CI/CD, Arquitectura hexagonal and API Gateway in Explorando. _(Note: the project-model `featured` was a separate field — it was removed here and re-introduced in the 6.5-C final pass, see Block 6.5-C below.)_

### Decisions (Phase 6.5)

See ADR-020 to ADR-025 in `docs/decisions.md`.

### Content Notes

- No certifications, metrics, or achievements were invented; placeholders are `TODO_ALVARO`. Certifications only real ones provided by the user.
- CV active: `public/cv/alvaro-castilla-cv.pdf`, linked via `cvUrl` in `src/data/profile.ts`.

### Commit

- `cb78eac` — `feat: refine data, sections, hero and SEO (Phase 6.5)` (Blocks A–F + docs + CV), pushed.
- `7c90967` — `feat: complete Phase 6.5 (project galleries, refined content and docs)` (blocks `6.5-B/C/D/E/F/G/H/I/J/K/L/M/N` + ADR-026–029 + final docs/README pass), pushed.
- Final hardening pass committed separately: `34dd6be` — see the "Phase 6.5 — Hardening" entry below.

#### Block 6.5-C — Project cards (iteration, final)

- Cards grid → 2 columns (Home + `/projects`) with `object-cover` screenshots (fills frame, minimal crop; images are wide ~2.2:1), preview `h-48 sm:h-60`.
- Cards equal height (`h-full` + `flex flex-col`, footer pinned with `mt-auto`) for symmetry.
- `image` prop wired in `/projects` listing page (was missing).
- Project status badges: `ProjectStatus.astro` (En producción / En desarrollo / Completado, mirrored from projectStyles color language). Arcadia = in-development, DetuBarrio = active. Shown on cards (top-left) and detail banner (top-left).
- **Featured vs. all:** `featured?: boolean` re-added to the `Project` model. Home (`index.astro`) renders only `featured` projects (currently Arcadia + DetuBarrio stay featured); `/projects` lists every project — ready for the 4–5 additional projects the user will add. Architected so adding a project = add a data object; it appears on `/projects` automatically and only on Home if `featured: true`.
- **Richer project detail** (`projects/[slug].astro`): the page now goes beyond the banner + short paragraph. It renders structured sections — `El problema`, `Mi contribución`, `Lo que aprendí` (3 cards, numbered, only when data exists; drafts written 2026-09-14 for Arcadia and DetuBarrio) — and says clearly when a project has no production deployment yet ("Disponible en GitHub · sin despliegue en producción todavía").
- **Links always visible:** every project card and detail page shows the GitHub link whenever a repo exists; the live "Visitar proyecto" button appears only when the project is deployed (`url`). Non-deployed projects are never dead links.
- **Gallery + lightbox:** `ProjectGallery.astro` (native `<dialog>`, no library). Screenshots grid with hover "Ampliar" hint; clicking opens a fullscreen view with prev/next, backdrop click or «Esc» to close, `aria` labelled, reduced-motion aware. CSS `.gallery-dialog::backdrop` added in `global.css`.

#### Block 6.5-E — Visual resources

- Favicon replaced: `public/favicon.svg` monogram "AC" (dark bg, accent ring/dot, matching design) + `public/favicon.ico` regenerated (32×32, was the default Astro icon).
- `public/og-image.png` regenerated 1200×630 without tilde (user preference): "Alvaro Castilla · Backend Developer · Java · Spring Boot · REST APIs".
- Image support wired (renders only when files exist; no broken images otherwise):
  - `public/images/avatar.jpeg` (user-provided) → `PROFILE.image` → Header brand, Contact profile card.
  - `public/images/projects/arcadia.png` + `detubarrio.png` (user-provided, renamed lowercase) → `image` on both projects → card thumbnail + detail banner.
- Logos: decision recorded — **no technology logos** (kept per user rule, model remains extensible).

#### Block 6.5-J — Pre-commit review fixes

Fixes applied during the pre-commit review (cross-checking the plan against the implemented code). Lint, typecheck and build all pass before and after.

- `ABOUT.current` ("Mi día a día") was defined in `about.ts` but never rendered — added a `border-l-2 border-accent` block in `About.astro` after the intro so the professional day-to-day paragraph is visible (not dead data).
- Hero (`Hero.astro`) and Footer (`Footer.astro`) hardcoded the stack strings while `PROFILE.stack` existed — replaced the hardcoded "Java · Spring Boot · REST APIs …" strings with `PROFILE.stack.join(' · ')` (Hero) and `PROFILE.stack.slice(0, 3).join(' · ')` (Footer), restoring the "no hardcoded personal strings in `.astro`" rule.
- Dead unused data removed: `PROFILE.tagline`, `PROFILE.shortRole` (profile), `SITE.defaultDescription` (site).

#### Block 6.5-H — Visual polish (final pass)

- First pass done in 6.5-C; final pass executed against the finished content (all 6 projects with real screenshots):
  - All 10 routes return HTTP 200 with no dev-server runtime errors; no broken internal links across the site.
  - Project galleries verified at runtime via the built HTML: every detail page renders its full screenshot set (arcadia 4, detubarrio 5, gestor-restaurante-tpv 5, app-backend-bottle 6, course-management-platform 3, task-management-app 3) with `main.png` first, plus cover banner and card thumbnails.
  - Lightbox (`<dialog>`) present on every detail page (`data-gallery-dialog`, prev/next at runtime).
  - Status badges render per project; "En producción" shows the `animate-ping` pulse dot; reduced-motion coverage confirmed (global override neutralizes the ping).
  - Gallery hover "Ampliar" hint, image scale and backdrop blur are present; consistent border/surface tokens.

#### Block 6.5-I — Recruiter review (final pass)

- Inferior HTML titles and meta descriptions present and correct on all pages (`Home`, `Proyectos`, each project, `Experiencia`, `Contacto`); canonical URLs and Open Graph image tags checked.
- CV served at `/cv/alvaro-castilla-cv.pdf` (200, `application/pdf`); "Descargar CV" button active (Hero).
- Repo links verified against real URLs per project: single-repo projects show one real GitHub button; Course Management Platform shows both "Desarrollo" and "Despliegue e infraestructura" buttons; "Visitar proyecto" only where deployed (DetuBarrio, Course Management); non-deployed projects show the clarifying "sin despliegue en producción todavía" note and a working GitHub button instead of a dead CTA.
- Home shows exactly the two featured projects; `/projects` lists all six; no placeholders or invented claims found anywhere in `src/`.

#### Block 6.5-K — Auto gallery from image folders + project template

- Images moved to the folder convention `public/images/projects/<id>/` (`arcadia/main.png`, `detubarrio/main.png`).
- `src/utils/projectImages.ts` (`getProjectImages` / `getProjectMainImage`) scans a project's image folder at build time (Node `fs`). `main.png` → cover (cards + detail banner); every other image in the folder → the detail gallery automatically. Dropping screenshots in the folder is enough, no code changes needed.
- `image` / `gallery` values removed from Arcadia and DetuBarrio in `projects.ts` (now auto-resolved); the interface keeps them as optional overrides.
- `@types/node` added as dev dependency for the build-time scan.
- `docs/project-template.md` added — copy-paste object template + image steps so the user can prep their next projects. _(Removed in 6.5-M per user request — project fields are documented inline in the `src/data/projects.ts` interface.)_
- README updated ("Adding a Project" + gallery convention + docs list); `architecture.md` updated (utils tree, data model, projects paragraph).

#### Block 6.5-L — Multi-repo model + per-project colors + status badges (user-added projects onboarded)

- **Multi-repo projects:** `ProjectRepository` interface + `repositories?: { label, url }[]` on `Project`. New helpers `getProjectRepos` (returns `repositories`, falling back to a single `GitHub` entry from `github`) and `getProjectPrimaryRepo` (first entry, used by cards' repo hint). Detail page renders one button per repo with its label ("Desarrollo", "Despliegue e infraestructura", …); single-repo projects keep showing "Ver en GitHub".
- **Course Management Platform:** removed the duplicated `github` field (it pointed at the same repo as `repositories[0]`); the two repo links (Desarrollo + Despliegue e infraestructura) are now real, working buttons on the detail page.
- User-added projects onboarded: `gestor-restaurante-tpv` (TPV JavaFX), `app-backend-bottle` (Python/Bottle), `course-management-platform` (Vue+Laravel full-stack with Docker/CI-CD), `task-management-app` (Angular). Statuses `completed`, featured `false`, so they appear on `/projects` but not Home.
- **Per-project colors added** in `projectStyles.ts`: `restaurante` (red/rose), `bottle` (teal/cyan), `practicafinal` (emerald/green), `task-management` (sky/indigo) — each with matching gradient + dot pattern.
- **Status badges polished** (`ProjectStatus.astro`): "En producción" emerald with `animate-ping` pulse dot, "En desarrollo" amber, "Completado" neutral — consistent border/bg/dot tokens.

#### Block 6.5-M — Gallery folders for the new projects + template removed

- Gallery folders created for the four user-added projects: `public/images/projects/gestor-restaurante-tpv/`, `app-backend-bottle/`, `course-management-platform/`, `task-management-app/` (`.gitkeep` so the empty folders are tracked until screenshots are dropped in).
- `docs/project-template.md` deleted on user request; README and `architecture.md` no longer reference it (project fields are documented in the `Project` interface in `src/data/projects.ts`).

#### Block 6.5-N — 6.5-C finalized: galleries populated for all projects

- User uploaded screenshots for every project (6/6): `arcadia` (3), `detubarrio` (5), `gestor-restaurante-tpv` (5), `app-backend-bottle` (6), `course-management-platform` (3), `task-management-app` (3). `.gitkeep` placeholders removed implicitly once folders were non-empty.
- Home covers (`main.png`), detail banners and click-to-zoom galleries now show real captures on every project — 6.5-C (project cards + detail + gallery + featured) is finalized per user.
- Validation re-run with the full screenshot set: lint 0, typecheck 0, build 10 pages (all 6 project details resolve their images via `getProjectImages`).

### Status

Completed. Blocks A–H + 6.5-B/C/D/E/F/G/H/I/J/K/L/M/N complete and validated — lint 0, typecheck 0, build 10 pages, all routes 200, no broken links. Closed by the hardening pass recorded in the next entry.

---

## Phase 6.5 — Hardening (final pass)

**Date:** 2026-09-24
**Status:** Completed

### Objective

Last correctness pass before Phase 6.6 (Technical Polish): fix navigation bugs surfaced by SPA/View-Transition behaviour, make the repository pass `format:check` cleanly, and align the remaining content/stats with the real data.

### Implemented

- **Mobile menu compatible with SPA navigation** (`Header.astro`): the menu script was bound once to elements that are re-created on every View Transition navigation, so after the first client-side navigation the hamburger stopped working. Rewritten with event delegation on `document` (`click` + `keydown`), re-querying `#menu-toggle` / `#mobile-menu` per event; Escape still closes and restores focus to the toggle; clicking a link or outside the menu closes it.
- **Prettier across the whole repository**: 31 files reformatted so `npm run format:check` passes with zero diffs (component indentation, long attribute/array wrapping in `projects.ts`, `eslint.config.js`, data files).
- **Stats corrected** (`profile.ts`): "Proyectos full-stack" 2 → 3 and "Tecnologías en producción" 6 → 8+ to match the actual content (6 projects on `/projects`, 2 featured on Home).
- **Content consistency sweep** across `src/data/*` and components (naming, trailing newlines, dead fields) — no invented data.

### Validation

- Lint: PASS (0 errors)
- Typecheck: PASS (0 errors, 0 warnings, 0 hints)
- Format: `npm run format:check` PASS (all files)
- Build: PASS (10 pages)
- Responsive + navigation manual check (mobile menu open/close across routes, Escape, SPA navigation)
- Working tree clean; `main` in sync with `origin/main`

### Commit

`34dd6be` — `fix: harden portfolio navigation, formatting and content consistency` (31 files, +333/−256), pushed.

### Status

Completed — Phase 6.5 fully closed.

---

## Phase 6.6 — Technical Polish

**Date:** 2026-10-07
**Status:** Completed

### Objective

Short production-quality pass before tests: sync documentation with reality, migrate project imagery to `astro:assets` (`<Image />`) for transfer size + CLS, fix the gallery dialog's accessible name, and wire `ogType` correctly (project details → `article`).

### Blocks

- **A — Docs sync**: README structure/testing/deployment references corrected; `testing.md` (10 pages, tests marked Phase 8/planned); `deployment.md` (GitHub Actions planned, new phase order); this log updated (Phase 6.5 hardening entry + formal 6.5 closure).
- **C — Dialog accessibility**: `aria-labelledby` on the gallery `<dialog>` tied to the lightbox title.
- **D — SEO ogType**: `BaseLayout` forwards `ogType`; `/projects/[slug]` emits `og:type=article`, other pages `website`.
- **B — Images/performance**: `public/images/**` → `src/assets/**`; `projectImages.ts` rewritten on `import.meta.glob`; all `<img>` replaced by Astro `<Image />` (WebP/AVIF, srcset, automatic dimensions); detail banner `loading="eager"` + `fetchpriority="high"`.

### Validation

- Lint: PASS, Typecheck: PASS (0/0/0, 40 files), Format: PASS, Build: PASS (10 pages, 115 images)
- Runtime QA: 32/32 checks via Chrome headless + CDP (lightbox open/close/nav, mobile menu across SPA navigations, theme toggle, reduced-motion, meta tags)

### Commit

`3b53a06` — `Phase 6.6 — Technical polish: docs sync, dialog a11y, og:type, astro:assets images`, pushed.

### Status

Completed — Phase 6.6 closed; content sanity check follows.

---

## Content Sanity Check — post-6.6

**Date:** 2026-10-07
**Status:** Completed

### Objective

Correctness sweep of visible copy before deployment: no invented data, consistent terminology.

### Findings

- `full stack` → `full-stack` normalized in `index.astro` and `projects.astro` (compound modifier).
- "Apificación" — user-confirmed department name (4 occurrences), kept as-is.
- Stat "3 Proyectos full-stack" verified correct against the actual project content.

### Commit

`5a100cb` — `Content sanity check: normalize 'full stack' to 'full-stack' copy`, pushed.

### Status

Completed.

---

## Phase 7 — Deployment (Vercel) + Production URL + Sitemap

**Date:** 2026-10-07
**Status:** Completed

### Objective

Deploy the static site to production on Vercel, establish the canonical production URL, and ship the SEO sitemap.

### Implemented

- **Production deployment:** Vercel Free, auto-deploy from GitHub `main` → **https://alvarocastilladev.vercel.app** (all 10 routes return 200 in production).
- **Canonical production URL** (`e01dbc5`): `SITE.url` in `src/data/site.ts` and `site` in `astro.config.mjs` set to `https://alvarocastilladev.vercel.app` — canonicals, `og:url`, `og:image` and all absolute URLs now resolve to the real deployment. Zero references to any previous/old domain remain in the repository.
- **Sitemap** (`254f6ad`): `@astrojs/sitemap ^3.7.4` integration (`astro.config.mjs`), generating `sitemap-index.xml` + `sitemap-0.xml` with all 10 page URLs. `public/robots.txt` points crawlers to `https://alvarocastilladev.vercel.app/sitemap-index.xml` (ADR-030).
- **Note:** `alvarocastilla.vercel.app` is not part of this project (unrelated deployment) — never referenced in code or docs.

### Validation

- Production: 10/10 routes HTTP 200; canonical/`og:url`/`og:image` correct per page
- Sitemap: 10/10 URLs match the 10 pages in `dist/`; `robots.txt` target exists (200)
- Lint / Typecheck / Format / Build: PASS

### Decisions

- Sitemap served as `sitemap-index.xml` (plugin output; single `sitemap.xml` not supported by `@astrojs/sitemap`) — no custom endpoint, no Vercel rewrites (ADR-030).

### Commits

- `e01dbc5` — `fix: update production site URL`, pushed.
- `254f6ad` — `feat: add sitemap for SEO`, pushed.

### Status

Completed — Phase 7 closed. CI/CD (GitHub Actions) remains Phase 9; automated tests Phase 8.

---

## Final Audit (pre-completion) + Approved Fixes

**Date:** 2026-10-07
**Status:** Completed

### Objective

Full review of the live portfolio before considering the project finished: recruiter / senior-developer / first-time-visitor perspectives, covering first impression, hero, experience, projects, technical credibility, UX/UI, SEO and accessibility. Only high-value issues were to be fixed; no changes for taste.

### Production validation (before fixes)

- Deployment of `254f6ad` validated live (then superseded by docs-only `0126a1a`): robots.txt 200 + exact sitemap reference, `sitemap-index.xml` / `sitemap-0.xml` 200, 10/10 URLs on the correct domain, zero old-domain references, 10/10 routes 200, canonical/`og:url` correct.
- Full link crawl: 14/14 internal links 200, 8/8 GitHub repos 200, both live demos 200 (DetuBarrio, Course Management), CV 200, credentials 200, 404 route works.

### Audit findings

- 🔴 Critical: none.
- 🟠 Approved for fixing (changes 1–3 below): duplicated meta descriptions on 4 pages; "Ver credencial" CTA on the in-progress AWS certification linking to AWS marketing; project order burying Course Management Platform below the desktop TPV.
- 🟠 Deferred by user: deploy Arcadia demo (later phase).
- 🟡 Rejected/deferred by user (changes 5–9): ES/EN language consistency, JSON-LD, h1→h3 heading skip on `/projects` and `/experience`, "8+ tecnologías en producción" wording, extra real metrics on DetuBarrio.

### Implemented (approved fixes)

- **Change 1 — unique meta descriptions:** `/experience`, `/projects` and `/contact` now pass specific, factual descriptions to `BaseLayout` (165/158/140 chars); `/` keeps `PROFILE.bio` (adequate).
- **Change 2 — honest AWS CTA:** `CertificationCard.astro` renders the link label from `certification.status` — `active` → "Ver credencial", otherwise → "Información sobre la certificación" (official AWS page). Badge "En curso" unchanged; the three OpenWebinars credentials keep "Ver credencial".
- **Change 3 — project order:** `PROJECTS` array reordered (display order): Arcadia → DetuBarrio → Course Management Platform → Gestor TPV → App Backend Bottle → Task Management App. Content untouched; Home (featured-only) unaffected.

### Validation

- Typecheck: PASS (0/0/0, 40 files); Lint: PASS; Format: PASS; Build: PASS (10 pages, 115 images)
- dist checks: 10/10 routes; 4 unique meta descriptions (home = original bio verbatim); AWS block has no "Ver credencial" and links to `aws.amazon.com/certification/…`; active certs unchanged; `/projects` order as specified; 14 internal links, 0 broken; `sitemap-0.xml` (10 URLs) and `robots.txt` byte-identical in behavior

### Commits

- `bd9e136` — `fix: unique meta descriptions, honest AWS cert CTA and project order`, pushed.

### Status

Completed — final audit closed with the three approved fixes.

---

## Phase 8 — Testing (Vitest + Playwright)

**Date:** 2026-10-07
**Status:** Completed

### Objective

Add an automated test suite covering data/utility logic (unit) and critical user flows (E2E) against a local build, with no dependency on Vercel or external network.

### Implemented

- **Vitest 5.0.3 + Playwright 1.63.0** as devDependencies, with `vitest.config.ts` and `playwright.config.ts` (Chromium only, `webServer` = `npm run build && npm run preview` on `:4321`, `reducedMotion: 'reduce'`, `reuseExistingServer: !process.env.CI`).
- **3 unit files, 23 tests:** `projects.test.ts` (audited display order, unique ids/hrefs, `/projects/<id>` contract, required fields, colors, https URLs, featured pair, `getProjectRepos`/`getProjectPrimaryRepo`), `site.test.ts` (production `SITE.url`, locale, OG image/CV assets exist, nav routes, real contact/social data), `dates.test.ts` (Spanish date formatting).
- **7 E2E specs, 41 tests:** home, navigation (desktop + mobile menu at 375px), projects (listing + 6 details), contact, theme, responsive (no horizontal overflow), a11y (all 10 routes: one h1, landmarks, accessible names, no duplicate ids).
- **Shared fixture** (`tests/e2e/fixtures.ts`): blocks every request that is not `http://localhost:4321` and fails a test on any uncaught page error.
- **Scripts:** `test`, `test:watch`, `test:e2e`.
- **Docs:** `docs/testing.md` moved from planned to implemented with full coverage; README testing bullet + `tests/` in the structure tree.

### Validation

- format:check / lint / typecheck: PASS (0 errors, 53 files)
- Unit: 23/23 PASS; E2E: 41/41 PASS (local, offline); Build: PASS (10 pages, sitemap OK)

### Decisions

- No unit tests for `projectImages.ts` (Vite/`astro:assets` transforms outside Node), Astro component conditionals, or `hasCv()` (trivial) — justified in `docs/testing.md`.
- E2E imports `PROJECTS`/`NAV_LINKS` from `src/data` (pure modules) but never `profile.ts` (imports `avatar.jpeg`, not portable to Playwright) — contact data asserted as a hardcoded contract.
- Theme test seeds `localStorage` + reload instead of `addInitScript` (which re-seeds on every navigation); mobile nav located by CSS (`nav[aria-label=…]`) because it is `display:none` on desktop and absent from the accessibility tree.

### Commits

- `45321b7` — `test: add Vitest unit tests and Playwright E2E suite`, pushed.

### Status

Completed — 64/64 tests green locally. Phase 9 runs this suite in CI.

---

## Phase 9 — CI/CD (GitHub Actions)

**Date:** 2026-10-07
**Status:** Implemented (validated locally; awaiting commit approval)

### Objective

Automate on GitHub Actions the same quality gates already validated locally (format, lint, typecheck, unit tests, build, E2E) on every push and pull request to `main`, with minimal permissions and no secrets or deployment.

### Implemented

- **`.github/workflows/ci.yml`** — single `CI` workflow: `push` + `pull_request` on `main`; `permissions: contents: read`; concurrency group with `cancel-in-progress`; one `ubuntu-latest` job (15 min timeout) ordered cheap→expensive: `npm ci` (Node 24, npm cache) → format:check → lint → typecheck → unit → build → Playwright Chromium (browser cache keyed by version) → E2E → upload `test-results/` artifact (7 days) only when E2E fails.
- **`playwright.config.ts`:** `retries: process.env.CI ? 2 : 0` — 2 retries on CI only, still 0 locally.
- **README:** CI badge after the intro + `.github/workflows/` in the structure tree (Planned block removed).
- **Docs:** `architecture.md` (Tech Stack testing/CI lines, tree, CI/CD section rewritten — CI no longer depicted as a gate to Vercel), `deployment.md` (overview, roadmap rows 8/9 → completed, diagram, deployment flow, status), `testing.md` (CI note under Validation Commands + Status), this log (Phase 8 retroactive entry + this entry + What Remains).

### Validation

- Workflow YAML parses (`js-yaml`); format:check / lint / typecheck PASS (0 errors, 53 files); unit 23/23; E2E 41/41; build 10 pages.
- GitHub-side (workflow detection + first green run on push) requires push — reported separately after approval.

### Decisions

- Single job, no split: sequential cheap→expensive checks fail fast without duplicating setup (npm ci + Chromium ≈ 1–2 min per extra job).
- `npm run build` kept as an explicit step although Playwright's `webServer` rebuilds (~0.7 s): fails before the ~300 MB Chromium download with a clear step name.
- No secrets / no Vercel access / no CD: deploy remains Vercel's own git integration; CI only reports status on the repository.

### Commits

- Pending — single commit created after user approval (SHA recorded on the next docs sync).

### Status

Implemented — all local validations green; workflow active on first push to `main`.

---

## What Remains (roadmap status)

| Phase | Focus                                                                                                                                       | Status                   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 6.6   | Technical Polish                                                                                                                            | ✅ completed             |
| 7     | Deployment (Vercel) + sitemap                                                                                                               | ✅ completed             |
| —     | Final audit + approved fixes (this entry)                                                                                                   | ✅ completed             |
| 8     | Testing — Vitest (unit) + Playwright (E2E), `tests/` scaffold                                                                               | ✅ completed (`45321b7`) |
| 9     | CI/CD — GitHub Actions (lint + typecheck + tests + build on push/PR)                                                                        | ✅ implemented           |
| 10    | SEO / Discoverability — JSON-LD, unique-per-page social images, heading hierarchy (h1→h3 on `/projects` + `/experience`), sitemap `lastmod` | ⬜ planned (next)        |
| 11    | Final Visual Polish                                                                                                                         | ⬜ planned               |
| 12    | Final Audit (formal, against Phase 8–11 output)                                                                                             | ⬜ planned               |

Deferred beyond the roadmap (user decision):

- Deploy Arcadia to a free host so the flagship backend project has a live demo (audit change 4).
- Audit optionals 5–9: ES/EN copy consistency, "8+ tecnologías" wording, DetuBarrio real metrics.
