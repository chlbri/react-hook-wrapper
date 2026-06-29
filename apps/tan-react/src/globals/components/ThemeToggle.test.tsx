import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('ThemeToggle', () => {
  test('renders with initial mode and toggles mode on click', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Auto');

    fireEvent.click(button);
    expect(button.textContent).toBe('Light');

    fireEvent.click(button);
    expect(button.textContent).toBe('Dark');

    fireEvent.click(button);
    expect(button.textContent).toBe('Auto');
  });
});
