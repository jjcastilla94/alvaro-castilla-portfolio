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
