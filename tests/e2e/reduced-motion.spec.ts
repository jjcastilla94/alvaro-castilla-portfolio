import { PROJECTS } from '../../src/data/projects';
import { expect, test } from './fixtures';

const ROUTES = ['/', '/experience', PROJECTS[0]!.href];

test.describe('reduced motion (prefers-reduced-motion: reduce)', () => {
  test.use({ reducedMotion: 'reduce' });

  for (const route of ROUTES) {
    test(`${route}: reveal content is visible with no entry transform`, async ({ page }) => {
      await page.goto(route);

      // The reduce branch removes the hidden-by-default state entirely, so the
      // stylesheet shows every reveal immediately instead of animating it in.
      expect(
        await page.evaluate(() => document.documentElement.classList.contains('js')),
        'the .js hidden-by-default state should be off under reduced motion',
      ).toBe(false);

      expect(await page.locator('[data-reveal]').count()).toBeGreaterThan(0);

      const report = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).map((el) => {
          const s = getComputedStyle(el);
          return {
            opacity: s.opacity,
            transform: s.transform,
            display: s.display,
            visibility: s.visibility,
          };
        }),
      );

      const notOpaque = report.filter((r) => r.opacity !== '1');
      const moved = report.filter((r) => r.transform !== 'none');
      const notRendered = report.filter((r) => r.display === 'none' || r.visibility === 'hidden');

      expect(notOpaque, `[data-reveal] not fully visible: ${JSON.stringify(notOpaque)}`).toEqual(
        [],
      );
      expect(moved, `[data-reveal] keeps an entry transform: ${JSON.stringify(moved)}`).toEqual([]);
      expect(notRendered, `[data-reveal] is not rendered: ${JSON.stringify(notRendered)}`).toEqual(
        [],
      );
    });
  }

  test('keyboard navigation still works under reduced motion', async ({ page }) => {
    await page.goto('/');

    const visited: string[] = [];
    const withoutIndicator: string[] = [];

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body || el === document.documentElement) return null;
        const s = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          label: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 30),
          indicator:
            (s.outlineStyle !== 'none' && s.outlineWidth !== '0px') || s.boxShadow !== 'none',
        };
      });
      if (!info) break;

      visited.push(`${info.tag}:${info.label}`);
      if (['a', 'button', 'summary'].includes(info.tag) && !info.indicator) {
        withoutIndicator.push(`${info.tag}:${info.label}`);
      }
    }

    expect(visited.length, 'Tab should reach interactive elements').toBeGreaterThan(3);
    expect(new Set(visited).size, 'focus should move, not get stuck').toBeGreaterThan(3);
    expect(
      withoutIndicator,
      `focused elements without a visible indicator: ${withoutIndicator.join(', ')}`,
    ).toEqual([]);
  });
});
