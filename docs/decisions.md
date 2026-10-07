# Technical Decisions

## ADR-001 — Astro as Framework

### Context

The portfolio is primarily a static, content-focused website. It does not require client-side interactivity beyond theme toggling and mobile navigation.

### Decision

Use Astro with TypeScript for static site generation.

### Reason

Astro generates zero JavaScript by default, provides excellent SEO, fast builds, and a component model that works without a client-side framework. The portfolio is a presentation site, not a web application.

### Alternatives Considered

- **Next.js / Nuxt:** SSR-focused frameworks with higher complexity. Not needed for a static portfolio.
- **React / Vue SPA:** Requires client-side rendering, worse SEO, unnecessary runtime overhead.
- **Plain HTML/CSS:** No component model, no type safety, harder to maintain.

### Status

Accepted

---

## ADR-002 — Tailwind CSS v4 (CSS-First)

### Context

The project needs a consistent styling system with design tokens (colors, typography, spacing).

### Decision

Use Tailwind CSS v4 with the `@tailwindcss/vite` plugin and CSS-first configuration.

### Reason

Tailwind v4 eliminates the JavaScript config file (`tailwind.config.js`). Configuration happens in CSS using `@theme` blocks. This is simpler, more maintainable, and integrates directly with Vite.

### Key Differences from v3

- No `tailwind.config.js` — configuration is in CSS
- Uses `@tailwindcss/vite` instead of `@astrojs/tailwind`
- Theme customization via `@theme {}` blocks
- Automatic content detection (respects `.gitignore`)

### Status

Accepted

---

## ADR-003 — Dark Mode as Primary Theme

### Context

The portfolio targets a modern, professional aesthetic. Dark mode is preferred as the default experience.

### Decision

Implement dark mode as the primary visual experience, with light mode available via toggle.

### Reason

Dark mode aligns with the professional, tech-oriented aesthetic. User preference is stored in `localStorage` and applied before first paint to avoid flash.

### Status

Accepted

---

## ADR-004 — Data Files over Content Collections

### Context

Professional content (experience, projects, skills) needs to be stored separately from presentation.

### Decision

Use plain TypeScript data files in `src/data/` instead of Astro content collections.

### Reason

For a portfolio with ~8 pages and structured professional data, plain `.ts` files are simpler, more type-safe, and easier to maintain than content collections. Content collections are better suited for blog posts or markdown-heavy sites.

### Status

Accepted

---

## ADR-005 — No Client-Side Framework

### Context

The portfolio is content-heavy, not interactive-heavy.

### Decision

Use only Astro components. No React, Vue, or Svelte.

### Reason

All interactivity (theme toggle, mobile nav) can be handled with minimal vanilla JavaScript (~35 lines total). Adding a client-side framework would increase bundle size and complexity without providing value.

### Status

Accepted

---

## ADR-006 — Vercel for Hosting

### Context

The project needs free, reliable hosting with automatic deployment.

### Decision

Use Vercel Free tier with auto-deploy from GitHub.

### Reason

Vercel provides native Astro support, preview deployments for PRs, HTTPS, and a free tier that exceeds the needs of a static portfolio. No configuration is needed — Vercel detects Astro automatically.

### Status

Accepted

---

## ADR-007 — Typography: Inter + JetBrains Mono

### Context

The portfolio needs a professional, technical typography system. The Stitch reference used a serif editorial font (Instrument Serif) for emphasis.

### Decision

Use Inter for all text and JetBrains Mono for labels, metadata, and tech tags. No serif editorial font.

### Reason

Inter is clean, professional, and highly readable. JetBrains Mono provides a technical feel for labels/tech without falling into "hacker terminal" aesthetics. A serif editorial font would not align with the profile of a Backend Developer. Using two fonts with clear roles avoids visual noise.

### Alternatives Considered

- Instrument Serif italic (from Stitch) — rejected: editorial feel, not appropriate for technical profile
- System fonts only — rejected: less distinctive, harder to control consistency

### Status

Accepted

---

## ADR-008 — Accent Color: Blue-500 (Dark) / Cobalt (Light)

### Context

