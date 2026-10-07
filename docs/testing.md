# Testing

## Overview

The project follows a layered testing approach (implemented in Phase 8, 2026-10-07):

- **Unit tests:** Vitest for data validation and utility functions
- **E2E tests:** Playwright for navigation, responsive, and accessibility verification

## Tools (installed, Phase 8)

- **Vitest 5** — unit testing (fast, TypeScript-native)
- **Playwright 1.63** — E2E against a local `astro preview` server (Chromium only)

Both are devDependencies. Configuration lives in `vitest.config.ts` and `playwright.config.ts`.

## Running Tests

```bash
# Unit tests
npm test

# Unit tests in watch mode
npm run test:watch

# E2E tests (builds the site and starts a local preview on http://localhost:4321)
npm run test:e2e
```

Playwright needs its browser once per machine: `npx playwright install chromium`.

The E2E suite never depends on Vercel or the Internet: `tests/e2e/fixtures.ts` blocks every request that is not `http://localhost:4321` (Google Fonts, external demos) and fails any test where an uncaught JavaScript error fires.

## Unit Tests

### What They Cover

- `tests/unit/projects.test.ts` — integrity of the 6 projects: audited display order, unique ids/hrefs, `/projects/<id>` contract, required fields, color styles, https URLs, featured pair, plus the `getProjectRepos` / `getProjectPrimaryRepo` logic
- `tests/unit/site.test.ts` — production URL invariant (`SITE.url`), locale, OG image and CV files exist, nav routes, real contact/social data
- `tests/unit/dates.test.ts` — Spanish date formatting (`formatDate`, `formatRange`, `getYear`, `formatMonthYear`)

Deliberately not unit-tested (covered by E2E or too trivial to be useful): `projectImages.ts` (depends on Vite / `astro:assets` transforms outside Node), Astro component conditionals, `hasCv()`.

### Location

```
tests/unit/
```

## E2E Tests

### What They Cover

- `home.spec.ts` — single h1, hero, main nav, CV link (file returns 200), featured project cards, honest certification CTAs, skip link + footer socials
- `navigation.spec.ts` — desktop nav to all 4 sections with `aria-current`, brand link back home, footer routes, mobile menu open/navigate at 375px
- `projects.spec.ts` — listing links to every detail; per detail: 200, h1 = title, breadcrumbs, banner image, content sections, repo/demo hrefs, back navigation
- `contact.spec.ts` — heading, `mailto:` to the real email, CV link, GitHub/LinkedIn hrefs
- `theme.spec.ts` — dark/light toggle with accessible name, persistence across reload
- `responsive.spec.ts` — no horizontal overflow at 375px (3 routes), nav/menu-toggle visibility per viewport
- `a11y.spec.ts` — all 10 routes: exactly one h1, `main#main-content`, labelled navs, skip link target, accessible names on every link/button, no duplicate ids

Every E2E test also inherits two guarantees from the shared fixture: zero uncaught JavaScript errors, and no network access outside the local preview server.

### Location

```
tests/e2e/
```

## Validation Commands

```bash
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run build         # Astro build
npm run format:check  # Prettier
npm test              # Vitest (unit)
npm run test:e2e      # Playwright (E2E)
```

## Status

Phase 8 implemented (2026-10-07): 23 unit tests + 41 E2E tests, all green. The manual baseline below still applies to what automation does not cover (visual polish, motion details, contrast values).

## Manual Validation Baseline (Phases 1-7 + final audit)

Complementing the automated suite (Phase 8), this reproducible manual checklist covers the checks automation does not. Phase 5 (Visual Polish + Animations) added the animation-related checks; Phase 6.5 added the accessibility (skip link, heading levels, `aria-current`), new-section and CV checks; Phase 7 added the sitemap/robots checks; the final audit (2026-10-07) added the meta description, AWS CTA and project order checks.

### Static checks (run at every phase)

