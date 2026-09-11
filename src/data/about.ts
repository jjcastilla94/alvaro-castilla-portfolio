export interface ApproachPrinciple {
  title: string;
  description: string;
}

export interface AboutData {
  intro: string;
  current: string;
  approach: ApproachPrinciple[];
  interests: string[];
  personalNote: string;
}

export const ABOUT: AboutData = {
  intro:
    'Backend Developer en Grupo Cajamar, trabajando en el desarrollo e integración de APIs REST para entornos empresariales. Me centro en Java, Spring Boot y en construir software que sea mantenible a largo plazo.',
  current:
    'Mi día a día consiste en desarrollar y mantener servicios REST, definir flujos de datos entre sistemas y validar que cada integración funcione de forma consistente.',
  approach: [
    {
      title: 'Entender antes de construir',
      description:
        'Prefiero comprender el problema antes de escribir código. Un buen diagnóstico evita soluciones que solo parchean síntomas.',
    },
    {
      title: 'Simplicidad cuando es suficiente',
      description:
        'Aplico la solución más simple que resuelve el problema real. Si la complejidad es necesaria, la añado de forma deliberada.',
    },
    {
      title: 'Responsabilidades claras',
      description:
        'Separo las capas de una aplicación y mantengo contratos explícitos entre ellas. El código bien estructurado se entiende y se mantiene solo.',
    },
    {
      title: 'Iterar para mejorar',
      description:
        'Trabajo en ciclos: implemento, valido, detecto problemas y mejoro. Es la forma más sólida de crecer y de aprender.',
    },
  ],
  interests: [
    'Backend',
    'Software Engineering',
    'Arquitectura',
    'APIs',
    'Integración de sistemas',
    'Docker',
    'DevOps',
    'Cloud',
    'Data',
  ],
  personalNote:
    'Fuera del código, entreno habitualmente en el gimnasio. La constancia que aplico al entrenamiento también la aplico a mi desarrollo profesional.',
};