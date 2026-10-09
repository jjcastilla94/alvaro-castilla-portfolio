import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { SITE } from '../data/site';

/**
 * Open Graph card model + renderer (Phase 10).
 *
 * Lives outside the route so it can be unit-tested (layout bounds, real data,
 * determinism). Only real site data is used: page labels/headings, project
 * fields and the identity from `PROFILE`/`SITE`.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const COLORS = {
  bg: '#090a0f',
  border: '#1f2530',
  text: '#f8fafc',
  muted: '#94a3b8',
  dim: '#7e8fa6',
  accent: '#3b82f6',
};

export interface OgCard {
  eyebrow: string;
  title: string;
  subtitle: string;
  path: string;
}

/** Cards for pages other than project details (the home keeps `/og-image.png`). */
const STATIC_CARDS: Record<string, OgCard> = {
  experience: {
    eyebrow: 'Portfolio',
    title: 'Experiencia',
    subtitle: 'Mi trayectoria en el desarrollo backend',
    path: '/experience',
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Proyectos',
    subtitle: 'Lo que he construido',
    path: '/projects',
  },
  contact: {
    eyebrow: 'Portfolio',
    title: 'Contacto',
    subtitle: '¿Hablamos?',
    path: '/contact',
  },
};

export const OG_SLUGS = [...Object.keys(STATIC_CARDS), ...PROJECTS.map((project) => project.id)];

export function cardFor(slug: string): OgCard | undefined {
  const staticCard = STATIC_CARDS[slug];
  if (staticCard) return staticCard;

  const project = PROJECTS.find((entry) => entry.id === slug);
  if (!project) return undefined;

  return {
    eyebrow: 'Proyecto',
    title: project.title,
    subtitle: project.subtitle,
    path: project.href,
  };
}

/** Keeps long titles from being clipped: bigger text only for short titles. */
export function titleSize(title: string): number {
  if (title.length <= 16) return 88;
  if (title.length <= 28) return 72;
  if (title.length <= 44) return 58;
  return 46;
}

export type SatoriElement = { type: string; props: Record<string, unknown> };
export type SatoriFonts = Parameters<typeof satori>[1]['fonts'];

export function loadFonts(): SatoriFonts {
  const fontsource = resolve(process.cwd(), 'node_modules', '@fontsource');
  return [
    {
      name: 'Space Grotesk',
      data: readFileSync(
        resolve(fontsource, 'space-grotesk', 'files', 'space-grotesk-latin-700-normal.woff'),
      ),
      weight: 700,
      style: 'normal',
    },
    {
      name: 'JetBrains Mono',
      data: readFileSync(
        resolve(fontsource, 'jetbrains-mono', 'files', 'jetbrains-mono-latin-400-normal.woff'),
      ),
      weight: 400,
      style: 'normal',
    },
  ];
}

function mono(size: number, color: string, extra: Record<string, unknown> = {}) {
  return { fontFamily: 'JetBrains Mono', fontSize: size, color, ...extra };
}

export function cardElement(card: OgCard): SatoriElement {
  const siteHost = SITE.url.replace(/^https?:\/\//, '');

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: 64,
        backgroundColor: COLORS.bg,
        border: `2px solid ${COLORS.border}`,
        fontFamily: 'Space Grotesk',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: COLORS.accent,
                        },
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: mono(24, COLORS.accent, {
                          textTransform: 'uppercase',
                          letterSpacing: 4,
                        }),
                        children: card.eyebrow,
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: { style: mono(24, COLORS.dim), children: card.path },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 24 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: 700,
                    fontSize: titleSize(card.title),
                    lineHeight: 1.1,
                    letterSpacing: -1,
                    color: COLORS.text,
                  },
                  children: card.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: mono(30, COLORS.muted, { lineHeight: 1.4 }),
                  children: card.subtitle,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            children: [
              { type: 'div', props: { style: mono(24, COLORS.dim), children: siteHost } },
              {
                type: 'div',
                props: {
                  style: mono(24, COLORS.dim),
                  children: `${PROFILE.name} · ${PROFILE.role}`,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/** Renders a card to a 1200×630 PNG. Deterministic: pinned fonts, no system fonts. */
export async function renderCard(card: OgCard): Promise<Buffer> {
  const svg = await satori(cardElement(card) as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: loadFonts(),
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
    font: { loadSystemFonts: false },
  });
  return resvg.render().asPng();
}
