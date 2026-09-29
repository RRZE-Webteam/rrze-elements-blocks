const js = require( '@eslint/js' );
const wordpress = require( '@wordpress/eslint-plugin' );
const prettier = require( 'eslint-config-prettier' );
const globals = require( 'globals' );
const tsdoc = require( 'eslint-plugin-tsdoc' );

const browserFiles = [ 'src/**/*.{js,jsx,ts,tsx}', 'assets/js/**/*.js' ];
const nodeOnlyGlobals = Object.fromEntries(
	Object.keys( globals.node )
		.filter( ( name ) => ! ( name in globals.browser ) )
		.map( ( name ) => [ name, 'off' ] )
);
const nodeGlobals = {
	...globals.node,
	window: 'off',
	document: 'off',
	wp: 'off',
	SCRIPT_DEBUG: 'off',
};

module.exports = [
	{
		ignores: [
			'**/node_modules/**',
			'**/vendor/**',
			'build/**',
			'dist/**',
			'_tmp/**',
			'coverage/**',
			'legacy-tests/**',
			'tests/**',
			'playwright-report/**',
			'test-results/**',
			'blob-report/**',
			'**/*.min.js',
		],
	},
	js.configs.recommended,
	...wordpress.configs.recommended,
	// Formatting remains the responsibility of `npm run format`.
	prettier,
	{
		languageOptions: {
			ecmaVersion: 'latest',
		},
		rules: {
			'prettier/prettier': 'off',
			'no-console': 'off',
			// Keep experimental WordPress APIs visible without blocking lint.
			'@wordpress/no-unsafe-wp-apis': 'warn',
			'@wordpress/i18n-text-domain': [
				'error',
				{ allowedTextDomain: 'rrze-elements-blocks' },
			],
		},
	},
	{
		files: browserFiles,
		languageOptions: {
			globals: {
				...nodeOnlyGlobals,
				...globals.browser,
				wp: 'readonly',
			},
		},
	},
	{
		files: [ 'assets/js/**/*.js' ],
		languageOptions: {
			sourceType: 'script',
		},
	},
	{
		files: [ 'assets/js/accordion/*.js' ],
		languageOptions: {
			globals: { jQuery: 'readonly' },
		},
	},
	{
		files: [
			'assets/js/carousel/*.js',
			'assets/js/counter/*.js',
			'assets/js/timeline/*.js',
			'assets/js/scrollstories/*.js',
		],
		languageOptions: {
			globals: {
				gsap: 'readonly',
				ScrollTrigger: 'readonly',
				ScrollToPlugin: 'readonly',
			},
		},
	},
	{
		files: [ '*.js' ],
		settings: {
			// Resolve runtime packages rather than their @types declarations.
			'import/resolver': 'node',
		},
		languageOptions: {
			sourceType: 'commonjs',
			globals: nodeGlobals,
		},
	},
	{
		files: [ '*.ts' ],
		languageOptions: {
			globals: nodeGlobals,
		},
	},
	{
		files: [ 'src/blocks/**/deprecated.tsx', 'src/blocks/**/v*/**/*.{ts,tsx}' ],
		rules: {
			// Preserve readable version numbers in historical save/migration aliases.
			camelcase: [ 'error', {
				properties: 'never',
				allow: [ '^(?:[Aa]ttributes|save|migrate)V\\d+(?:_\\d+)+$' ],
			} ],
		},
	},
	{
		files: [ '**/*.{ts,tsx}' ],
		plugins: { tsdoc },
		settings: {
			jsdoc: {
				mode: 'typescript',
				tagNamePreference: { returns: 'returns', yields: 'yields' },
			},
		},
		// The WordPress preset supplies the TS parser and syntax-only rules.
		// Keep type checking in `npm run typecheck`; no parserOptions.project.
		rules: {
			'no-undef': 'off',
			'no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-expressions': 'error',
			// TSDoc documents the props object; its properties belong in the type.
			// Dotted @param names required by JSDoc are invalid in TSDoc.
			'jsdoc/require-param': [ 'error', { checkDestructured: false } ],
			'jsdoc/check-param-names': [ 'error', { checkDestructured: false } ],
			'tsdoc/syntax': 'warn',
		},
	},
];
