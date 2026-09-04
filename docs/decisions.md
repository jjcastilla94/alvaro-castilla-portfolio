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

## ADR-008 — Accent Color: Sky-400 (#38bdf8)

### Context

The design needed an accent color for links, highlights, and CTAs. The default "blue" (#3b82f6) reads as generic/template-like.

### Decision

Use sky-400 (`#38bdf8`) as the accent color in dark mode, and sky-700 (`#0284c7`) in light mode for contrast.

### Reason

Sky-400 is a lighter, more technical tone than the ubiquitous Bootstrap-style blue. It differentiates the portfolio from generic developer templates while remaining sober and professional. It provides sufficient contrast against dark backgrounds for WCAG AA.

### Status

Accepted

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
