import { Counter } from '#/globals/components/Counter';
import { HUDBanner } from '#/globals/components/HUDBanner';
import { WindowWidth } from '#/globals/components/WindowWidth';
import { useCounter, useWindowWidth } from '#/globals/hooks';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/not-wrapped')({
  component: () => {
    const counting1 = useCounter({ step: 10 });
    const counting2 = useCounter({ step: 5 });
    const measure = useWindowWidth();

    return (
      <main className='max-w-5xl mx-auto w-full px-4 pb-12 pt-10'>
        {/* Header section */}
        <section className='mb-8'>
          <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2'>
            Paradigm Demo
          </p>
          <h1 className='font-serif text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl'>
            Standard Hook Call (Not Wrapped)
          </h1>
          <p className='text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-2'>
            In this page, hooks are called directly in the body of the main
            component. Notice how any interaction below immediately
            triggers a full parent component re-render.
          </p>
        </section>

        {/* Render HUD Banner */}
        <HUDBanner />

        {/* Grid of Interactive Examples */}
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Left Side: Counter Controls */}
          <section className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between  transition-colors duration-500 ease-out'>
            <div>
              <h3 className='font-serif text-lg font-bold mb-4 text-slate-900 dark:text-slate-100'>
                1. Stateful Counters
              </h3>
              <p className='text-xs text-slate-500 dark:text-slate-400 mb-6'>
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
          <section className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between  transition-colors duration-500 ease-out'>
            <div>
              <h3 className='font-serif text-lg font-bold mb-4 text-slate-900 dark:text-slate-100'>
                2. Window Event Listener
              </h3>
              <p className='text-xs text-slate-500 dark:text-slate-400 mb-6'>
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
