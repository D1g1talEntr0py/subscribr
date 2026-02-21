# Subscribr - AI Coding Agent Instructions

## Project Overview
`subscribr` is a lightweight TypeScript publish/subscribe library implementing the Observer pattern. Core architecture consists of three classes working together:
- **`Subscribr`**: Main hub managing event subscriptions using `SetMultiMap<string, ContextEventHandler>` from `@d1g1tal/collections`
- **`Subscription`**: Immutable token returned from `subscribe()`, required for `unsubscribe()` and `isSubscribed()` operations
- **`ContextEventHandler`**: Wrapper binding event handlers to their execution context (the `this` value)

## Architecture Patterns

### Context Binding Pattern
All event handlers are wrapped in `ContextEventHandler` to preserve execution context. When subscribing:
```typescript
subscribe(eventName, eventHandler, context = eventHandler)
```
The third `context` parameter defaults to the handler itself, allowing both function contexts and custom binding objects.

### Subscription Management
- `Subscribr` uses `SetMultiMap` (not native Map) to allow multiple handlers per event name
- Each subscription returns a `Subscription` object containing both `eventName` and `contextEventHandler`
- Unsubscribing removes the specific `ContextEventHandler` instance, not all handlers for that event
- When the last handler for an event is removed, the event key is deleted from the map (`subscribers.delete(eventName)`)

### Event Publishing
`publish()` accepts either an existing `Event` object or creates a `CustomEvent` with the event name. All subscribed handlers are called synchronously via `forEach()`.

## Build & Development Workflow

### Commands (via pnpm)
- **Build**: `pnpm build` - Uses custom `tsbuild` tool (linked local package, not standard tsc)
- **Testing**: `pnpm test` (single run) or `pnpm test:watch` (interactive) - Uses Vitest
- **Coverage**: `pnpm test:coverage` - Outputs to `tests/coverage/`, excludes `src/index.ts` and `src/@types`
- **Lint**: `pnpm lint` - Runs ESLint with TypeScript project-aware parsing
- **Type Check**: `pnpm type-check` - Validates types without building

### Custom Build Tool
Uses `tsbuild` (local linked package) instead of standard TypeScript compiler. Configuration in `tsconfig.json` under `tsbuild.entryPoints`. Do not suggest replacing with `tsc`.

## Code Conventions

### TypeScript Strictness
Project uses maximum TypeScript strictness (`strict: true`, `isolatedDeclarations: true`, `noUncheckedIndexedAccess: true`). All public APIs must have explicit return types and JSDoc.

### JSDoc Requirements
All public methods require JSDoc with:
- Description
- `@param` for each parameter (skip destructured params per ESLint config)
- `@template` for generic types
- `@returns` when applicable

Example from `subscribr.ts`:
```typescript
/**
 * Publish an event
 *
 * @template T
 * @param eventName The name of the event.
 * @param event The event to be handled.
 * @param data The value to be passed to the event handler as a parameter.
 */
publish<T>(eventName: string, event: Event = new CustomEvent(eventName), data?: T): void
```

### Code Style (ESLint)
- Tabs for indentation (not spaces)
- Single quotes for strings
- Semicolons required (except in one-line blocks/classes)
- Unused variables must be prefixed with `_` to avoid errors

### Symbol.toStringTag
All classes implement `[Symbol.toStringTag]` getter returning the class name for proper `Object.prototype.toString()` behavior.

## Testing Patterns

### Test Structure
Tests use Vitest with grouped `describe` blocks:
1. Object creation tests (typeof, instanceof, constructor, toString tag)
2. Functional behavior tests (subscribe, publish, unsubscribe)
3. Edge cases (unsubscribe non-existent, multiple subscriptions)

### Mock Pattern
Use Vitest's `vi.fn()` to create trackable event listeners:
```typescript
const eventListener = vi.fn(function(event, data) { ... });
subscribr.subscribe('event', eventListener, context);
expect(eventListener).toHaveBeenCalledWith(event, data);
```

## Dependencies & Integration

### External Dependencies
- **`@d1g1tal/collections`**: Provides `SetMultiMap` extending native `Map<K, Set<V>>` for storing multiple unique values per key. Import from `/src` path in source files (`@d1g1tal/collections/src`).
  - Key methods: `set(key, value)` adds to Set, `get(key)` returns Set or undefined, `deleteValue(key, value)` removes specific value
  - Auto-cleanup: When last value deleted, key is removed from map (same pattern used in `Subscribr.unsubscribe()`)
- Target environments: Modern browsers with ES6 module support + Node.js ≥20.15.1

### Module System & Package Exports
Pure ESM package (`"type": "module"`). Exports two entry points:
- Main: `import Subscribr from '@d1g1tal/subscribr'` → `dist/subscribr.js` (bundled/transpiled)
- Source: `import Subscribr from '@d1g1tal/subscribr/src'` → `src/index.ts` (raw TypeScript)

Import conventions:
- Source files: Omit `.ts` extension (`./subscribr`, not `./subscribr.ts`)
- Test files: Use `.js` extension (`../src/subscribr.js`) - TypeScript outputs `.js` files

### Publishing Workflow
Pre-publish validation runs automatically via `prepublish` script:
1. `pnpm lint` - ESLint validation with project-aware TypeScript parsing
2. `pnpm test` - Full Vitest test suite (must pass)
3. `pnpm -s build` - Builds to `dist/` (subscribr.js, subscribr.d.ts, subscribr.js.map)

Published package includes only `/src` and `/dist` directories (see `files` in package.json).

## Critical Implementation Notes

- Do NOT convert `SetMultiMap` to native Map - multi-value storage is required for multiple handlers per event
- Context parameter in `subscribe()` is intentionally defaulted to the handler function itself
- The `publish()` method creates a new `CustomEvent` when no event is provided - this is by design for simple event publishing
- Import paths in tests use `.js` extension even for `.ts` files (TypeScript module emit behavior)
