import { MyGithub } from './MyGithub';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='mt-20 border-t border-slate-200 dark:border-slate-800 px-4 py-2 text-slate-500 dark:text-slate-400'>
      <div className='flex max-w-6xl mx-auto w-full justify-between items-center'>
        <p className='m-0 text-sm'>
          &copy; {year} @chlbri. All rights reserved.
        </p>
        <MyGithub />
      </div>
    </footer>
  );
}
