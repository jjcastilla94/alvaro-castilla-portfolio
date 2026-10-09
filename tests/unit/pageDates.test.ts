import { describe, expect, it } from 'vitest';

import { PAGE_LASTMOD, lastmodFor } from '../../src/data/pageDates';
import { PROJECTS } from '../../src/data/projects';

const ROUTES = [
  '/',
  '/experience',
  '/projects',
  '/contact',
  ...PROJECTS.map((project) => project.href),
];

describe('sitemap lastmod dates', () => {
  it('tracks exactly the public routes', () => {
    expect(Object.keys(PAGE_LASTMOD).sort()).toEqual([...ROUTES].sort());
  });

  it('uses plain YYYY-MM-DD content dates (not build timestamps)', () => {
    for (const [route, day] of Object.entries(PAGE_LASTMOD)) {
      expect(day, route).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(`${day}T00:00:00.000Z`).getTime()), route).toBe(false);
    }
  });

  it('never reports a date in the future', () => {
    const now = Date.now();
    for (const [route, day] of Object.entries(PAGE_LASTMOD)) {
      expect(new Date(`${day}T00:00:00.000Z`).getTime(), route).toBeLessThanOrEqual(now);
    }
  });

  it('resolves tracked paths, including trailing-slash sitemap URLs', () => {
    expect(lastmodFor('/')).toBe('2026-10-07T00:00:00.000Z');
    expect(lastmodFor('/projects/')).toBe('2026-10-07T00:00:00.000Z');
    expect(lastmodFor(`/projects/${PROJECTS[0]!.id}/`)).toBe('2026-10-07T00:00:00.000Z');
  });

  it('returns undefined for unknown paths so they are never mis-dated', () => {
    expect(lastmodFor('/does-not-exist')).toBeUndefined();
  });
});
