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
