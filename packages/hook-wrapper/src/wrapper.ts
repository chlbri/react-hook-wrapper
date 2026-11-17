import { createElement, type ReactNode } from 'react';

import type { EmptyHook, Hook, WrapperProps } from './types';
import { Wrapper } from './wrapper.component';

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
    return createElement(Wrapper, { hook, children: render });
  };
};

export const useHook = wrap;
