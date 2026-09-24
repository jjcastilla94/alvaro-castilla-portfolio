export type SkillLevel = 'core' | 'working' | 'exposure' | 'complementary';

export type SkillCategory =
  'backend' | 'frontend' | 'databases' | 'infrastructure' | 'tools' | 'cloud' | 'ai' | 'languages';

export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
}

export const SKILLS: Skill[] = [
  // ── CORE ────────────────────────────────────────────────────────
  // Backend
  { name: 'Java', level: 'core', category: 'backend' },
  { name: 'Spring Boot', level: 'core', category: 'backend' },
  { name: 'REST APIs', level: 'core', category: 'backend' },

  // Databases
  { name: 'MySQL / SQL', level: 'core', category: 'databases' },

  // Infrastructure
  { name: 'Docker', level: 'core', category: 'infrastructure' },

  // Tools
  { name: 'Git', level: 'core', category: 'tools' },

  // ── WORKING ─────────────────────────────────────────────────────
  // Backend
  { name: 'BFF', level: 'working', category: 'backend' },
  { name: 'JWT', level: 'working', category: 'backend' },
  { name: 'Hibernate', level: 'working', category: 'backend' },
  { name: 'Spring Security', level: 'working', category: 'backend' },
  { name: 'Spring Data JPA', level: 'working', category: 'backend' },
  { name: 'Lombok', level: 'working', category: 'backend' },
  { name: 'JUnit', level: 'working', category: 'backend' },

  // Frontend
  { name: 'Vue.js', level: 'working', category: 'frontend' },
  { name: 'JavaScript', level: 'working', category: 'frontend' },
  { name: 'TypeScript', level: 'working', category: 'frontend' },
  { name: 'HTML / CSS', level: 'working', category: 'frontend' },

  // Databases
  { name: 'MySQL Workbench', level: 'working', category: 'databases' },

  // Tools
  { name: 'Maven', level: 'working', category: 'tools' },
  { name: 'npm', level: 'working', category: 'tools' },
  { name: 'Postman', level: 'working', category: 'tools' },
  { name: 'GitHub', level: 'working', category: 'tools' },
  { name: 'IntelliJ IDEA', level: 'working', category: 'tools' },

  // ── EXPLORING ───────────────────────────────────────────────────
  // Cloud
  { name: 'AWS', level: 'exposure', category: 'cloud' },

  // Backend / Architecture
  { name: 'Microservicios', level: 'exposure', category: 'backend' },
  { name: 'Arquitectura hexagonal', level: 'exposure', category: 'backend' },
  { name: 'API Gateway', level: 'exposure', category: 'backend' },

  // DevOps / Infra
  { name: 'DevOps', level: 'exposure', category: 'infrastructure' },
  { name: 'CI/CD', level: 'exposure', category: 'infrastructure' },

  // AI
  { name: 'IA', level: 'exposure', category: 'ai' },

  // ── COMPLEMENTARY (DAW / projects) ─────────────────────────────
  // Frontend
  { name: 'Angular', level: 'complementary', category: 'frontend' },
  { name: 'Bootstrap', level: 'complementary', category: 'frontend' },
  { name: 'Sass', level: 'complementary', category: 'frontend' },

  // Languages
  { name: 'Python', level: 'complementary', category: 'languages' },
  { name: 'PHP', level: 'complementary', category: 'languages' },

  // Backend
  { name: 'FastAPI', level: 'complementary', category: 'backend' },
  { name: 'Laravel', level: 'complementary', category: 'backend' },
];

export const LEVELS: {
  key: SkillLevel;
  label: string;
  description: string;
}[] = [
  {
    key: 'core',
    label: 'Core',
    description: 'Stack principal. Tecnologías con las que trabajo de forma habitual.',
  },
  {
    key: 'working',
    label: 'Working Knowledge',
    description: 'Tecnologías con las que puedo trabajar de forma eficiente.',
  },
  {
    key: 'exposure',
    label: 'Explorando',
    description: 'Áreas de interés en las que estoy ampliando conocimientos.',
  },
  {
    key: 'complementary',
    label: 'Complementarias',
    description: 'Tecnologías con las que he trabajado durante mi formación y otros proyectos.',
  },
];
