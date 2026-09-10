export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  href: string;
  github?: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'arcadia',
    title: 'Arcadia',
    subtitle: 'Full Stack HTML5 Gaming Platform',
    description:
      'Plataforma web de juegos HTML5 con arquitectura BFF. Backend en Spring Boot con APIs REST, persistencia en MySQL y despliegue con Docker. Frontend en Vue 3 consumiendo el BFF.',
    longDescription:
      'Arcadia es una plataforma de juegos HTML5 que demuestra una arquitectura completa cliente-servidor. El BFF (Backend for Frontend) actúa como capa de orquestación entre el frontend Vue 3 y los servicios backend en Spring Boot. Incluye catálogo de juegos, sistema de puntuaciones y gestión de usuarios con autenticación JWT.',
    technologies: ['Spring Boot', 'Vue 3', 'MySQL', 'Docker', 'REST APIs', 'JWT'],
    href: '/projects/arcadia',
    github: 'https://github.com/jjcastilla94/arcadia',
    color: 'arcadia',
  },
  {
    id: 'detubarrio',
    title: 'DetuBarrio',
    subtitle: 'Full Stack Marketplace',
    description:
      'Marketplace local full-stack con arquitectura por capas. Spring Boot en backend, Vue.js en frontend, MySQL como base de datos y Docker para containerización.',
    longDescription:
      'DetuBarrio es un marketplace local que conecta vedores y compradores de barrios. La arquitectura separa claramente las capas de presentación, lógica de negocio y persistencia. Incluye publicación de productos, búsqueda filtrada, sistema de mensajes y gestión de perfiles de usuario.',
    technologies: ['Spring Boot', 'Vue.js', 'MySQL', 'Docker', 'REST APIs'],
    href: '/projects/detubarrio',
    github: 'https://github.com/jjcastilla94/detubarrio',
    color: 'detubarrio',
  },
];
