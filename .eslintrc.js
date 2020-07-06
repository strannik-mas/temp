module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4, {SwitchCase: 1}],
        'max-len': ['error', {code: 120, tabWidth: 4}],
        quotes: ['error', 'single', {allowTemplateLiterals: true, avoidEscape: true}],
        'object-curly-spacing': ['error', 'never'],
        'import/prefer-default-export': 'off',
        'spaced-comment': ['error', 'never'],
        'space-unary-ops': [
            2, {
                words: true,
                nonwords: false,
                overrides: {
                    '!': true,
                },
            }],

        '@typescript-eslint/no-explicit-any': 'off',
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};