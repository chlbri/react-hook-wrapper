import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';

import { ThemeToggle, MAPPER } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => {
        return {
          matches: false,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }),
    });
  });

  test('renders with initial mode and toggles mode on click', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe(MAPPER.auto);

    fireEvent.click(button);
    expect(button.textContent).toBe(MAPPER.light);

    fireEvent.click(button);
    expect(button.textContent).toBe(MAPPER.dark);

    fireEvent.click(button);
    expect(button.textContent).toBe(MAPPER.auto);
  });
});
