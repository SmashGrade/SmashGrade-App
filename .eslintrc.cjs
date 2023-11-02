module.exports = {
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'api','vite.config.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/jsx-curly-brace-presence': [
            'warn',
            {
                props: 'always',
                children: 'ignore',
                propElementValues: 'always',
            },
        ],
        'react/self-closing-comp': [
            'warn',
            {
                component: true,
                html: true,
            },
        ],
        'no-console': [
            'warn',
            {
                allow: ['warn', 'info', 'error'],
            },
        ],
        'no-unneeded-ternary': 'warn',
    },
};
