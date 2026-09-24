import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif', 'svg']);

function projectImagesDir(slug: string): string {
  return join(process.cwd(), 'public', 'images', 'projects', slug);
}

function toUrl(slug: string, fileName: string): string {
  return `/images/projects/${slug}/${fileName}`.replaceAll(' ', '%20');
}

/**
 * Lists the screenshot images of a project from `public/images/projects/<slug>/`.
 * `main.png` (or the alphabetical first image) is always returned first so a
 * stable "cover" is used on cards and the detail banner. Extra captures are
 * ordered alphabetically — prefix with `01-`, `02-`, … to control the order.
 */
export function getProjectImages(slug: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(projectImagesDir(slug));
  } catch {
    return [];
  }

  const files = entries
    .filter((file) => {
      const ext = file.split('.').pop()?.toLowerCase() ?? '';
      return IMAGE_EXTENSIONS.has(ext);
    })
    .sort();

  const mainIndex = files.indexOf('main.png');
  if (mainIndex > 0) {
    const [cover] = files.splice(mainIndex, 1);
    files.unshift(cover);
  }

  return files.map((file) => toUrl(slug, file));
}

/** Cover image of a project (first of its gallery images), or undefined. */
export function getProjectMainImage(slug: string): string | undefined {
  return getProjectImages(slug)[0];
}
