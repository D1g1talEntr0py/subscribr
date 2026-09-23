import { describe, expect, test } from 'vitest';
import { ContextEventHandler } from '../src/context-event-handler.js';
import { Subscribr, type Subscription } from '../src/subscribr.js';

describe('Subscribr instance behavior', () => {
	test('creates a Subscribr instance with the expected identity and tag', () => {
		const subscribr = new Subscribr();

		expect(typeof subscribr).toBe('object');
		expect(subscribr).toBeInstanceOf(Subscribr);
		expect(subscribr.constructor).toBe(Subscribr);
		expect(Object.prototype.toString.call(subscribr)).toBe('[object Subscribr]');
	});

	test('subscribe returns a real Subscription and keeps the handler bound to its context', () => {
		const subscribr = new Subscribr();
		const context = { label: 'context' };
		const received: Array<{ event: Event; data?: unknown; context: unknown }> = [];

		const subscription = subscribr.subscribe('myEvent', function(this: unknown, event: Event, data?: unknown) {
			received.push({ event, data, context: this });
		}, context);

		expect(subscription).toMatchObject({
			eventName: 'myEvent',
			contextEventHandler: expect.any(ContextEventHandler),
		});
		expect(typeof subscription.contextEventHandler.handle).toBe('function');
		expect(Object.prototype.toString.call(subscription.contextEventHandler)).toBe('[object ContextEventHandler]');
		expect(subscribr.isSubscribed(subscription)).toBe(true);

		const event = new CustomEvent('myEvent');
		const payload = { amount: 42 };
		subscribr.publish('myEvent', event, payload);

		expect(received).toHaveLength(1);
		expect(received[0]).toMatchObject({
			event,
			data: payload,
			context,
		});
	});
});

describe('subscribe and publish', () => {
	test('delivers the event and custom data to each matching subscriber', () => {
		const subscribr = new Subscribr();
		const seen: Array<{ eventName: string; event: Event; data?: unknown }> = [];

		subscribr.subscribe('user-updated', (event, data) => {
			seen.push({ eventName: event.type, event, data });
		});
		subscribr.subscribe('user-updated', (event, data) => {
			seen.push({ eventName: event.type, event, data });
		});

		const event = new CustomEvent('user-updated');
		const payload = { id: 7 };
		subscribr.publish('user-updated', event, payload);

		expect(seen).toHaveLength(2);
		expect(seen[0]).toMatchObject({ eventName: 'user-updated', event, data: payload });
		expect(seen[1]).toMatchObject({ eventName: 'user-updated', event, data: payload });
	});

	test('does not deliver messages published to a different event name', () => {
		const subscribr = new Subscribr();
		const received: string[] = [];

		subscribr.subscribe('firstEvent', (event) => {
			received.push(event.type);
		});
		subscribr.publish('secondEvent');

		expect(received).toEqual([]);
	});
});

describe('unsubscribe and subscription state', () => {
	test('unsubscribe removes active subscriptions and returns the correct boolean state', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		const subscription = subscribr.subscribe('myNewEvent', (event) => seen.push(event.type));

		expect(subscribr.isSubscribed(subscription)).toBe(true);
		expect(subscribr.unsubscribe(subscription)).toBe(true);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
		expect(subscribr.unsubscribe(subscription)).toBe(false);

		subscribr.publish('myNewEvent');
		expect(seen).toEqual([]);
	});

	test('tracks multiple subscriptions independently for the same event', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		const first = subscribr.subscribe('sharedEvent', (event) => seen.push(`first:${event.type}`));
		const second = subscribr.subscribe('sharedEvent', (event) => seen.push(`second:${event.type}`));

		expect(subscribr.isSubscribed(first)).toBe(true);
		expect(subscribr.isSubscribed(second)).toBe(true);

		subscribr.unsubscribe(first);
		expect(subscribr.isSubscribed(first)).toBe(false);
		expect(subscribr.isSubscribed(second)).toBe(true);

		subscribr.publish('sharedEvent');
		expect(seen).toEqual(['second:sharedEvent']);
	});

	test('returns false for an invalid unsubscribe value', () => {
		const subscribr = new Subscribr();

		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.unsubscribe(null)).toBe(false);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.unsubscribe(undefined)).toBe(false);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.unsubscribe({})).toBe(false);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.unsubscribe({ eventName: 'event' })).toBe(false);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.unsubscribe({ eventName: 'event', contextEventHandler: {} })).toBe(false);
	});

	test('returns false for an invalid subscription value', () => {
		const subscribr = new Subscribr();

		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.isSubscribed(null)).toBe(false);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(subscribr.isSubscribed(undefined)).toBe(false);
	});
});

