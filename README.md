# subscribr
JavaScript Publish/Subscribe

This simple class enables you to subscribe and publish events using the Observer pattern.

Basically, you subscribe your event handler using the `Subscribr` instance and are returned a `Subscription` instance.

When the event is published, your event handler will be called.

### Installation:
```bash
# Install with pnpm
pnpm install @d1g1tal/subscribr

# Install with NPM
npm install @d1g1tal/subscribr
```
Or Script tags from downloaded script or from a NPM CDN like jsDelivr

```html
<!-- Load as global script -->
<script src="/subscribr/dist/iife/subscribr.min.js"></script>

<!-- Load from CDN -->
<script src="https://cdn.jsdelivr.net/npm/@d1g1tal/subscribr@3/dist/iife/subscribr.min.js"></script>

<!-- Load as ES Module -->
<script type="module">
	import Subscribr from '/app/js/subscribr.min.js';
</script>

<!-- Load from CDN -->
<script type="module">
	import Subscribr from 'https://cdn.jsdelivr.net/npm/@d1g1tal/subscribr@3/dist/subscribr.min.js';
</script>
```

### Usage:
```javascript
// ES Module
import Subscribr from '@d1g1tal/subscribr';

const subscribr = new Subscribr();
const eventName = 'myEvent';

// Subscribr.prototype.subscribe returns a Subscription object.
const mySubscription = subscribr.subscribe(eventName, (event, data) => console.log(`Event: '${event.type}' published with data: ${data}`));

// Publish the event with just the name and a CustomEvent will be created with the eventName. All handlers that have subscribed are called
subscribr.publish(eventName, { foo: 'bar', zip: 'fizz' }); // Event: 'myEvent' published with data: { foo: 'bar', zip: 'fizz' }

// Is the event subscribed?
const isSubscribed = subscribr.isSubscribed(mySubscription); // true

const isUnsubscribed = subscribr.unsubscribe(mySubscription); // true

const isSubscribed = subscribr.isSubscribed(mySubscription); // false


// Subscribe to a DOM event
const eventTargetSubscription = subsribr.subscribe('eventTargetChanged', (event, data) => console.log(`Event target changed with data: ${data}`));

// Add some event to an event target (DOMElement)
new EventTarget().addEventListener('change', function(event) {
	// Publish the event and all handlers that have subscribed are called
	subscribr.publish('eventTargetChanged', event, { value: this.value }); // Event target changed with data: {value: 'new value'}
});

// Is the event subscribed?
const isSubscribed = subscribr.isSubscribed(eventTargetSubscription); // true

const isUnsubscribed = subscribr.unsubscribe(eventTargetSubscription); // true

const isSubscribed = subscribr.isSubscribed(eventTargetSubscription); // false
```