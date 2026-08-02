import type { ReactNode } from 'react';

// oxlint-disable-next-line typescript/no-empty-object-type
export type EmptyObject = {};

export type Hook<P extends object = object, R = any> = (arg: P) => R;

export type _WrapperProps<
  T extends Hook,
  HookArgs = Parameters<T>[0],
  HookReturn = ReturnType<T>,
> = (HookArgs extends undefined ? EmptyObject : HookArgs) & {
  render: (data: HookReturn) => ReactNode;
};

export type WrapperProps<T extends Hook> = _WrapperProps<T>;
