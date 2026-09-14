const MONTHS = [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'may.',
  'jun.',
  'jul.',
  'ago.',
  'sep.',
  'oct.',
  'nov.',
  'dic.',
];

export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

export function formatRange(start: string, end: string | null): string {
  return end ? `${formatDate(start)} — ${formatDate(end)}` : `${formatDate(start)} — actualidad`;
}

export function getYear(dateStr: string): string {
  return dateStr.split('-')[0];
}

const MONTHS_FULL = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function formatMonthYear(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  return `${MONTHS_FULL[parseInt(month, 10) - 1]} ${year}`;
}