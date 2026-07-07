import { shared } from '@bemedev/shared-vitest';
import viteReact from '@vitejs/plugin-react';

export default shared({
  plugins: [viteReact()],

  test: {
    name: 'tan-react',
    environment: 'jsdom',
    passWithNoTests: true,
    globals: true,
    env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
  },
});
