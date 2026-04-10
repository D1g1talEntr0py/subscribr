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