import prettierConfig from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
export default [
  prettierConfig,
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      semi: 'warn',
      'no-unused-vars': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/check-values': 'warn',
    },
  },
];
