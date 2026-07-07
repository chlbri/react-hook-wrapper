# @bemedev/hook-wrapper

A lightweight utility to wrap React hooks and render them in a dedicated wrapper
component. This isolates hook-driven updates, preventing unnecessary parent component
rerenders and optimizing React application performance.

<br/>

## Why use @bemedev/hook-wrapper?

In standard React development, calling a hook inside a parent component causes the
entire parent component (and all its children) to rerender whenever the hook's state
changes.

By wrapping the hook with `wrap(useHook)`, you create a wrapper component that:

1. Calls the hook internally.
2. Accepts hook arguments as props.
3. Exposes a `render` prop to display the UI, localizing hook rerenders to the render
   callback rather than triggering a parent-level update.

<br/>

See how it works [here](https://hook-wrapper--bemedev.vercel.app)

<br/>

## Installation

```bash
pnpm add @bemedev/hook-wrapper
# or
npm install @bemedev/hook-wrapper
# or
yarn add @bemedev/hook-wrapper
```

<br/>

## Usage Example

### 1. Define a Custom Hook

```typescript
import { useState } from 'react';

export const useCounter = ({ step = 1 }: { step?: number } = {}) => {
  const [count, setCount] = useState(0);
  return { count, inc: () => setCount(c => c + step) };
};
```

### 2. Wrap the Hook and Render It

```tsx
import { wrap } from '@bemedev/hook-wrapper';
import { useCounter } from './useCounter';

// Wrap the hook to get a wrapper component
const CounterWrapper = wrap(useCounter);

export const Demo = () => {
  // The parent component (Demo) will render only ONCE.
  // Clicking the increment button will only rerender the children inside the CounterWrapper.
  return (
    <div>
      <h3>Parent Component (No Rerenders on Hook Change)</h3>

      <CounterWrapper
        step={5}
        render={({ count, inc }) => (
          <div>
            <p>Count: {count}</p>
            <button onClick={inc}>Increment by 5</button>
          </div>
        )}
      />
    </div>
  );
};
```

<br/>

## API Reference

### `wrap(hook)`

Wraps a custom hook and returns a component that renders it.

#### Parameters

- `hook`: The React hook function to wrap.

#### Returns

A React component that accepts:

- Props matching the arguments of the wrapped hook.
- A `render` function prop that receives the hook's return value and returns a React
  element.

<br/>

## License

MIT

<br/>

## Changelog

Read [CHANGELOG.md](CHANGELOG.md) for more details about the changes.

<br/>

## Author

chlbri (bri_lvi@icloud.com)

[My GitHub](https://github.com/chlbri?tab=repositories)
