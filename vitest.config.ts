import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
    alias: [
			{ find: 'src', replacement: new URL('./src', import.meta.url).pathname },
			{ find: '@/', replacement: fileURLToPath(new URL('./', import.meta.url)) }
		]
  },
	test: {
		environment: 'node',
		typecheck: { enabled: false },
		coverage: {
			reportsDirectory: './tests/coverage',
			include: [ 'src/**/*.ts' ],
			exclude: [ 'src/index.ts', 'src/@types' ]
		}
	}
});

// export default defineConfig({
// 	test: {
// 		typecheck: { enabled: false },
// 		coverage: { reporter: [ 'lcov', 'json', 'text' ], reportsDirectory: 'tests/coverage', include: [ 'src' ], exclude: [ 'src/index.ts', 'src/@types' ] }
// 	},
// 	resolve: {
// 		alias: [
// 			{ find: /^@d1g1tal\/collections$/, replacement: fileURLToPath(new URL('./node_modules/@d1g1tal/collections/dist/set-multi-map.js', import.meta.url)) },
// 			{ find: '@/', replacement: fileURLToPath(new URL('./', import.meta.url)) }
// 		]
// 	}
// });