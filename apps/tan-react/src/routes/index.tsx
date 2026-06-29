import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: IndexComponent });

function IndexComponent() {
  return (
    <main className='max-w-5xl mx-auto w-full px-4 pb-12 pt-10'>
      {/* Hero Section */}
      <section className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rise-in relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14 mb-10'>
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
      <section className='grid gap-6 md:grid-cols-2 mb-10'>
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

      {/* Detailed Comparison Table */}
      <section
        className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-3xl p-6 sm:p-8 rise-in'
        style={{ animationDelay: '300ms' }}
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
    </main>
  );
}
