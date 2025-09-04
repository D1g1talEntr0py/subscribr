import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import compat from 'eslint-plugin-compat';
import tsParser from '@typescript-eslint/parser';
import typeScriptEslint from '@typescript-eslint/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';

export default defineConfig({
	extends: [
		eslint.configs.recommended,
		compat.configs['flat/recommended'],
		jsdoc.configs['flat/recommended-typescript'],
		...tsEslint.configs.recommended,
		...tsEslint.configs.recommendedTypeChecked
	],
	ignores: ['node_modules/**', 'dist/**', 'tests/**', '*.config.[tj]s'],
	// @ts-expect-error - TS doesn't recognize the plugin
	plugins: { typeScriptEslint, jsdoc },
	languageOptions: {
		parserOptions: {
			project: true,
			parser: tsParser,
			parserOptions: { ecmaFeatures: { impliedStrict: true } },
			tsconfigRootDir: import.meta.dirname,
			allowAutomaticSingleRunInference: true,
			warnOnUnsupportedTypeScriptVersion: false
		}
	},
	settings: {
		lintAllEsApis: true,
		jsdoc: {
			mode: 'typescript',
			structuredTags: {
				template: { name: 'namepath-defining', type: true }
			}
		}
	},
	rules: {
		'jsdoc/check-param-names': [ 'error', { checkDestructured: false	}	],
		'jsdoc/require-param': [ 'error',	{ checkDestructured: false } ],
		'jsdoc/tag-lines': 0,
		'jsdoc/no-defaults': 0,
		indent: [ 'error', 'tab', { SwitchCase: 1 } ],
		'linebreak-style': [ 'error', 'unix' ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always', { omitLastInOneLineBlock: true, omitLastInOneLineClassBody: true } ],
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-unsafe-enum-comparison': 'off',
		'@typescript-eslint/no-unused-vars': ['error', {
			args: 'all',
			argsIgnorePattern: '^_',
			caughtErrors: 'all',
			caughtErrorsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
			varsIgnorePattern: '^_',
			ignoreRestSiblings: true
		}]
	}
});