import { describe, expect, it } from 'vitest';
import {
  PROJECTS,
  getProjectPrimaryRepo,
  getProjectRepos,
  type Project,
} from '../../src/data/projects';
import { PROJECT_GRADIENTS, PROJECT_PATTERNS } from '../../src/data/projectStyles';

const EXPECTED_ORDER = [
  'arcadia',
  'detubarrio',
  'course-management-platform',
  'gestor-restaurante-tpv',
  'app-backend-bottle',
  'task-management-app',
];

const VALID_STATUSES = ['active', 'completed', 'in-development'];

describe('PROJECTS integrity', () => {
  it('contains the 6 expected projects in the audited display order', () => {
    expect(PROJECTS.map((project) => project.id)).toEqual(EXPECTED_ORDER);
  });

  it('has unique ids and unique hrefs', () => {
    expect(new Set(PROJECTS.map((project) => project.id)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((project) => project.href)).size).toBe(PROJECTS.length);
  });

  it('derives every href from its id (/projects/<id>)', () => {
    for (const project of PROJECTS) {
      expect(project.href).toBe(`/projects/${project.id}`);
    }
  });

  it('fills every required field with non-empty content', () => {
    for (const project of PROJECTS) {
      expect(project.title.trim()).not.toBe('');
      expect(project.subtitle.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
      expect(project.color.trim()).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.technologies.every((tech) => tech.trim() !== '')).toBe(true);
      expect(VALID_STATUSES).toContain(project.status);
    }
  });

  it('references an existing color style for every project', () => {
    for (const project of PROJECTS) {
      expect(Object.keys(PROJECT_GRADIENTS)).toContain(project.color);
      expect(Object.keys(PROJECT_PATTERNS)).toContain(project.color);
    }
  });

  it('uses well-formed https URLs for repos and demos', () => {
    for (const project of PROJECTS) {
      if (project.github) expect(project.github).toMatch(/^https:\/\/github\.com\//);
      if (project.url) expect(project.url).toMatch(/^https:\/\//);
      for (const repo of project.repositories ?? []) {
        expect(repo.label.trim()).not.toBe('');
        expect(repo.url).toMatch(/^https:\/\/github\.com\//);
      }
    }
  });

  it('marks exactly arcadia and detubarrio as featured (home contract)', () => {
    expect(PROJECTS.filter((project) => project.featured).map((project) => project.id)).toEqual([
      'arcadia',
      'detubarrio',
    ]);
  });
});

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'demo',
    title: 'Demo',
    subtitle: 'Subtitle',
    description: 'Description',
    technologies: ['TypeScript'],
    href: '/projects/demo',
    color: 'arcadia',
    ...overrides,
  };
}

describe('getProjectRepos', () => {
  it('prefers repositories over the single github field', () => {
    const project = makeProject({
      github: 'https://github.com/single/repo',
      repositories: [
        { label: 'App', url: 'https://github.com/multi/app' },
        { label: 'Infra', url: 'https://github.com/multi/infra' },
      ],
    });
    expect(getProjectRepos(project)).toEqual([
      { label: 'App', url: 'https://github.com/multi/app' },
      { label: 'Infra', url: 'https://github.com/multi/infra' },
    ]);
  });

  it('falls back to the single github field', () => {
    const project = makeProject({ github: 'https://github.com/single/repo' });
    expect(getProjectRepos(project)).toEqual([
      { label: 'GitHub', url: 'https://github.com/single/repo' },
    ]);
  });

  it('returns an empty list when the project has no repos', () => {
    expect(getProjectRepos(makeProject())).toEqual([]);
    expect(getProjectRepos(makeProject({ repositories: [] }))).toEqual([]);
  });
});

describe('getProjectPrimaryRepo', () => {
  it('returns the first repository of the list', () => {
    const project = makeProject({
      repositories: [
        { label: 'App', url: 'https://github.com/multi/app' },
        { label: 'Infra', url: 'https://github.com/multi/infra' },
      ],
    });
    expect(getProjectPrimaryRepo(project)).toEqual({
      label: 'App',
      url: 'https://github.com/multi/app',
    });
  });

  it('returns undefined when there are no repos', () => {
    expect(getProjectPrimaryRepo(makeProject())).toBeUndefined();
  });
});
