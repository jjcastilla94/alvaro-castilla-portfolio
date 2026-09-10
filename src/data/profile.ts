export interface Stat {
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
}

export const PROFILE = {
  name: 'Álvaro Castilla',
  role: 'Backend Developer',
  bio: 'Backend Developer con experiencia en APIs REST empresariales. Java, Spring Boot, arquitectura por capas y buenas prácticas de software.',
  email: 'alvarocastilla49@gmail.com',
  social: {
    github: 'https://github.com/jjcastilla94',
    linkedin: 'https://www.linkedin.com/in/alvarocastillagonzalez',
  },
  stats: [
    { value: '2026', label: 'Desde en Grupo Cajamar' },
    { value: '2', suffix: '', label: 'Proyectos full-stack', countTo: 2 },
    { value: '6', suffix: '+', label: 'Tecnologías en producción', countTo: 6 },
    { value: 'REST', label: 'APIs en entornos reales' },
  ] satisfies Stat[],
} as const;