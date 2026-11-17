import { createImportTests } from '@bemedev/dev-utils/vitest-extended';
import { describe } from 'vite-plus/test';

const createTests = createImportTests('@bemedev/hook-wrapper');

describe('TESTS', () => {
  describe(...createTests({ SUCCESS: ['Wrapper', 'wrap', 'useHook'] }));

  describe(
    ...createTests({
      SUCCESS: ['Wrapper'],
      FAILS: ['wrap', 'useHook'],
      path: 'component',
    }),
  );
});
