import type { APIRoute } from 'astro';

import { OG_SLUGS, cardFor, renderCard } from '../../utils/ogCard';

/**
 * Build-time Open Graph image endpoint (Phase 10).
 *
 * One 1200×630 PNG per page under `/og/<slug>.png`, rendered from real site
 * data only (page labels/headings from the pages, project fields from
 * `PROJECTS`, identity from `PROFILE`/`SITE`). The home page keeps the
 * hand-made `/og-image.png` as the global fallback.
 *
 * Rendering is deterministic across Windows, CI and Vercel: fonts come from
 * pinned npm packages (`@fontsource/*`, woff — satori does not accept woff2)
 * read from `process.cwd()`, and resvg runs with `loadSystemFonts: false` so
 * no OS font is ever involved. The card model and renderer live in
 * `src/utils/ogCard.ts` so they can be unit-tested.
 */

export function getStaticPaths() {
  return OG_SLUGS.map((slug) => ({ params: { slug } }));
}

export const GET = (async ({ params }) => {
  const card = params.slug ? cardFor(params.slug) : undefined;
  if (!card) {
    return new Response(null, { status: 404, statusText: 'Not found' });
  }

  const png = await renderCard(card);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}) satisfies APIRoute;
