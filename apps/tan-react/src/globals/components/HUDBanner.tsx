import { useLayoutEffect, useRef } from 'react';

import { RENDERS_ACCEPTABLE } from '../constants';

export const HUDBanner = () => {
  const parentRenders = useRef(0);
  useLayoutEffect(() => {
    parentRenders.current += 1;
  });

  return (
    <section
      className={`border border-slate-200 bg-white/80 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 ${parentRenders.current > RENDERS_ACCEPTABLE ? 'border-rose-500/20 bg-rose-500/5' : 'border-green-500/20 bg-green-500/5'} mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl p-4 transition-colors duration-500 ease-out sm:flex-row sm:p-5`}
    >
      <div className='flex items-center gap-3'>
        <span className='relative flex h-3 w-3'>
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
              parentRenders.current > RENDERS_ACCEPTABLE
                ? 'bg-rose-400'
                : 'bg-green-400'
            } opacity-75`}
          ></span>
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${
              parentRenders.current > RENDERS_ACCEPTABLE
                ? 'bg-rose-600 dark:bg-rose-600/40'
                : 'bg-emerald-600 dark:bg-emerald-500'
            }`}
          ></span>
        </span>
        <div>
          <h3
            className={`font-semibold ${
              parentRenders.current > RENDERS_ACCEPTABLE
                ? 'text-rose-700 dark:text-rose-400'
                : 'text-emerald-700 dark:text-emerald-400'
            } m-0 text-base`}
          >
            Parent Component Render HUD
          </h3>
          <p className='m-0 text-xs text-slate-500 dark:text-slate-400'>
            Every action triggers a full re-render of this page component.
          </p>
        </div>
      </div>
      <div
        className={`flex items-center gap-2 ${parentRenders.current > RENDERS_ACCEPTABLE ? 'border border-rose-500/20 bg-rose-500/10' : 'border border-green-500/20 bg-green-500/5'} rounded-xl px-4 py-2`}
      >
        <span
          className={`text-xs font-bold ${parentRenders.current > RENDERS_ACCEPTABLE ? 'text-rose-900 dark:text-rose-400' : 'text-slate-900 dark:text-slate-400'} tracking-wider uppercase`}
        >
          total rerenders:
        </span>
        <span
          className={`w-10 text-right font-mono text-xl font-bold ${parentRenders.current > RENDERS_ACCEPTABLE ? 'text-rose-900 dark:text-rose-300' : 'text-slate-900 dark:text-slate-300'}`}
        >
          {parentRenders.current}
        </span>
      </div>
    </section>
  );
};
