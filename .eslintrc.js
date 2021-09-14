module.exports = {
    root: true,
    env:{
      browser: true,
      amd: true,
      node: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: "module"
    },
    "plugins": [
      "react"
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'no-console': 'warn',
        'react/prop-types': 0,
        'no-unused-vars':  'warn',
    }
  }
  