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
