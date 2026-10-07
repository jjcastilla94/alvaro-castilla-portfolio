import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // ImageMetadata is a global type declared by astro/client (.astro/types.d.ts).
    files: ['**/*.astro'],
    languageOptions: {
      globals: { ImageMetadata: 'readonly' },
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
];
