# Testing

## Overview

The project follows a layered testing approach (**planned — Phase 8**, not yet installed):

- **Unit tests:** Vitest for data validation and utility functions
- **E2E tests:** Playwright for navigation, responsive, and accessibility verification

## Tools (planned, Phase 8)

- **Vitest:** Unit testing framework (fast, TypeScript-native) — not installed yet
- **Playwright:** Cross-browser E2E testing — not installed yet

## Running Tests (Phase 8 — commands do not exist yet)

```bash
# Unit tests (planned)
npm run test

# E2E tests (planned)
npm run test:e2e

# Unit tests in watch mode (planned)
npm run test:watch
```

## Unit Tests

### What They Cover

- Data schema validation (ensure data files match interfaces)
- Utility function correctness (SEO helpers, etc.)

### Location

```
tests/unit/
```

## E2E Tests

### What They Cover

- Navigation (all links work, mobile menu, theme toggle)
- Project pages (listing, individual case studies, back navigation)
- Accessibility (focus states, heading hierarchy, landmarks)
- Responsive (layout adapts, no horizontal scroll)

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
# Planned (Phase 8):
npm run test          # Vitest
npm run test:e2e      # Playwright
```

## Status

Unit and E2E tests are not yet implemented. They will be added in Phase 8 (Testing).

## Manual Validation Baseline (Phases 1-7 + final audit)

Until automated tests exist (Phase 8), every phase is validated with this reproducible manual checklist. Phase 5 (Visual Polish + Animations) added the animation-related checks; Phase 6.5 added the accessibility (skip link, heading levels, `aria-current`), new-section and CV checks; Phase 7 added the sitemap/robots checks; the final audit (2026-10-07) added the meta description, AWS CTA and project order checks.

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
