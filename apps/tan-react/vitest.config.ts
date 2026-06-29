import { shared } from '@bemedev/shared-vitest';

export default shared({
  test: {
    name: 'tan-react',
    environment: 'jsdom',
    passWithNoTests: true,
  },
});
