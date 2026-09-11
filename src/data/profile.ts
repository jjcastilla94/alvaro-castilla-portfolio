export interface Stat {
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
}

export const PROFILE = {
  name: 'Álvaro Castilla',
  role: 'Backend Developer',
  shortRole: 'Backend Developer',
  tagline: 'Backend Developer · Java · Spring Boot · REST APIs',
  stack: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Docker'],
  bio: 'Backend Developer con experiencia en el desarrollo de APIs REST empresariales con Java y Spring Boot. Enfoque en software mantenible, arquitectura limpia y crecimiento continuo en Ingeniería de Software.',
  email: 'alvarocastilla49@gmail.com',
  cvUrl: '/cv/alvaro-castilla-cv.pdf',
  social: {
    github: 'https://github.com/jjcastilla94',
    linkedin: 'https://www.linkedin.com/in/alvarocastillagonzalez',
  },
  stats: [
    { value: '2026', label: 'En Grupo Cajamar' },
    { value: '2', suffix: '', label: 'Proyectos full-stack', countTo: 2 },
    { value: '6', suffix: '+', label: 'Tecnologías en producción', countTo: 6 },
    { value: 'REST', label: 'APIs en entornos reales' },
  ] satisfies Stat[],
} as const;

export function hasCv(): boolean {
  return Boolean(PROFILE.cvUrl);
}