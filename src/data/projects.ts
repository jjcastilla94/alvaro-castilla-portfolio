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
  image?: string;
  gallery?: string[];
  problem?: string;
  contribution?: string;
  learnings?: string;
  status?: 'active' | 'completed' | 'in-development';
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'arcadia',
    title: 'Arcadia',
    subtitle: 'Full Stack HTML5 Gaming Platform',
    description:
      'Plataforma web de juegos HTML5 con arquitectura BFF. Backend en Spring Boot con APIs REST, persistencia en MySQL y despliegue con Docker. Frontend en Vue 3 consumiendo el BFF.',
    longDescription:
      'Arcadia es una plataforma de juegos HTML5 con una arquitectura completa cliente-servidor. El BFF (Backend for Frontend) orquesta la comunicación entre el frontend en Vue 3 y los servicios backend en Spring Boot. Incluye registro y login de usuarios con refresh tokens, gestión de sesiones, panel de administración para la subida de juegos y base de datos relacional en MySQL. Toda la infraestructura está containerizada con Docker.',
    technologies: ['Spring Boot', 'Vue 3', 'MySQL', 'Docker', 'REST APIs', 'JWT'],
    href: '/projects/arcadia',
    github: 'https://github.com/jjcastilla94/Arcadia',
    color: 'arcadia',
    featured: true,
  },
  {
    id: 'detubarrio',
    title: 'DetuBarrio',
    subtitle: 'Digitalización del comercio local',
    description:
      'Plataforma full-stack de digitalización del comercio local. Spring Boot en backend, Vue.js en frontend, MySQL como base de datos y Docker para containerización.',
    longDescription:
      'DetuBarrio es mi proyecto de Trabajo de Fin de Grado, desarrollado junto a Alejandro López Garrido. Es una plataforma de digitalización del comercio local con Spring Boot en el backend, Vue.js en el frontend, autenticación JWT, persistencia en MySQL, imágenes gestionadas con Cloudinary y despliegue containerizado con Docker.',
    technologies: ['Spring Boot', 'Vue.js', 'MySQL', 'Docker', 'REST APIs', 'JWT', 'Cloudinary'],
    href: '/projects/detubarrio',
    github: 'https://github.com/DetuBarrio/DetuBarrio',
    color: 'detubarrio',
    featured: true,
  },
];