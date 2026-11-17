import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { useHook, wrap, Wrapper } from '@bemedev/hook-wrapper';

type Renders = { count: number };

const useCounter = ({ step = 1 }: { step?: number } = {}) => {
  const [count, setCount] = useState(0);
  return { count, inc: () => setCount(c => c + step) };
};

const useSimpleCounter = () => {
  const [count, setCount] = useState(0);
  return { count, inc: () => setCount(c => c + 1) };
};

const countOf = (testId: string) => screen.getByTestId(testId).textContent;

describe('#01 => wrap', () => {
  const CounterWrapper = wrap(useCounter);
  const parentRenders = { count: 0 };
  const childRenders = { count: 0 };

  const Demo = ({ parentRenders }: { parentRenders: Renders }) => {
    parentRenders.count += 1;
    return (
      <CounterWrapper
        step={2}
        render={({ count, inc }) => {
          childRenders.count += 1;
          return (
            <div>
              <span data-testid='count'>{count}</span>
              <button data-testid='inc' onClick={inc}>
                Inc
              </button>
            </div>
          );
        }}
      />
    );
  };

  beforeAll(() => render(<Demo parentRenders={parentRenders} />));
  afterAll(cleanup);

  test('#00 => initial count is 0', () => expect(countOf('count')).toBe('0'));
  test('#01 => parent renders once', () => expect(parentRenders.count).toBe(1));
  test('#02 => child renders once', () => expect(childRenders.count).toBe(1));

  test('#03 => click on the increment button', () => {
    fireEvent.click(screen.getByTestId('inc'));
  });

  test('#04 => count is incremented by the step prop', () =>
    expect(countOf('count')).toBe('2'));
  test('#05 => parent does not rerender', () => expect(parentRenders.count).toBe(1));
  test('#06 => child rerenders', () => expect(childRenders.count).toBe(2));
});

describe('#02 => wrap.noParams', () => {
  const parentRenders = { count: 0 };
  const childRenders = { count: 0 };

  const EmptyCounterWrapper = wrap.noParams(useSimpleCounter, ({ count, inc }) => {
    childRenders.count += 1;
    return (
      <div>
        <span data-testid='count'>{count}</span>
        <button data-testid='inc' onClick={inc}>
          Inc
        </button>
      </div>
    );
  });

  const Demo = ({ parentRenders }: { parentRenders: Renders }) => {
    parentRenders.count += 1;
    return <EmptyCounterWrapper />;
  };

  beforeAll(() => render(<Demo parentRenders={parentRenders} />));
  afterAll(cleanup);

  test('#00 => initial count is 0', () => expect(countOf('count')).toBe('0'));
  test('#01 => parent renders once', () => expect(parentRenders.count).toBe(1));
  test('#02 => child renders once', () => expect(childRenders.count).toBe(1));

  test('#03 => click on the increment button', () => {
    fireEvent.click(screen.getByTestId('inc'));
  });

  test('#04 => count is incremented', () => expect(countOf('count')).toBe('1'));
  test('#05 => parent does not rerender', () => expect(parentRenders.count).toBe(1));
  test('#06 => child rerenders', () => expect(childRenders.count).toBe(2));
});

describe('#03 => useHook', () => {
  const CounterWrapper = useHook(useCounter);

  afterAll(cleanup);

  test('#01 => is an alias of wrap', () => expect(useHook).toBe(wrap));
  test('#02 => exposes the same noParams helper', () =>
    expect(useHook.noParams).toBe(wrap.noParams));

  test('#03 => render the wrapped hook', () => {
    render(
      <CounterWrapper
        render={({ count }) => <span data-testid='count'>{count}</span>}
      />,
    );
  });

  test('#04 => renders the hook data', () => expect(countOf('count')).toBe('0'));
});

describe('#04 => Wrapper', () => {
  const childRenders = { count: 0 };

  afterAll(cleanup);

  test('#01 => render the wrapper component', () => {
    render(
      <Wrapper hook={useSimpleCounter}>
        {({ count, inc }) => {
          childRenders.count += 1;
          return (
            <div>
              <span data-testid='count'>{count}</span>
              <button data-testid='inc' onClick={inc}>
                Inc
              </button>
            </div>
          );
        }}
      </Wrapper>,
    );
  });

  test('#02 => initial count is 0', () => expect(countOf('count')).toBe('0'));
  test('#03 => children renders once', () => expect(childRenders.count).toBe(1));

  test('#04 => click on the increment button', () => {
    fireEvent.click(screen.getByTestId('inc'));
  });

  test('#05 => count is incremented', () => expect(countOf('count')).toBe('1'));
  test('#06 => children rerenders', () => expect(childRenders.count).toBe(2));
});
