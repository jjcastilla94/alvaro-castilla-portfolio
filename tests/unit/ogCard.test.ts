import { describe, expect, it } from 'vitest';
import satori from 'satori';

import { PROJECTS } from '../../src/data/projects';
import {
  OG_HEIGHT,
  OG_SLUGS,
  OG_WIDTH,
  cardElement,
  cardFor,
  loadFonts,
  renderCard,
  titleSize,
} from '../../src/utils/ogCard';

function readPngSize(png: Buffer): { width: number; height: number } {
  const isPng = png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect(isPng).toBe(true);
  const isIhdr = png.subarray(12, 16).toString('ascii') === 'IHDR';
  expect(isIhdr).toBe(true);
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

describe('OG cards use only real site data', () => {
  it('lists one slug per page plus one per project', () => {
    expect(OG_SLUGS).toHaveLength(3 + PROJECTS.length);
    expect(new Set(OG_SLUGS).size).toBe(OG_SLUGS.length);
  });

  it('resolves every slug to a fully populated card', () => {
    for (const slug of OG_SLUGS) {
      const card = cardFor(slug);
      expect(card).toBeDefined();
      expect(card?.title.length).toBeGreaterThan(0);
      expect(card?.subtitle.length).toBeGreaterThan(0);
      expect(card?.eyebrow.length).toBeGreaterThan(0);
      expect(card?.path).toMatch(/^\//);
      expect(JSON.stringify(card)).not.toMatch(/undefined|NaN/);
    }
  });

  it('mirrors real project titles and subtitles', () => {
    for (const project of PROJECTS) {
      const card = cardFor(project.id);
      expect(card?.title).toBe(project.title);
      expect(card?.subtitle).toBe(project.subtitle);
      expect(card?.path).toBe(project.href);
    }
  });

  it('rejects unknown slugs', () => {
    expect(cardFor('does-not-exist')).toBeUndefined();
  });
});

describe('title sizing', () => {
  it('shrinks as titles get longer and stays within bounds', () => {
    const sizes = [
      titleSize('a'.repeat(8)),
      titleSize('a'.repeat(20)),
      titleSize('a'.repeat(40)),
      titleSize('a'.repeat(80)),
    ];
    expect(sizes[0]).toBeGreaterThan(sizes[1]);
    expect(sizes[1]).toBeGreaterThan(sizes[2]);
    expect(sizes[2]).toBeGreaterThan(sizes[3]);
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(40);
  });
});

describe('rendering', () => {
  it('produces a valid 1200×630 PNG', async () => {
    const png = await renderCard(cardFor('projects')!);
    expect(readPngSize(png)).toEqual({ width: OG_WIDTH, height: OG_HEIGHT });
  });

  it('is deterministic: rendering the same card twice yields identical bytes', async () => {
    const slug = PROJECTS[0]!.id;
    const first = await renderCard(cardFor(slug)!);
    const second = await renderCard(cardFor(slug)!);
    expect(first.equals(second)).toBe(true);
  }, 30000);
});

describe('nothing overflows the canvas (no clipped text)', () => {
  const fonts = loadFonts();

  for (const slug of OG_SLUGS) {
    it(`${slug} keeps every laid-out node inside the 1200×630 canvas`, async () => {
      const nodes: {
        left: number;
        top: number;
        width: number;
        height: number;
        textContent?: string;
      }[] = [];

      await satori(cardElement(cardFor(slug)!) as Parameters<typeof satori>[0], {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts,
        onNodeDetected: (node) => {
          nodes.push(node);
        },
      });

      expect(nodes.length).toBeGreaterThan(0);
      for (const node of nodes) {
        expect(node.left).toBeGreaterThanOrEqual(-1);
        expect(node.top).toBeGreaterThanOrEqual(-1);
        expect(node.left + node.width).toBeLessThanOrEqual(OG_WIDTH + 1);
        expect(node.top + node.height).toBeLessThanOrEqual(OG_HEIGHT + 1);
      }
    }, 30000);
  }
});
