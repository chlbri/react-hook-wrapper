import type { useCounter } from '../hooks';
import { SubRenderTracker } from './SubRenderTracker';

type CounterButtonProps = { step: number; onClick?: () => void };

export const CounterButton = ({
  onClick = () => {},
  step,
}: CounterButtonProps) => (
  <button
    className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-rose-400 bg-rose-500/5 px-4 py-2.5 text-sm font-bold text-red-900 shadow-md shadow-slate-400 transition-all duration-180 hover:scale-105 hover:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-300 dark:shadow-slate-800'
    onClick={onClick}
  >
    +{step}
  </button>
);

export const Counter = ({
  inc,
  count,
  step,
}: ReturnType<typeof useCounter>) => (
  <div className='flex items-center justify-between rounded-xl border border-slate-200 bg-black/5 p-1.5 transition-colors duration-500 ease-out dark:border-slate-800 dark:bg-white/5'>
    <div className='flex items-center gap-2'>
      <span className='inline-flex w-18 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 py-1 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'>
        step: {step}
      </span>
      <SubRenderTracker />
    </div>
    <div className='flex items-center gap-4'>
      <span className='font-mono text-lg font-bold text-slate-900 dark:text-slate-100'>
        {count}
      </span>
      <CounterButton
        onClick={inc}
        step={step}
      />
    </div>
  </div>
);
