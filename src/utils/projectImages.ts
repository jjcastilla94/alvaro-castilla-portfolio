type ProjectImageModule = { default: ImageMetadata };

const imageModules = import.meta.glob<ProjectImageModule>(
  '../assets/projects/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

function buildGalleries(): Map<string, ImageMetadata[]> {
  const galleries = new Map<string, { fileName: string; image: ImageMetadata }[]>();

  for (const [path, module] of Object.entries(imageModules)) {
    // Keys look like `../assets/projects/<slug>/<file>.png` (always POSIX slashes).
    const match = path.match(/^..\/assets\/projects\/([^/]+)\/([^/]+)$/);
    if (!match) continue;
    const [, slug, fileName] = match;

    const files = galleries.get(slug) ?? [];
    files.push({ fileName, image: module.default });
    galleries.set(slug, files);
  }

  const sorted = new Map<string, ImageMetadata[]>();
  for (const [slug, files] of galleries) {
    files.sort((a, b) => a.fileName.localeCompare(b.fileName));

    const mainIndex = files.findIndex((file) => file.fileName === 'main.png');
    if (mainIndex > 0) {
      const [cover] = files.splice(mainIndex, 1);
      files.unshift(cover);
    }

    sorted.set(
      slug,
      files.map((file) => file.image),
    );
  }

  return sorted;
}

const galleries = buildGalleries();

/**
 * Lists the screenshot images of a project from `src/assets/projects/<slug>/`.
 * Images are discovered at build time with `import.meta.glob` and processed by
 * `astro:assets` (`<Image />`): automatic dimensions, WebP output and srcset.
 * `main.png` (or the alphabetical first image) is always returned first so a
 * stable "cover" is used on cards and the detail banner. Extra captures are
 * ordered alphabetically — prefix with `01-`, `02-`, … to control the order.
 */
export function getProjectImages(slug: string): ImageMetadata[] {
  return [...(galleries.get(slug) ?? [])];
}

/** Cover image of a project (first of its gallery images), or undefined. */
export function getProjectMainImage(slug: string): ImageMetadata | undefined {
  return getProjectImages(slug)[0];
}
