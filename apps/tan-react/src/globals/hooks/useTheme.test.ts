import { act, renderHook } from '@testing-library/react';

import { useTheme } from './useTheme';

describe('useTheme', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi
        .fn()
        .mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
    });
  });

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  test('returns initial theme mode', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.mode).toBe('auto');
  });

  test('toggles theme modes light -> dark -> auto', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.mode).toBe('auto');

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('light');
    expect(window.localStorage.getItem('theme')).toBe('light');

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('auto');
    expect(window.localStorage.getItem('theme')).toBe('auto');
  });
});
