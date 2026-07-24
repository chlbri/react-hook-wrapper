import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { defineProject } from '@bemedev/dev-utils/vitest-extended';
import viteReact from '@vitejs/plugin-react';

export default defineProject({
  plugins: [viteReact(), exclude({ ignoreCoverageFiles: ['**/*.js'] })],
  test: {
    name: 'project1',
    environment: 'jsdom',
    env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
  },
});
