/**
 * Project model. Images (cover + gallery) resolve automatically from
 * `src/assets/projects/<id>/` at build time (see `src/utils/projectImages.ts`).
 * Set `image` / `gallery` explicitly only to override the auto behavior.
 * Overrides use `astro:assets` metadata (imported image modules).
 */
export interface ProjectRepository {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  href: string;
  github?: string;
  url?: string;
  repositories?: ProjectRepository[];
  color: string;
  image?: ImageMetadata;
  gallery?: ImageMetadata[];
  problem?: string;
  contribution?: string;
  learnings?: string;
  status?: 'active' | 'completed' | 'in-development';
  featured?: boolean;
}

/**
 * Project code repositories, in display order. A project with several repos
 * (e.g. development + infrastructure) uses `repositories`; single-repo
 * projects just set `github`.
 */
export function getProjectRepos(project: Project): ProjectRepository[] {
  if (project.repositories && project.repositories.length > 0) {
    return project.repositories;
  }
  return project.github ? [{ label: 'GitHub', url: project.github }] : [];
}

/** Primary repository of a project (first of its repo list), if any. */
export function getProjectPrimaryRepo(project: Project): ProjectRepository | undefined {
  return getProjectRepos(project)[0];
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
    status: 'in-development',
    featured: true,
    problem:
      'Los juegos HTML5 suelen distribuirse como archivos sueltos, sin cuenta de usuario, catálogo ni gestión centralizada. Quería construir una plataforma donde los usuarios accedieran con un perfil, navegaran por un catálogo y jugaran sin salir de la web, y donde incorporar un juego nuevo fuera una tarea de administración y no un cambio en el código.',
    contribution:
      'Diseñé el BFF (Backend for Frontend) que orquesta la comunicación entre el frontend Vue 3 y los servicios backend en Spring Boot, definiendo contratos REST claros. Implementé el registro y login con refresh tokens, la gestión de sesiones, el panel de administración para subir juegos y la persistencia en MySQL. Containericé todo el stack con Docker para que el entorno sea reproducible en cualquier máquina.',
    learnings:
      'Montar una arquitectura con BFF me ayudó a entender dónde debe vivir cada responsabilidad y por qué un contrato de API bien definido simplifica el trabajo entre frontend y backend. También reforcé el manejo de autenticación con tokens, los flujos de sesión y el despliegue de una aplicación completa con Docker.',
  },
  {
    id: 'detubarrio',
    title: 'DetuBarrio',
    subtitle: 'Digitalización del comercio local',
    description:
      'Plataforma full-stack de digitalización del comercio local. Spring Boot en backend, Vue.js en frontend, MySQL como base de datos y Docker para containerización.',
    longDescription:
      'DetuBarrio es mi proyecto de Trabajo de Fin de Grado, desarrollado junto a Alejandro López Garrido. Es una plataforma de digitalización del comercio local con Spring Boot en el backend, Vue.js en el frontend, autenticación JWT, persistencia en MySQL, imágenes gestionadas con Cloudinary y despliegue containerizado con Docker.',
    technologies: [
      'Spring Boot',
      'Vue.js',
      'MySQL',
      'Docker',
      'REST APIs',
      'JWT',
      'Vercel',
      'Render',
      'Aiven',
      'Cloudinary',
    ],
    href: '/projects/detubarrio',
    github: 'https://github.com/DetuBarrio/DetuBarrio',
    url: 'https://detubarrio.vercel.app',
    color: 'detubarrio',
    status: 'active',
    featured: true,
    problem:
      'El comercio local compite en visibilidad con las grandes plataformas y apenas tiene espacios propios donde mostrarse. DetuBarrio nació para digitalizar el comercio de barrio: dar a los establecimientos locales un lugar donde estar visibles, presentarse y gestionar su información sin depender de intermediarios.',
    contribution:
      'Como Trabajo de Fin de Grado, junto a Alejandro López Garrido, construimos la plataforma de principio a fin: backend en Spring Boot con autenticación JWT, persistencia en MySQL, gestión de imágenes con Cloudinary, frontend en Vue.js y despliegue containerizado con Docker. Repartimos el trabajo en responsabilidades claras y mantuvimos el foco en la integración entre las partes.',
    learnings:
      'Desarrollar un proyecto full-stack en equipo me enseñó a dividir el trabajo en responsabilidades bien definidas y a integrar sistemas que dependen entre sí. Gestionar imágenes con un servicio externo (Cloudinary), asegurar la autenticación y preparar el despliegue me dieron práctica real con infraestructura, no solo con el código.',
  },
  {
    id: 'gestor-restaurante-tpv',
    title: 'Gestor de Restaurante · TPV',
    subtitle: 'Aplicación de escritorio para digitalizar la operativa de un restaurante',
    description:
      'Aplicación de escritorio desarrollada con JavaFX y MySQL para gestionar empleados, productos, comandas, cobros y tickets dentro de un flujo completo de TPV.',
    longDescription:
      'Proyecto final de primero de Desarrollo de Aplicaciones Web centrado en la creación de un sistema TPV de escritorio para un restaurante. La aplicación permite gestionar el flujo completo de venta en sala, desde la autenticación de empleados y la gestión del catálogo de productos hasta la creación de comandas por mesa, aplicación de descuentos, cobro, consulta histórica de tickets y generación de tickets en PDF. El proyecto combina JavaFX para la interfaz, MySQL para la persistencia, JDBC para el acceso a datos y Maven para la gestión del proyecto y sus dependencias.',
    technologies: ['Java 11', 'JavaFX 21', 'FXML', 'CSS', 'MySQL 8', 'JDBC', 'Maven', 'iTextPDF'],
    href: '/projects/gestor-restaurante-tpv',
    github: 'https://github.com/jjcastilla94/gestor-de-un-restaurante-tpv',
    color: 'restaurante',
    status: 'completed',
    featured: false,
    problem:
      'La operativa diaria de un restaurante requiere gestionar de forma rápida y coordinada productos, mesas, comandas y cobros. Cuando estas tareas se realizan mediante procesos manuales o herramientas no centralizadas, pueden producirse errores y resulta más difícil mantener la trazabilidad de las ventas. El objetivo del proyecto fue desarrollar un TPV que centralizara este flujo en una única aplicación, permitiendo gestionar las operaciones del servicio desde un mismo punto.',
    contribution:
      'Desarrollé la aplicación de principio a fin como proyecto final de primero de Desarrollo de Aplicaciones Web. Implementé la interfaz de escritorio con JavaFX, FXML y CSS, la lógica de interacción mediante controladores y la persistencia de datos utilizando MySQL y JDBC. También trabajé en el modelado de las principales entidades del dominio, la gestión de productos y comandas, el cálculo de importes y descuentos, el registro de tickets y la generación de documentos PDF mediante iTextPDF.',
    learnings:
      'Este proyecto consolidó mis fundamentos de Java y programación orientada a objetos y fue una de mis primeras experiencias desarrollando una aplicación completa conectada a una base de datos. Aprendí a modelar un problema real de negocio, diseñar una interfaz orientada a la operativa de un usuario y conectar diferentes partes de una aplicación, desde la interfaz hasta la persistencia. También me permitió identificar las ventajas de separar responsabilidades y las limitaciones de un acceso directo a datos, conocimientos que posteriormente he podido aplicar en proyectos backend con arquitecturas más estructuradas.',
  },
  {
    id: 'course-management-platform',
    title: 'Course Management Platform',
    subtitle: 'Full-stack application with Docker, cloud deployment and CI/CD',
    description:
      'Aplicación web full-stack para la gestión de cursos y estudiantes, desarrollada con Vue 3 y Laravel. El proyecto evolucionó desde el desarrollo de la aplicación hasta su containerización, despliegue en la nube y automatización mediante CI/CD.',
    longDescription:
      'Aplicación web full-stack desarrollada para gestionar cursos y estudiantes mediante una arquitectura separada entre frontend y backend. El frontend está desarrollado con Vue 3 y Vite, mientras que el backend expone una API REST construida con Laravel y utiliza MySQL como sistema de persistencia. El proyecto se organiza en dos repositorios: uno centrado en el desarrollo de la aplicación y otro dedicado a su containerización, despliegue y automatización. Docker y Docker Compose permiten reproducir el entorno de desarrollo, mientras que Vercel, Render y Railway se utilizan para desplegar los diferentes servicios en producción. GitHub Actions completa el flujo mediante pipelines de CI/CD.',
    technologies: [
      'Vue 3',
      'Tailwind CSS',
      'Laravel',
      'PHP',
      'REST API',
      'MySQL',
      'Docker',
      'GitHub Actions',
      'Vercel',
      'Render',
      'Railway',
    ],
    href: '/projects/course-management-platform',
    url: 'https://practicafinal-docker.vercel.app',
    repositories: [
      {
        label: 'Desarrollo',
        url: 'https://github.com/jjcastilla94/proyecto_con_vue',
      },
      {
        label: 'Despliegue e infraestructura',
        url: 'https://github.com/jjcastilla94/practicafinal-docker',
      },
    ],
    color: 'practicafinal',
    status: 'active',
    featured: false,
    problem:
      'El objetivo era desarrollar una aplicación web full-stack y llevarla más allá del entorno local, trabajando también los aspectos necesarios para preparar una solución para producción. Esto implicaba separar frontend, backend y base de datos, disponer de un entorno reproducible mediante contenedores y establecer un proceso de despliegue que permitiera mantener los diferentes servicios de forma independiente.',
    contribution:
      'Desarrollé la aplicación full-stack utilizando Vue 3 y Laravel, estructurando el frontend y la API REST para gestionar cursos y estudiantes. Posteriormente trabajé en la preparación del proyecto para producción mediante Docker y Docker Compose, creando los contenedores y configuraciones necesarias para ejecutar sus diferentes servicios. También configuré CORS y variables de entorno, desplegué el frontend en Vercel, el backend en Render y MySQL en Railway, y establecí workflows de GitHub Actions para automatizar los despliegues. El trabajo se mantiene organizado en dos repositorios: uno para el desarrollo de la aplicación y otro para la containerización, despliegue y CI/CD.',
    learnings:
      'El proyecto me permitió entender de forma práctica el ciclo completo de una aplicación web, desde su desarrollo hasta su ejecución en producción. Profundicé en Docker y Docker Compose, separación de servicios, configuración de entornos, CORS y comunicación entre componentes desplegados de forma independiente. También adquirí experiencia con plataformas cloud como Vercel, Render y Railway y con la automatización de despliegues mediante GitHub Actions.',
  },
  {
    id: 'app-backend-bottle',
    title: 'App Backend · Bottle',
    subtitle: 'Aplicación web backend con autenticación, persistencia y gestión de pedidos',
    description:
      'Aplicación web desarrollada con Python y Bottle que implementa una tienda online con autenticación, gestión de productos, carrito de compra y persistencia mediante SQLAlchemy.',
    longDescription:
      'Aplicación web backend desarrollada con Python y Bottle siguiendo una estructura tipo MVC. El proyecto implementa una tienda online sencilla con autenticación mediante sesión, gestión de categorías y artículos, carrito de compra y confirmación de pedidos. La persistencia se realiza mediante SQLAlchemy ORM sobre SQLite y el proyecto incorpora un sistema de migraciones versionadas para gestionar la evolución del esquema de base de datos.',
    technologies: ['Python 3', 'Bottle 0.13.4', 'SQLAlchemy 2.0', 'SQLite', 'HTML', 'Bootstrap'],
    href: '/projects/app-backend-bottle',
    github: 'https://github.com/jjcastilla94/app_backend_con_bottle',
    color: 'bottle',
    status: 'completed',
    featured: false,
    problem:
      'El proyecto parte de la necesidad de construir una aplicación web capaz de gestionar un flujo completo de compra, combinando autenticación de usuarios, gestión de productos y categorías, carrito y confirmación de pedidos. El objetivo era trasladar estos procesos a una aplicación estructurada y persistente, manteniendo separadas las distintas responsabilidades del backend y facilitando la evolución del esquema de datos.',
    contribution:
      'Desarrollé la adaptación de la aplicación a Bottle, trabajando sobre la estructura del backend, las rutas públicas y privadas, la autenticación mediante sesiones y las operaciones de gestión de categorías y artículos. También implementé la persistencia utilizando SQLAlchemy ORM sobre SQLite, el flujo del carrito y pedidos y un sistema de migraciones versionadas para controlar los cambios en la base de datos.',
    learnings:
      'Este proyecto reforzó mi experiencia con Python aplicado al desarrollo web y me permitió trabajar con un framework backend diferente a las tecnologías Java que utilizaba habitualmente. Profundicé en la organización de una aplicación siguiendo una estructura tipo MVC, el uso de un ORM para abstraer el acceso a datos, la gestión de sesiones y la evolución controlada de un esquema de base de datos mediante migraciones. También me ayudó a entender cómo diferentes frameworks pueden abordar problemas backend similares desde arquitecturas y herramientas distintas.',
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    subtitle: 'Task management application built with Angular',
    description:
      'Aplicación frontend para la gestión de tareas, desarrollada con Angular y TypeScript. Proyecto orientado a trabajar la construcción de interfaces interactivas y la organización de una aplicación frontend moderna.',
    longDescription:
      'Aplicación web frontend centrada en la creación y gestión de tareas. El proyecto está desarrollado con Angular y TypeScript, utilizando la estructura y herramientas proporcionadas por Angular CLI. Su desarrollo permite trabajar conceptos fundamentales del ecosistema Angular, como la organización de componentes, construcción de interfaces dinámicas y separación de responsabilidades dentro de una aplicación frontend.',
    technologies: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Vitest'],
    href: '/projects/task-management-app',
    github: 'https://github.com/jjcastilla94/todoAppAngular',
    color: 'task-management',
    status: 'completed',
    featured: false,
    problem:
      'El proyecto parte de una necesidad sencilla y habitual en aplicaciones web: disponer de una interfaz que permita organizar y gestionar tareas de forma clara e interactiva. El objetivo principal era aplicar los fundamentos de Angular en una aplicación funcional, trabajando la estructura del frontend y la interacción con los elementos de la interfaz.',
    contribution:
      'Desarrollé la aplicación frontend utilizando Angular y TypeScript, estructurando sus componentes y lógica para implementar la gestión de tareas y la interacción con la interfaz. También trabajé con las herramientas del ecosistema Angular para ejecutar el proyecto, generar la build y preparar su entorno de pruebas mediante Vitest.',
    learnings:
      'Este proyecto me permitió reforzar mis conocimientos de Angular y TypeScript y trabajar de forma práctica con la estructura de una aplicación frontend basada en componentes. También profundicé en el flujo de desarrollo con Angular CLI, la construcción de aplicaciones para producción y la ejecución de pruebas unitarias con Vitest.',
  },
];
