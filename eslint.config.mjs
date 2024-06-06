import alignAssignments from 'eslint-plugin-align-assignments';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...typescriptEslint.configs.strict,
    {
        plugins: {
            '@stylistic'       : stylistic,
            'align-assignments': alignAssignments,
        },
        languageOptions: {
            parser       : typescriptEslint.parser,
            parserOptions: {
                project        : true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/prefer-literal-enum-member': 'off',

            'unicode-bom'          : [ 'error', 'never' ],
            'one-var'              : [ 'error', 'never' ],
            'no-var'               : 'error',
            'no-eval'              : 'error',
            'no-new-func'          : 'error',
            'no-implied-eval'      : 'error',
            'no-alert'             : 'error',
            'no-console'           : 'warn',
            'require-await'        : 'warn',
            'new-cap'              : 'error',
            'func-style'           : [ 'error', 'expression' ],
            camelcase              : [ 'error', { ignoreImports: true }],
            'no-constructor-return': 'error',
            'no-unreachable'       : 'error',
            'no-await-in-loop'     : 'warn',
            curly                  : [ 'error', 'multi-line' ],
            'no-restricted-imports': [ 'error', {
                patterns: [
                    {
                        group  : [ '.*' ],
                        message: 'All imports must be from an npm package.. Hint: all packages start with @ehwillows/',
                    },
                ],
            }],

            '@typescript-eslint/no-explicit-any'                : 'warn',
            '@typescript-eslint/no-unused-vars'                 : 'warn',
            '@typescript-eslint/consistent-generic-constructors': 'error',
            '@typescript-eslint/consistent-indexed-object-style': 'error',
            '@stylistic/type-generic-spacing'                   : 'error',
            '@stylistic/semi'                                   : [ 'error', 'always' ],
            '@stylistic/semi-style'                             : [ 'error', 'last' ],
            '@stylistic/semi-spacing'                           : 'error',
            '@stylistic/quotes'                                 : [ 'error', 'single' ],
            '@stylistic/comma-dangle'                           : [ 'error', 'always-multiline' ],
            '@stylistic/comma-spacing'                          : [ 'error', {
                before: false,
                after : true,
            }],
            '@stylistic/key-spacing'            : [ 'error', { align: 'colon' }],
            '@stylistic/quote-props'            : [ 'error', 'as-needed' ],
            '@stylistic/eol-last'               : [ 'error', 'never' ],
            '@stylistic/linebreak-style'        : [ 'error', 'unix' ],
            '@stylistic/brace-style'            : [ 'error', '1tbs', { allowSingleLine: true }],
            '@stylistic/indent'                 : 'error',
            '@stylistic/no-trailing-spaces'     : 'error',
            '@stylistic/space-in-parens'        : [ 'error', 'never' ],
            '@stylistic/dot-location'           : [ 'error', 'property' ],
            '@stylistic/function-call-spacing'  : [ 'error', 'never' ],
            '@stylistic/object-property-newline': 'error',
            '@stylistic/object-curly-newline'   : [ 'error', {
                minProperties: 3,
                multiline    : true,
                consistent   : true,
            }],
            'space-before-function-paren': [ 'error', {
                anonymous : 'always',
                named     : 'never',
                asyncArrow: 'always',
            }],
            '@stylistic/space-infix-ops'     : 'error',
            '@stylistic/object-curly-spacing': [ 'error', 'always' ],

            'align-assignments/align-assignments': 'error',
            '@stylistic/array-bracket-spacing'   : [ 'error', 'always', {
                objectsInArrays: false,
                arraysInArrays : false,
            }],
        },
    },
];