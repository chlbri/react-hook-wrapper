import { SubRenderTracker } from './SubRenderTracker';

type Props = {
  width: number;
  form: string;
};

export const WindowWidth = ({ width, form }: Props) => (
  <div className='p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-center space-y-4  transition-colors duration-500 ease-out'>
    <div>
      <p className='text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold m-0'>
        Current Width
      </p>
      <p className='font-mono text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1'>
        {width}px
      </p>
    </div>
    <div className='flex flex-wrap justify-center gap-2 items-center'>
      <span className='inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border border-blue-500/20 bg-blue-500/5 text-cyan-800 dark:text-green-300 font-mono'>
        {form}
      </span>
      <SubRenderTracker />
    </div>
  </div>
);
