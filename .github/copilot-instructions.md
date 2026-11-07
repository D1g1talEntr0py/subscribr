# Subscribr - AI Coding Agent Instructions

**Core classes**: `Subscribr` (hub with `SetMultiMap<string, ContextAwareEventHandler>`), `ContextEventHandler` (binds handlers to context). `Subscription` is a structural token with mutable fields, not a class.

## Architecture

- Use `SetMultiMap` for multi-value storage per event—never native Map
- `subscribe(eventName, handler, { context = handler, once, errorHandler } = {})` wraps handlers in `ContextEventHandler`; `errorHandler` handles synchronous errors thrown by that subscription's handler
- `unsubscribe()` removes specific handler; event key deleted when last handler removed
- `publish(eventName, { event, data, errorHandler } = {})` uses the given `Event` or creates a `CustomEvent`; delivers synchronously in subscription order, snapshotting initial listeners and skipping listeners removed before their turn (including by `destroy()`). Additions wait for a later publish. Its `errorHandler` handles synchronous listener errors when the subscription has no error handler.
- Once subscriptions are removed before invocation, including recursive publishes and listener throws.
- The error boundary catches synchronous listener throws only, not rejected promises. Subscription `errorHandler` takes precedence over the publish-level handler (which defaults to `console.error`). Existing `Error` objects retain identity; other throws become an `Error` with the original value in `cause`. A custom error handler's own throw propagates and interrupts dispatch.

## Build & Development

- `pnpm build` / `pnpm build:minify` — uses `@d1g1tal/tsbuild`
- `pnpm test` / `pnpm test:watch` — Vitest
- `pnpm test:coverage` — Vitest coverage; configuration in `vitest.config.ts`
- `pnpm lint` — ESLint + TypeScript parsing
- `pnpm type-check` — type validation without build

## Code Conventions

**TypeScript**: See `tsconfig.json`; explicit options include `isolatedDeclarations: true` and `noUncheckedIndexedAccess: true`. Event names do not enforce payload schemas; use shared payload types, explicit `publish<T>` generics, or type guards.
**JSDoc**: All public methods require description, `@param`, `@template`, `@returns`
**Style**: Tabs, single quotes, semicolons, underscore-prefix unused vars
**Classes**: Implement `[Symbol.toStringTag]` getter

## Testing

- Vitest with `describe` blocks: creation, functional, edge cases
- Mock with `vi.fn()` for trackable listeners
- Example: `subscribr.subscribe('event', vi.fn(), { context }); expect(...).toHaveBeenCalledWith(...)`

## Dependencies & Integration

**`@d1g1tal/collections`**: `SetMultiMap` (`add`, `get`, `deleteValue`); auto-cleanup when last value deleted
- Import: `@d1g1tal/collections` (package root)
- Target: Modern browsers with ES modules + Node.js >=24.11.1; MIT license

**Module System** (Pure ESM):
- Main: `import { Subscribr, ContextEventHandler } from '@d1g1tal/subscribr'` → `dist/subscribr.js`
- Only the package root is exported; public types are `Subscription` and `EventHandler`. Entry source is `src/subscribr.ts`; internal types live in `src/types.ts`.
- Source files: omit `.ts` extension (`./subscribr`)
- Test files: use `.js` extension

**Publish Workflow** (`.github/workflows/publish.yml` on main pushes, not a `prepublish` script):
1. `pnpm lint`
2. `pnpm test` (must pass)
3. `pnpm build:minify` → `dist/`
4. `pnpm pack`, then `pnpm publish --no-git-checks --provenance`

Publishes: `/dist`, `README.md`, `CHANGELOG.md`, and `LICENSE` (plus package metadata); no source export.

## Critical Notes

- Do NOT convert `SetMultiMap` to native Map (multi-value storage required)
- Context defaults to handler itself intentionally
- `publish()` creates `CustomEvent` when none provided (by design)
- Test imports use `.js` extension (TypeScript emit behavior)
