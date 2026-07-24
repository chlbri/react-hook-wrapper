import { defineProject } from '@bemedev/dev-utils/vitest-extended';
import viteReact from '@vitejs/plugin-react';

export default defineProject({
  plugins: [viteReact()],

  test: {
    name: 'tan-react',
    environment: 'jsdom',
    globals: true,
    env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
  },
});
