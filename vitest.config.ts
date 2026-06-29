import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },

  test: {
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,

    coverage: {
      enabled: true,
      reportsDirectory: '.coverage',
      provider: 'v8',
      exclude: [],
      allowExternal: false,
    },

    projects: [
      'packages/hook-wrapper/vitest.config.ts',
      'packages/__tests__/project1/vitest.config.ts',
      'apps/tan-react/vitest.config.ts',
    ],
  },
});
