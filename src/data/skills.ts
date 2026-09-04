export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: 'Backend',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'MySQL / SQL', 'Microservicios'],
  },
  {
    category: 'Frontend',
    skills: ['Vue.js', 'JavaScript', 'HTML / CSS'],
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'Git', 'AWS'],
  },
];
