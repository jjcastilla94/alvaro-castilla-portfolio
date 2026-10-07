import { expect, test } from './fixtures';

test.describe('/contact', () => {
  test('renders the contact heading and a single h1', async ({ page }) => {
    const response = await page.goto('/contact');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Hablamos');
  });

  test('offers a mailto link to the real contact email', async ({ page }) => {
    await page.goto('/contact');

    const mailto = page.locator('a[href^="mailto:"]').first();
    await expect(mailto).toBeVisible();
    await expect(mailto).toHaveAttribute('href', 'mailto:alvarocastilla49@gmail.com');
  });

  test('links the CV to the local file', async ({ page }) => {
    await page.goto('/contact');

    const cv = page.getByRole('link', { name: 'Descargar CV' });
    await expect(cv).toHaveAttribute('href', '/cv/alvaro-castilla-cv.pdf');

    const file = await page.request.get('/cv/alvaro-castilla-cv.pdf');
    expect(file.status()).toBe(200);
  });

  test('links the real GitHub and LinkedIn profiles', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.locator('a[href="https://github.com/jjcastilla94"]').first()).toBeVisible();
    await expect(
      page.locator('a[href="https://www.linkedin.com/in/alvarocastillagonzalez"]').first(),
    ).toBeVisible();
  });
});