describe('destroy and disposable cleanup', () => {
	test('destroy removes all active subscriptions and prevents future delivery', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		const firstSubscription = subscribr.subscribe('firstEvent', (event) => seen.push(`first:${event.type}`));
		const secondSubscription = subscribr.subscribe('secondEvent', (event) => seen.push(`second:${event.type}`));

		subscribr.destroy();

		expect(subscribr.isSubscribed(firstSubscription)).toBe(false);
		expect(subscribr.isSubscribed(secondSubscription)).toBe(false);
		subscribr.publish('firstEvent');
		subscribr.publish('secondEvent');
		expect(seen).toEqual([]);
	});

	// test('Symbol.dispose cleans up the instance automatically when leaving scope', () => {
	// 	const subscribr = new Subscribr();
	// 	const seen: string[] = [];
	// 	let firstSubscription!: Subscription;
	// 	let secondSubscription!: Subscription;

	// 	{
	// 		using instance = subscribr;
	// 		firstSubscription = instance.subscribe('firstEvent', (event) => seen.push(`first:${event.type}`));
	// 		secondSubscription = instance.subscribe('secondEvent', (event) => seen.push(`second:${event.type}`));

	// 		expect(instance.isSubscribed(firstSubscription)).toBe(true);
	// 		expect(instance.isSubscribed(secondSubscription)).toBe(true);
	// 	}

	// 	expect(subscribr.isSubscribed(firstSubscription)).toBe(false);
	// 	expect(subscribr.isSubscribed(secondSubscription)).toBe(false);
	// 	subscribr.publish('firstEvent');
	// 	subscribr.publish('secondEvent');
	// 	expect(seen).toEqual([]);
	// });
});

describe('event name validation', () => {
	const subscribr = new Subscribr();

	test('subscribe rejects empty or malformed event names', () => {
		expect(() => subscribr.subscribe('', () => {})).toThrow(TypeError);
		expect(() => subscribr.subscribe('', () => {})).toThrow('Event name must be a non-empty string');
		expect(() => subscribr.subscribe(' event', () => {})).toThrow(Error);
		expect(() => subscribr.subscribe('event ', () => {})).toThrow(Error);
	});

	test('publish rejects empty or malformed event names', () => {
		expect(() => subscribr.publish('')).toThrow(TypeError);
		expect(() => subscribr.publish('')).toThrow('Event name must be a non-empty string');
		expect(() => subscribr.publish(' event')).toThrow(Error);
		expect(() => subscribr.publish('event ')).toThrow(Error);
	});

	test('rejects non-string event names at runtime', () => {
		// @ts-expect-error invalid runtime input for validation coverage
		expect(() => subscribr.subscribe(null, () => {})).toThrow(TypeError);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(() => subscribr.publish(undefined)).toThrow(TypeError);
		// @ts-expect-error invalid runtime input for validation coverage
		expect(() => subscribr.subscribe(123, () => {})).toThrow(TypeError);
	});
});

