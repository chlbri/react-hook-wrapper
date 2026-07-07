import { useEffect, useState } from 'react';

export const MAPPER = {
  auto: 'auto  ❤️',
  dark: 'dark  🌙',
  light: 'light  ☀️',
} as const;

type ThemeMode = keyof typeof MAPPER;

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto';
  const stored = window.localStorage.getItem('theme');

  const check = stored === 'light' || stored === 'dark' || stored === 'auto';

  if (check) return stored;
  return 'auto';
}

const applyThemeMode = (mode: ThemeMode) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;

  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }

  document.documentElement.style.colorScheme = resolved;
};

export const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>('auto');

  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);

  useEffect(() => {
    if (mode !== 'auto') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyThemeMode('auto');

    media.addEventListener('change', onChange);
    return () => {
      media.removeEventListener('change', onChange);
    };
  }, [mode]);

  const toggleMode = () => {
    const nextMode: ThemeMode =
      mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light';
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem('theme', nextMode);
  };

  const label =
    mode === 'auto'
      ? 'Theme mode: auto (system). Click to switch to light mode.'
      : `Theme mode: ${mode}. Click to switch mode.`;

  const text =
    mode === 'auto' ? 'auto  ❤️' : mode === 'dark' ? 'dark  🌙' : 'light  ☀️';

  return (
    <button
      type='button'
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className='w-20 cursor-pointer rounded-full border border-slate-200 bg-white/50 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:scale-105 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100'
    >
      {text}
    </button>
  );
};
