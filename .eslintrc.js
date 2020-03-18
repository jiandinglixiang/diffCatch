module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': [
    'standard',
    'standard-react',
  ],
  // 解析器用于解析代码
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'react/jsx-handler-names': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-tag-spacing': 0,
    'comma-dangle': 0,
  },
}
