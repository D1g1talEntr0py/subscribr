# subscribr

[![npm version](https://img.shields.io/npm/v/@d1g1tal/subscribr.svg)](https://www.npmjs.com/package/@d1g1tal/subscribr)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

A lightweight TypeScript publish/subscribe library implementing the Observer pattern.

## Features

- 🎯 **Simple API** - Subscribe, publish, and unsubscribe with ease
- 🔒 **Type-safe** - Full TypeScript support with strict typing
- 🎪 **Context binding** - Maintain proper `this` context in handlers
- 🔄 **Once subscriptions** - Auto-unsubscribe after first event via options
- 🛡️ **Error handling** - Built-in error boundary prevents cascading failures
- ✅ **Validation** - Event name validation for reliable behavior
- 📦 **Lightweight** - Minimal dependencies (@d1g1tal/collections)
- 🧪 **Well-tested** - Comprehensive test coverage

## Installation

```bash
# Install with pnpm
pnpm add @d1g1tal/subscribr

# Install with npm
npm install @d1g1tal/subscribr

# Install with yarn
yarn add @d1g1tal/subscribr
```

### CDN Usage

```html
<!-- Load as ES Module from CDN -->
<script type="module">
  import Subscribr from 'https://cdn.jsdelivr.net/npm/@d1g1tal/subscribr@4/dist/subscribr.js';
</script>
```

## Quick Start

```javascript
import Subscribr from '@d1g1tal/subscribr';

// Create a new instance
const subscribr = new Subscribr();

// Subscribe to an event
const subscription = subscribr.subscribe('user-login', (event, data) => {
  console.log('User logged in:', data.userId);
});

// Publish an event
subscribr.publish('user-login', undefined, { userId: 123 });
// Output: User logged in: 123

// Check if subscribed
console.log(subscribr.isSubscribed(subscription)); // true

// Unsubscribe
subscribr.unsubscribe(subscription);
console.log(subscribr.isSubscribed(subscription)); // false
```

## API Reference

### Constructor

#### `new Subscribr()`

Creates a new Subscribr instance.

```javascript
const subscribr = new Subscribr();
```

---

### Methods

#### `subscribe(eventName, eventHandler, context?, options?)`

Subscribe to an event.

**Parameters:**
- `eventName` (string) - The name of the event to subscribe to
- `eventHandler` (function) - The handler function `(event: Event, data?: unknown) => void`
- `context` (any, optional) - The `this` context for the handler (defaults to the handler itself)
- `options` (object, optional) - Subscription options
  - `once` (boolean) - If true, automatically unsubscribe after first event

**Returns:** `Subscription` - A subscription object for managing the subscription

**Throws:**
- `TypeError` - If event name is not a non-empty string
- `Error` - If event name has leading or trailing whitespace

```javascript
// Basic subscription
const subscription = subscribr.subscribe('my-event', (event, data) => {
  console.log('Event received:', event.type, data);
});

// With custom context
const myObject = {
  name: 'MyObject',
  handleEvent(event, data) {
    console.log(this.name, 'received:', data);
  }
};
subscribr.subscribe('my-event', myObject.handleEvent, myObject);

// One-time subscription using options
subscribr.subscribe('init', (event, data) => {
  console.log('Initialization complete:', data);
}, undefined, { once: true });

subscribr.publish('init', undefined, { status: 'ready' });
// Output: Initialization complete: { status: 'ready' }

subscribr.publish('init', undefined, { status: 'ready' });
// No output - handler was auto-unsubscribed
```

---

#### `publish(eventName, event?, data?)`

Publish an event to all subscribed handlers.

**Parameters:**
- `eventName` (string) - The name of the event to publish
- `event` (Event, optional) - A custom event object (defaults to `new CustomEvent(eventName)`)
- `data` (any, optional) - Data to pass to event handlers

**Returns:** `void`

**Throws:**
- `TypeError` - If event name is not a non-empty string
- `Error` - If event name has leading or trailing whitespace

```javascript
// Publish with just event name and data
subscribr.publish('user-action', undefined, { action: 'click', target: 'button' });

// Publish with custom event
const customEvent = new CustomEvent('custom-event', { detail: 'info' });
subscribr.publish('custom-event', customEvent, { extra: 'data' });
```

---

#### `unsubscribe(subscription)`

Unsubscribe from an event.

**Parameters:**
- `subscription` (Subscription) - The subscription object returned from `subscribe()` or `once()`

**Returns:** `boolean` - `true` if successfully unsubscribed, `false` if subscription wasn't found

```javascript
const subscription = subscribr.subscribe('my-event', handler);
const result = subscribr.unsubscribe(subscription); // true
const result2 = subscribr.unsubscribe(subscription); // false (already unsubscribed)
```

---

#### `isSubscribed(subscription)`

Check if a subscription is still active.

**Parameters:**
- `subscription` (Subscription) - The subscription object to check

**Returns:** `boolean` - `true` if the subscription is active, `false` otherwise

```javascript
const subscription = subscribr.subscribe('my-event', handler);
subscribr.isSubscribed(subscription); // true
subscribr.unsubscribe(subscription);
subscribr.isSubscribed(subscription); // false
```

---

#### `setErrorHandler(errorHandler)`

Set a custom error handler for handling errors that occur in event listeners. By default, errors are logged to the console.

**Parameters:**
- `errorHandler` (function) - The error handler function `(error: Error, eventName: string, event: Event, data?: unknown) => void`

**Returns:** `void`

```javascript
// Set a custom error handler
subscribr.setErrorHandler((error, eventName, event, data) => {
  console.error(`Error in handler for '${eventName}':`, error.message);
  // Send to error tracking service
  errorTracker.report(error, { eventName, data });
});

// Now if a handler throws an error, it won't break other handlers
subscribr.subscribe('my-event', () => {
  throw new Error('Oops!');
});

subscribr.subscribe('my-event', () => {
  console.log('This still runs!'); // ✅ Executes despite the error above
});

subscribr.publish('my-event');
// Output: Error in handler for 'my-event': Oops!
// Output: This still runs!
```

---

## Usage Examples

### Multiple Handlers for the Same Event

```javascript
const subscribr = new Subscribr();

subscribr.subscribe('data-update', (event, data) => {
  console.log('Handler 1:', data);
});

subscribr.subscribe('data-update', (event, data) => {
  console.log('Handler 2:', data);
});

subscribr.publish('data-update', undefined, { value: 42 });
// Output:
// Handler 1: { value: 42 }
// Handler 2: { value: 42 }
```

### Using with DOM Events

```javascript
const subscribr = new Subscribr();

subscribr.subscribe('user-click', (event, data) => {
  console.log('User clicked:', data.elementId);
});

document.getElementById('myButton').addEventListener('click', (event) => {
  subscribr.publish('user-click', event, { elementId: event.target.id });
});
```

### Class-based Event Handling

```javascript
class UserManager {
  constructor(subscribr) {
    this.subscribr = subscribr;
    this.users = [];

    // Subscribe with proper context binding
    this.subscribr.subscribe('user-added', this.onUserAdded, this);
  }

  onUserAdded(event, data) {
    // 'this' correctly refers to UserManager instance
    this.users.push(data.user);
    console.log(`Total users: ${this.users.length}`);
  }

  addUser(user) {
    this.subscribr.publish('user-added', undefined, { user });
  }
}

const subscribr = new Subscribr();
const manager = new UserManager(subscribr);
manager.addUser({ id: 1, name: 'Alice' });
// Output: Total users: 1
```

### Error-Resistant Event System

```javascript
const subscribr = new Subscribr();

// Set up error tracking
subscribr.setErrorHandler((error, eventName, event, data) => {
  console.error(`Error in handler for '${eventName}':`, error.message);
  // Send to error tracking service (if available)
});

// Even if one handler fails, others continue
subscribr.subscribe('process-data', (event, data) => {
  if (!data.valid) throw new Error('Invalid data');
  processData(data);
});

subscribr.subscribe('process-data', (event, data) => {
  // This still executes even if the previous handler throws
  updateUI(data);
});
```

### One-Time Subscriptions

```javascript
const subscribr = new Subscribr();

// One-time subscription using options
subscribr.subscribe('app-ready', (event, data) => {
  console.log('App initialized with config:', data.config);
  startApplication(data.config);
}, undefined, { once: true });

// This will only trigger the handler once
subscribr.publish('app-ready', undefined, { config: { theme: 'dark' } });
subscribr.publish('app-ready', undefined, { config: { theme: 'light' } }); // Ignored
```

## TypeScript Support

Full TypeScript support with strict typing:

```typescript
import Subscribr from '@d1g1tal/subscribr';

interface UserData {
  userId: number;
  userName: string;
}

const subscribr = new Subscribr();

subscribr.subscribe('user-login', (event: Event, data?: UserData) => {
  if (data) {
    console.log(`User ${data.userName} (ID: ${data.userId}) logged in`);
  }
});

subscribr.publish<UserData>('user-login', undefined, {
  userId: 123,
  userName: 'Alice'
});
```

## Event Name Validation

Event names are validated to prevent common mistakes:

```javascript
// ❌ These will throw errors:
subscribr.subscribe('', handler);           // TypeError: Event name must be a non-empty string
subscribr.subscribe(' event', handler);     // Error: Event name cannot have leading or trailing whitespace
subscribr.subscribe('event ', handler);     // Error: Event name cannot have leading or trailing whitespace
subscribr.subscribe(null, handler);         // TypeError: Event name must be a non-empty string

// ✅ These are valid:
subscribr.subscribe('my-event', handler);
subscribr.subscribe('user:login', handler);
subscribr.subscribe('data_update', handler);
```

## Best Practices

1. **Always unsubscribe** when done to prevent memory leaks:
   ```javascript
   const subscription = subscribr.subscribe('event', handler);
   // ... later
   subscribr.unsubscribe(subscription);
   ```

2. **Use `{ once: true }` option for one-time events** to avoid manual cleanup:
   ```javascript
   subscribr.subscribe('init', handler, undefined, { once: true }); // Auto-unsubscribes
   ```

3. **Set up error handling** for production applications:
   ```javascript
   subscribr.setErrorHandler((error, eventName) => {
     console.error(`Event '${eventName}' error:`, error);
     // Report to error tracking service if available
   });
   ```

4. **Use meaningful event names** with consistent naming conventions:
   ```javascript
   // Good
   subscribr.subscribe('user-login', handler);
   subscribr.subscribe('data-updated', handler);

   // Avoid
   subscribr.subscribe('event1', handler);
   subscribr.subscribe('stuff', handler);
   ```

5. **Bind context properly** for class methods:
   ```javascript
   class MyClass {
     constructor() {
       subscribr.subscribe('event', this.handleEvent, this);
     }
     handleEvent(event, data) {
       // 'this' refers to MyClass instance
     }
   }
   ```

## Browser Support

Supports all modern browsers with ES6 module support and Node.js ≥ 20.15.1

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/D1g1talEntr0py/subscribr)
- [npm Package](https://www.npmjs.com/package/@d1g1tal/subscribr)
- [Issue Tracker](https://github.com/D1g1talEntr0py/subscribr/issues)
- [Changelog](./CHANGELOG.md)
