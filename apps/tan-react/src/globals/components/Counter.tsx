import type { useCounter } from '../hooks';
import { SubRenderTracker } from './SubRenderTracker';

export const Counter = ({
  inc,
  count,
  step,
}: ReturnType<typeof useCounter>) => (
  <div className='flex items-center justify-between p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-slate-800  transition-colors duration-500 ease-out'>
    <div className='flex items-center gap-2'>
      <span className='inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'>
        Step: {step}
      </span>
      <SubRenderTracker />
    </div>
    <div className='flex items-center gap-4'>
      <span className='font-mono text-lg font-bold text-slate-900 dark:text-slate-100'>
        {count}
      </span>
      <button
        className='inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all duration-180 border-2 border-blue-500 dark:border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400 shadow-2xl'
        onClick={inc}
      >
        +{step}
      </button>
    </div>
  </div>
);
