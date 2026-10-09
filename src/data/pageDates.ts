/**
 * Explicit sitemap `lastmod` dates (Phase 10).
 *
 * These are hand-maintained dates of the *meaningful content* of each URL,
 * never `new Date()` nor build/deploy timestamps: a build must not make every
 * page look "just updated". Each route holds its own value so a change to one
 * page does not touch the others.
 *
 * When the meaningful content of a page changes, bump only its date here.
 * Values are plain `YYYY-MM-DD` (UTC) and are the real dates taken from the
 * repository history that introduced/updated each page.
 */
export const PAGE_LASTMOD: Record<string, string> = {
  '/': '2026-10-07',
  '/experience': '2026-10-07',
  '/projects': '2026-10-07',
  '/contact': '2026-10-07',
  '/projects/arcadia': '2026-10-07',
  '/projects/app-backend-bottle': '2026-10-07',
  '/projects/course-management-platform': '2026-10-07',
  '/projects/detubarrio': '2026-10-07',
  '/projects/gestor-restaurante-tpv': '2026-10-07',
  '/projects/task-management-app': '2026-10-07',
};

/**
 * Returns the `lastmod` for a pathname as an ISO string, or `undefined` if it
 * is not tracked. Trailing slashes (as emitted by the sitemap) are normalized.
 */
export function lastmodFor(pathname: string): string | undefined {
  const normalized = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  const day = PAGE_LASTMOD[normalized];
  if (!day) return undefined;
  return `${day}T00:00:00.000Z`;
}
