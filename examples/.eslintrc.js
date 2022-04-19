module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      rules: {
        'arrow-body-style': 'off',
        'no-underscore-dangle': 'off',
      },
    },
  ],
};
