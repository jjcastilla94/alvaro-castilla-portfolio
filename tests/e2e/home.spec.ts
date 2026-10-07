import { expect, test } from './fixtures';

test.describe('Home', () => {
  test('renders with a single h1 and a visible hero', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Alvaro');
    await expect(page.getByText('Backend Developer').first()).toBeVisible();
  });

  test('exposes the four main navigation links in the header', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    await expect(nav.getByRole('link', { name: 'Inicio' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Experiencia' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Proyectos' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contacto' })).toBeVisible();
  });

  test('links the CV to an existing local file', async ({ page }) => {
    await page.goto('/');

    const cv = page.getByRole('link', { name: 'Descargar CV' }).first();
    await expect(cv).toHaveAttribute('href', '/cv/alvaro-castilla-cv.pdf');

    const file = await page.request.get('/cv/alvaro-castilla-cv.pdf');
    expect(file.status()).toBe(200);
  });

  test('shows the two featured project cards linking to their details', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('a[href="/projects/arcadia"]').first()).toBeVisible();
    await expect(page.locator('a[href="/projects/detubarrio"]').first()).toBeVisible();
  });

  test('uses the honest certification CTAs (active vs in-progress)', async ({ page }) => {
    await page.goto('/');

    // Active certifications link to their credential.
    await expect(page.getByRole('link', { name: 'Ver credencial' })).toHaveCount(3);
    // The in-progress AWS certification links to the official AWS page instead.
    const awsCta = page.getByRole('link', { name: 'Información sobre la certificación' });
    await expect(awsCta).toHaveCount(1);
    await expect(awsCta).toHaveAttribute('href', /^https:\/\/aws\.amazon\.com\//);
  });

  test('has a skip link targeting main content and social links in the footer', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.locator('a[href="#main-content"]')).toHaveCount(1);
    await expect(page.locator('main#main-content')).toHaveCount(1);

    const footer = page.getByRole('navigation', { name: 'Enlaces del pie de página' });
    await expect(footer).toBeVisible();
    await expect(page.locator('footer a[href="https://github.com/jjcastilla94"]')).toBeVisible();
    await expect(
      page.locator('footer a[href="https://www.linkedin.com/in/alvarocastillagonzalez"]'),
    ).toBeVisible();
  });
});
