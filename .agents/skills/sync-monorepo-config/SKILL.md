---
name: sync-monorepo-config
description:
  Copy or sync the configuration of a pnpm monorepo (root files, workspace,
  per-package package.json / tsconfig / vite-rolldown-vitest configs, CI,
  devcontainer, editor settings) from a source repository (local path or GitHub) into
  a target repository, adapting project lists and identity fields. Skips anything
  already in place.
---

# Sync Monorepo Config

Propagate the configuration of a reference pnpm monorepo into another repository
without touching their source code.

## Inputs

Ask for and record these before starting:

| Input    | Meaning                                                                 |
| -------- | ----------------------------------------------------------------------- |
| `SOURCE` | Local path or `owner/repo[@ref]` on GitHub                              |
| `TARGET` | Directory of the repository to configure                                |
| `SCOPE`  | `root`, `packages`, or `all` (default: `all`)                           |
| `MODE`   | `report` (diff only), `apply` (default), or `apply --force` (overwrite) |

If `SOURCE` is a GitHub repo without a local clone, read files with
`git show <ref>:<path>` after `git clone --depth 1 --filter=blob:none` in a temp
directory, or fetch the raw files. Never clone into `TARGET`.

## Step 0 — Safety

1. `git -C "$TARGET" status --porcelain` must be clean, or the user must confirm.
   Work on a branch.
2. Back up nothing by hand: the repository is the backup. Never delete source code,
   tests, docs, `lib`, `dist`, `node_modules`.
3. Only config files in the inventory below may be created, replaced or removed.

## Step 1 — Inventory

Root configuration:

- `package.json`, `tsconfig.json`, `pnpm-workspace.yaml`
- lint/format/test: `oxlint.config.ts`, `oxfmt.config.ts`, `vitest.config.ts` (or the
  combined `vite.config.ts` when the source is Vite-Plus based)
- `.gitignore`
- `.vscode/settings.json`, `.vscode/tasks.json`, `.vscode/extensions.json`
- `.devcontainer/devcontainer.json`
- `.husky/*` (skip `.husky/_`, generated)
- `.github/workflows/*.yml`
- `.agents/instructions/*`, `.agents/docs/*`, `.agents/prompts/*` (never remove
  `.agents/skills`)

Per workspace package (`pnpm-workspace.yaml` + globs):

- `package.json`
- `tsconfig.json`
- `rolldown.config.ts` / `vite.config.ts` / `vitest.config.ts`
- `tsr.config.json`, `.size-limit.ts` when present

Exclude: `src/**`, `**/__tests__/**` code, `lib`, `dist`, `coverage`, `node_modules`,
`pnpm-lock.yaml`.

## Step 2 — Compare

For every inventory file compute `identical`, `missing` or `different`.

- `identical` → **do nothing**, report it as `already done`.
- `missing` → add it.
- `different` → replace **only after adapting** (Step 3), unless `MODE` is `report`,
  in which case list it and stop.

`already done` means byte-identical, or semantically identical after the target's own
identity fields are ignored.

## Step 3 — Adapt, never copy blind

| Field                              | Rule                                                             |
| ---------------------------------- | ---------------------------------------------------------------- |
| `name`, `description`, `keywords`  | Keep the target's.                                               |
| `repository`, `homepage`, `author` | Keep the target's.                                               |
| `pnpm-workspace.yaml` `packages:`  | Rewrite from the target's real directories.                      |
| `vitest.config.ts` `projects:`     | Rewrite from the target's real test packages/apps.               |
| `catalog:` / `overrides`           | Keep when the target's packages reference `catalog:`.            |
| Root scripts                       | Keep the target's CI chain if its packages lack `_ci` scripts.   |
| `packageManager`                   | Match the installed pnpm major, then regenerate the lockfile.    |
| Source-only devDependencies        | Drop. Keep target-only tooling still required by target configs. |
| Versions                           | Take them from `SOURCE`; do not invent newer ones.               |

## Step 4 — Package templates

### Library packages

`rolldown.config.ts`:

```ts
import { defineConfig } from '@bemedev/dev-utils/rolldown';

export default defineConfig.bemedev({ sourcemap: true, declarationMap: true });
```

`vitest.config.ts`:

```ts
import { defineProject } from '@bemedev/dev-utils/vitest-extended';

export default defineProject({
  test: {
    name: '<package-dir>',
    environment: 'node',
    env: { NODE_ENV: 'test' },
    globals: true,
  },
});
```

Port `test.*` options from the package's old `vite.config.ts` instead of inventing
them. Use `jsdom` + `@vitejs/plugin-react` or `vite-plugin-solid` when the package
tests components.

`tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": { "outDir": "./lib", "rootDir": "./src" },
  "exclude": ["./rolldown.config.ts", "./vitest.config.ts"]
}
```

Keep the package's `paths`, `jsx` and `jsxImportSource`.

Scripts:

```json
{
  "build": "pnpm run rm:lib && pnpm run rolldown",
  "rm:lib": "pnpx rimraf ./lib",
  "test": "vitest run",
  "fmt": "oxfmt",
  "lint": "oxlint --fix && pnpm run fmt",
  "pretest": "pnpm run build && pnpm run size",
  "posttest": "exit 0",
  "test:only": "pnpm run test --no-coverage",
  "_ci": "pnpm run lint && pnpm run test",
  "size": "size-limit",
  "rolldown": "rolldown -c"
}
```

Add `size-limit` entries for `lib/**/*.js`, `lib/**/*.d.ts`, `lib/**/*.cjs` at
`10kb`. Add `rolldown` to devDependencies, remove `vite-plus` once nothing uses it in
that package.

### Test-only packages

- `vitest.config.ts` with `defineProject`, `name`, and the package's `setupFiles`.
- Scripts: `test` / `test:only` → `vitest run`, `_ci` → `pnpm run test`, `pretest` →
  build the codegen CLI then run `generate`.
- Replace `vp fmt` with `oxfmt` and `vpx` with `pnpx` in generators.

### Apps

- `vite.config.ts` imports `defineConfig` from `vite`; drop `run`/`pack` blocks and
  `lazyPlugins`.
- Move the `test` block into `vitest.config.ts` (`defineProject`).
- Scripts: `vite dev|build|preview`, `vitest run`, `oxfmt`, `oxlint --fix && oxfmt`,
  plus the app's own `prebuild`/`generate-routes` scripts.
- `tsconfig.json` `types` include `vitest/globals`.

## Step 5 — Remove superseded files

Only when the new config makes them dead:

- library `vite.config.ts` after moving to `rolldown.config.ts`
- root `vite.config.ts`, `vite.tasks.ts`, `vitest.setup.ts`, `.size-limit.ts` after
  leaving the Vite-Plus task runner

State every removal in the final report.

## Step 6 — Verify

```bash
pnpm install                     # regenerates the lockfile
pnpm fmt
pnpm lint
pnpm --filter <one-library> run build
pnpm --filter <one-test-pkg> run test
```

Build one library and run one test package at minimum, then report:

| File | Action (`skipped already done` / `added` / `adapted` / `removed`) |
| ---- | ----------------------------------------------------------------- |
