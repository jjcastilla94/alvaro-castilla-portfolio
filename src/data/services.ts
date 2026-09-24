export interface Capability {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    description:
      'Desarrollo y mantenimiento de servicios backend con Java y Spring Boot. Arquitectura por capas, patrones de diseño y código mantenible.',
    technologies: ['Java', 'Spring Boot', 'REST APIs'],
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description:
      'Diseño e integración de APIs RESTful. Definición de contratos, flujos de datos entre sistemas y validación de servicios.',
    technologies: ['REST APIs', 'Postman', 'JSON'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Applications',
    description:
      'Integración frontend/backend con frameworks modernos. Aplicaciones completas con autenticación, persistencia y despliegue containerizado.',
    technologies: ['Vue.js', 'JavaScript', 'Spring Boot', 'Docker', 'JWT'],
  },
  {
    id: 'infrastructure',
    title: 'Development Infrastructure',
    description:
      'Contenedorización, versionado y entornos de desarrollo reproducibles. Flujo de trabajo con Git y Docker.',
    technologies: ['Docker', 'Git', 'Docker Compose'],
  },
];
