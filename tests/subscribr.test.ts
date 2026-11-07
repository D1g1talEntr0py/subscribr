import { describe, expect, test, vi } from 'vitest';
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
		}, { context });

		expect(subscription).toMatchObject({
			eventName: 'myEvent',
			contextEventHandler: expect.any(ContextEventHandler),
		});
		expect(typeof subscription.contextEventHandler.dispatch).toBe('function');
		expect(Object.prototype.toString.call(subscription.contextEventHandler)).toBe('[object ContextEventHandler]');
		expect(subscribr.isSubscribed(subscription)).toBe(true);

		const event = new CustomEvent('myEvent');
		const payload = { amount: 42 };
		subscribr.publish('myEvent', { event, data: payload });

		expect(received).toHaveLength(1);
		expect(received[0]).toMatchObject({
			event,
			data: payload,
			context,
		});
	});

	test('defaults the context to the handler when options omit it', () => {
		const subscribr = new Subscribr();
		let receivedContext: unknown;
		function handler(this: unknown) { receivedContext = this }

		subscribr.subscribe('defaultContext', handler, { once: true });
		subscribr.publish('defaultContext');

		expect(receivedContext).toBe(handler);
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
		subscribr.publish('user-updated', { event, data: payload });

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

describe('subscription changes during publish', () => {
	test('defers new subscriptions until the next publish while preserving ordering', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		let added = false;

		subscribr.subscribe('event', () => {
			seen.push('first');
			if (!added) {
				added = true;
				subscribr.subscribe('event', () => seen.push('new'));
			}
		});
		subscribr.subscribe('event', () => seen.push('second'));

		subscribr.publish('event');
		expect(seen).toEqual(['first', 'second']);
		subscribr.publish('event');
		expect(seen).toEqual(['first', 'second', 'first', 'second', 'new']);
	});

	test('does not extend a publish when a handler registers itself again', () => {
		const subscribr = new Subscribr();
		let calls = 0;
		const handler = () => {
			calls += 1;
			// Bound the regression even if dispatch incorrectly visits new subscriptions.
			if (calls < 5) {
				subscribr.subscribe('event', handler);
			}
		};
		subscribr.subscribe('event', handler);

		subscribr.publish('event');
		expect(calls).toBe(1);
		subscribr.publish('event');
		expect(calls).toBe(3);
	});

	test('skips a later listener removed before its turn', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		subscribr.subscribe('event', () => {
			seen.push('first');
			subscribr.unsubscribe(later);
		});
		const later = subscribr.subscribe('event', () => seen.push('removed'));
		subscribr.subscribe('event', () => seen.push('last'));

		subscribr.publish('event');
		expect(seen).toEqual(['first', 'last']);
		expect(subscribr.isSubscribed(later)).toBe(false);
	});

	test('skips remaining listeners when a handler destroys the instance', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		const first = subscribr.subscribe('event', () => {
			seen.push('first');
			subscribr.destroy();
		});
		const later = subscribr.subscribe('event', () => seen.push('later'));

		subscribr.publish('event');
		expect(seen).toEqual(['first']);
		expect(subscribr.isSubscribed(first)).toBe(false);
		expect(subscribr.isSubscribed(later)).toBe(false);
	});

	test('takes a fresh snapshot for nested publishes and skips once listeners already invoked', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];
		let nested = false;
		subscribr.subscribe('event', () => {
			seen.push(nested ? 'first:nested' : 'first:outer');
			if (!nested) {
				subscribr.subscribe('event', () => seen.push('new:nested'));
				nested = true;
				subscribr.publish('event');
			}
		});
		const once = subscribr.subscribe('event', () => {
			expect(subscribr.isSubscribed(once)).toBe(false);
			seen.push('once:nested');
		}, { once: true });
		subscribr.subscribe('event', () => seen.push('last'));

		subscribr.publish('event');
		expect(seen).toEqual(['first:outer', 'first:nested', 'once:nested', 'last', 'new:nested', 'last']);
		expect(subscribr.isSubscribed(once)).toBe(false);
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
	test.each([
		{ label: 'null', thrown: null },
		{ label: 'string', thrown: 'listener failure' },
		{ label: 'object', thrown: { reason: 'listener failure' } },
		{
			label: 'object with unsafe coercion',
			thrown: {
				[Symbol.toPrimitive]() {
					throw new Error('Must not coerce the thrown value');
				},
			},
		},
	])('normalizes a $label throw and preserves metadata, delivery, and once cleanup', ({ thrown }) => {
		const subscribr = new Subscribr();
		const errors: Error[] = [];
		const event = new CustomEvent('errorEvent');
		const payload = { id: 7 };
		let laterCalls = 0;
		const errorHandler = (error: Error, eventName: string, receivedEvent: Event, data?: unknown) => {
			errors.push(error);
			expect(eventName).toBe('errorEvent');
			expect(receivedEvent).toBe(event);
			expect(data).toBe(payload);
			expect(subscribr.isSubscribed(once)).toBe(false);
		};
		const once = subscribr.subscribe('errorEvent', () => {
			throw thrown;
		}, { once: true, errorHandler });
		subscribr.subscribe('errorEvent', () => {
			laterCalls += 1;
		});

		subscribr.publish('errorEvent', { event, data: payload });
		subscribr.publish('errorEvent', { event, data: payload });

		expect(errors).toHaveLength(1);
		expect(errors[0]).toBeInstanceOf(Error);
		expect(errors[0]?.cause).toBe(thrown);
		expect(laterCalls).toBe(2);
		expect(subscribr.isSubscribed(once)).toBe(false);
	});

	test('propagates custom error handler failures and stops delivery with once cleanup intact', () => {
		const subscribr = new Subscribr();
		const listenerError = new Error('Listener failure');
		const errorHandlerError = new Error('Error handler failure');
		let laterCalls = 0;
		const errorHandler = (error: Error) => {
			expect(error).toBe(listenerError);
			throw errorHandlerError;
		};
		const once = subscribr.subscribe('errorEvent', () => {
			throw listenerError;
		}, { once: true, errorHandler });
		subscribr.subscribe('errorEvent', () => {
			laterCalls += 1;
		});

		expect(() => subscribr.publish('errorEvent')).toThrow(errorHandlerError);
		expect(laterCalls).toBe(0);
		expect(subscribr.isSubscribed(once)).toBe(false);
		subscribr.publish('errorEvent');
		expect(laterCalls).toBe(1);
	});

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

		const errorHandler = (error: Error, eventName: string, event: Event, data?: unknown) => {
			capturedError = error;
			capturedEventName = eventName;
			capturedEvent = event;
			capturedData = data;
		};
		subscribr.subscribe('errorEvent', () => {
			throw testError;
		}, { errorHandler });

		const event = new CustomEvent('errorEvent');
		const data = { userId: 123 };
		subscribr.publish('errorEvent', { event, data });

		expect(capturedError).toBe(testError);
		expect(capturedEventName).toBe('errorEvent');
		expect(capturedEvent).toBe(event);
		expect(capturedData).toEqual(data);
	});

	test('does not call the custom error handler when all handlers succeed', () => {
		const subscribr = new Subscribr();
		let errorCalls = 0;
		let successCalls = 0;

		const errorHandler = () => {
			errorCalls += 1;
		};
		subscribr.subscribe('successEvent', () => {
			successCalls += 1;
		});

		subscribr.publish('successEvent', { errorHandler });

		expect(successCalls).toBe(1);
		expect(errorCalls).toBe(0);
	});

	test('uses a custom error handler only for the publish call that provides it', () => {
		const subscribr = new Subscribr();
		const errorHandler = vi.fn();
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		subscribr.subscribe('errorEvent', () => {
			throw new Error('Listener failure');
		});

		try {
			subscribr.publish('errorEvent', { errorHandler });
			subscribr.publish('errorEvent');

			expect(errorHandler).toHaveBeenCalledOnce();
			expect(consoleError).toHaveBeenCalledOnce();
		} finally {
			consoleError.mockRestore();
		}
	});

	test('prefers the subscription error handler over the publish error handler', () => {
		const subscribr = new Subscribr();
		const subscriptionErrorHandler = vi.fn();
		const publishErrorHandler = vi.fn();
		subscribr.subscribe('errorEvent', () => {
			throw new Error('Listener failure');
		}, { errorHandler: subscriptionErrorHandler });

		subscribr.publish('errorEvent', { errorHandler: publishErrorHandler });

		expect(subscriptionErrorHandler).toHaveBeenCalledOnce();
		expect(publishErrorHandler).not.toHaveBeenCalled();
	});

	test('uses the publish error handler when the subscription has no error handler', () => {
		const subscribr = new Subscribr();
		const publishErrorHandler = vi.fn();
		subscribr.subscribe('errorEvent', () => {
			throw new Error('Listener failure');
		});

		subscribr.publish('errorEvent', { errorHandler: publishErrorHandler });

		expect(publishErrorHandler).toHaveBeenCalledOnce();
	});
});

