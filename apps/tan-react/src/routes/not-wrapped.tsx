import { createFileRoute } from '@tanstack/react-router';

import { ClickOn } from '#/globals/components/ClickOn';
import { Counter } from '#/globals/components/Counter';
import { HUDBanner } from '#/globals/components/HUDBanner';
import { WindowWidth } from '#/globals/components/WindowWidth';
import { useCounter, useWindowWidth } from '#/globals/hooks';

export const Route = createFileRoute('/not-wrapped')({
  component: () => {
    const counting1 = useCounter({ step: 10 });
    const counting2 = useCounter({ step: 5 });
    const measure = useWindowWidth();

    return (
      <main className='mx-auto w-full max-w-5xl px-4 pt-10'>
        {/* Header section */}
        <section className='mb-8 flex flex-col space-y-4'>
          <p className='text-[0.69rem] font-bold tracking-widest text-rose-700 uppercase dark:text-rose-400'>
            Paradigm Demo
          </p>
          <h1 className='font-serif text-4xl font-bold text-slate-900 sm:text-5xl dark:text-slate-100'>
            Standard Hook Call (Not Wrapped)
          </h1>
          <p className='max-w-3xl text-slate-500 dark:text-slate-300'>
            In this page, hooks are called directly in the body of the main
            component. Notice how any interaction below immediately
            triggers a full parent component re-render.
          </p>
          <ClickOn steps={[counting1.step, counting2.step]} />
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
                Clicking these buttons updates local state, causing the
                entire page to re-render.
              </p>

              <div className='space-y-4'>
                <Counter {...counting1} />
                <Counter {...counting2} />
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
                Resizing the browser window triggers event listeners that
                update the screen state, re-rendering the whole page on
                every pixel change.
              </p>

              <WindowWidth {...measure} />
            </div>
          </section>
        </div>
      </main>
    );
  },
});
