import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { shared } from '@bemedev/shared-vitest';
import viteReact from '@vitejs/plugin-react';

export default shared({
  plugins: [viteReact(), exclude({ ignoreCoverageFiles: ['**/*.js'] })],
  test: {
    name: 'project1',
    environment: 'jsdom',
    env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
  },
});
