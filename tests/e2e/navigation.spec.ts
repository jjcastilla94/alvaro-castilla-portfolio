import { NAV_LINKS } from '../../src/data/site';
import { expect, test } from './fixtures';

test.describe('desktop header navigation', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const link of NAV_LINKS) {
    test(`reaches "${link.label}" and marks it as current page`, async ({ page }) => {
      await page.goto('/');

      const header = page.getByRole('navigation', { name: 'Navegación principal' });
      await header.getByRole('link', { name: link.label }).click();
      await page.waitForURL((url) => url.pathname === link.href);

      expect(new URL(page.url()).pathname).toBe(link.href);
      await expect(header.getByRole('link', { name: link.label })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });
  }

  test('brand link returns to the home page', async ({ page }) => {
    await page.goto('/experience');
    await page.locator('header a[href="/"]').first().click();
    await page.waitForURL((url) => url.pathname === '/');
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('footer navigation exposes the four main routes', async ({ page }) => {
    await page.goto('/');

    const footer = page.getByRole('navigation', { name: 'Enlaces del pie de página' });
    for (const link of NAV_LINKS) {
      await expect(footer.locator(`a[href="${link.href}"]`)).toHaveCount(1);
    }
    await expect(page.locator('footer a[href="#top"]')).toHaveCount(1);
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('opens, shows the links and navigates', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#mobile-menu');

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();

    await menu.getByRole('link', { name: 'Proyectos' }).click();
    await page.waitForURL((url) => url.pathname === '/projects');
    expect(new URL(page.url()).pathname).toBe('/projects');
  });
});
