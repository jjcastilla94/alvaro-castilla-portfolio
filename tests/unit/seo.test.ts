import { describe, expect, it } from 'vitest';
import { PROJECTS, getProjectRepos } from '../../src/data/projects';
import { PROFILE } from '../../src/data/profile';
import { SITE } from '../../src/data/site';
import {
  PERSON_ID,
  WEBSITE_ID,
  pageSchema,
  personSchema,
  projectSchema,
  websiteSchema,
} from '../../src/utils/seo';

const HOME_GRAPH = { '@graph': [websiteSchema(), personSchema()] };

describe('home JSON-LD (@graph)', () => {
  it('declares WebSite and Person with stable absolute @ids', () => {
    expect(HOME_GRAPH['@graph']).toHaveLength(2);
    expect(websiteSchema()['@type']).toBe('WebSite');
    expect(websiteSchema()['@id']).toBe(`${SITE.url}/#website`);
    expect(personSchema()['@type']).toBe('Person');
    expect(personSchema()['@id']).toBe(`${SITE.url}/#person`);
  });

  it('uses only real profile data on the Person node', () => {
    const person = personSchema();
    expect(person.name).toBe(PROFILE.name);
    expect(person.jobTitle).toBe(PROFILE.role);
    expect(person.email).toBe(PROFILE.email);
    expect(person.sameAs).toEqual([PROFILE.social.github, PROFILE.social.linkedin]);
  });

  it('never emits SearchAction, ProfilePage or BreadcrumbList', () => {
    const serialized = JSON.stringify(HOME_GRAPH);
    expect(serialized).not.toContain('SearchAction');
    expect(serialized).not.toContain('ProfilePage');
    expect(serialized).not.toContain('BreadcrumbList');
  });
});

describe('page schemas', () => {
  const cases = [
    { path: '/experience', type: 'WebPage' },
    { path: '/projects', type: 'CollectionPage' },
    { path: '/contact', type: 'ContactPage' },
  ] as const;

  for (const { path, type } of cases) {
    it(`${path} emits ${type} matching its canonical URL`, () => {
      const node = pageSchema({ path, name: 'Título', description: 'Descripción', type });
      expect(node['@type']).toBe(type);
      expect(node.url).toBe(`${SITE.url}${path}`);
      expect(node['@id']).toBe(`${SITE.url}${path}#webpage`);
      expect(node.isPartOf).toEqual({ '@id': WEBSITE_ID });
      expect(node.inLanguage).toBe('es');
    });
  }
});

describe('project schemas', () => {
  for (const project of PROJECTS) {
    it(`${project.id} emits SoftwareSourceCode from real project data`, () => {
      const canonicalPath = `/projects/${project.id}`;
      const node = projectSchema(project, canonicalPath, project.description);

      expect(node['@type']).toBe('SoftwareSourceCode');
      expect(node.url).toBe(`${SITE.url}${canonicalPath}`);
      expect(node['@id']).toBe(`${SITE.url}${canonicalPath}#software`);
      expect(node.name).toBe(project.title);
      expect(node.description).toBe(project.description);
      expect(node.keywords).toBe(project.technologies.join(', '));
      expect(node.author).toEqual({ '@id': PERSON_ID });
      expect(node.isPartOf).toEqual({ '@id': `${SITE.url}/projects#webpage` });
    });

    it(`${project.id} lists its real repository URLs`, () => {
      const repos = getProjectRepos(project);
      expect(repos.length).toBeGreaterThan(0);

      const node = projectSchema(project, `/projects/${project.id}`, project.description);
      expect(node.codeRepository).toEqual(repos.map((repo) => repo.url));
      for (const url of node.codeRepository as string[]) {
        expect(url).toMatch(/^https:\/\/github\.com\//);
      }
    });
  }

  it('keeps every project id unique so @ids never collide', () => {
    const ids = PROJECTS.map(
      (project) => projectSchema(project, `/projects/${project.id}`, '')['@id'],
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
