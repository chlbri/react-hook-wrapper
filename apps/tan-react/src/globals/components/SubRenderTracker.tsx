import { useRef } from 'react';

// A component to track and display renders at the sub-component level
export const SubRenderTracker = () => {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <span className='text-sm border-blue-500/20 bg-blue-500/5 text-zinc-500 dark:text-blue-300 font-mono font-semibold'>
      Render Count: {renders.current}
    </span>
  );
};
