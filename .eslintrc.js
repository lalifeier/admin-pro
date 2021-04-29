module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  // extends: ['plugin:vue/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'func-names': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
  },
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'node_modules/@vue/cli-service/webpack.config.js',
  //     },
  //   },
  // },
}
