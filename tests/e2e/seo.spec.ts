import { PROJECTS } from '../../src/data/projects';
import { SITE } from '../../src/data/site';
import { expect, test } from './fixtures';

const ROUTES = [
  '/',
  '/experience',
  '/projects',
  '/contact',
  ...PROJECTS.map((project) => project.href),
];

const CANONICAL_BY_ROUTE = new Map<string, string>([
  ['/', `${SITE.url}/`],
  ['/experience', `${SITE.url}/experience`],
  ['/projects', `${SITE.url}/projects`],
  ['/contact', `${SITE.url}/contact`],
  ...PROJECTS.map((project) => [project.href, `${SITE.url}${project.href}`] as const),
]);

const JSON_LD_TYPE_BY_ROUTE = new Map<string, string | null>([
  ['/', 'graph'],
  ['/experience', 'WebPage'],
  ['/projects', 'CollectionPage'],
  ['/contact', 'ContactPage'],
  ...PROJECTS.map((project) => [project.href, 'SoftwareSourceCode'] as const),
]);

function readJsonLd(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const el = document.querySelector('script[type="application/ld+json"]');
    if (!el || !el.textContent) return null;
    return JSON.parse(el.textContent) as Record<string, unknown>;
  });
}

test.describe('JSON-LD — every page', () => {
  for (const route of ROUTES) {
    test(`${route}: valid JSON-LD coherent with its canonical`, async ({ page }) => {
      await page.goto(route);

      const node = await readJsonLd(page);
      expect(node, 'a JSON-LD script must be present').not.toBeNull();
      expect(node?.['@context']).toBe('https://schema.org');

      const canonical = CANONICAL_BY_ROUTE.get(route);
      const expectedType = JSON_LD_TYPE_BY_ROUTE.get(route);

      if (expectedType === 'graph') {
        const graph = node?.['@graph'] as Array<Record<string, unknown>>;
        expect(Array.isArray(graph)).toBe(true);
        const types = graph.map((entry) => entry['@type']);
        expect(types).toEqual(['WebSite', 'Person']);
        const website = graph.find((entry) => entry['@type'] === 'WebSite');
        expect(website?.url).toBe(canonical);
        expect(website?.['@id']).toBe(`${SITE.url}/#website`);
        const person = graph.find((entry) => entry['@type'] === 'Person');
        expect(person?.['@id']).toBe(`${SITE.url}/#person`);
        expect(person?.name).toBe('Alvaro Castilla');
      } else {
        expect(node?.['@type']).toBe(expectedType);
        expect(node?.url).toBe(canonical);
        const idSuffix = expectedType === 'SoftwareSourceCode' ? 'software' : 'webpage';
        expect(node?.['@id']).toBe(`${canonical}#${idSuffix}`);
      }

      // Description stays coherent with the meta description of the page.
      if (expectedType !== 'graph') {
        const metaDescription = await page
          .locator('meta[name="description"]')
          .getAttribute('content');
        expect(node?.description).toBe(metaDescription);
      }

      // Only the approved schemas are ever emitted.
      const serialized = JSON.stringify(node);
      expect(serialized).not.toContain('ProfilePage');
      expect(serialized).not.toContain('SearchAction');
      expect(serialized).not.toContain('BreadcrumbList');
    });
  }

  for (const project of PROJECTS) {
    test(`${project.href}: SoftwareSourceCode carries the real repositories`, async ({ page }) => {
      await page.goto(project.href);

      const node = await readJsonLd(page);
      expect(node?.['@type']).toBe('SoftwareSourceCode');
      expect(node?.name).toBe(project.title);
      expect(node?.keywords).toBe(project.technologies.join(', '));

      const repos = node?.codeRepository as string[];
      expect(Array.isArray(repos)).toBe(true);
      expect(repos.length).toBeGreaterThan(0);
      for (const url of repos) expect(url).toMatch(/^https:\/\/github\.com\//);
    });
  }
});

test.describe('heading hierarchy — no skipped levels', () => {
  for (const route of ROUTES) {
    test(`${route}: h1 → h2 → h3 without skips`, async ({ page }) => {
      await page.goto(route);

      const levels = await page.evaluate(() =>
        Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'), (el) =>
          Number(el.tagName.slice(1)),
        ),
      );

      expect(levels.length).toBeGreaterThan(0);
      expect(levels[0]).toBe(1);

      const skips: string[] = [];
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] > levels[i - 1] + 1) {
          skips.push(`h${levels[i - 1]} → h${levels[i]} at position ${i}`);
        }
      }
      expect(skips).toEqual([]);
    });
  }
});

test.describe('Open Graph / Twitter images — unique per page', () => {
  test('every route exposes the same absolute og:image and twitter:image', async ({ page }) => {
    const images: string[] = [];

    for (const route of ROUTES) {
      await page.goto(route);

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');

      expect(ogImage, `${route}: og:image missing`).toBeTruthy();
      expect(ogImage?.startsWith(`${SITE.url}/`)).toBe(true);
      expect(twitterImage).toBe(ogImage);

      images.push(ogImage as string);
    }

    // One distinct social card per page (10 routes → 10 images).
    expect(new Set(images).size).toBe(ROUTES.length);
  });

  test('every og:image is served as a 1200×630 PNG', async ({ page, request }) => {
    for (const route of ROUTES) {
      await page.goto(route);

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      const pathname = new URL(ogImage as string).pathname;

      const response = await request.get(`http://localhost:4321${pathname}`);
      expect(response.status(), `${route}: ${pathname} not served`).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');

      const png = await response.body();
      expect(png.subarray(12, 16).toString('ascii')).toBe('IHDR');
      expect(png.readUInt32BE(16)).toBe(1200); // width
      expect(png.readUInt32BE(20)).toBe(630); // height
    }
  });
});

test.describe('sitemap — every route with a real lastmod', () => {
  test('lists all 10 routes and dates each one from content, never the build clock', async ({
    request,
  }) => {
    const sitemap = await (await request.get('http://localhost:4321/sitemap-0.xml')).text();

    const urls = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map((match) => match[1]);
    expect(urls).toHaveLength(ROUTES.length);

    const locs = urls.map((entry) => entry.match(/<loc>(.*?)<\/loc>/)?.[1] ?? '');
    for (const route of ROUTES) {
      const expected = route === '/' ? `${SITE.url}/` : `${SITE.url}${route}/`;
      expect(locs).toContain(expected);
    }

    const now = Date.now();
    for (const entry of urls) {
      const loc = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
      const lastmod = entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
      expect(lastmod, `${loc}: missing lastmod`).toBeTruthy();
      const time = new Date(lastmod as string).getTime();
      expect(Number.isNaN(time), `${loc}: invalid lastmod`).toBe(false);
      expect(time, `${loc}: lastmod in the future`).toBeLessThanOrEqual(now);
      // Content date at UTC midnight, not an arbitrary build timestamp.
      expect(lastmod).toMatch(/T00:00:00\.000Z$/);
    }
  });
});
