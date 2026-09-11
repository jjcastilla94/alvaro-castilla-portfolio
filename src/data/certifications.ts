export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  status: 'active' | 'expired' | 'in-progress' | 'planned';
  url?: string;
}

export const CERTIFICATIONS: Certification[] = [
  // TODO_ALVARO: Añadir aquí las certificaciones obtenidas.
  // Ejemplo de estructura:
  // {
  //   id: 'aws-ai-practitioner',
  //   name: 'AWS Certified AI Practitioner',
  //   issuer: 'Amazon Web Services',
  //   date: '2026-09',
  //   status: 'active',
  //   url: 'https://www.credly.com/...',
  // },
];