The design needed an accent color for links, highlights, and CTAs. The default "blue" (#3b82f6) was initially considered generic/template-like, so sky-400 was trialed.

### Decision

Use **blue-500 (`#3b82f6`)** as the accent color in **dark mode**, and **cobalt `#1d4ed8`** (blue-700) as the accent color in **light mode** for contrast.

### Reason

Coherent with the Stitch reference's palette while remaining professional. This combination reads as more sober and credible than the sky-400 tone that was used earlier, and better matches the portfolio's design direction.

### Amendment History

- **Original (superseded):** sky-400 (`#38bdf8`) accent in dark mode, sky-700 (`#0284c7`) in light mode.
- **Amended:** blue-500 (`#3b82f6`) dark / cobalt (`#1d4ed8`) light. Updated September 2026 following visual review; the sky-400 tone stood out as less professional.

### Status

Accepted (Amended)

---

## ADR-009 — Glassmorphism Only for Floating/Overlay Elements

### Context

The Stitch reference used backdrop-blur glassmorphism on all cards. This risks reduced legibility and performance issues.

### Decision

Use glassmorphism (backdrop-blur) only on floating elements: the fixed navbar and the final contact card. Content cards (projects, experience) use solid surfaces.

### Reason

Glassmorphism on solid content surfaces reduces text legibility and can hurt performance. Restricting it to floating/overlay elements (navbar) or final call-to-action (contact) provides depth where appropriate while keeping content areas clean and readable.

### Status

Accepted

---

## ADR-010 — Experience Before Projects on Home

### Context

The portfolio needs to differentiate itself from a purely academic one. Professional experience at Cajamar (GRUPO CAJAMAR) is a differentiator.

### Decision

In the Home page, the Experience section appears immediately after the Hero, before Projects.

### Reason

Professional experience is one of the strongest differentiators of this portfolio versus an academic-only portfolio. Placing it early communicates professional credibility quickly. It also matches the user's priority to give Cajamar prominence.

### Status

Accepted

---

## ADR-011 — Traditional Navigation Instead of Tab Switcher

### Context

The Stitch reference used a pill tab switcher ("Proyectos" / "Información") to switch between views on a single page.

### Decision

Use traditional link-based navigation with separate pages (Experience, Projects, About, Contact) plus a hamburger menu on mobile.

### Reason

Traditional navigation is more accessible, more predictable for users, better for SEO (distinct URLs per page), and more scalable (adding pages like Notes or Certifications later requires no re-architecture). The tab switcher is a clever visual but adds complexity and harms discoverability.

### Status

Accepted

---

## ADR-012 -- Native CSS/JS Motion over Animation Library

### Context

Phase 5 introduces motion: reveals on scroll, hero entrance, microinteractions (hover/focus), and timeline pulse. We need these to be subtle, fast, and respectful of `prefers-reduced-motion`.

### Decision

Use only native browser APIs: CSS transitions, `@keyframes`, pseudoelements (`::before`), and a single `IntersectionObserver`. No animation library (GSAP, Motion One, framer-motion).

The reveal system works as follows:

- Elements opt in with a `data-reveal` attribute (`Reveal.astro` or inline).
- Content is **visible by default**. The hidden state (`opacity: 0; translateY(16px)`) only applies when the `html.js` class is present (added in an inline head script, and only when motion is allowed).
- A single central script in `BaseLayout` observes `[data-reveal]`, adds `.is-visible` on intersection, and re-runs on `astro:page-load` so it keeps working across View Transitions.
- Staggering uses a `--reveal-delay` custom property.

### Reason

The portfolio is a static site with zero client-side framework. A library adds bundle weight and risk for effects that CSS + `IntersectionObserver` cover natively and with the required subtlety. Native APIs are also the simplest path to deterministic `prefers-reduced-motion` handling.

### Alternatives Considered

- **GSAP / Motion One / framer-motion** — rejected: over-engineering for a ~6-page static portfolio; heavier bundles; no additional value for subtle reveals.
- **CSS-only with scroll-driven animations (`animation-timeline`)** — considered, not adopted: support is not consistent across browsers yet.

### Status

Accepted

---

## ADR-013 -- Astro View Transitions for Page Transitions

### Context

Navigating between routes was abrupt (instant full replacement). A fast, subtle cross-fade improves perceived quality without dependency overhead.

### Decision

Enable Astro's native View Transitions via `<ClientRouter />` (imported from `astro:transitions`) in `BaseLayout`, with a 160 ms root animation and `ease-out` timing — subtle and quick.

Condition (approved beforehand): if during implementation/validation they caused issues with navigation, dark/light theme, mobile menu, accessibility, reduced motion, performance, or page behavior, they would be removed and the decision documented as postponed. None of these issues occurred, so the decision stands.

### Reason

View Transitions are built into Astro: zero dependencies, per-page opt-out possible, and accessible fallbacks (`astro-view-transitions-fallback`). Theme and `html` classes persist across navigation on `documentElement`, and the theme init runs before first paint.

### Notes

- Under `prefers-reduced-motion`, `::view-transition-group/old/new` animations are forced to `none`, so navigation falls back to an instant swap.
- The mobile menu state is not persisted across navigation (menu closes), which is correct behavior.

### Status

Accepted

---

## ADR-014 -- Reduced Motion: Disable Movement, Keep State Transitions

### Context

The earlier global rule killed every transition (`transition-duration: 0.01ms !important`) under `prefers-reduced-motion`. The requirement for Phase 5 was more granular: disabling reveals/movement must not mean disabling all visual transitions indiscriminately.

### Decision

Under `prefers-reduced-motion: reduce`:

- **Disabled:** reveals (`[data-reveal]` forced `opacity: 1; transform: none`), all `@keyframes` animations, smooth `scroll-behavior`, and View Transitions (`animation: none` on `::view-transition-*`).
- **Restricted:** `transition-property` reduced to non-movement properties (`color`, `background-color`, `border-color`, `box-shadow`, `opacity`, `fill`, `stroke`), so hover lifts and other transform-based movement snap instead of animating.
- **Preserved:** color/state transitions that are non-problematic.

### Reason

Reduced motion is about removing perceived movement and hidden content, not about making every state change instant. Preserving color/background/border transitions keeps visual feedback usable while eliminating motion. Content visibility is guaranteed: reveal elements are always shown.

### Status

Accepted

---

## ADR-015 -- Dark-Mode Primary CTA Contrast (WCAG AA)

### Context

In dark mode, primary CTA buttons rendered white text on the global accent (`--color-accent` `#3b82f6`), which fails WCAG AA for normal text (3.68:1), and on hover (`--color-accent-hover` `#60a5fa`) it drops to 2.54:1. The accent is part of the approved palette and must not change globally.

### Decision

Add two component-specific tokens used only by the primary Button in dark mode via the `dark:` variant (light mode is already AA-compliant and stays untouched):

- `--color-accent-cta: #1d4ed8` (blue-700) — dark-mode primary CTA fill
- `--color-accent-cta-hover: #2563eb` (blue-600) — dark-mode primary CTA hover

White text contrast: base 6.70:1, hover 5.17:1 (both ≥ 4.5, WCAG AA). Same blue family as the accent (Tailwind palette), no arbitrary hues.

### Reason

A slightly darker blue preserves the visual identity and hover behavior (color still lightens on hover: 700 → 600) while meeting WCAG AA for normal text. The change is scoped to the primary Button only; `secondary` and `ghost` variants, Tags, cards, glow, and the global accent are unaffected.

### Status

Accepted

---

## ADR-016 — Space Grotesk as Display Font

### Context

The reference site (sergio-perez-planells.netlify.app) uses Space Grotesk for headings and display text, creating visual hierarchy between section titles and body content. The current typography system uses Inter for everything and JetBrains Mono for labels.

### Decision

Add Space Grotesk via Google Fonts as a third font role: **display headings** (Hero name, section titles, experience roles, stat values). Token `--font-display` defined in `global.css`.

### Reason

Space Grotesk provides visual weight and hierarchy for section headings, making the portfolio feel more polished and less flat. It aligns with the reference site's professional aesthetic while fitting a backend developer's profile. The three-font system is clear: Space Grotesk (display), Inter (body), JetBrains Mono (code/labels).

### Status

Accepted

---

## ADR-017 — Static Code Card in Hero (No Fake Terminal)

### Context

The reference site shows a `Developer.java` code card in the Hero section, communicating technical competence at a glance. The user's rules explicitly prohibit fake terminal effects, typing animations, blinking cursors, and Matrix aesthetic.

### Decision

Implement a **static code card** showing `Developer.java` with syntax highlighting (keywords, strings, functions, comments), mac-window dots, and 3D tilt on hover. No typing animation, no cursor, no blinking.

### Reason

A static code card communicates "this person writes code" instantly, without the gimmick of fake terminal effects. The syntax highlighting demonstrates familiarity with Java/Spring ecosystem. The 3D tilt adds interactivity while remaining professional. This balances the user's aesthetic rules with the visual impact the reference site achieves.

### Alternatives Considered

- **Typed code animation** — rejected: violates "no fake terminal" rule, adds complexity for transient visual effect
- **Syntax-highlighted without interactivity** — considered, but the tilt provides engagement without gimmick
- **Interactive editor** — rejected: would require client-side framework, over-engineering

### Status

Accepted

---

## ADR-018 — Animated Stats Counters

### Context

Professional metrics (years, projects, technologies) on the home page are static text. A subtle count-up animation adds dynamism and draws attention to key numbers.

### Decision

Use `data-count` and `data-suffix` attributes on stat elements, with a JavaScript count-up animation that triggers on intersection. Numbers animate from 0 (or the base value) to the target with `ease-out` timing over 900ms.

### Reason

Count-up animations are a well-established pattern for making metrics feel dynamic without being distracting. The animation is short, respects `prefers-reduced-motion` (numbers shown instantly), and adds visual interest to what would otherwise be a static row. No library needed — a single `requestAnimationFrame` loop with easing is sufficient.

### Status

Accepted

---

## ADR-019 — Breadcrumbs on All Subpages

### Context

The portfolio had no navigation trail on internal pages. Users who arrive at `/experience` or `/projects/arcadia` (e.g., from a direct link) have no visual indication of where they are in the site hierarchy, and the only way back was the main nav or a "Volver" back-link on project detail pages.

### Decision

Add a `Breadcrumbs.astro` component that renders `Inicio / Section` on all subpages. On project detail pages: `Inicio / Proyectos / ProjectName` with linked intermediate crumbs.

### Reason

Breadcrumbs provide spatial context on internal pages and improve navigation for direct-link visitors. They replace the isolated "Volver a todos los proyectos" back-link with a full navigation trail. The implementation is simple (no schema/JSON-LD, just visual), and the `Inicio` crumb always links home — matching the newly added "Inicio" nav link.

### Status

Accepted

---

## ADR-020 — No "Junior" as Primary Professional Title

### Context

The home hero and header displayed "Junior Backend Developer". The label reflected seniority more than role and undermined the positioning of a developer already working in production environments (Grupo Cajamar, Apificación).

### Decision

Use "Backend Developer" as the primary title everywhere (`role`, `shortRole`, header, hero badge). Drop "Junior" from visible UI. Seniority nuance may live in the bio copy, not the title.

### Reason

"Junior" biases perception of competence and is redundant with a factual experience timeline. The role (Backend Developer) describes what the person does; the experience section describes the level. No invented data — the title matches the confirmed professional role.

### Status

Accepted

---

## ADR-021 — Services Framed as "Lo que construyo"

### Context

The proposed "Servicios" section described what the developer can build as an offer. A services/agency framing implies freelance or marketable offerings that were not requested.

### Decision

Frame the section as "Lo que construyo" (what I build) instead of "Servicios". The data lives in `src/data/services.ts` as `CAPABILITIES` (title, description, technologies) and is rendered with a dedicated `ServiceCard.astro` in a 2x2 grid at home section 06.

### Reason

The language describes demonstrated capabilities (APIs, microservices, clean architecture, integrations) rather than a commercial services menu. It stays honest to the content and avoids inventing a transactional offer.

### Status

Accepted

---

## ADR-022 — Hero CTA Strategy: 3 Actions, CV Conditional

### Context

The hero needed clear next actions. A single CTA (or the previous layout) did not distinguish between browsing and contacting. A CV download button was desired and the user later provided the CV file.

### Decision

Render three CTAs: **Ver proyectos** (primary, → `/projects`), **Contactar** (secondary, → `/contact`), and **Descargar CV** (secondary + download icon) which is rendered **only when** `PROFILE.hasCv()` is true. The CV PDF is placed at `public/cv/alvaro-castilla-cv.pdf` and `cvUrl` is set to `/cv/alvaro-castilla-cv.pdf`; the button opens it in a new tab (`target="_blank"`) so the browser PDF viewer can display and save it.

### Reason

`hasCv()` guarantees no broken links or empty buttons when no CV is available — the button only renders once `cvUrl` is set, which is now the case. Opening in a new tab both displays the PDF and exposes the viewer's save/download action, matching the "download and open" intent without JS hacks or file-system access.

### Status

Accepted

---

## ADR-023 — Certifications Deferred Until Real Data Exists

### Context

Phase 6.5 planned a Certificaciones section. No certifications, dates, issuers, or URLs are confirmed.

### Decision

Create `src/data/certifications.ts` with an empty array (`TODO_ALVARO`). Do not render a Certificaciones section anywhere until the array is populated.

### Reason

The "no invented data" rule. An empty rendered section would look broken; a filled one would be fabricated. Deferring keeps the model ready while the UI stays clean.

### Status

Accepted — superseded in Phase 6.5 Block 6.5-D, when the user provided real certifications and `certifications.ts` was populated (Spring Boot/MVC 5, JavaScript Asincronía/Prototipos/Clases, Sass, AWS AI Practitioner in-progress), rendered as a "Formación & Certificaciones" sub-block in the Skills section (Home) via `CertificationCard.astro`.

---

## ADR-024 — Project Detail Shows longDescription OR description, Not Both

### Context

Project detail pages rendered two paragraphs: `project.description` and (if present) `project.longDescription`, which were near-duplicates and read as a redundant wall of text.

### Decision

Render a single paragraph: `project.longDescription || project.description`.

### Reason

Each project has one authoritative narrative. `longDescription` is the expanded version when it exists; `description` is the fallback. This removes duplication without losing information.

### Status

Accepted

---

## ADR-025 — Skills Modeled as Core / Working / Exposure

### Context

Previous skills UI rolled all skills into a flat list. The developer works daily with some technologies and has varying depth in others.

### Decision

Model skills in `src/data/skills.ts` with three levels: `core` (main/proficient), `working` (used, gaining depth), `exposure` (used/experimented). The home Skills section (05) renders three groups with a Tag accent on `core` items; an `accentedOnly` prop filters to the core set for compact displays.

### Reason

Levels communicate honest depth without inventing metrics or percentages. They are qualitative (core/working/exposure), not quantitative, so they cannot be called fabrications.

### Status

Accepted

### Update (Phase 6.5, 2026-09-14)

A fourth level was added: `complementary` (adjacent/less-used technologies), giving the full type `core | working | exposure | complementary`. The data was flattened to a single `SKILLS: Skill[]` array (`level` + `category` fields) instead of grouped lists, the home Skills section renders four groups, and the `accentedOnly` prop was removed — every `core` item is an equal-weight accent tag. The rationale (honest qualitative depth, no metrics) is unchanged.

---

## ADR-026 — Project Images Auto-Discovered from a Folder

### Context

Adding a project required wiring images by hand (an `image`/`gallery` list per project), and the user planned several more projects whose screenshots they want to drop in without touching code.

### Decision

Screenshots live in `public/images/projects/<id>/` and are discovered at build time by `src/utils/projectImages.ts` (Node `fs`). `main.png` is the cover (cards + detail banner); every other image in the folder is the detail-page gallery automatically. Sorting is alphabetical with `main.png` forced first (prefix `01-`, `02-`, … to control order). `image`/`gallery` in `projects.ts` remain as optional per-project overrides.

### Reason

The maintenance cost is zero for the user: dropping captures in a folder updates covers and the click-to-zoom gallery on rebuild. Static Astro output makes build-time `fs` scanning reliable (Node-only import, requires `@types/node`).

### Status

Accepted

### Update (Phase 6.6, 2026-10-07)

The folder moved from `public/images/projects/<id>/` to `src/assets/projects/<id>/` and the scanner now uses `import.meta.glob` (eager) instead of Node `fs`, so every screenshot is processed by `astro:assets`: `<Image />` output (WebP + srcset + automatic dimensions) instead of raw PNGs served from `public/`. The discovery contract is unchanged — drop captures in the folder, `main.png` is the cover, alphabetical order with `main.png` first, `image`/`gallery` still work as optional overrides (now typed `ImageMetadata`).

---

## ADR-027 — Project Detail Structured Sections, Rendered Only When Data Exists

### Context

Detail pages were a photo + one long paragraph — thin for recruiters. The original short `description`/`longDescription` pair was already simplified (ADR-024).

### Decision

The detail page renders three numbered sections — **El problema**, **Mi contribución**, **Lo que aprendí** — each from an optional project field, plus the screenshot gallery and clear link CTAs. Sections are rendered only when their data field is present, so partial projects degrade gracefully.

### Reason

The structure scaffolds a professional case study without inventing content: fields stay optional and the "no invented data" rule holds. It also gives the detail page a consistent, recruiter-friendly reading order.

### Status

Accepted

---

## ADR-028 — Multi-Repository Projects via a `repositories` List

### Context

Course Management Platform lives across two repos (application development + containerization/deployment/CI-CD). A single `github` URL could not represent both, and the deployment repo is as relevant as the code repo.

### Decision

`Project` gains `repositories?: { label, url }[]` used when a project has several repos (e.g. "Desarrollo", "Despliegue e infraestructura"). Helpers `getProjectRepos` (returns `repositories`, falling back to a single `GitHub` entry from `github`) and `getProjectPrimaryRepo` (first entry, used on cards) centralize the logic. The detail page renders one real button per repository with its label; cards show the primary repo. Non-deployed projects show their repo buttons plus a clarifying "sin despliegue en producción todavía" note instead of a dead CTA.

### Reason

Both repos are real, clickable and accurately labeled, keeping the rule that every visible link must resolve. Cards stay uniform (single primary hint) while the detail page carries the full repo list.

### Status

Accepted

---

## ADR-029 — Status Badge Color Language

### Context

`status` had three values (`'active' | 'completed' | 'in-development'`) but the badge visuals and wording were worth a design decision that reads well to recruiters on small previews and large covers.

### Decision

`ProjectStatus.astro` maps each status to a color + dot language in the design tokens: **En producción** (emerald, pulse "live" dot via `animate-ping`), **En desarrollo** (amber), **Completado** (neutral). The pulse is neutralized by the global `prefers-reduced-motion` override.

### Reason

Green/amber/neutral gives an at-a-glance lifecycle signal consistent across cards and detail banners, using literal labels (no invented metrics) and respecting the site's motion policy.

### Status

Accepted

---

## ADR-030 — Sitemap via `@astrojs/sitemap` (`sitemap-index.xml`, No Custom Endpoint)

### Context

Phase 7 (deployment) required an SEO sitemap for the production site (`https://alvarocastilladev.vercel.app`). Common convention and many guides assume a single `/sitemap.xml`; `@astrojs/sitemap` however emits a sitemap **index** file (`sitemap-index.xml`) pointing at one or more child sitemaps, and provides no option to output a plain `sitemap.xml`.

### Decision

Use the official `@astrojs/sitemap` integration configured with `site: 'https://alvarocastilladev.vercel.app'` in `astro.config.mjs`. The canonical sitemap entry point is **`/sitemap-index.xml`**, declared in `public/robots.txt` (`Sitemap:` line). No custom endpoint, no `sitemap.xml` alias, and no Vercel rewrite/redirect are configured.

### Reason

- The official integration always matches the build output (all 10 pages, updated automatically when pages are added) — a hand-rolled endpoint would duplicate that logic and could drift out of sync.
- `sitemap-index.xml` is fully valid per the sitemap protocol; Google and other crawlers consume it via the `Sitemap:` directive, so a `sitemap.xml` alias adds no SEO value.
- A rewrite would add platform-specific configuration (Vercel) to an otherwise portable static build.

### Alternatives Considered

- **Custom `/sitemap.xml` endpoint or Vercel rewrite:** rejected — duplicates plugin logic, couples config to one host.
- **Hand-maintained static `sitemap.xml`:** rejected — must be edited on every page addition; drift risk.
- **Another sitemap generator:** unnecessary — `@astrojs/sitemap` is the official Astro integration, zero-config, build-time only.

### Status

Accepted
