export interface ApproachPrinciple {
  title: string;
  description: string;
}

export interface AboutData {
  intro: string;
  current: string;
  approach: ApproachPrinciple[];
  interests: string[];
  future: string;
  personalNote: string;
}

export const ABOUT: AboutData = {
  intro:
    'Me interesa entender qué hay detrás de cada problema antes de decidir cómo resolverlo. Para mí, desarrollar software no consiste solo en escribir código que funcione, sino en construir soluciones que puedan entenderse, mantenerse y evolucionar con el tiempo. Esa forma de trabajar se refleja en los principios que intento aplicar en cada proyecto.',
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
      title: 'Mantenible desde el principio',
      description:
        'Me importa que el código sea claro, estructurado y mantenible: que no solo funcione ahora, sino que pueda entenderse y modificarse después. Intento evitar soluciones innecesariamente complejas y prefiero estructuras claras con responsabilidades bien separadas.',
    },
    {
      title: 'Entender el conjunto',
      description:
        'Me interesa cómo encajan las partes de un sistema: una API, una base de datos o un servicio solo tienen sentido dentro del conjunto. Trabajo con interfaces y contratos claros entre las distintas partes para que esa conexión sea comprensible y consistente.',
    },
    {
      title: 'Aprender llevándolo a la práctica',
      description:
        'Combino el trabajo del día a día, la documentación, la formación específica y los proyectos personales. Intento que lo aprendido no se quede en teoría: me gusta aplicarlo construyendo. La formación y las certificaciones me ayudan a estructurar y validar esa práctica.',
    },
    {
      title: 'Código que otra persona pueda continuar',
      description:
        'Valoro un equipo con comunicación clara, donde se entienda qué se necesita antes de implementar y queden definidas las responsabilidades. Antes de escribir código me gusta ponernos de acuerdo en cómo debe funcionar algo, sobre todo cuando hay APIs o comunicación entre frontend y backend. Que el código pueda retomarlo otra persona forma parte de esa forma de trabajar.',
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
  future:
    'Consolidar mi base como Backend Developer: APIs, arquitectura, diseño de sistemas, bases de datos, testing, seguridad y buenas prácticas. A partir de ahí, seguir explorando áreas como cloud, DevOps, IA o Data antes de decidir dónde especializarme. Estoy preparando la AWS Certified AI Practitioner para entender cómo la IA se aplica a servicios reales, dentro de esa exploración, no como una especialización cerrada.',
  personalNote:
    'Fuera del código, entreno habitualmente en el gimnasio. La disciplina y constancia que aplico al entrenamiento también forman parte de mi forma de afrontar el desarrollo profesional.',
};