// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { lastmodFor } from './src/data/pageDates.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://alvarocastilladev.vercel.app',
  integrations: [
    sitemap({
      // `lastmod` comes from real content dates (see `pageDates.ts`), never
      // from the build clock, so deploys do not fake freshness.
      serialize(item) {
        const lastmod = lastmodFor(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
