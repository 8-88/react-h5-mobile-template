const stylistic = require('@stylistic/eslint-plugin')

const customized = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  arrowParens: true,
  jsx: true
})

module.exports = {
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: '**/types/*.ts',
  plugins: ['@stylistic', 'import','detectiondom'],
  root: true,
  rules: {
    ...customized.rules,
    'no-useless-escape': 'warn',
    'no-prototype-builtins': 'warn',
    'no-console': ["warn", { allow: ["warn", "error"] }],
    'no-empty': 'off',
    "@stylistic/jsx-indent": ['warn', 2],
    "@stylistic/jsx-one-expression-per-line": 'off',
    '@stylistic/arrow-parens': ['warn', "as-needed"],
    '@stylistic/brace-style': ['error', '1tbs'],
    '@stylistic/multiline-ternary': "off",
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown', // <- unknown
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    "import/no-unresolved": [2, { ignore: ['\\.png$','uno.css'] }],
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx",'.scss']
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": [
          "tsconfig.json",
          "other-packages/*/tsconfig.json"
        ]
      }
    }
  },
  ignorePatterns: ['test/*', 'dist/*', '*.js', 'murmurHash3.ts', 'packages/**/dist/*', 'packages/**/build/*']
}
