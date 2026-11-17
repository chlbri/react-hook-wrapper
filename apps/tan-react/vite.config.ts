import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';

const config = defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },

  plugins: lazyPlugins(() => {
    const isTest = process.env.NODE_ENV === 'test';

    return [
      devtools(),
      tailwindcss(),
      // TanStack Start enumerates every env var during config resolution, so
      // CI-only vars invalidate the task cache.
      ...(isTest ? [] : [tanstackStart()]),
      nitro(),
      viteReact(),
    ];
  }),

  test: {
    name: 'tan-react',
    environment: 'jsdom',
    globals: true,
    env: { RTL_SKIP_AUTO_CLEANUP: 'true' },
  },
});

export default config;
