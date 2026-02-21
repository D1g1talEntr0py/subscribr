# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
