import type { useCounter } from '../hooks';
import { SubRenderTracker } from './SubRenderTracker';

type CounterButtonProps = {
  step: number;
  onClick?: () => void;
};

export const CounterButton = ({
  onClick = () => {},
  step,
}: CounterButtonProps) => (
  <button
    className='inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all duration-180 border-2 border-rose-400 dark:border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-red-900 dark:text-rose-300 shadow-md dark:shadow-slate-200 hover:scale-105 shadow-slate-400'
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
      <CounterButton onClick={inc} step={step} />
    </div>
  </div>
);
