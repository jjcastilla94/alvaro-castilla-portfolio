# Architecture

## Overview

Personal portfolio for Álvaro Castilla, built as a static site with Astro. It is a presentation and credibility asset: it showcases the author's real professional experience (Cajamar), real projects (Arcadia, DetuBarrio), and engineering practice through the repository itself (small descriptive commits, phased development, documentation, validated builds).

## Tech Stack

- **Framework:** Astro (static site generation) + native `astro:transitions` (View Transitions)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration, no `tailwind.config.js`)
- **Fonts:** Inter (body), JetBrains Mono (labels/metadata), Space Grotesk (display headings)
- **Linting:** ESLint + Prettier
- **Testing:** planned — Vitest (unit) + Playwright (E2E), Phase 7
- **CI/CD:** planned — GitHub Actions + Vercel, Phase 8
- **Deployment:** Vercel Free tier (planned Domain: alvarocastilla.vercel.app)

No client-side framework (React/Vue/Svelte). All interactivity is vanilla JS: theme toggle, mobile menu, scroll progress, stats animation, and the reveal system.

## Project Structure

```
alvaro-castilla-portfolio/
├── public/              # Static assets (favicon.ico, favicon.svg)
├── src/
│   ├── components/
│   │   ├── layout/      # Header.astro, Footer.astro
│   │   ├── sections/    # Hero.astro, Architecture.astro
│   │   ├── seo/         # HeadSEO.astro
│   │   └── ui/          # Button, Card, Reveal, Tag, SectionHeading,
│   │                    # SocialLink, ThemeToggle, ProjectCard, Breadcrumbs
│   ├── data/            # profile, projects, experience, skills, site
│   ├── layouts/         # BaseLayout.astro
│   ├── pages/           # index, experience, projects, projects/[slug], contact
│   ├── styles/          # global.css (tokens, motion, code-window, stats)
│   └── utils/           # Utility functions (currently empty)
├── docs/                # Project documentation
└── tests/               # Test files (planned, Phase 7)
```

## Data Model

Professional content is separated from presentation in `src/data/`:

- `site.ts` — Site-wide constants (URL, name, OG image, locale, navigation links including "Inicio")
- `profile.ts` — Personal information, contact details, social links, stats array (typed `Stat` interface)
- `experience.ts` — Work experience (typed `ExperienceEntry` interface)
- `projects.ts` — Project details (typed `Project` interface, with `color` field, optional `longDescription`/`github`)
- `skills.ts` — Technical skills grouped by category (typed `SkillCategory` interface)

Components import data from these files — no personal strings are hardcoded in `.astro` files. This rule is validated at each phase.

## Pages

| Route              | Status     | Purpose                                                                   |
| ------------------ | ---------- | ------------------------------------------------------------------------- |
| `/`                | ✅         | Home — hero, featured experience, projects, skills, contact CTA           |
| `/experience`      | ✅         | Professional experience timeline                                          |
| `/projects`        | ✅         | Project listing                                                           |
| `/projects/[slug]` | ✅         | Individual project case studies (via `getStaticPaths`)                    |
| `/contact`         | ✅         | Contact information (email, GitHub, LinkedIn)                             |
| `/about`           | ⏳ Phase 6 | About — background, skills, evolution (not in navigation until it exists) |

## Design System

- Dark mode as primary theme (`#090a0f` + accent `#3b82f6`), light mode as secondary (`#f8f9ff` + accent `#1d4ed8`) via toggle, flash-free (inline head script).
- Color tokens defined in CSS via Tailwind v4 `@theme` (`--color-*`), overridden per theme on `html.light`.
- Primary CTA fill: dark mode uses `--color-accent-cta` / `--color-accent-cta-hover` (`#1d4ed8`/`#2563eb`, white text AA 6.70:1/5.17:1) via `dark:` on the primary Button only; light mode keeps the accent (ADR-015).
- Typography: **Space Grotesk** (display headings — Hero name, section titles, experience roles, stat values), **Inter** (body text), **JetBrains Mono** (labels, metadata, tags, code).
- Borders: primarily `rounded` / `rounded-lg`; pills reserved for tags/statuses.
- Glassmorphism restricted to floating/substrate elements (navbar, mobile menu, contact card). Content cards stay solid.
- UI primitives: `Button`, `Card`, `Tag`, `SectionHeading` (with gradient rule + display font), `SocialLink`, `ThemeToggle`, `Reveal`, `ProjectCard` (full-width with CSS placeholder previews), `Breadcrumbs` (navigation trail for subpages).
- Hero components: `Hero.astro` (2-col layout, code card with syntax highlighting), `Architecture.astro` (animated diagram section).
- Scroll progress bar: global gradient bar at the top of the viewport, grows with scroll position.

