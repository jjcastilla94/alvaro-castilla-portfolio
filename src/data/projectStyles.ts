export const PROJECT_GRADIENTS: Record<string, string> = {
  arcadia: 'from-violet-600/20 via-blue-600/10 to-indigo-800/20',
  detubarrio: 'from-orange-500/20 via-amber-500/10 to-yellow-600/20',
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
};

export function getProjectGradient(color: string): string {
  return PROJECT_GRADIENTS[color] || 'from-accent/10 via-surface to-accent/5';
}

export function getProjectPattern(color: string): string {
  return PROJECT_PATTERNS[color] || '';
}