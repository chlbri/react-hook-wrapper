import { wrap, useHook } from '@bemedev/hook-wrapper';
import { createFileRoute } from '@tanstack/react-router';

import { ClickOn } from '#/globals/components/ClickOn';
import { Counter } from '#/globals/components/Counter';
import { HUDBanner } from '#/globals/components/HUDBanner';
import { WindowWidth } from '#/globals/components/WindowWidth';
import { useCounter, useWindowWidth } from '#/globals/hooks';

const CounterWrapper = wrap(useCounter);
const WindowWidthWrapper = useHook(useWindowWidth);

export const Route = createFileRoute('/wrapped')({
  notFoundComponent: () => <>NotFound</>,
  component: () => {
    return (
      <main className='mx-auto w-full max-w-5xl px-4 pt-10'>
        {/* Header section */}
        <section className='mb-8 flex flex-col space-y-4'>
          <p className='text-[0.69rem] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400'>
            Paradigm Demo
          </p>
          <h1 className='font-serif text-4xl font-bold text-slate-900 sm:text-5xl dark:text-slate-100'>
            Wrapped (Hook Wrapper Component)
          </h1>
          <p className='max-w-3xl text-slate-500 dark:text-slate-300'>
            In this page, hooks are wrapped inside `<code>wrap()</code>` or `
            <code>useHook()</code>`. Notice that updating counters or resizing the
            browser window increments <em>only</em> that specific component's
            sub-renders. The parent page component render count remains at 1!
          </p>
          <ClickOn steps={[10, 5]} />
        </section>

        {/* Render HUD Banner */}
        <HUDBanner />

        {/* Grid of Interactive Examples */}
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Left Side: Counter Controls */}
          <section className='flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md transition-colors duration-500 ease-out dark:border-slate-800 dark:bg-slate-900/80'>
            <div>
              <h3 className='mb-4 font-serif text-lg font-bold text-slate-900 dark:text-slate-100'>
                1. Stateful Counters
              </h3>
              <p className='mb-6 text-xs text-slate-500 dark:text-slate-400'>
                Clicking these buttons updates local state inside the wrapper
                component, keeping the parent page unaffected.
              </p>

              <div className='space-y-4'>
                <CounterWrapper
                  step={10}
                  render={Counter}
                />
                <CounterWrapper
                  step={5}
                  render={Counter}
                />
              </div>
            </div>
          </section>

          {/* Right Side: Window Width Monitor */}
          <section className='flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md transition-colors duration-500 ease-out dark:border-slate-800 dark:bg-slate-900/80'>
            <div>
              <h3 className='mb-4 font-serif text-lg font-bold text-slate-900 dark:text-slate-100'>
                2. Window Event Listener
              </h3>
              <p className='mb-6 text-xs text-slate-500 dark:text-slate-400'>
                Resizing the browser window triggers events that update only the
                width sub-tree, avoiding full-page paint overhead.
              </p>

              <WindowWidthWrapper render={WindowWidth} />
            </div>
          </section>
        </div>
      </main>
    );
  },
});
