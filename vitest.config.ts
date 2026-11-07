import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		typecheck: { enabled: false },
		coverage: { reportsDirectory: './tests/coverage', include: [ 'src/**/*.ts' ], exclude: [ 'src/types.ts' ] }
	}
});