import { type ReactNode } from 'react';

import type { EmptyHook, Hook, WrapperProps } from './types';

export type Wrapper_F = {
  <const T extends Hook>(hook: T): (props: WrapperProps<T>) => ReactNode;
  noParams: <const T extends EmptyHook>(
    hook: T,
    render: (data: ReturnType<T>) => ReactNode,
  ) => () => ReactNode;
};

export const wrap: Wrapper_F = hook => {
  return props => {
    const { render, ...hookConfig } = props;
    const hookData = hook(hookConfig);
    return render(hookData);
  };
};

wrap.noParams = (hook, render) => {
  return () => {
    const hookData = hook();
    return render(hookData);
  };
};

export const useHook = wrap;
