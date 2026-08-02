import { type ReactNode } from 'react';

import type { Hook, WrapperProps } from './types';

export type Wrapper_F = <const T extends Hook>(
  hook: T,
) => (props: WrapperProps<T>) => ReactNode;

export const wrap: Wrapper_F = hook => {
  return props => {
    const { render, ...hookConfig } = props;
    const hookData = hook(hookConfig);
    return render(hookData);
  };
};

export const useHook = wrap;