describe('error handling in event handlers', () => {
	test('continues delivering events to later handlers after an earlier handler throws', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];

		subscribr.subscribe('errorEvent', () => {
			seen.push('first');
			throw new Error('First handler error');
		});
		subscribr.subscribe('errorEvent', () => seen.push('second'));
		subscribr.subscribe('errorEvent', () => seen.push('third'));

		subscribr.publish('errorEvent');

		expect(seen).toEqual(['first', 'second', 'third']);
	});

	test('calls the custom error handler with the original error and event metadata', () => {
		const subscribr = new Subscribr();
		let capturedError: Error | null = null;
		let capturedEventName: string | null = null;
		let capturedEvent: Event | null = null;
		let capturedData: unknown = null;
		const testError = new Error('Test error');

		subscribr.setErrorHandler((error, eventName, event, data) => {
			capturedError = error;
			capturedEventName = eventName;
			capturedEvent = event;
			capturedData = data;
		});
		subscribr.subscribe('errorEvent', () => {
			throw testError;
		});

		const event = new CustomEvent('errorEvent');
		const data = { userId: 123 };
		subscribr.publish('errorEvent', event, data);

		expect(capturedError).toBe(testError);
		expect(capturedEventName).toBe('errorEvent');
		expect(capturedEvent).toBe(event);
		expect(capturedData).toEqual(data);
	});

	test('does not call the custom error handler when all handlers succeed', () => {
		const subscribr = new Subscribr();
		let errorCalls = 0;
		let successCalls = 0;

		subscribr.setErrorHandler(() => {
			errorCalls += 1;
		});
		subscribr.subscribe('successEvent', () => {
			successCalls += 1;
		});

		subscribr.publish('successEvent');

		expect(successCalls).toBe(1);
		expect(errorCalls).toBe(0);
	});
});

describe('once subscriptions', () => {
	test('runs once and then auto-unsubscribes', () => {
		const subscribr = new Subscribr();
		const seen: Array<{ event: Event; data?: unknown; context: unknown }> = [];
		const context = { tag: 'once-context' };
		const subscription = subscribr.subscribe('onceEvent', function(this: unknown, event: Event, data?: unknown) {
			seen.push({ event, data, context: this });
		}, context, { once: true });

		expect(subscribr.isSubscribed(subscription)).toBe(true);

		subscribr.publish('onceEvent', new CustomEvent('onceEvent'), { value: 1 });
		expect(seen).toHaveLength(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);

		subscribr.publish('onceEvent', new CustomEvent('onceEvent'), { value: 2 });
		expect(seen).toHaveLength(1);
		expect(seen[0]).toMatchObject({ data: { value: 1 }, context });
	});

	test('preserves custom context for once handlers and allows manual unsubscribe before firing', () => {
		const subscribr = new Subscribr();
		const context = { indicator: 'active' };
		let capturedContext: unknown = null;
		let callCount = 0;
		const subscription = subscribr.subscribe('onceEvent', function(this: unknown) {
			capturedContext = this;
			callCount += 1;
		}, context, { once: true });

		subscribr.unsubscribe(subscription);
		subscribr.publish('onceEvent');

		expect(capturedContext).toBe(null);
		expect(callCount).toBe(0);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
	});

	test('unsubscribes a once handler before invocation', () => {
		const subscribr = new Subscribr();
		let callCount = 0;
		let subscription: Subscription;

		subscription = subscribr.subscribe('onceEvent', () => {
			callCount += 1;
			subscribr.publish('onceEvent');
		}, undefined, { once: true });

		subscribr.publish('onceEvent');

		expect(callCount).toBe(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
	});

	test('unsubscribes a once handler even when it throws', () => {
		const subscribr = new Subscribr();
		let errorCalls = 0;
		let handlerCalls = 0;
		let subscription;

		subscribr.setErrorHandler(() => {
			errorCalls += 1;
		});
		subscription = subscribr.subscribe('onceEvent', () => {
			handlerCalls += 1;
			throw new Error('once failure');
		}, undefined, { once: true });

		subscribr.publish('onceEvent');
		subscribr.publish('onceEvent');

		expect(handlerCalls).toBe(1);
		expect(errorCalls).toBe(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
	});

	test('supports multiple once subscriptions independently', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];

		subscribr.subscribe('multiOnce', () => seen.push('first'), undefined, { once: true });
		subscribr.subscribe('multiOnce', () => seen.push('second'), undefined, { once: true });
		subscribr.subscribe('multiOnce', () => seen.push('third'), undefined, { once: true });

		subscribr.publish('multiOnce');
		expect(seen).toEqual(['first', 'second', 'third']);

		subscribr.publish('multiOnce');
		expect(seen).toEqual(['first', 'second', 'third']);
	});

	test('validates the event name before creating a once subscription', () => {
		const subscribr = new Subscribr();
		expect(() => subscribr.subscribe('', () => {}, undefined, { once: true })).toThrow(TypeError);
		expect(() => subscribr.subscribe(' event', () => {}, undefined, { once: true })).toThrow(Error);
	});
});
