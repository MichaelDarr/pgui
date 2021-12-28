module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    rules: {
        // A temporary hack related to IDE not resolving correct package.json
        'import/no-extraneous-dependencies': 'off',
        // Since React 17 and typescript 4.1 you can safely disable the rule
        'react/react-in-jsx-scope': 'off',
        // Eslint inheritance is buggy for this one, so it's set here as well as in the global file.
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { 'argsIgnorePattern': '^_' }
        ],
    },
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    settings: {
        'import/resolver': {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            webpack: {
                config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        react: {
            version: 'detect',
        },
    },
};
