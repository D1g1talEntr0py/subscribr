# subscribr
JavaScript Publish/Subscribe

This simple class enables you to subscribe and publish events using the Observer pattern.

### Installation:
```bash
npm install @d1g1tal/subscribr --save
```

### Usage:
```javascript
const subscribr = new Subscribr();
const eventName = 'myEvent';
const eventHandler = (event) => console.log(`Event: '${event.type}' published`);

// Subscribr.prototype.subscribe returns a Subscription object.
const subscription = subscribr.subscribe(eventName, eventHandler);

// Publish the event and all handlers that have subscribed are called
subscribr.publish(eventName, new Event(eventName)); // Event: 'myEvent' published

// Is the event subscribed?
const isSubscribed = subscribr.isSubscribed(subscription); // true

const isUnsubscribed = subscription.unsubscribe(); // true

const isSubscribed = subscribr.isSubscribed(subscription); // false
```