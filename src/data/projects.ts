export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  href: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'arcadia',
    title: 'Arcadia',
    subtitle: 'Full Stack HTML5 Gaming Platform',
    description: 'Plataforma Full Stack de juegos HTML5.',
    technologies: ['Spring Boot', 'Vue 3', 'MySQL', 'Docker'],
    href: '/projects/arcadia',
  },
  {
    id: 'detubarrio',
    title: 'DetuBarrio',
    subtitle: 'Full Stack Marketplace',
    description: 'Marketplace Full Stack.',
    technologies: ['Spring Boot', 'Vue.js', 'MySQL', 'Docker'],
    href: '/projects/detubarrio',
  },
];
