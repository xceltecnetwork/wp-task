module.exports = {
  'root': true,
  'extends': [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'es/node',
  ],
  'globals': {
    'wp': true,
    'airfleet': true,
  },
  'env': {
    'node': true,
    'es6': true,
    'amd': true,
    'browser': true,
    'jquery': true,
  },
  'parserOptions': {
    'ecmaFeatures': {
      'globalReturn': true,
      'generators': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'import',
    'sonarjs',
    'unicorn',
  ],
  'settings': {
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  'rules': {
    'quotes': ['error', 'single'],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'ignore',
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        'case': 'camelCase',
      },
    ],
    'linebreak-style': 0,
    'id-length': [ 2, {
      min: 2,
      max: Number.infinity,
      properties: 'always',
      exceptions: [ '_', 'i', 'j', 'x', 'y', 'z', '$' ]
    }],
    'sort-imports': [ 2, {
      ignoreCase: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: [ 'none', 'single', 'multiple', 'all' ]
    }],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'dot-location': ['error', 'property'],
    // // Prevent warnings for webpack resolve aliases.
    // "import/no-unresolved": "off",
    // // Prevent warnings for webpack extension resolution.
    // "import/extensions": "off",
    // // Prevent warnings for import statements with aliases.
    // "import/first": "off",
  },
};
