# Architecture

## Overview

Personal portfolio for Álvaro Castilla, built as a static site with Astro. It is a presentation and credibility asset: it showcases the author's real professional experience (Cajamar), real projects (Arcadia, DetuBarrio), and engineering practice through the repository itself (small descriptive commits, phased development, documentation, validated builds).

## Tech Stack

- **Framework:** Astro (static site generation) + native `astro:transitions` (View Transitions)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration, no `tailwind.config.js`)
- **Linting:** ESLint + Prettier
- **Testing:** planned — Vitest (unit) + Playwright (E2E), Phase 7
- **CI/CD:** planned — GitHub Actions + Vercel, Phase 8
- **Deployment:** Vercel Free tier (planned Domain: alvarocastilla.vercel.app)

No client-side framework (React/Vue/Svelte). All interactivity is vanilla JS: theme toggle, mobile menu, and the reveal system.

## Project Structure

```
alvaro-castilla-portfolio/
├── public/              # Static assets (favicon.ico, favicon.svg)
├── src/
│   ├── components/      # Astro components (UI, layout, SEO)
│   │   ├── layout/      # Header, Footer
│   │   ├── seo/         # HeadSEO
│   │   └── ui/          # Button, Card, Reveal, Tag, SectionHeading, SocialLink, ThemeToggle
│   ├── data/            # Professional data (profile, projects, experience, skills, site)
│   ├── layouts/         # BaseLayout
│   ├── pages/           # Route pages
│   ├── styles/          # global.css (tokens + motion system)
│   └── utils/           # Utility functions (currently empty — helpers kept inline while unused elsewhere)
├── docs/                # Project documentation
└── tests/               # Test files (planned, Phase 7)
```

## Data Model

Professional content is separated from presentation in `src/data/`:

- `site.ts` — Site-wide constants (URL, name, OG image, locale, navigation links)
- `profile.ts` — Personal information, contact details, social links
- `experience.ts` — Work experience (typed `ExperienceEntry` interface)
- `projects.ts` — Project details (typed `Project` interface, optional `longDescription`/`github`)
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
- Typography: Inter (headings, body), JetBrains Mono (labels, metadata, tags).
- Borders: primarily `rounded` / `rounded-lg`; pills reserved for tags/statuses.
- Glassmorphism restricted to floating/substrate elements (navbar, mobile menu, contact card). Content cards stay solid.
- UI primitives: `Button` (primary/secondary/ghost), `Card` (solid/glass), `Tag` (default/accent), `SectionHeading` (optional mono index), `SocialLink`, `ThemeToggle`, `Reveal`.

## Motion System

Added in Phase 5, built entirely with native CSS/JS — no animation library.

- **Reveal on scroll:** `[data-reveal]` elements start visible; the hidden state only applies under `html.js` (added in the head inline script when motion is allowed). A single `IntersectionObserver` in `BaseLayout` adds `.is-visible` on intersection and re-runs on `astro:page-load` (View Transitions aware). Optional `--reveal-delay` enables staggered entrances.
- **Microinteractions:** button arrow drift + lift, card hover/focus-within (accent border + soft shadow), tag hover, active nav underline (`scaleX`).
- **Ambient glow:** `.glow-accent` radial gradient behind Hero and Contact using `--color-accent` via `color-mix` (theme-aware, decorative only).
- **Experience timeline:** vertical line + dots; the current-role dot pulses (`dot-pulse` keyframe).
- **Page transitions:** Astro View Transitions (`<ClientRouter />`) with a fast 160 ms root fade.

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
