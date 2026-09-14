# Architecture

## Overview

Personal portfolio for Alvaro Castilla, built as a static site with Astro. It is a presentation and credibility asset: it showcases the author's real professional experience (Cajamar), real projects (Arcadia, DetuBarrio), and engineering practice through the repository itself (small descriptive commits, phased development, documentation, validated builds).

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
├── public/              # Static assets (favicon.ico, favicon.svg, robots.txt, og-image.png, images/, cv/alvaro-castilla-cv.pdf)
├── src/
│   ├── components/
│   │   ├── layout/      # Header.astro, Footer.astro
│   │   ├── sections/    # Hero.astro, About.astro, Architecture.astro, Skills.astro
│   │   ├── seo/         # HeadSEO.astro
│   │   └── ui/          # Button, Card, Reveal, Tag, SectionHeading,
│   │                    # SocialLink, ThemeToggle, ProjectCard, ProjectStatus,
│   │                    # CertificationCard, Breadcrumbs, ServiceCard
│   ├── data/            # profile, projects, experience, skills, site, about, services, certifications, projectStyles
│   ├── layouts/         # BaseLayout.astro
│   ├── pages/           # index, experience, projects, projects/[slug], contact
│   ├── styles/          # global.css (tokens, motion, code-window, stats)
│   └── utils/           # dates.ts (formatDate, formatRange, getYear, formatMonthYear), projectImages.ts (build-time project gallery scanner)
├── docs/                # Project documentation
└── tests/               # Test files (planned, Phase 7)
```

## Data Model

Professional content is separated from presentation in `src/data/`:

- `site.ts` — Site-wide constants (URL, name, OG image, locale, navigation links including "Inicio")
- `profile.ts` — Personal information, contact details, social links, `stack`, `cvUrl` + `hasCv()`, stats array (typed `Stat` interface)
- `experience.ts` — Work experience (typed `ExperienceEntry` interface)
- `projects.ts` — Project details (typed `Project` interface, `color` field; optional `longDescription`, `image`, `gallery`, `problem`, `contribution`, `learnings`, `status`, `github`/`url`, `repositories` for multi-repo projects, `featured`; helpers `getProjectRepos` / `getProjectPrimaryRepo`)
- `skills.ts` — Skills grouped by level `core` / `working` / `exposure` / `complementary` (ADR-025)
- `about.ts` — About section content (intro, current, approach, interests, future, personal note)
- `services.ts` — `CAPABILITIES` framed as "Lo que construyo" (ADR-021)
- `certifications.ts` — Real certifications + AWS AI Practitioner in progress (ADR-023)
- `projectStyles.ts` — Per-color CSS gradients/patterns for project visuals
- `utils/dates.ts` — date formatting helpers used by experience/home
- `utils/projectImages.ts` — build-time project screenshot scanner (`getProjectImages`, `getProjectMainImage`; uses Node `fs` on `public/images/projects/<id>/`, requires `@types/node`)

Components import data from these files — no personal strings are hardcoded in `.astro` files. This rule is validated at each phase.

## Pages

| Route              | Status | Purpose                                                                                                       |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------- |
| `/`                | ✅     | Home — hero (3 CTAs), About, experience, projects, architecture, skills by level, "Lo que construyo", contact |
| `/experience`      | ✅     | Professional experience timeline                                                                              |
| `/projects`        | ✅     | Project listing                                                                                               |
| `/projects/[slug]` | ✅     | Individual project case studies (via `getStaticPaths`)                                                        |
| `/contact`         | ✅     | Contact information (email, GitHub, LinkedIn)                                                                 |

## Design System

- Dark mode as primary theme (`#090a0f` + accent `#3b82f6`), light mode as secondary (`#f8f9ff` + accent `#1d4ed8`) via toggle, flash-free (inline head script).
- Color tokens defined in CSS via Tailwind v4 `@theme` (`--color-*`), overridden per theme on `html.light`.
- Primary CTA fill: dark mode uses `--color-accent-cta` / `--color-accent-cta-hover` (`#1d4ed8`/`#2563eb`, white text AA 6.70:1/5.17:1) via `dark:` on the primary Button only; light mode keeps the accent (ADR-015).
- Typography: **Space Grotesk** (display headings — Hero name, section titles, experience roles, stat values), **Inter** (body text), **JetBrains Mono** (labels, metadata, tags, code).
- Borders: primarily `rounded` / `rounded-lg`; pills reserved for tags/statuses.
- Glassmorphism restricted to floating/substrate elements (navbar, mobile menu, contact card). Content cards stay solid.
- UI primitives: `Button`, `Card`, `Tag`, `SectionHeading` (with gradient rule + display font), `SocialLink`, `ThemeToggle`, `Reveal`, `ProjectCard` (screenshot previews + hover effects), `ProjectStatus` (En producción / En desarrollo / Completado badge), `ProjectGallery` (native-`<dialog>` lightbox, prev/next, Ese/backdrop close, reduced-motion aware), `CertificationCard` (status badge, skills, "Ver credencial"), `Breadcrumbs` (navigation trail for subpages), `ServiceCard` (capability card, "Lo que construyo").
- Projects: cards on Home show only `featured` projects; `/projects` lists all. Detail page (`projects/[slug].astro`) renders banner, status, chips, "Acerca del proyecto", numbered `El problema` / `Mi contribución` / `Lo que aprendí` sections (only when data exists), the gallery, and CTAs — one button per repository (GitHub always when a repo exists; the label comes from `repositories` when present), "Visitar proyecto" only when deployed, and a clarifying note for non-deployed projects. Screenshots live in `public/images/projects/<id>/` and are discovered at build time by `src/utils/projectImages.ts` (`getProjectImages` / `getProjectMainImage`, Node `fs`): `main.png` is the cover (cards + detail banner) and every other image in the folder is the click-to-zoom gallery automatically — no code changes needed when capturing new screenshots. Set `image`/`gallery` in `projects.ts` only to override.
- Hero components: `Hero.astro` (2-col layout, code card with syntax highlighting, 3 CTAs — Ver proyectos / Contactar / Descargar CV conditional on `hasCv()`), `About.astro` (intro + "Mi día a día" + principles grid + "Dónde quiero ir" + interests + "Fuera del código"), `Architecture.astro` (animated diagram section), `Skills.astro` (stack by level + certifications sub-block).
- Scroll progress bar: global gradient bar at the top of the viewport, grows with scroll position.

