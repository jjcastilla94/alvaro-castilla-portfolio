import { expect, test } from './fixtures';

test.describe('theme toggle', () => {
  test('exposes an accessible name', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-label', 'Cambiar tema');
  });

  test('switches dark/light and persists the choice across reloads', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    // Deterministic starting point regardless of the OS color scheme:
    // store an explicit preference and reload so the init script applies it.
    await page.evaluate(() => window.localStorage.setItem('theme', 'dark'));
    await page.reload();
    await expect(html).toHaveClass(/dark/);

    await toggle.click();
    await expect(html).toHaveClass(/light/);
    expect(await page.evaluate(() => window.localStorage.getItem('theme'))).toBe('light');

    await page.reload();
    await expect(html).toHaveClass(/light/);

    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    expect(await page.evaluate(() => window.localStorage.getItem('theme'))).toBe('dark');
  });
});
