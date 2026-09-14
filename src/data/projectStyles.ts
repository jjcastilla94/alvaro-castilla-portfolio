export const PROJECT_GRADIENTS: Record<string, string> = {
  arcadia: 'from-violet-600/20 via-blue-600/10 to-indigo-800/20',
  detubarrio: 'from-orange-500/20 via-amber-500/10 to-yellow-600/20',
  restaurante: 'from-red-600/20 via-rose-600/10 to-orange-800/25',
  bottle: 'from-teal-500/20 via-cyan-600/10 to-sky-800/20',
  practicafinal: 'from-emerald-500/20 via-teal-500/10 to-green-800/20',
  'task-management': 'from-sky-500/20 via-blue-500/10 to-indigo-800/20',
};

export const PROJECT_PATTERNS: Record<string, string> = {
  arcadia: `
    background-image:
      radial-gradient(circle at 1px 1px, rgba(139,92,246,0.15) 1px, transparent 0);
    background-size: 24px 24px;
  `,
  detubarrio: `
    background-image:
      radial-gradient(circle at 1px 1px, rgba(249,115,22,0.12) 1px, transparent 0);
    background-size: 28px 28px;
  `,
  restaurante: `
    background-image:
      radial-gradient(circle at 1px 1px, rgba(225,29,72,0.13) 1px, transparent 0);
    background-size: 22px 22px;
  `,
  bottle: `
    background-image:
      radial-gradient(circle at 1px 1px, rgba(20,184,166,0.14) 1px, transparent 0);
    background-size: 26px 26px;
  `,
  practicafinal: `
    background-image:
      radial-gradient(circle at 1px 1px, rgba(16,185,129,0.13) 1px, transparent 0);
    background-size: 26px 26px;
  `,
  'task-management': `
    background-image:
      radial-gradient(circle at 1px 1px, rgba(59,130,246,0.14) 1px, transparent 0);
    background-size: 24px 24px;
  `,
};

export function getProjectGradient(color: string): string {
  return PROJECT_GRADIENTS[color] || 'from-accent/10 via-surface to-accent/5';
}

export function getProjectPattern(color: string): string {
  return PROJECT_PATTERNS[color] || '';
}