describe('once subscriptions', () => {
	test('runs once and then auto-unsubscribes', () => {
		const subscribr = new Subscribr();
		const seen: Array<{ event: Event; data?: unknown; context: unknown }> = [];
		const context = { tag: 'once-context' };
		const subscription = subscribr.subscribe('onceEvent', function(this: unknown, event: Event, data?: unknown) {
			seen.push({ event, data, context: this });
		}, { context, once: true });

		expect(subscribr.isSubscribed(subscription)).toBe(true);

		subscribr.publish('onceEvent', { event: new CustomEvent('onceEvent'), data: { value: 1 } });
		expect(seen).toHaveLength(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);

		subscribr.publish('onceEvent', { event: new CustomEvent('onceEvent'), data: { value: 2 } });
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
		}, { context, once: true });

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
		}, { once: true });

		subscribr.publish('onceEvent');

		expect(callCount).toBe(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
	});

	test('unsubscribes a once handler even when it throws', () => {
		const subscribr = new Subscribr();
		let errorCalls = 0;
		let handlerCalls = 0;
		let subscription;

		const errorHandler = () => {
			errorCalls += 1;
		};
		subscription = subscribr.subscribe('onceEvent', () => {
			handlerCalls += 1;
			throw new Error('once failure');
		}, { once: true, errorHandler });

		subscribr.publish('onceEvent');
		subscribr.publish('onceEvent');

		expect(handlerCalls).toBe(1);
		expect(errorCalls).toBe(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
	});

	test('supports multiple once subscriptions independently', () => {
		const subscribr = new Subscribr();
		const seen: string[] = [];

		subscribr.subscribe('multiOnce', () => seen.push('first'), { once: true });
		subscribr.subscribe('multiOnce', () => seen.push('second'), { once: true });
		subscribr.subscribe('multiOnce', () => seen.push('third'), { once: true });

		subscribr.publish('multiOnce');
		expect(seen).toEqual(['first', 'second', 'third']);

		subscribr.publish('multiOnce');
		expect(seen).toEqual(['first', 'second', 'third']);
	});

	test('validates the event name before creating a once subscription', () => {
		const subscribr = new Subscribr();
		expect(() => subscribr.subscribe('', () => {}, { once: true })).toThrow(TypeError);
		expect(() => subscribr.subscribe(' event', () => {}, { once: true })).toThrow(Error);
	});
});
