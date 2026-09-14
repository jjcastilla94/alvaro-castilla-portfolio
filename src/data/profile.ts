export interface Stat {
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
}

export interface ProfileData {
  name: string;
  role: string;
  stack: string[];
  bio: string;
  email: string;
  cvUrl: string;
  image?: string;
  social: {
    github: string;
    linkedin: string;
  };
  stats: Stat[];
}

export const PROFILE: ProfileData = {
  name: 'Alvaro Castilla',
  role: 'Backend Developer',
  stack: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Docker'],
  bio: 'Desarrollo APIs REST para entornos empresariales con Java y Spring Boot, con foco en código claro y mantenible a largo plazo.',
  email: 'alvarocastilla49@gmail.com',
  cvUrl: '/cv/alvaro-castilla-cv.pdf',
  image: '/images/avatar.jpeg',
  social: {
    github: 'https://github.com/jjcastilla94',
    linkedin: 'https://www.linkedin.com/in/alvarocastillagonzalez',
  },
  stats: [
    { value: '2026', label: 'En Cajamar Tecnología' },
    { value: '2', suffix: '', label: 'Proyectos full-stack', countTo: 2 },
    { value: '6', suffix: '+', label: 'Tecnologías en producción', countTo: 6 },
    { value: 'REST', label: 'APIs en entornos reales' },
  ] satisfies Stat[],
};

export function hasCv(): boolean {
  return Boolean(PROFILE.cvUrl);
}