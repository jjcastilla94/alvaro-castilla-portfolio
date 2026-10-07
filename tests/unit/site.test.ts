import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PROFILE } from '../../src/data/profile';
import { NAV_LINKS, SITE } from '../../src/data/site';

describe('SITE', () => {
  it('keeps the production Vercel URL as canonical origin', () => {
    expect(SITE.url).toBe('https://alvarocastilladev.vercel.app');
  });

  it('uses the Spanish locale and points the OG image at a real file', () => {
    expect(SITE.locale).toBe('es_ES');
    expect(SITE.ogImage).toBe('/og-image.png');
    expect(existsSync(join(process.cwd(), 'public', SITE.ogImage))).toBe(true);
  });
});

describe('NAV_LINKS', () => {
  it('exposes the four top-level routes in order', () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual([
      '/',
      '/experience',
      '/projects',
      '/contact',
    ]);
  });

  it('has unique, non-empty labels', () => {
    expect(new Set(NAV_LINKS.map((link) => link.label)).size).toBe(NAV_LINKS.length);
    expect(NAV_LINKS.every((link) => link.label.trim() !== '')).toBe(true);
  });
});

describe('PROFILE', () => {
  it('points cvUrl at an existing file in public/', () => {
    expect(existsSync(join(process.cwd(), 'public', PROFILE.cvUrl))).toBe(true);
  });

  it('keeps the real contact email and social profiles', () => {
    expect(PROFILE.email).toBe('alvarocastilla49@gmail.com');
    expect(PROFILE.social.github).toBe('https://github.com/jjcastilla94');
    expect(PROFILE.social.linkedin).toBe('https://www.linkedin.com/in/alvarocastillagonzalez');
  });
});
