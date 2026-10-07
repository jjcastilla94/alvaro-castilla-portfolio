import { expect, test as base } from '@playwright/test';

const LOCAL_ORIGIN = 'http://localhost:4321';

/**
 * Extended Playwright `test` used by every E2E spec:
 *
 * - Blocks every network request that is not served by the local preview
 *   server, so the suite runs fully offline (no Google Fonts, no Vercel,
 *   no external demos) — the only Internet requirement is the one-time
 *   `npx playwright install chromium`.
 * - Fails the test automatically if an uncaught JavaScript error fires on
 *   the page during the test.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (url.startsWith(LOCAL_ORIGIN)) return route.continue();
      return route.abort();
    });

    await use(page);

    expect(pageErrors, `Uncaught JS errors: ${pageErrors.join(' | ')}`).toEqual([]);
  },
});

export { expect };
