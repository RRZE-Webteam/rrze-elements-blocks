/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const tsdocPlugin = require('eslint-plugin-tsdoc');
const wordpressEslintPlugin = require('@wordpress/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  // Basis-Konfiguration für JavaScript
  js.configs.recommended,
  
  // Gemeinsame Konfiguration für alle Dateien
  ...compat.config({
    plugins: ['react', 'tsdoc', '@wordpress'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
    },
    rules: {
      'react/jsx-key': 'error',
      'tsdoc/syntax': 'warn',

      // Weitere gemeinsame Regeln
    },
  }),
  
  // Spezifische Konfiguration für TypeScript-Dateien
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      '@typescript-eslint/tsdoc': tsdocPlugin,
    },
    rules: {
      // TypeScript-spezifische Regeln
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      'no-console': 'off'
      // Weitere TypeScript-Regeln
    },
  },
  
  // Spezifische Konfiguration für JavaScript-Dateien
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off', 
    },
  },
];
