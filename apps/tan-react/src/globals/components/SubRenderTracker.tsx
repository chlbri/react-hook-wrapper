import { useRef } from 'react';

// A component to track and display renders at the sub-component level
export const SubRenderTracker = () => {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <span className='text-sm demo-pill border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300 font-mono'>
      Render Count: {renders.current}
    </span>
  );
};
