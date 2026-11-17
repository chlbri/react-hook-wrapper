import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [viteReact(), exclude({ ignoreCoverageFiles: ['**/*.js'] })],

  test: {
    name: 'project1',
    environment: 'jsdom',
    env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
    globals: true,
    server: { deps: { inline: ['@bemedev/dev-utils'] } },
  },
});
