import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		typecheck: { enabled: false },
		coverage: { reporter: [ 'lcov', 'json', 'text' ], reportsDirectory: 'tests/coverage', include: [ 'src' ], exclude: [ 'src/index.ts', 'src/@types' ] }
	},
	resolve: {
		alias: [ { find: '@/', replacement: fileURLToPath(new URL('./', import.meta.url)) } ]
	}
});