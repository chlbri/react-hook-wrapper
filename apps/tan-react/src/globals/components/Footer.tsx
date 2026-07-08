import { MyGithub } from './MyGithub';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-slate-200 px-4 py-2 text-slate-500 dark:border-slate-800 dark:text-slate-400'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between'>
        <p className='m-0 text-sm'>
          &copy; {year} @chlbri. All rights reserved.
        </p>
        <MyGithub />
      </div>
    </footer>
  );
}
