import { CounterButton } from './Counter';

type Props = {
  steps: number[];
};

export const ClickOn = ({ steps }: Props) => (
  <p className='text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center space-x-3'>
    <span>Click on</span>
    <div className='flex items-center gap-4'>
      {steps.map((step, key) => (
        <CounterButton key={key} step={step} />
      ))}
    </div>
    <span>buttons to see the difference on rerenders.</span>
  </p>
);
