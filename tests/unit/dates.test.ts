import { describe, expect, it } from 'vitest';
import { formatDate, formatMonthYear, formatRange, getYear } from '../../src/utils/dates';

describe('formatDate', () => {
  it('renders YYYY-MM as abbreviated Spanish month + year', () => {
    expect(formatDate('2026-01')).toBe('ene. 2026');
    expect(formatDate('2026-05')).toBe('may. 2026');
    expect(formatDate('2026-12')).toBe('dic. 2026');
  });
});

describe('formatRange', () => {
  it('joins start and end with an em dash', () => {
    expect(formatRange('2023-09', '2024-06')).toBe('sep. 2023 — jun. 2024');
  });

  it('falls back to "actualidad" when there is no end date', () => {
    expect(formatRange('2024-09', null)).toBe('sep. 2024 — actualidad');
  });
});

describe('getYear', () => {
  it('returns the year part of a YYYY-MM string', () => {
    expect(getYear('2026-05')).toBe('2026');
  });
});

describe('formatMonthYear', () => {
  it('renders YYYY-MM as full Spanish month + year', () => {
    expect(formatMonthYear('2026-05')).toBe('Mayo 2026');
    expect(formatMonthYear('2026-12')).toBe('Diciembre 2026');
  });
});
