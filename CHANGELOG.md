# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.6](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.5...v4.1.6) (2026-02-21)


### Bug Fixes

* add .npmrc for scope registry and remove setup-node registry-url\n\nCommitting .npmrc with the scope→registry mapping ensures no auth token\nplaceholder is injected by setup-node. Removing registry-url from\nsetup-node prevents it from writing _authToken=\${NODE_AUTH_TOKEN} to\na project-level .npmrc, which was blocking the OIDC Trusted Publisher\nexchange. ([fb2ddeb](https://github.com/D1g1talEntr0py/subscribr/commit/fb2ddeb991196ee8ba27136d7683e3241da36c75))

## [4.1.5](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.4...v4.1.5) (2026-02-21)


### Bug Fixes

* revert block that removed the _authToken in the release action ([e5ae093](https://github.com/D1g1talEntr0py/subscribr/commit/e5ae093ee60bcb9081b3668da118d00f96fdb84a))

## [4.1.4](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.3...v4.1.4) (2026-02-21)


### Bug Fixes

* update node version in release action ([4f3efe1](https://github.com/D1g1talEntr0py/subscribr/commit/4f3efe1683618f5ec70712ce0baa69ec387c8772))

## [4.1.3](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.2...v4.1.3) (2026-02-21)


### Bug Fixes

* remove _authToken placeholder so npm uses OIDC exchange\n\nsetup-node writes _authToken=\${NODE_AUTH_TOKEN} to .npmrc. With no\nNODE_AUTH_TOKEN set, npm sends invalid auth instead of falling through\nto the Trusted Publisher OIDC exchange. Deleting it lets npm detect\nACTIONS_ID_TOKEN_REQUEST_URL and obtain a fresh token automatically. ([8de61a3](https://github.com/D1g1talEntr0py/subscribr/commit/8de61a3ea5550470eb93f57812522c1696b16df5))

## [4.1.2](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.1...v4.1.2) (2026-02-21)


### Bug Fixes

* upgrade npm to latest for OIDC Trusted Publisher support\n\nnpm Trusted Publisher requires npm v11.5.1+. The GitHub runner ships\nwith an older version, so upgrade before publishing. Also restore\nregistry-url on setup-node as required by the OIDC auth flow. ([84656e5](https://github.com/D1g1talEntr0py/subscribr/commit/84656e5491fd7967179ada9ced5c5a0e8525803a))

## [4.1.1](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.0...v4.1.1) (2026-02-21)


### Bug Fixes

* add packageManager field for pnpm/action-setup ([ccbff83](https://github.com/D1g1talEntr0py/subscribr/commit/ccbff8318dceceb1b56afce35c8d87da0ed6d787))
* use --noEmit for type-check script ([10076e5](https://github.com/D1g1talEntr0py/subscribr/commit/10076e5471b08b0f355e199df8e2b0b135892b32))

## [4.1.0](https://github.com/D1g1talEntr0py/subscribr/compare/v4.0.4...v4.1.0) (2026-02-21)


### Features

* add destroy method to clear all subscriptions\n\nUpdate dependencies, lockfile, gitignore, and copilot instructions. ([4559c3d](https://github.com/D1g1talEntr0py/subscribr/commit/4559c3df88ffc051e8b6c0ad6e48f4dd8c4dac4f))
* add error boundary preventing handler errors from blocking others\n\nEvent handler errors are now caught and handled without breaking other subscribers.\nAdd setErrorHandler(), once option, event name validation, and destroy(). ([951a2b9](https://github.com/D1g1talEntr0py/subscribr/commit/951a2b98528fd34d8249a68321d484bca84b8ee6))
* add event name validation with TypeError and Error\n\nUpdate CHANGELOG and README with documentation for all new features. ([53fd032](https://github.com/D1g1talEntr0py/subscribr/commit/53fd03254bf5e510ae415cd71e7e87168dfb9827))
* add once option to subscribe for auto-unsubscribe after first event\n\nAdd comprehensive tests for once subscriptions, error handling, validation, and destroy. ([76fdcce](https://github.com/D1g1talEntr0py/subscribr/commit/76fdcce9d6f1795f904f546d94931d362fb0c975))
* add setErrorHandler for custom error handling\n\nAdd ErrorHandler and SubscriptionOptions types. Update exports. ([5a675b0](https://github.com/D1g1talEntr0py/subscribr/commit/5a675b0cf9a617b77ec63940944a78ce256e4e9a))

## [Unreleased]

### Added
- **Error handling**: `setErrorHandler()` method to provide custom error handling for event listeners
- **Error boundary**: Event handler errors no longer prevent other handlers from executing
- **Event name validation**: Subscribe and publish methods now validate event names (non-empty, no leading/trailing whitespace)
- **Subscription options**: `subscribe()` now accepts an optional `options` parameter
  - `once` property - Automatically unsubscribe after first event
- **Type definitions**: Added `ErrorHandler` and `SubscriptionOptions` types

### Changed
- Event handler errors are now caught and logged to console by default (or handled by custom error handler)
- Invalid event names now throw appropriate errors (`TypeError` for empty/non-string, `Error` for whitespace issues)

### Security
- No known vulnerabilities

## [4.0.4] - 2024-XX-XX

### Changed
- Build system and dependency updates
- TypeScript configuration improvements

## [4.0.0] - Previous Releases

### Added
- Initial release of subscribr library
- Core publish/subscribe functionality with `subscribe()`, `publish()`, `unsubscribe()`, and `isSubscribed()` methods
- Context binding for event handlers via `ContextEventHandler` class
- Immutable `Subscription` objects for managing subscriptions
- TypeScript support with strict typing
- Full test coverage with Vitest
- ES Module support

[Unreleased]: https://github.com/D1g1talEntr0py/subscribr/compare/v4.0.4...HEAD
[4.0.4]: https://github.com/D1g1talEntr0py/subscribr/releases/tag/v4.0.4
