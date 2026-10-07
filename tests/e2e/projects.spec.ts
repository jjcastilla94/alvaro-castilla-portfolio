import { PROJECTS } from '../../src/data/projects';
import { expect, test } from './fixtures';

test.describe('/projects listing', () => {
  test('renders a single h1 and links to every project detail', async ({ page }) => {
    const response = await page.goto('/projects');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    for (const project of PROJECTS) {
      await expect(page.locator(`a[href="${project.href}"]`).first()).toBeVisible();
    }
  });
});

test.describe('project detail pages', () => {
  for (const project of PROJECTS) {
    test(`${project.id}: title, breadcrumbs, gallery and back link`, async ({ page }) => {
      const response = await page.goto(project.href);
      expect(response?.status()).toBe(200);

      // Single h1 matching the project title.
      await expect(page.locator('h1')).toHaveText(project.title);

      // Breadcrumbs: "Inicio / Proyectos / <title>".
      const crumbs = page.getByRole('navigation', { name: 'Migas de pan' });
      await expect(crumbs.getByRole('link', { name: 'Proyectos' })).toHaveAttribute(
        'href',
        '/projects',
      );
      await expect(crumbs.locator('span[aria-current="page"]')).toHaveText(project.title);

      // Hero banner uses the project cover image.
      await expect(page.locator(`img[alt="${project.title} — captura"]`)).toBeVisible();

      // Content sections.
      await expect(page.getByRole('heading', { name: 'Acerca del proyecto' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Galería' })).toBeVisible();
      await expect(
        page.getByText(project.technologies[0]!, { exact: false }).first(),
      ).toBeVisible();

      // Repo / demo links point at the right external targets (never opened).
      if (project.github) {
        await expect(page.locator(`a[href="${project.github}"]`).first()).toBeVisible();
      }
      if (project.url) {
        await expect(page.locator(`a[href="${project.url}"]`).first()).toBeVisible();
      }

      // Back to the listing.
      await page.getByRole('link', { name: 'Volver a proyectos' }).click();
      await page.waitForURL((url) => url.pathname === '/projects');
      expect(new URL(page.url()).pathname).toBe('/projects');
    });
  }
});
