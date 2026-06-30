import { Icon_NPM } from './icons/npm';

export const Credits = () => (
  <section className='bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md rounded-3xl p-6 sm:p-8'>
    <p className='text-[0.69rem] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2'>
      Credits
    </p>
    <h3 className='font-serif text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100'>
      Resource Hub & Creator Profile
    </h3>

    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {/* NPM Card */}
      <a
        href='https://www.npmjs.com/package/@bemedev/hook-wrapper'
        target='_blank'
        rel='noreferrer'
        className='group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 hover:bg-slate-50 dark:hover:bg-slate-900/40'
      >
        <div>
          <div className='flex items-center gap-3 mb-3'>
            <div className='group-hover:border-b border-red-500 dark:border-red-200'>
              <Icon_NPM size={30} />
            </div>
            <span className='font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors'>
              NPM Registry
            </span>
          </div>
          <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed'>
            Install the package directly, view bundle size limits, and
            download statistics on the official npm registry page.
          </p>
        </div>
        <div className='mt-4 flex items-center text-xs font-semibold text-red-600 dark:text-red-400 group-hover:underline'>
          View on NPM →
        </div>
      </a>

      {/* GitHub Repo Card */}
      <a
        href='https://github.com/chlbri/react-hook-wrapper'
        target='_blank'
        rel='noreferrer'
        className='group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5 hover:bg-slate-50 dark:hover:bg-slate-900/40'
      >
        <div>
          <div className='flex items-center gap-3 mb-3'>
            <span className='p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white'>
              <svg
                className='size-5'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
              </svg>
            </span>
            <span className='font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-500 transition-colors'>
              GitHub Repository
            </span>
          </div>
          <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed'>
            Explore the source code, open issues or feature requests, and
            contribute to the monorepo hosting this project.
          </p>
        </div>
        <div className='mt-4 flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:underline'>
          Explore Repository →
        </div>
      </a>

      {/* Creator Card */}
      <div className='group relative overflow-hidden flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-linear-to-br from-slate-500/5 to-yellow-500/5 dark:from-emerald-950/10 dark:to-teal-950/10 p-5 transition-all duration-300 hover:scale-110 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/5 cursor-default'>
        <div>
          <div className='flex items-center gap-3 mb-3'>
            <div className='relative'>
              <span className='flex items-center justify-center size-10 rounded-xl bg-linear-to-br from-fuchsia-500 to-teal-600 text-white font-serif font-bold text-base shadow-md shadow-fuchsia-500/10'>
                CB
              </span>
              <span
                className='absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white border-2 border-white dark:border-slate-900'
                title='Verified Creator'
              >
                ✓
              </span>
            </div>
            <div>
              <span className='block font-bold text-slate-900 dark:text-slate-100 text-sm'>
                chlbri
              </span>
              <span className='block text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5'>
                Creator & Maintainer
              </span>
            </div>
          </div>
          <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed'>
            Crafting clean, lightweight, and performance-focused React
            design patterns and state utilities.
          </p>
        </div>
        <div className='mt-4 flex flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 text-sm'>
          <a
            href='https://github.com/chlbri?tab=repositories'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center gap-1 font-bold rounded-lg px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors cursor-pointer'
          >
            GitHub Profile
          </a>
          <a
            href='https://beme-dev.vercel.app'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center gap-1 font-bold rounded-lg px-2.5 py-1.5 bg-rose-100 text-rose-600 group-hover:bg-rose-500 hover:bg-rose-600 dark:bg-fuchsia-200 dark:group-hover:bg-fuchsia-700 dark:hover:bg-fuchsia-800 group-hover:text-white dark:text-fuchsia-800 dark:group-hover:text-white transition-colors cursor-pointer font-mono'
          >
            Portfolio Site
          </a>
        </div>
      </div>
    </div>
  </section>
);
