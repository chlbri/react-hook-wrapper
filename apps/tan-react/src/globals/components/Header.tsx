import { Link } from '@tanstack/react-router';
import { ThemeToggle } from './ThemeToggle';
import { MyGithub } from './MyGithub';

export default function Header() {
  return (
    <header className='fixed w-full top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 backdrop-blur-lg'>
      <nav className='max-w-5xl mx-auto w-full flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4'>
        <h2 className='m-0 shrink-0 text-base font-semibold tracking-tight'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2'
          >
            <span className='size-3 rounded-full bg-linear-to-br dark:from-indigo-500 dark:to-rose-200 from-rose-700 to-indigo-100' />
            <div className='font-mono flex space-x-2'>
              <span className='font-bold'>`hook`</span>
              <span className='font-light'>Wrapper</span>
            </div>
          </Link>
        </h2>

        <div className='order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-0 sm:w-auto sm:flex-nowrap sm:pb-0 transition-colors duration-150 ease-linear'>
          <Link
            to='/'
            className='py-1 '
            inactiveProps={{
              className:
                'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
            }}
            activeProps={{
              className:
                'text-yellow-800 dark:text-slate-100 border-b-2 border-yellow-800',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to='/wrapped'
            className='py-1'
            inactiveProps={{
              className:
                'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
            }}
            activeProps={{
              className:
                'text-emerald-900 dark:text-emerald-50 border-b-2 border-emerald-500',
            }}
          >
            Wrapped
          </Link>
          <Link
            to='/not-wrapped'
            className='py-1'
            inactiveProps={{
              className:
                'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
            }}
            activeProps={{
              className:
                'text-rose-900 dark:text-red-100 border-b-2 border-red-600 dark:border-rose-700',
            }}
          >
            Not Wrapped
          </Link>
        </div>

        <div className='ml-auto flex items-center gap-1.5 sm:gap-2'>
          <MyGithub />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
