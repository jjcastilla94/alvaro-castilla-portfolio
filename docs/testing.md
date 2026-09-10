# Testing

## Overview

The project uses a layered testing approach:

- **Unit tests:** Vitest for data validation and utility functions
- **E2E tests:** Playwright for navigation, responsive, and accessibility verification

## Tools

- **Vitest:** Unit testing framework (fast, TypeScript-native)
- **Playwright:** Cross-browser E2E testing

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Unit tests in watch mode
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
npm run test          # Vitest
npm run build         # Astro build
npm run test:e2e      # Playwright
```

## Status

Unit and E2E tests are not yet implemented. They will be added in Phase 7.

## Manual Validation Baseline (Phases 1-5)

Until automated tests exist (Phase 7), every phase is validated with this reproducible manual checklist. Phase 5 (Visual Polish + Animations) added the animation-related checks.

### Static checks (run at every phase)

```bash
npm run lint          # ESLint
npm run typecheck     # Astro + TypeScript
npm run build         # Astro build (confirm expected page count: 6 pages since Phase 4)
npm run format:check  # Prettier (scoped to changed files to avoid unrelated debt)
```

### Runtime checks (dev server)

- All routes return HTTP 200: `/`, `/experience`, `/projects`, `/projects/arcadia`, `/projects/detubarrio`, `/contact`
- Navigation works, `/about` is not present in any navigation link
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

- Hero entrance staggers: name → role → bio → CTAs → socials
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
