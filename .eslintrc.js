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
        'indent': ["error", 4, { "SwitchCase": 1 }],
        'max-len': ["error", { "code": 120, "tabWidth": 4, "ignoreUrls": true, "ignoreStrings": true }],
        'quotes': ["error", "single", { "allowTemplateLiterals": true, "avoidEscape": true }],
        'object-curly-spacing': ["error", "never"],
        'no-plusplus': 0,
        'no-prototype-builtins': 0,
        'prefer-template': 0,
        'import/prefer-default-export': 'off',
        'spaced-comment': 0,
        'space-unary-ops': [
            2, {
                "words": true,
                "nonwords": false,
                "overrides": {
                    "!": true
                }
            }],
        'object-curly-newline': ["error", { "ImportDeclaration": "never", "ExportDeclaration": "never" }],
        'one-var-declaration-per-line': ["error", "initializations"],
        'one-var': ["error", { "initialized": "never" }],
        'arrow-parens': 0,
        'default-case': 0,
        'no-lonely-if': 0,

        '@typescript-eslint/no-explicit-any': 'off',
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-var-requires": "off"
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
