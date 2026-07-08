import { defineConfig, type UserWorkspaceConfig } from 'vitest/config';

export const shared = (conf: UserWorkspaceConfig) => {
  const _env = conf.test?.env ?? {};

  return defineConfig({
    resolve: { tsconfigPaths: true },
    ...conf,
    test: {
      globals: true,
      logHeapUsage: false,
      env: { NODE_ENV: 'test', ..._env },
      ...conf.test,
    },
  });
};
