module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    'shared-node-browser': true,
    commonjs: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/attribute-hyphenation': 'off'
  }
}
