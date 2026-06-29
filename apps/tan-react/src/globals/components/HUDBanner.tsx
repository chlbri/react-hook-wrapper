import { useLayoutEffect, useRef } from 'react';
import { RENDERS_ACCEPTABLE } from '../constants';

export const HUDBanner = () => {
  const parentRenders = useRef(0);
  useLayoutEffect(() => {
    parentRenders.current += 1;
  });

  return (
    <section
      className={`bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md ${parentRenders.current > RENDERS_ACCEPTABLE ? 'border-rose-500/20 bg-rose-500/5' : 'border-green-500/20 bg-green-500/5'} rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4  transition-colors duration-500 ease-out`}
    >
      <div className='flex items-center gap-3'>
        <span className='relative flex h-3 w-3'>
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              parentRenders.current > RENDERS_ACCEPTABLE
                ? 'bg-rose-400'
                : 'bg-green-400'
            } opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
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
            } text-base m-0`}
          >
            Parent Component Render HUD
          </h3>
          <p className='text-xs text-slate-500 dark:text-slate-400 m-0'>
            Every action triggers a full re-render of this page component.
          </p>
        </div>
      </div>
      <div
        className={`flex items-center gap-2 ${parentRenders.current > RENDERS_ACCEPTABLE ? 'bg-rose-500/10 border border-rose-500/20' : 'bg-green-500/5 border border-green-500/20'} px-4 py-2 rounded-xl`}
      >
        <span
          className={`text-xs font-bold ${parentRenders.current > RENDERS_ACCEPTABLE ? 'text-rose-900 dark:text-rose-400' : 'text-slate-900 dark:text-slate-400'} uppercase tracking-wider`}
        >
          total rerenders:
        </span>
        <span
          className={`font-mono text-xl font-bold w-10 text-right ${parentRenders.current > RENDERS_ACCEPTABLE ? 'text-rose-900 dark:text-rose-300' : 'text-slate-900 dark:text-slate-300'}`}
        >
          {parentRenders.current}
        </span>
      </div>
    </section>
  );
};
