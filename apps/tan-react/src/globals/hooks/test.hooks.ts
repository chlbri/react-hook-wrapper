// hooks.ts
import { useLayoutEffect, useMemo, useState } from 'react';

import { identity } from '../helpers';

// Hook 1: Counter Hook
export interface CounterConfig {
  step?: number;
}
export const useCounter = ({ step = 1 }: CounterConfig) => {
  const [count, setCount] = useState(0);

  return { count, inc: () => setCount(c => c + step), step };
};

export const useWindow = <T = Window>(
  selector: (window: Window) => T = identity,
) => {
  const [selected, setSelected] = useState<T>();
  const events = ['online', 'offline', 'resize', 'orientationchange'] as const;

  useLayoutEffect(() => {
    const { addEventListener, removeEventListener } = window;
    const handler = () => setSelected(selector(window));
    handler();
    events.forEach(e => addEventListener(e, handler));
    return () => events.forEach(e => removeEventListener(e, handler));
  }, []);

  return useMemo(() => selected, [selected])!;
};

// Hook 2: Window Width Hook
export const useWindowWidth = () => {
  const width = useWindow(w => w.innerWidth);
  const form = width < 768 ? 'Mobile 📱' : 'Desktop 💻';
  return { width, form };
};
