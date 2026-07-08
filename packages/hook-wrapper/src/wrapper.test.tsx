import {
  fireEvent,
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import { useState } from 'react';

import { wrap, useHook } from './wrapper';

describe('TESTS', () => {
  describe('#01 => wrap', () => {
    const useCounter = ({ step = 1 }: { step?: number } = {}) => {
      const [count, setCount] = useState(0);
      return { count, inc: () => setCount(c => c + step) };
    };

    const DirectDemo = ({
      parentRenders,
      step = 1,
    }: {
      parentRenders: { count: number };
      step?: number;
    }) => {
      parentRenders.count += 1;
      const { count, inc } = useCounter({ step });
      return (
        <div>
          <span data-testid='direct-count'>{count}</span>
          <button
            data-testid='direct-inc-btn'
            onClick={inc}
          >
            Inc
          </button>
        </div>
      );
    };

    const CounterWrapper = wrap(useCounter);

    const WrappedDemo = ({
      parentRenders,
      childRenders,
      step = 1,
    }: {
      parentRenders: { count: number };
      childRenders: { count: number };
      step?: number;
    }) => {
      parentRenders.count += 1;
      return (
        <div>
          <CounterWrapper
            step={step}
            render={({ count, inc }) => {
              childRenders.count += 1;
              return (
                <div>
                  <span data-testid='wrapped-count'>{count}</span>
                  <button
                    data-testid='wrapped-inc-btn'
                    onClick={inc}
                  >
                    Inc
                  </button>
                </div>
              );
            }}
          />
        </div>
      );
    };

    const directRenders = { count: 0 };
    const parentRenders = { count: 0 };
    const childRenders = { count: 0 };

    beforeAll(() => {
      render(
        <DirectDemo
          parentRenders={directRenders}
          step={1}
        />,
      );
      render(
        <WrappedDemo
          parentRenders={parentRenders}
          childRenders={childRenders}
          step={1}
        />,
      );
    });

    afterAll(cleanup);

    const directCount = () =>
      screen.getByTestId('direct-count').textContent;
    const wrappedCount = () => {
      return screen.getByTestId('wrapped-count').textContent;
    };

    const dRenders = () => directRenders.count;
    const wParent = () => parentRenders.count;
    const wChild = () => childRenders.count;

    test('#00 => direct count', () => expect(directCount()).toBe('0'));
    test('#01 => direct renders', () => expect(dRenders()).toBe(1));
    test('#02 => wrapped count', () => expect(wrappedCount()).toBe('0'));
    test('#03 => wrapped parent', () => expect(wParent()).toBe(1));
    test('#04 => wrapped child', () => expect(wChild()).toBe(1));

    test('#05 => direct click', () => {
      fireEvent.click(screen.getByTestId('direct-inc-btn'));
    });

    test('#06 => direct count', () => expect(directCount()).toBe('1'));
    test('#07 => direct renders', () => expect(dRenders()).toBe(2));

    test('#08 => wrapped click', () => {
      fireEvent.click(screen.getByTestId('wrapped-inc-btn'));
    });

    test('#09 => wrapped count', () => expect(wrappedCount()).toBe('1'));
    test('#10 => wrapped parent', () => expect(wParent()).toBe(1));
    test('#11 => wrapped child', () => expect(wChild()).toBe(2));
  });

  describe('#02 => useHook', () => {
    const useCounter = ({ step = 1 }: { step?: number } = {}) => {
      const [count, setCount] = useState(0);
      return { count, inc: () => setCount(c => c + step) };
    };

    const DirectDemo = ({
      parentRenders,
      step = 1,
    }: {
      parentRenders: { count: number };
      step?: number;
    }) => {
      parentRenders.count += 1;
      const { count, inc } = useCounter({ step });
      return (
        <div>
          <span data-testid='direct-count'>{count}</span>
          <button
            data-testid='direct-inc-btn'
            onClick={inc}
          >
            Inc
          </button>
        </div>
      );
    };

    const CounterWrapper = useHook(useCounter);

    const WrappedDemo = ({
      parentRenders,
      childRenders,
      step = 1,
    }: {
      parentRenders: { count: number };
      childRenders: { count: number };
      step?: number;
    }) => {
      parentRenders.count += 1;
      return (
        <div>
          <CounterWrapper
            step={step}
            render={({ count, inc }) => {
              childRenders.count += 1;
              return (
                <div>
                  <span data-testid='wrapped-count'>{count}</span>
                  <button
                    data-testid='wrapped-inc-btn'
                    onClick={inc}
                  >
                    Inc
                  </button>
                </div>
              );
            }}
          />
        </div>
      );
    };

    const directRenders = { count: 0 };
    const parentRenders = { count: 0 };
    const childRenders = { count: 0 };

    beforeAll(() => {
      render(
        <DirectDemo
          parentRenders={directRenders}
          step={1}
        />,
      );
      render(
        <WrappedDemo
          parentRenders={parentRenders}
          childRenders={childRenders}
          step={1}
        />,
      );
    });

    afterAll(cleanup);

    const directCount = () =>
      screen.getByTestId('direct-count').textContent;
    const wrappedCount = () => {
      return screen.getByTestId('wrapped-count').textContent;
    };

    const dRenders = () => directRenders.count;
    const wParent = () => parentRenders.count;
    const wChild = () => childRenders.count;

    test('#00 => direct count', () => expect(directCount()).toBe('0'));
    test('#01 => direct renders', () => expect(dRenders()).toBe(1));
    test('#02 => wrapped count', () => expect(wrappedCount()).toBe('0'));
    test('#03 => wrapped parent', () => expect(wParent()).toBe(1));
    test('#04 => wrapped child', () => expect(wChild()).toBe(1));

    test('#05 => direct click', () => {
      fireEvent.click(screen.getByTestId('direct-inc-btn'));
    });

    test('#06 => direct count', () => expect(directCount()).toBe('1'));
    test('#07 => direct renders', () => expect(dRenders()).toBe(2));

    test('#08 => wrapped click', () => {
      fireEvent.click(screen.getByTestId('wrapped-inc-btn'));
    });

    test('#09 => wrapped count', () => expect(wrappedCount()).toBe('1'));
    test('#10 => wrapped parent', () => expect(wParent()).toBe(1));
    test('#11 => wrapped child', () => expect(wChild()).toBe(2));
  });
});
