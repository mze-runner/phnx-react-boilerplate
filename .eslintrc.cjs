module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "no-unused-vars": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": ["error", 4, { "ignoreComments": true }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
    "semi": ["error", "always"],
    "no-console": ["warn"],
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error"
  },
}