```bash
npm run lint          # ESLint
npm run typecheck     # Astro + TypeScript
npm run build         # Astro build (confirm expected page count: 10 pages since Phase 6.5)
npm run format:check  # Prettier
```

### Runtime checks (dev server)

- All routes return HTTP 200: `/`, `/experience`, `/projects`, `/contact` and the 6 project details (`/projects/arcadia`, `/projects/detubarrio`, `/projects/gestor-restaurante-tpv`, `/projects/app-backend-bottle`, `/projects/course-management-platform`, `/projects/task-management-app`) — 10 pages total
- CV asset `/cv/alvaro-castilla-cv.pdf` returns 200 with `application/pdf`
- Hero **Descargar CV** button only renders when `cvUrl` is set; it opens the PDF in a new tab
- Navigation works, `/about` is not present in any navigation link
- `robots.txt` serves with `Sitemap: https://alvarocastilladev.vercel.app/sitemap-index.xml`; `sitemap-index.xml` and `sitemap-0.xml` return 200 with all 10 page URLs (Phase 7)
- Meta descriptions are unique per page: `/` = profile bio; `/experience`, `/projects`, `/contact` = page-specific (final audit, change 1)
- Certification CTAs: active certifications show "Ver credencial" (issuer link); the in-progress AWS certification shows "Información sobre la certificación" → official AWS page — never "Ver credencial" (final audit, change 2)
- `/projects` display order: Arcadia → DetuBarrio → Course Management Platform → Gestor TPV → App Backend Bottle → Task Management App (final audit, change 3)
- Theme toggle works in both directions; no flash on reload; theme persists in `localStorage`
- Mobile menu opens/closes, Escape closes it, `aria-expanded` updates
- Banner: no hidden content — all `[data-reveal]` elements become visible when in viewport
- Reveals do not block scrolling, tab order, or screen reader output (they only toggle CSS classes)

### Responsive (manual, mobile-first)

| Width   | Checks                                                          |
| ------- | --------------------------------------------------------------- |
| 375px   | No horizontal scroll; hero, grid (1 col), timeline, menu usable |
| 412px   | Same as 375px                                                   |
| 768px   | Menu switches to desktop nav; grids in 2 cols                   |
| 1024px  | Desktop layout; header active indicator correct per route       |
| 1280px+ | Centered container, glow contained, readable line lengths       |

### Motion-specific checks (Phase 5)

- Hero entrance staggers: badge → name → role → bio → CTAs → socials (code card and scroll indicator staggered after)
- CTA row responsive: "Ver proyectos" full-width on mobile, secondary pair (Contactar / Descargar CV) shares a row
- Cards reveal with slight rise; grid cards stagger slightly by index
- Button arrow drifts on hover; primary/secondary lift subtly
- Experience timeline shows the current-role pulse dot
- Active nav link shows the underline indicator
- View Transitions: page changes use a fast, subtle fade; no scroll jump; theme persists across navigation

### Reduced motion (`prefers-reduced-motion: reduce` in DevTools)

- All content visible immediately (no hidden `[data-reveal]`)
- No reveals, no keyframe animations (timeline pulse off), no smooth scroll
- Page transitions disabled (instant swap)
- Transform-based movement (hover lifts, arrow drift) is instant; color/state transitions remain
- Site is fully navigable via keyboard

### Contrast (WCAG AA, normal text ≥ 4.5:1)

- Primary CTA (dark mode): white on `#1d4ed8` = 6.70:1, hover `#2563eb` = 5.17:1 (ADR-015)
- Primary CTA (light mode): white on `#1d4ed8` = 6.70:1, hover `#1e40af` = 8.72:1
- Body text: dark `#f8fafc` on `#090a0f` = 18.9:1; light `#0f172a` on `#f8f9ff` = 16.99:1
- Known borderliner (accepted, monitored): `--color-text-dim` in light mode requires checking; in dark it was raised to `#7e8fa6` for AA (Phase 6.5, Block A6)
