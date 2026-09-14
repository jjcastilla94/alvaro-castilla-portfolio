export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  department: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'cajamar-junior',
    role: 'Desarrollador Backend Junior',
    company: 'Cajamar Tecnología',
    department: 'Apificación',
    location: 'Almería, Andalucía, España · Presencial',
    type: 'Jornada completa',
    startDate: '2026-07',
    endDate: null,
    description:
      'Incorporación al equipo tras finalizar el periodo de prácticas curriculares, participando en el desarrollo y mantenimiento de APIs REST para la integración de sistemas y aplicaciones.',
    highlights: [
      'Desarrollo e integración de servicios REST.',
      'Implementación de mejoras y nuevas funcionalidades.',
      'Adaptación y estructuración de datos para su consumo en aplicaciones web.',
      'Validación y pruebas de servicios.',
    ],
    technologies: ['Java', 'REST APIs', 'Postman'],
  },
  {
    id: 'cajamar-practicas',
    role: 'Desarrollador Backend en Prácticas',
    company: 'Cajamar Tecnología',
    department: 'Apificación',
    location: 'Almería, Andalucía, España · Presencial',
    type: 'Contrato de prácticas',
    startDate: '2026-03',
    endDate: '2026-06',
    description:
      'Incorporación al departamento de Apificación, participando en el desarrollo y mantenimiento de APIs REST para la integración de sistemas.',
    highlights: [
      'Desarrollo e integración de servicios REST.',
      'Diseño de flujos de comunicación entre sistemas.',
      'Adaptación y estructuración de datos para aplicaciones web.',
      'Validación y pruebas de servicios.',
    ],
    technologies: ['Java', 'REST APIs', 'Postman'],
  },
];
