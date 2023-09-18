module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/jsx-curly-brace-presence': ['warn', {
            'props': 'always', 'children': 'ignore', 'propElementValues': 'always',
        }],
        'react/self-closing-comp': ['warn', {
            'component': true, 'html': true,
        }],
        'no-console': ['warn', {
            'allow': ['warn', 'info', 'error'],
        }],
        'no-unneeded-ternary': 'warn',
    },
};
