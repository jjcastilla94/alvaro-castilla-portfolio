import type { Page } from '@playwright/test';
import { PROJECTS } from '../../src/data/projects';
import { expect, test } from './fixtures';

const ROUTES = ['/', '/experience', '/projects', '/contact', ...PROJECTS.map((p) => p.href)];

const MAX_TABS = 200;

interface FocusInfo {
  done: boolean;
  seenBefore?: boolean;
  tag?: string;
  id?: string;
  text?: string;
  hasFocusRing?: boolean;
  visible?: boolean;
}

/**
 * Reads the currently focused element, marks it so a full keyboard pass can be
 * detected (the probe attribute is set once per element), and reports whether it
 * shows a visible focus indicator (a non-zero outline or a ring box-shadow).
 */
function probeFocused(page: Page): Promise<FocusInfo> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body || el === document.documentElement) {
      return { done: true };
    }
    const seenBefore = el.hasAttribute('data-focus-probe');
    el.setAttribute('data-focus-probe', '1');
    const s = getComputedStyle(el);
    const outlineVisible = s.outlineStyle !== 'none' && s.outlineWidth !== '0px';
    const shadowVisible = s.boxShadow !== 'none';
    return {
      done: false,
      seenBefore,
      tag: el.tagName.toLowerCase(),
      id: el.id,
      text: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 40),
      hasFocusRing: el.classList.contains('focus-ring'),
      visible: outlineVisible || shadowVisible,
    };
  });
}

test.describe('focus visibility — keyboard navigation', () => {
  for (const route of ROUTES) {
    test(`${route}: every tabbable element shows a visible focus indicator`, async ({ page }) => {
      await page.goto(route);

      const missing: string[] = [];
      let visited = 0;
      let withRing = 0;

      for (let i = 0; i < MAX_TABS; i++) {
        await page.keyboard.press('Tab');
        const info = await probeFocused(page);
        if (info.done || info.seenBefore) break;
        visited += 1;
        if (info.hasFocusRing) withRing += 1;
        if (!info.visible) {
          missing.push(`<${info.tag}>${info.id ? `#${info.id}` : ''} "${info.text}"`);
        }
      }

      expect(visited, 'the keyboard sweep should reach interactive elements').toBeGreaterThan(5);
      expect(withRing, 'expected the focus-ring treatment to be used').toBeGreaterThan(0);
      expect(missing, `elements without a visible focus indicator:\n${missing.join('\n')}`).toEqual(
        [],
      );
    });
  }
});