## Motion System

Added in Phase 5, extended in Phase 6, built entirely with native CSS/JS — no animation library.

- **Reveal on scroll:** `[data-reveal]` elements start visible; the hidden state only applies under `html.js`. A single `IntersectionObserver` in `BaseLayout` adds `.is-visible` on intersection and re-runs on `astro:page-load`. Supports `slide-right`, `slide-in-right` variants and staggered delays.
- **Microinteractions:** button arrow drift + lift, card hover/focus-within (accent border + soft shadow), tag hover, active nav underline (`scaleX`), ProjectCard preview scale + arrow drift + glow border.
- **Hero entrance:** staggered entrance (badge, name, role, bio, CTAs, socials, code card at 0/60/110/170/230/300ms + scroll indicator at 400ms), code card 3D tilt on hover, scroll indicator bounce.
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
- Open Graph tags (including `og:image` with width/height/alt) and Twitter card tags (`summary_large_image`)
- Canonical URLs
- `robots.txt` (allow all)
- `meta name="generator"` (Astro)

Planned (not yet implemented): JSON-LD structured data, sitemap.

## Accessibility

- Semantic HTML (`header`, `main`, `footer`, `nav`, `h1`/`h2` hierarchy, `list` semantics)
- Skip link "Saltar al contenido" → `main#main-content`; `#top` anchor target
- Correct heading levels via `SectionHeading` `level` prop (pages use `level={1}`, sections `level={2}`)
- `aria-current="page"` on active navigation links and breadcrumb trail
- Keyboard navigation with visible focus states (`focus-visible`, `focus-within` on cards)
- WCAG AA contrast (validated tokens: `bg`/`surface`/`text` pairs; dark `text-dim` `#7e8fa6`)
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
