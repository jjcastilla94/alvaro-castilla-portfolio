import type { Page } from '@playwright/test';
import { PROJECTS } from '../../src/data/projects';
import { expect, test } from './fixtures';

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, 'page scrolls horizontally').toBeLessThanOrEqual(1);
}

test.describe('mobile viewport (375x812)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const route of ['/', '/projects', PROJECTS[0]!.href]) {
    test(`has no horizontal overflow on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expectNoHorizontalOverflow(page);
    });
  }

  test('hides the desktop nav and shows the menu toggle', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#menu-toggle')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeHidden();
  });
});

test.describe('desktop viewport (1280x720)', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('shows the desktop nav and hides the menu toggle', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
    await expect(page.locator('#menu-toggle')).toBeHidden();
  });
});
