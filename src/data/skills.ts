export type SkillLevelKey = 'core' | 'working' | 'exposure';

export interface SkillLevel {
  level: SkillLevelKey;
  label: string;
  description: string;
  skills: string[];
}

export const SKILLS: SkillLevel[] = [
  {
    level: 'core',
    label: 'Core',
    description: 'Tecnologías que definen mi perfil profesional actual',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'MySQL / SQL', 'Git', 'Docker'],
  },
  {
    level: 'working',
    label: 'Working Knowledge',
    description: 'Tecnologías con las que puedo trabajar de forma eficiente',
    skills: ['Vue.js', 'JavaScript', 'TypeScript', 'Python', 'JWT', 'BFF', 'HTML / CSS'],
  },
  {
    level: 'exposure',
    label: 'Explorando',
    description: 'Áreas de interés en las que estoy creciendo',
    skills: ['AWS', 'Cloud', 'DevOps', 'AI', 'Data', 'Microservicios'],
  },
];