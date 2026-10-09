import { PROFILE } from '../data/profile';
import { SITE } from '../data/site';
import { getProjectRepos, type Project } from '../data/projects';

/**
 * JSON-LD builders (Phase 10). Every value comes from real site data
 * (`SITE`, `PROFILE`, `PROJECTS`) — no invented fields. `@context` is added
 * once by `HeadSEO.astro`; builders only return the node(s).
 *
 * Stable IDs (schema.org `@id`) are absolute URLs so entities can reference
 * each other: pages link to `#website` / `#person`, projects to their own
 * canonical `#software`.
 */

const IN_LANGUAGE = 'es';

/** Absolute URL for a site-relative path (keeps external URLs untouched). */
export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE.url}${path}`;
}

/**
 * Absolute URL of the profile photo. Astro resolves the imported asset to an
 * `ImageMetadata` object while plain Vite (unit tests) returns a path string,
 * so both shapes are handled.
 */
function profileImageUrl(): string | undefined {
  const image = PROFILE.image;
  if (!image) return undefined;
  const src = typeof image === 'string' ? image : image.src;
  return typeof src === 'string' && src.length > 0 ? absoluteUrl(src) : undefined;
}

export const WEBSITE_ID = `${SITE.url}/#website`;
export const PERSON_ID = `${SITE.url}/#person`;

/** WebSite node — declared once on the home page. No SearchAction (no search UI). */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    inLanguage: IN_LANGUAGE,
  };
}

/** Person node — home page `@graph`, referenced by every project as author. */
export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    url: `${SITE.url}/`,
    email: PROFILE.email,
    image: profileImageUrl(),
    sameAs: [PROFILE.social.github, PROFILE.social.linkedin],
    inLanguage: IN_LANGUAGE,
  };
}

interface PageSchemaOptions {
  /** Route path, matching the page canonical (e.g. `/experience`). */
  path: string;
  /** Page `<title>` — keeps JSON-LD coherent with the head. */
  name: string;
  /** Page meta description — keeps JSON-LD coherent with the head. */
  description: string;
  /** Defaults to `WebPage`; use `CollectionPage` / `ContactPage` where they fit. */
  type?: 'WebPage' | 'CollectionPage' | 'ContactPage';
}

/** WebPage-family node for a static route, nested under the WebSite node. */
export function pageSchema({ path, name, description, type = 'WebPage' }: PageSchemaOptions) {
  const canonical = `${SITE.url}${path}`;
  return {
    '@type': type,
    '@id': `${canonical}#webpage`,
    url: canonical,
    name,
    description,
    inLanguage: IN_LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/**
 * SoftwareSourceCode node for a project detail page. Only real data:
 * title, canonical description, repository URLs and technology keywords.
 */
export function projectSchema(project: Project, path: string, description: string) {
  const canonical = `${SITE.url}${path}`;
  const repositories = getProjectRepos(project).map((repo) => repo.url);
  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${canonical}#software`,
    url: canonical,
    name: project.title,
    description,
    ...(repositories.length > 0 ? { codeRepository: repositories } : {}),
    keywords: project.technologies.join(', '),
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': `${SITE.url}/projects#webpage` },
    inLanguage: IN_LANGUAGE,
  };
}