## Motion System

Added in Phase 5, extended in Phase 6, built entirely with native CSS/JS — no animation library.

- **Reveal on scroll:** `[data-reveal]` elements start visible; the hidden state only applies under `html.js`. A single `IntersectionObserver` in `BaseLayout` adds `.is-visible` on intersection and re-runs on `astro:page-load`. Supports `slide-right`, `slide-in-right` variants and staggered delays.
- **Microinteractions:** button arrow drift + lift, card hover/focus-within (accent border + soft shadow), tag hover, active nav underline (`scaleX`), ProjectCard preview scale + arrow drift + glow border.
- **Hero entrance:** staggered entrance (name, role, bio, CTAs, socials at 0/70/140/210/280ms), code card 3D tilt on hover, scroll indicator bounce.
- **Code card:** static `Developer.java` with syntax highlighting (keywords, strings, functions, comments), mac-window dots. Communicates technical competence without fake terminal effects (ADR-017).
- **Animated stats:** count-up animation on home page stats (data-count + data-suffix), easing on intersection, respects reduced motion.
- **Scroll progress bar:** gradient bar at top of viewport, grows with scroll position via `scroll-progress` CSS class.
- **Architecture diagram:** staggered node entry, animated line drawing (`draw-line` keyframe), flow dots (`flow-down` keyframe).
- **Experience timeline:** vertical gradient line with staggered entry, dots with pulse-ring on current role, `slide-right` reveals per entry, `>` marker highlights.
- **Ambient glow:** `.glow-accent` radial gradient behind Hero and Contact using `--color-accent` via `color-mix`.
- **Page transitions:** Astro View Transitions (`<ClientRouter />`) with a fast 160 ms root fade.
- **Breadcrumbs:** `Inicio / Section` navigation trail on all subpages, replacing isolated back-links.

Motion principles: subtle, fast (150–450 ms), purposeful, no hacker/terminal aesthetic. See `docs/decisions.md` (ADR-012/013/014) for the detailed decisions.

## SEO

- Per-page `<title>` and meta description
- Open Graph and Twitter card tags
- Canonical URLs
- `meta name="generator"` (Astro)

Planned (not yet implemented): JSON-LD structured data, sitemap, `robots.txt`.

## Accessibility

- Semantic HTML (`header`, `main`, `footer`, `nav`, `h1`/`h2` hierarchy, `list` semantics)
- Keyboard navigation with visible focus states (`focus-visible`, `focus-within` on cards)
- WCAG AA contrast (validated tokens: `bg`/`surface`/`text` pairs)
- `prefers-reduced-motion`: movement disabled, content always visible, non-problematic state transitions preserved
- Decorative elements marked `aria-hidden="true"`; interactive arrows added as `aria-hidden` spans
- Mobile menu: `aria-expanded`, `aria-controls`, Escape to close

## Responsive Strategy

Mobile-first breakpoints:

| Breakpoint  | Target                      |
| ----------- | --------------------------- |
| < 640px     | Mobile (375-430px)          |
| 640-768px   | Large mobile / small tablet |
| 768-1024px  | Tablet                      |
| 1024-1280px | Desktop                     |
| 1280px+     | Large desktop               |

Decorative effects are clipped to section width (`min(640px, 100%)` glow) and no fixed-width layout sources are used, so 375px is exercised without horizontal overflow.

## CI/CD

Planned for Phase 8:

```
Push/PR → GitHub Actions → Lint + Typecheck + Tests + Build → Vercel → Production
```

## Deployment

Planned for Phase 8:

- **Hosting:** Vercel Free
- **Production:** Auto-deploy from `main` branch
- **Preview:** Auto-deploy from PR branches
- **Domain:** alvarocastilla.vercel.app
