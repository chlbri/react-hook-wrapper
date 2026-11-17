import type { ReactNode } from 'react';

import type { EmptyHook } from './types';

export type WrapperComponentProps<T extends EmptyHook = EmptyHook> = {
  hook: T;
  children: (data: ReturnType<T>) => ReactNode;
};

export const Wrapper = <const T extends EmptyHook>({
  hook,
  children,
}: WrapperComponentProps<T>) => children(hook());
