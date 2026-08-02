import {
  fireEvent,
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import { useState } from 'react';

import { wrap, useHook } from './wrapper';

describe('TESTS', () => {
  type Renders = { count: number };
  describe('#01 => wrap', () => {
    const useCounter = ({ step = 1 }: { step?: number } = {}) => {
      const [count, setCount] = useState(0);
      return { count, inc: () => setCount(c => c + step) };
    };

    const DirectDemo = ({
      parentRenders,
      step = 1,
    }: {
      parentRenders: Renders;
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
      parentRenders: Renders;
      childRenders: Renders;
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

  describe('#02 => wrap.noParams', () => {
    const useSimpleCounter = () => {
      const [count, setCount] = useState(0);
      return { count, inc: () => setCount(c => c + 1) };
    };

    const DirectDemo = ({ parentRenders }: { parentRenders: Renders }) => {
      parentRenders.count += 1;
      const { count, inc } = useSimpleCounter();
      return (
        <div>
          <span data-testid='noParams-direct-count'>{count}</span>
          <button
            data-testid='noParams-direct-inc-btn'
            onClick={inc}
          >
            Inc
          </button>
        </div>
      );
    };

    const EmptyCounterWrapper = wrap.noParams(
      useSimpleCounter,
      ({ count, inc }) => (
        <div>
          <span data-testid='noParams-wrapped-count'>{count}</span>
          <button
            data-testid='noParams-wrapped-inc-btn'
            onClick={inc}
          >
            Inc
          </button>
        </div>
      ),
    );

    const WrappedDemo = ({
      parentRenders,
    }: {
      parentRenders: Renders;
    }) => {
      parentRenders.count += 1;
      return (
        <div>
          <EmptyCounterWrapper />
        </div>
      );
    };

    const directRenders = { count: 0 };
    const parentRenders = { count: 0 };

    beforeAll(() => {
      render(<DirectDemo parentRenders={directRenders} />);
      render(<WrappedDemo parentRenders={parentRenders} />);
    });

    afterAll(cleanup);

    const directCount = () =>
      screen.getByTestId('noParams-direct-count').textContent;
    const wrappedCount = () =>
      screen.getByTestId('noParams-wrapped-count').textContent;

    const dRenders = () => directRenders.count;
    const wParent = () => parentRenders.count;

    test('#00 => direct count', () => expect(directCount()).toBe('0'));
    test('#01 => direct renders', () => expect(dRenders()).toBe(1));
    test('#02 => wrapped count', () => expect(wrappedCount()).toBe('0'));
    test('#03 => wrapped parent', () => expect(wParent()).toBe(1));

    test('#04 => direct click', () => {
      fireEvent.click(screen.getByTestId('noParams-direct-inc-btn'));
    });

    test('#05 => direct count', () => expect(directCount()).toBe('1'));
    test('#06 => direct renders', () => expect(dRenders()).toBe(2));

    test('#07 => wrapped click', () => {
      fireEvent.click(screen.getByTestId('noParams-wrapped-inc-btn'));
    });

    test('#08 => wrapped count', () => expect(wrappedCount()).toBe('1'));
    test('#09 => wrapped parent', () => expect(wParent()).toBe(1));
  });

  describe('#03 => useHook', () => {
    const useCounter = ({ step = 1 }: { step?: number } = {}) => {
      const [count, setCount] = useState(0);
      return { count, inc: () => setCount(c => c + step) };
    };

    const DirectDemo = ({
      parentRenders,
      step = 1,
    }: {
      parentRenders: Renders;
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
      parentRenders: Renders;
      childRenders: Renders;
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

  describe('#04 => useHook.noParams', () => {
    const useSimpleCounter = () => {
      const [count, setCount] = useState(0);
      return { count, inc: () => setCount(c => c + 1) };
    };

    const DirectDemo = ({ parentRenders }: { parentRenders: Renders }) => {
      parentRenders.count += 1;
      const { count, inc } = useSimpleCounter();
      return (
        <div>
          <span data-testid='usehook-noParams-direct-count'>{count}</span>
          <button
            data-testid='usehook-noParams-direct-inc-btn'
            onClick={inc}
          >
            Inc
          </button>
        </div>
      );
    };

    const EmptyCounterWrapper = useHook.noParams(
      useSimpleCounter,
      ({ count, inc }) => (
        <div>
          <span data-testid='usehook-noParams-wrapped-count'>{count}</span>
          <button
            data-testid='usehook-noParams-wrapped-inc-btn'
            onClick={inc}
          >
            Inc
          </button>
        </div>
      ),
    );

    const WrappedDemo = ({
      parentRenders,
    }: {
      parentRenders: Renders;
    }) => {
      parentRenders.count += 1;
      return (
        <div>
          <EmptyCounterWrapper />
        </div>
      );
    };

    const directRenders = { count: 0 };
    const parentRenders = { count: 0 };

    beforeAll(() => {
      render(<DirectDemo parentRenders={directRenders} />);
      render(<WrappedDemo parentRenders={parentRenders} />);
    });

    afterAll(cleanup);

    const directCount = () =>
      screen.getByTestId('usehook-noParams-direct-count').textContent;
    const wrappedCount = () =>
      screen.getByTestId('usehook-noParams-wrapped-count').textContent;

    const dRenders = () => directRenders.count;
    const wParent = () => parentRenders.count;

    test('#00 => direct count', () => expect(directCount()).toBe('0'));
    test('#01 => direct renders', () => expect(dRenders()).toBe(1));
    test('#02 => wrapped count', () => expect(wrappedCount()).toBe('0'));
    test('#03 => wrapped parent', () => expect(wParent()).toBe(1));

    test('#04 => direct click', () => {
      fireEvent.click(
        screen.getByTestId('usehook-noParams-direct-inc-btn'),
      );
    });

    test('#05 => direct count', () => expect(directCount()).toBe('1'));
    test('#06 => direct renders', () => expect(dRenders()).toBe(2));

    test('#07 => wrapped click', () => {
      fireEvent.click(
        screen.getByTestId('usehook-noParams-wrapped-inc-btn'),
      );
    });

    test('#08 => wrapped count', () => expect(wrappedCount()).toBe('1'));
    test('#09 => wrapped parent', () => expect(wParent()).toBe(1));
  });
});
