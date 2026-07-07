import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

import { Credits } from '#/globals/components/Credits';
import { bumper } from '#/globals/hooks/bumper';

export const Route = createFileRoute('/')({ component: IndexComponent });

function IndexComponent() {
  const [pkgManager, setPkgManager] = useState<'pnpm' | 'npm' | 'yarn'>('pnpm');
  const [copied, setCopied] = useState(false);
  const enterStyle = bumper(200);

  return (
    <main className='mx-auto mt-6 flex w-full max-w-7xl flex-col space-y-8 px-4 pt-10 pb-12'>
      {/* Hero Section */}
      <section className='rise-in relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 shadow-md backdrop-blur-md sm:px-10 sm:py-14 dark:border-slate-800 dark:bg-slate-900/80'>
        <div className='pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]' />
        <div className='pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]' />

        <p className='mb-3 text-[0.69rem] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400'>
          React Design Patterns
        </p>
        <h1 className='mb-5 max-w-4xl font-serif text-4xl leading-[1.05] font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-100'>
          Decouple stateful logic from UI rendering.
        </h1>
        <p className='mb-8 max-w-3xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400'>
          Custom hooks are React's primary way to share stateful behavior. However,
          calling them directly at the root of a large page component forces the
          entire page to re-render whenever the hook updates. The{' '}
          <strong>Hook Wrapper Pattern</strong> compiles hooks into reusable
          components to isolate re-render performance.
        </p>
      </section>

      {/* Two Main Paradigms Grid */}
      <section className='grid gap-6 md:grid-cols-2'>
        {/* Card 1: Not Wrapped */}
        <article
          className='rise-in flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80'
          style={{ animationDelay: '100ms' }}
        >
          <div>
            <div className='mb-4 flex items-center gap-2.5'>
              <span className='h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' />
              <p className='m-0 text-[0.69rem] font-bold tracking-widest text-rose-500 uppercase'>
                Standard Call Pattern
              </p>
            </div>
            <h2 className='mb-3 font-serif text-2xl font-bold text-slate-900 dark:text-slate-100'>
              Not Wrapped (Direct Hook)
            </h2>
            <p className='mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
              Invoke hooks directly at the root of your component. Easy to write and
              straightforward for simple components, but ties the entire component's
              lifecycle to the hook's state transitions.
            </p>

            <div className='mb-6'>
              <p className='mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
                Code Snippet
              </p>
              <pre className='overflow-x-auto rounded-xl border border-slate-200 bg-black/5 p-4 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-white/5 dark:text-slate-100'>
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
            className='mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/5 px-4 py-2.5 text-center text-sm font-bold text-slate-900 no-underline transition-all duration-180 hover:bg-rose-500/10 dark:text-slate-100'
          >
            Explore Not Wrapped Demo →
          </Link>
        </article>

        {/* Card 2: Wrapped */}
        <article
          className='rise-in flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80'
          style={{ animationDelay: '200ms' }}
        >
          <div>
            <div className='mb-4 flex items-center gap-2.5'>
              <span className='h-3 w-3 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' />
              <p className='m-0 text-[0.69rem] font-bold tracking-widest text-teal-600 uppercase dark:text-teal-400'>
                Wrapper Pattern
              </p>
            </div>
            <h2 className='mb-3 font-serif text-2xl font-bold text-slate-900 dark:text-slate-100'>
              Wrapped (Hook Wrapper)
            </h2>
            <p className='mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
              Wrap your custom hook with <code>wrap()</code> or{' '}
              <code>useHook()</code> to create a container component. This isolates
              state updates to the sub-tree under the render prop, avoiding top-level
              parent re-renders.
            </p>

            <div className='mb-6'>
              <p className='mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
                Code Snippet
              </p>
              <pre className='overflow-x-auto rounded-xl border border-slate-200 bg-black/5 p-4 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-white/5 dark:text-slate-100'>
                {`import { useHook } from '@bemedev/hook-wrapper';

const CounterWrapper = useHook(useCounter);
 
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
            className='mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/5 px-4 py-2.5 text-center text-sm font-bold text-slate-900 no-underline transition-all duration-180 hover:bg-teal-500/10 dark:text-slate-100'
          >
            Explore Wrapped Demo →
          </Link>
        </article>
      </section>

      {/* Resource Hub & Creator Profile */}
      <div
        className='rise-in'
        style={enterStyle()}
      >
        <Credits />
      </div>

      {/* Detailed Comparison Table */}
      <section
        className='rise-in rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80'
        style={enterStyle()}
      >
        <p className='mb-2 text-[0.69rem] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400'>
          Performance & Capabilities
        </p>
        <h3 className='mb-4 font-serif text-xl font-bold text-slate-900 dark:text-slate-100'>
          Comparison Matrix
        </h3>
        <div className='overflow-x-auto rounded-2xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50'>
          <table className='w-full border-collapse text-slate-900 dark:text-slate-100'>
            <thead>
              <tr className='border-b border-slate-200 dark:border-slate-800'>
                <th className='border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100'>
                  Feature / Capability
                </th>
                <th className='border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100'>
                  Standard Hook (Not Wrapped)
                </th>
                <th className='border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100'>
                  Wrapper Component (Wrapped)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30'>
                <td className='border-b border-slate-200 px-4 py-3 text-left font-semibold dark:border-slate-800'>
                  Re-render Scope
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-rose-600 dark:border-slate-800 dark:text-rose-400'>
                  Parent Component & Children
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left font-semibold text-teal-600 dark:border-slate-800 dark:text-teal-400'>
                  Isolated Render-Prop Sub-tree only
                </td>
              </tr>
              <tr className='transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30'>
                <td className='border-b border-slate-200 px-4 py-3 text-left font-semibold dark:border-slate-800'>
                  Class Component Support
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-rose-600 dark:border-slate-800 dark:text-rose-400'>
                  Unsupported (React constraint)
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-teal-600 dark:border-slate-800 dark:text-teal-400'>
                  Supported (Standard JSX Component)
                </td>
              </tr>
              <tr className='transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30'>
                <td className='border-b border-slate-200 px-4 py-3 text-left font-semibold dark:border-slate-800'>
                  Dynamic / Conditional Invocation
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-rose-600 dark:border-slate-800 dark:text-rose-400'>
                  Unsupported (Violates Rules of Hooks)
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-teal-600 dark:border-slate-800 dark:text-teal-400'>
                  Supported (Can be mounted conditionally or in loops)
                </td>
              </tr>
              <tr className='transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30'>
                <td className='border-b border-slate-200 px-4 py-3 text-left font-semibold dark:border-slate-800'>
                  State Encapsulation
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-rose-600 dark:border-slate-800 dark:text-rose-400'>
                  Leaked to page component scope
                </td>
                <td className='border-b border-slate-200 px-4 py-3 text-left text-teal-600 dark:border-slate-800 dark:text-teal-400'>
                  Self-contained inside the wrapper instance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Introduction & Installation */}
      <section
        className='rise-in rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80'
        style={enterStyle()}
      >
        <div className='grid items-start gap-8 md:grid-cols-12'>
          <div className='md:col-span-5'>
            <p className='mb-2 text-[0.69rem] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400'>
              Get Started
            </p>
            <h3 className='mb-4 font-serif text-2xl font-bold text-slate-900 dark:text-slate-100'>
              Introduction & Installation
            </h3>
            <p className='mb-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
              <code>@bemedev/hook-wrapper</code> is a lightweight, zero-dependency
              utility that lets you wrap any React hook into a dedicated component.
            </p>
            <p className='text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
              This isolates hook lifecycle changes to a localized render-prop
              sub-tree, avoiding top-level parent component re-renders and boosting
              UI responsiveness.
            </p>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5 md:col-span-7 dark:border-slate-800 dark:bg-slate-950/20'>
            <div className='mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800'>
              <span className='text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
                Install Package
              </span>
              <div className='flex gap-1.5 rounded-lg bg-slate-200/50 p-0.5 text-xs dark:bg-slate-800/60'>
                {(['pnpm', 'npm', 'yarn'] as const).map(pm => (
                  <button
                    key={pm}
                    type='button'
                    onClick={() => setPkgManager(pm)}
                    className={`cursor-pointer rounded-md px-2.5 py-1 font-medium transition-all ${
                      pkgManager === pm
                        ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <div className='group relative'>
              <pre className='flex min-h-[48px] items-center overflow-x-auto rounded-xl border border-slate-200 bg-black/5 p-4 pr-12 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-black/30 dark:text-slate-100'>
                <code>
                  {pkgManager === 'pnpm' && 'pnpm add @bemedev/hook-wrapper'}
                  {pkgManager === 'npm' && 'npm install @bemedev/hook-wrapper'}
                  {pkgManager === 'yarn' && 'yarn add @bemedev/hook-wrapper'}
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
                className='absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-lg border border-slate-200 bg-white/80 p-2 text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:text-slate-900 focus:opacity-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:text-slate-100'
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
        className='rise-in rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80'
        style={enterStyle()}
      >
        <p className='mb-2 text-[0.69rem] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400'>
          Implementation Guide
        </p>
        <h3 className='mb-6 font-serif text-2xl font-bold text-slate-900 dark:text-slate-100'>
          How-to Use & Examples
        </h3>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Step 1 */}
          <div className='flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/50 p-5 dark:border-slate-800 dark:bg-slate-950/30'>
            <div>
              <div className='mb-3 flex items-center gap-2'>
                <span className='flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400'>
                  1
                </span>
                <span className='text-sm font-bold text-slate-900 dark:text-slate-100'>
                  Define a Custom Hook
                </span>
              </div>
              <p className='mb-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400'>
                Write your hook just like any normal React hook, returning states and
                actions.
              </p>
              <pre className='overflow-x-auto rounded-xl border border-slate-200 bg-black/5 p-4 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-white/5 dark:text-slate-100'>
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
          <div className='flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/50 p-5 dark:border-slate-800 dark:bg-slate-950/30'>
            <div>
              <div className='mb-3 flex items-center gap-2'>
                <span className='flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400'>
                  2
                </span>
                <span className='text-sm font-bold text-slate-900 dark:text-slate-100'>
                  Wrap and Render the Hook
                </span>
              </div>
              <p className='mb-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400'>
                Pass your custom hook to the <code>wrap()</code> or{' '}
                <code>useHook()</code> function. Mount the returned wrapper, passing
                hook parameters as props and rendering the UI.
              </p>
              <pre className='overflow-x-auto rounded-xl border border-slate-200 bg-black/5 p-4 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-white/5 dark:text-slate-100'>
                {`import { useHook } from '@bemedev/hook-wrapper';
import { useCounter } from './useCounter';

// Wrap hook to get a React Component
const CounterWrapper = useHook(useCounter);

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
        className='rise-in rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/80'
        style={enterStyle()}
      >
        <p className='mb-2 text-[0.69rem] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400'>
          Signature & API
        </p>
        <h3 className='mb-4 font-serif text-2xl font-bold text-slate-900 dark:text-slate-100'>
          API Reference
        </h3>
        <p className='mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
          The core helper exposes a single, straightforward signature to encapsulate
          your logic.
        </p>

        <div className='overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20'>
          <div className='flex items-center justify-between border-b border-slate-200 bg-slate-100/80 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-800/80'>
            <span className='font-mono text-sm font-bold text-slate-900 dark:text-slate-100'>
              wrap(hook) / useHook(hook)
            </span>
            <span className='rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400'>
              Core API
            </span>
          </div>

          <div className='space-y-4 p-5 text-sm'>
            <p className='text-xs leading-relaxed text-slate-500 dark:text-slate-400'>
              Both exports are functionally identical. <code>useHook</code> is
              provided as a semantic alternative for developers preferring standard
              hook naming conventions.
            </p>
            <div>
              <p className='mb-1 font-semibold text-slate-950 dark:text-slate-50'>
                Parameters
              </p>
              <ul className='list-disc space-y-1 pl-5 text-xs text-slate-500 dark:text-slate-400'>
                <li>
                  <code className='font-mono font-semibold text-emerald-600 dark:text-emerald-400'>
                    hook
                  </code>
                  : The target React hook function (e.g. <code>useMyHook</code>) you
                  wish to wrap.
                </li>
              </ul>
            </div>

            <div className='border-t border-slate-200 pt-3 dark:border-slate-800'>
              <p className='mb-1 font-semibold text-slate-950 dark:text-slate-50'>
                Returns
              </p>
              <p className='mb-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400'>
                A standard React component that is type-safe and takes the following
                props:
              </p>
              <ul className='list-disc space-y-2 pl-5 text-xs text-slate-500 dark:text-slate-400'>
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
                  : A callback function prop. It receives the values returned by the
                  hook (as its single parameter) and returns the JSX elements to
                  render.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
