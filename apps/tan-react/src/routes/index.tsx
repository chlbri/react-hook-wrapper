import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Credits } from '#/globals/components/Credits';
import { bumper } from '#/globals/hooks/bumper';

export const Route = createFileRoute('/')({ component: IndexComponent });

function IndexComponent() {
  const [pkgManager, setPkgManager] = useState<'pnpm' | 'npm' | 'yarn'>(
    'pnpm',
  );
  const [copied, setCopied] = useState(false);
  const enterStyle = bumper(200);

  return (
    <main className='max-w-7xl mx-auto w-full px-4 pb-12 pt-10 flex flex-col space-y-8'>
      {/* Hero Section */}
      <section className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rise-in relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14'>
        <div className='pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]' />
        <div className='pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]' />

        <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-3'>
          React Design Patterns
        </p>
        <h1 className='font-serif mb-5 max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl'>
          Decouple stateful logic from UI rendering.
        </h1>
        <p className='mb-8 max-w-3xl text-base text-slate-500 dark:text-slate-400 sm:text-lg leading-relaxed'>
          Custom hooks are React's primary way to share stateful behavior.
          However, calling them directly at the root of a large page
          component forces the entire page to re-render whenever the hook
          updates. The <strong>Hook Wrapper Pattern</strong> compiles hooks
          into reusable components to isolate re-render performance.
        </p>
      </section>

      {/* Two Main Paradigms Grid */}
      <section className='grid gap-6 md:grid-cols-2'>
        {/* Card 1: Not Wrapped */}
        <article
          className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rise-in rounded-3xl p-6 sm:p-8 flex flex-col justify-between'
          style={{ animationDelay: '100ms' }}
        >
          <div>
            <div className='flex items-center gap-2.5 mb-4'>
              <span className='h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' />
              <p className='text-[0.69rem] font-bold uppercase tracking-widest text-rose-500 m-0'>
                Standard Call Pattern
              </p>
            </div>
            <h2 className='font-serif text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100'>
              Not Wrapped (Direct Hook)
            </h2>
            <p className='text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed'>
              Invoke hooks directly at the root of your component. Easy to
              write and straightforward for simple components, but ties the
              entire component's lifecycle to the hook's state transitions.
            </p>

            <div className='mb-6'>
              <p className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2'>
                Code Snippet
              </p>
              <pre className='text-xs bg-black/5 dark:bg-white/5 p-4 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-slate-100'>
                {`function MyComponent() {
  // Triggers full re-render on state change
  const { count, inc } = useCounter({ step: 1 });
  
  return (
    <div>
      <button onClick={inc}>Add {count}</button>
      <HeavyComponent />
    </div>
  );
 }`}
              </pre>
            </div>
          </div>

          <Link
            to='/not-wrapped'
            className='inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all duration-180 w-full border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-slate-900 dark:text-slate-100 text-center no-underline mt-4'
          >
            Explore Not Wrapped Demo →
          </Link>
        </article>

        {/* Card 2: Wrapped */}
        <article
          className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rise-in rounded-3xl p-6 sm:p-8 flex flex-col justify-between'
          style={{ animationDelay: '200ms' }}
        >
          <div>
            <div className='flex items-center gap-2.5 mb-4'>
              <span className='h-3 w-3 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' />
              <p className='text-[0.69rem] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 m-0'>
                Wrapper Pattern
              </p>
            </div>
            <h2 className='font-serif text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100'>
              Wrapped (Hook Wrapper)
            </h2>
            <p className='text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed'>
              Wrap your custom hook with <code>createHookWrapper()</code>{' '}
              to create a container component. This isolates state updates
              to the sub-tree under the render prop, avoiding top-level
              parent re-renders.
            </p>

            <div className='mb-6'>
              <p className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2'>
                Code Snippet
              </p>
              <pre className='text-xs bg-black/5 dark:bg-white/5 p-4 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-slate-100'>
                {`const CounterWrapper = createHookWrapper(useCounter);
 
 function MyComponent() {
  // Parent doesn't re-render when counter changes!
  return (
    <CounterWrapper
      step={1}
      render={({ count, inc }) => (
        <button onClick={inc}>Add {count}</button>
      )}
    />
  );
 }`}
              </pre>
            </div>
          </div>

          <Link
            to='/wrapped'
            className='inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all duration-180 w-full border border-teal-500/30 bg-teal-500/5 hover:bg-teal-500/10 text-slate-900 dark:text-slate-100 text-center no-underline mt-4'
          >
            Explore Wrapped Demo →
          </Link>
        </article>
      </section>

      {/* Resource Hub & Creator Profile */}
      <div className='rise-in' style={enterStyle()}>
        <Credits />
      </div>

      {/* Detailed Comparison Table */}
      <section
        className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-3xl p-6 sm:p-8 rise-in'
        style={enterStyle()}
      >
        <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2'>
          Performance & Capabilities
        </p>
        <h3 className='font-serif text-xl font-bold mb-4 text-slate-900 dark:text-slate-100'>
          Comparison Matrix
        </h3>
        <div className='overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50'>
          <table className='w-full border-collapse text-slate-900 dark:text-slate-100'>
            <thead>
              <tr className='border-b border-slate-200 dark:border-slate-800'>
                <th className='border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 px-4 py-3 text-left text-slate-900 dark:text-slate-100 font-bold'>
                  Feature / Capability
                </th>
                <th className='border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 px-4 py-3 text-left text-slate-900 dark:text-slate-100 font-bold'>
                  Standard Hook (Not Wrapped)
                </th>
                <th className='border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 px-4 py-3 text-left text-slate-900 dark:text-slate-100 font-bold'>
                  Wrapper Component (Wrapped)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors'>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left font-semibold'>
                  Re-render Scope
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-rose-600 dark:text-rose-400'>
                  Parent Component & Children
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-teal-600 dark:text-teal-400 font-semibold'>
                  Isolated Render-Prop Sub-tree only
                </td>
              </tr>
              <tr className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors'>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left font-semibold'>
                  Class Component Support
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-rose-600 dark:text-rose-400'>
                  Unsupported (React constraint)
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-teal-600 dark:text-teal-400'>
                  Supported (Standard JSX Component)
                </td>
              </tr>
              <tr className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors'>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left font-semibold'>
                  Dynamic / Conditional Invocation
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-rose-600 dark:text-rose-400'>
                  Unsupported (Violates Rules of Hooks)
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-teal-600 dark:text-teal-400'>
                  Supported (Can be mounted conditionally or in loops)
                </td>
              </tr>
              <tr className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors'>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left font-semibold'>
                  State Encapsulation
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-rose-600 dark:text-rose-400'>
                  Leaked to page component scope
                </td>
                <td className='border-b border-slate-200 dark:border-slate-800 px-4 py-3 text-left text-teal-600 dark:text-teal-400'>
                  Self-contained inside the wrapper instance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Introduction & Installation */}
      <section
        className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-3xl p-6 sm:p-8 rise-in'
        style={enterStyle()}
      >
        <div className='grid gap-8 md:grid-cols-12 items-start'>
          <div className='md:col-span-5'>
            <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2'>
              Get Started
            </p>
            <h3 className='font-serif text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100'>
              Introduction & Installation
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4'>
              <code>@bemedev/hook-wrapper</code> is a lightweight,
              zero-dependency utility that lets you wrap any React hook
              into a dedicated component.
            </p>
            <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>
              This isolates hook lifecycle changes to a localized
              render-prop sub-tree, avoiding top-level parent component
              re-renders and boosting UI responsiveness.
            </p>
          </div>

          <div className='md:col-span-7 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5'>
            <div className='flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4'>
              <span className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                Install Package
              </span>
              <div className='flex gap-1.5 bg-slate-200/50 dark:bg-slate-800/60 p-0.5 rounded-lg text-xs'>
                {(['pnpm', 'npm', 'yarn'] as const).map(pm => (
                  <button
                    key={pm}
                    type='button'
                    onClick={() => setPkgManager(pm)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      pkgManager === pm
                        ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <div className='relative group'>
              <pre className='text-xs font-mono bg-black/5 dark:bg-black/30 p-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-x-auto min-h-[48px] flex items-center'>
                <code>
                  {pkgManager === 'pnpm' &&
                    'pnpm add @bemedev/hook-wrapper'}
                  {pkgManager === 'npm' &&
                    'npm install @bemedev/hook-wrapper'}
                  {pkgManager === 'yarn' &&
                    'yarn add @bemedev/hook-wrapper'}
                </code>
              </pre>
              <button
                type='button'
                onClick={() => {
                  const cmd =
                    pkgManager === 'pnpm'
                      ? 'pnpm add @bemedev/hook-wrapper'
                      : pkgManager === 'npm'
                        ? 'npm install @bemedev/hook-wrapper'
                        : 'yarn add @bemedev/hook-wrapper';
                  navigator.clipboard.writeText(cmd);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer'
                title='Copy install command'
              >
                {copied ? (
                  <svg
                    className='size-4 text-emerald-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2.5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : (
                  <svg
                    className='size-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How-to Use */}
      <section
        className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-3xl p-6 sm:p-8 rise-in'
        style={enterStyle()}
      >
        <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2'>
          Implementation Guide
        </p>
        <h3 className='font-serif text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100'>
          How-to Use & Examples
        </h3>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Step 1 */}
          <div className='flex flex-col h-full justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/30 p-5'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <span className='flex items-center justify-center size-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs'>
                  1
                </span>
                <span className='font-bold text-slate-900 dark:text-slate-100 text-sm'>
                  Define a Custom Hook
                </span>
              </div>
              <p className='text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed'>
                Write your hook just like any normal React hook, returning
                states and actions.
              </p>
              <pre className='text-xs bg-black/5 dark:bg-white/5 p-4 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-slate-100'>
                {`import { useState } from 'react';

export const useCounter = ({ step = 1 }: { step?: number } = {}) => {
  const [count, setCount] = useState(0);
  return {
    count,
    inc: () => setCount(c => c + step),
  };
};`}
              </pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className='flex flex-col h-full justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/30 p-5'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <span className='flex items-center justify-center size-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs'>
                  2
                </span>
                <span className='font-bold text-slate-900 dark:text-slate-100 text-sm'>
                  Wrap and Render the Hook
                </span>
              </div>
              <p className='text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed'>
                Pass your custom hook to the <code>wrap()</code> function.
                Mount the returned wrapper, passing hook parameters as
                props and rendering the UI.
              </p>
              <pre className='text-xs bg-black/5 dark:bg-white/5 p-4 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-slate-100'>
                {`import { wrap } from '@bemedev/hook-wrapper';
import { useCounter } from './useCounter';

// Wrap hook to get a React Component
const CounterWrapper = wrap(useCounter);

export const Demo = () => (
  <CounterWrapper
    step={5}
    render={({ count, inc }) => (
      <div>
        <p>Count: {count}</p>
        <button onClick={inc}>Increment by 5</button>
      </div>
    )}
  />
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section
        className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-3xl p-6 sm:p-8 rise-in'
        style={enterStyle()}
      >
        <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2'>
          Signature & API
        </p>
        <h3 className='font-serif text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100'>
          API Reference
        </h3>
        <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6'>
          The core helper exposes a single, straightforward signature to
          encapsulate your logic.
        </p>

        <div className='border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20'>
          <div className='bg-slate-100/80 dark:bg-slate-800/80 px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between'>
            <span className='font-mono font-bold text-sm text-slate-900 dark:text-slate-100'>
              wrap(hook)
            </span>
            <span className='text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full'>
              Core API
            </span>
          </div>

          <div className='p-5 space-y-4 text-sm'>
            <div>
              <p className='font-semibold text-slate-950 dark:text-slate-50 mb-1'>
                Parameters
              </p>
              <ul className='list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs'>
                <li>
                  <code className='font-mono text-emerald-600 dark:text-emerald-400 font-semibold'>
                    hook
                  </code>
                  : The target React hook function (e.g.{' '}
                  <code>useMyHook</code>) you wish to wrap.
                </li>
              </ul>
            </div>

            <div className='pt-3 border-t border-slate-200 dark:border-slate-800'>
              <p className='font-semibold text-slate-950 dark:text-slate-50 mb-1'>
                Returns
              </p>
              <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2'>
                A standard React component that is type-safe and takes the
                following props:
              </p>
              <ul className='list-disc pl-5 space-y-2 text-slate-500 dark:text-slate-400 text-xs'>
                <li>
                  <strong className='text-slate-900 dark:text-slate-100'>
                    Hook Arguments as Props
                  </strong>
                  : Matching exactly the inputs of the wrapped hook.
                </li>
                <li>
                  <strong className='text-slate-900 dark:text-slate-100'>
                    render
                  </strong>
                  : A callback function prop. It receives the values
                  returned by the hook (as its single parameter) and
                  returns the JSX elements to render.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
