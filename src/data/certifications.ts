export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  status: 'active' | 'expired' | 'in-progress' | 'planned';
  url?: string;
  description?: string;
  skills?: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'spring-boot-mvc-5',
    name: 'Curso de Spring Boot y Spring MVC 5: Creando una aplicación con Spring Boot y Spring MVC',
    issuer: 'OpenWebinars',
    date: '2026-05',
    status: 'active',
    url: 'https://openwebinars.net/certificacion/xH32us71',
    description:
      'Certificado de desarrollo de aplicaciones web con Spring Boot y Spring MVC: arquitectura MVC, controladores, gestión de peticiones HTTP y validación de formularios. Trabajo con Spring Data JPA para el manejo de bases de datos, diseño de entidades y repositorios, e implementación de autenticación y control de acceso con Spring Security.',
    skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA'],
  },
  {
    id: 'javascript-async-prototypes-classes',
    name: 'Especialización en JavaScript: Asincronía, Prototipos y Clases',
    issuer: 'OpenWebinars',
    date: '2026-04',
    status: 'active',
    url: 'https://openwebinars.net/certificacion/2lgHVMIN',
    description:
      'Especialización en los fundamentos avanzados del lenguaje JavaScript: asincronía (callbacks, promesas y async/await), modelo de prototipos y clases ES6+. Bases sólidas para escribir lógica asíncrona legible y robusta, tanto en frontend como en tooling del lado servidor.',
    skills: ['JavaScript', 'Asincronía', 'Promesas / async-await', 'Prototipos', 'Clases ES6+'],
  },
  {
    id: 'sass',
    name: 'Curso de Sass',
    issuer: 'OpenWebinars',
    date: '2026-03',
    status: 'active',
    url: 'https://openwebinars.net/certificacion/BGqfkjEd',
    description:
      'Organización y automatización de estilos a escala con el preprocesador Sass/SCSS: variables, mixins, funciones, anidamiento y partials para mantener CSS mantenible. Incluye flujo de trabajo automatizado con Gulp para compilar y optimizar hojas de estilo.',
    skills: ['Sass / SCSS', 'CSS avanzado', 'Preprocesadores CSS', 'Gulp', 'Workflow automatizado'],
  },
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner (AIF-C01)',
    issuer: 'Amazon Web Services',
    status: 'in-progress',
    url: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    description:
      'Certificación en preparación: valida conocimiento fundamental de IA, machine learning e IA generativa en AWS — conceptos de IA/ML, fundamentos de modelos fundacionales, prompt engineering y RAG, y servicios como Amazon Bedrock, Amazon Q y Amazon SageMaker AI. Incluye IA responsable, así como seguridad y gobernanza de soluciones de IA.',
    skills: [
      'Conceptos de IA / ML',
      'IA generativa',
      'Amazon Bedrock',
      'Amazon Q',
      'Amazon SageMaker AI',
      'Prompt engineering',
      'RAG',
      'IA responsable',
    ],
  },
];