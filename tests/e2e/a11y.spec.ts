import { PROJECTS } from '../../src/data/projects';
import { expect, test } from './fixtures';

const ROUTES = [
  '/',
  '/experience',
  '/projects',
  '/contact',
  ...PROJECTS.map((project) => project.href),
];

test.describe('basic accessibility — all pages', () => {
  for (const route of ROUTES) {
    test(`${route}: headings, landmarks and accessible names`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // Exactly one h1 and the landmark structure shared by every page.
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#main-content')).toHaveCount(1);
      await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toHaveCount(1);
      // The mobile menu is display:none at desktop widths, so it is not in the
      // accessibility tree — match it by attribute instead of by role.
      await expect(page.locator('nav[aria-label="Navegación móvil"]')).toHaveCount(1);
      await expect(page.getByRole('navigation', { name: 'Enlaces del pie de página' })).toHaveCount(
        1,
      );
      await expect(page.locator('a[href="#main-content"]')).toHaveCount(1);

      // Every link/button has an accessible name, and no duplicate ids exist.
      const problems = await page.evaluate(() => {
        const found: string[] = [];
        const elements = document.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
          'a[href], button',
        );
        for (const el of elements) {
          const name = (el.getAttribute('aria-label') ?? el.textContent ?? '').trim();
          if (!name) {
            found.push(
              `unnamed <${el.tagName.toLowerCase()}> ${el.getAttribute('href') ?? `#${el.id}`}`,
            );
          }
        }

        const ids = Array.from(document.querySelectorAll('[id]'), (el) => el.id);
        const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        if (duplicates.length > 0) found.push(`duplicate ids: ${duplicates.join(', ')}`);

        return found;
      });
      expect(problems).toEqual([]);
    });
  }
});
