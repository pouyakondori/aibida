module.exports = {
    env: {
        amd: true,
        browser: true,
        es6: true,
        jest: true,
        node: true,
        'cypress/globals': true,
    },
    extends: [
        '@vue/typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier-vue/recommended',
        'plugin:vue/recommended',
    ],
    globals: {
        AIBIDIA_API_BASE_URL: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
            jsx: true,
        },
        ecmaVersion: 9,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'cypress'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: true,
                },
            },
        ],
        // disable the rule for all files
        '@typescript-eslint/explicit-function-return-type': 'off',
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: [
                    'block',
                    'block-like',
                    'multiline-block-like',
                    'multiline-const',
                    'multiline-let',
                    'multiline-expression',
                ],
                next: '*',
            },
        ],
        quotes: ['error', 'single', { 'avoidEscape': true }],
        semi: ['error', 'never'],
        'no-unused-vars': [
            'warn',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'always',
                    component: 'never',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: false,
                },
            },
        ]
    },
    settings: {
        'prettier-vue': {
            SFCBlocks: {
                template: false,
            },
        },
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            'files': ["*.ts", "*.tsx", "*.ts.vue"],
            'rules': {
                "@typescript-eslint/explicit-function-return-type": ["error", {
                    allowExpressions: true,
                }],
            },
        },
    ],
}
