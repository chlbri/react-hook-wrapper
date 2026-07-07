import { SubRenderTracker } from './SubRenderTracker';

type Props = { width: number; form: string };

export const WindowWidth = ({ width, form }: Props) => (
  <div className='space-y-4 rounded-xl border border-slate-200 bg-black/5 p-6 text-center transition-colors duration-500 ease-out dark:border-slate-800 dark:bg-white/5'>
    <div>
      <p className='m-0 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
        Current Width
      </p>
      <p className='mt-1 font-mono text-3xl font-bold text-slate-900 dark:text-slate-100'>
        {width}px
      </p>
    </div>
    <div className='flex flex-wrap items-center justify-center gap-2'>
      <span className='inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-2.5 py-1 font-mono text-xs font-bold text-cyan-800 dark:text-green-300'>
        {form}
      </span>
      <SubRenderTracker />
    </div>
  </div>
);
