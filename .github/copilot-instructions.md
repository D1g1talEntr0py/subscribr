# Subscribr - AI Coding Agent Instructions

**Core classes**: `Subscribr` (hub with `SetMultiMap<string, ContextEventHandler>`), `Subscription` (immutable unsubscribe token), `ContextEventHandler` (binds handlers to context)

## Architecture

- Use `SetMultiMap` for multi-value storage per event—never native Map
- `subscribe(eventName, handler, context = handler)` wraps handlers in `ContextEventHandler`
- `unsubscribe()` removes specific handler; event key deleted when last handler removed
- `publish()` accepts `Event` or creates `CustomEvent`; calls all handlers synchronously

## Build & Development

- `pnpm build` — uses `tsbuild` (custom linked tool, not tsc)
- `pnpm test` / `pnpm test:watch` — Vitest
- `pnpm test:coverage` — excludes `src/index.ts` and `src/@types`
- `pnpm lint` — ESLint + TypeScript parsing
- `pnpm type-check` — type validation without build

## Code Conventions

**TypeScript**: `strict: true`, `isolatedDeclarations: true`, `noUncheckedIndexedAccess: true`
**JSDoc**: All public methods require description, `@param`, `@template`, `@returns`
**Style**: Tabs, single quotes, semicolons, underscore-prefix unused vars
**Classes**: Implement `[Symbol.toStringTag]` getter

## Testing

- Vitest with `describe` blocks: creation, functional, edge cases
- Mock with `vi.fn()` for trackable listeners
- Example: `subscribr.subscribe('event', vi.fn(), context); expect(...).toHaveBeenCalledWith(...)`

## Dependencies & Integration

**`@d1g1tal/collections`**: `SetMultiMap` (`set`, `get`, `deleteValue`); auto-cleanup when last value deleted
- Import: `@d1g1tal/collections/src` in source; use `.js` extension in tests
- Target: Modern browsers (ES6) + Node.js >=22

**Module System** (Pure ESM):
- Main: `import Subscribr from '@d1g1tal/subscribr'` → `dist/subscribr.js`
- Source: `import Subscribr from '@d1g1tal/subscribr/src'` → `src/index.ts`
- Source files: omit `.ts` extension (`./subscribr`)
- Test files: use `.js` extension

**Publish Workflow** (automatic via `prepublish`):
1. `pnpm lint`
2. `pnpm test` (must pass)
3. `pnpm -s build` → `dist/`

Publishes: `/src` and `/dist` only

## Critical Notes

- Do NOT convert `SetMultiMap` to native Map (multi-value storage required)
- Context defaults to handler itself intentionally
- `publish()` creates `CustomEvent` when none provided (by design)
- Test imports use `.js` extension (TypeScript emit behavior)
