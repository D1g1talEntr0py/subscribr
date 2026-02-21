import { describe, expect, test, vi } from 'vitest';
import { ContextEventHandler } from '../src/context-event-handler.js';
import { Subscribr } from '../src/subscribr.js';
import { Subscription } from '../src/subscription.js';

describe('Subscribr Object Creation', () => {
	const subscribr = new Subscribr();

	test('Type Of', () => expect(typeof subscribr).toEqual('object'));
	test('Instance Of', () => expect(subscribr).toBeInstanceOf(Subscribr));
	test('Constructor Type', () => expect(subscribr.constructor).toEqual(Subscribr));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscribr)).toEqual('[object Subscribr]'));
});

describe('Subscription Object Creation', () => {
	const subscription = new Subscribr().subscribe('myEvent', vi.fn(function (event, data) {
		console.log(`Event: ${event.type} called with data: ${data}.`);
	}));

	test('Type Of', () => expect(typeof subscription).toEqual('object'));
	test('Instance Of', () => expect(subscription).toBeInstanceOf(Subscription));
	test('Constructor Type', () => expect(subscription.constructor).toEqual(Subscription));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscription)).toEqual('[object Subscription]'));
});

describe('ContextEventHandler Object Creation', () => {
	const contextEventHandler = new Subscribr().subscribe('myEvent', vi.fn(function (event, data) {
		console.log(`Event: ${event.type} called with data: ${data}.`);
	})).contextEventHandler;

	test('Type Of', () => expect(typeof contextEventHandler).toEqual('object'));
	test('Instance Of', () => expect(contextEventHandler).toBeInstanceOf(ContextEventHandler));
	test('Constructor Type', () => expect(contextEventHandler.constructor).toEqual(ContextEventHandler));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(contextEventHandler)).toEqual('[object ContextEventHandler]'));
});

describe('Subscribe', () => {
	const subscribr = new Subscribr();
	const myNewEvent = new CustomEvent('myNewEvent');

	const eventListener = vi.fn(function(this: unknown, event, data) {
		console.log(this);
		console.log(`Event: ${event.type} called with data: ${data}.`);
	});

	const subscription = subscribr.subscribe('myNewEvent', eventListener, {x: 'some value'});

	test('typeof', () => expect(typeof subscription).toEqual('object'));
	test('_type', () => expect(subscription).toBeInstanceOf(Subscription));

	test('Publish', () => {
		subscribr.publish('myNewEvent');
		expect(eventListener).toHaveBeenCalledWith(myNewEvent, undefined);
	});

	test('Publish Event w/ Data', () => {
		const event = new Event('myNewEvent');
		const data = { global: true, children: [] };
		subscribr.publish(event.type, event, data);
		expect(eventListener).toHaveBeenCalledWith(event, data);
	});
});

describe('Unsubscribe', () => {
	const eventListener = vi.fn((event) => console.log(`Event: ${event.type} called.`));
	const subscribr = new Subscribr();
	const subscription = subscribr.subscribe('myNewEvent', eventListener);

	test('Check Result', () => expect(subscribr.unsubscribe(subscription)).toEqual(true));

	test('Unsubscribe with Non-Existent Subscription', () => expect(subscribr.unsubscribe(subscription)).toEqual(false));
});

describe('Unsubscribe with Existing Subscriptions', () => {
	const eventListener = vi.fn((event) => console.log(`Event: ${event.type} called.`));
	const subscribr = new Subscribr();
	const subscription = subscribr.subscribe('myNewEvent', eventListener);
	const secondSubscription = subscribr.subscribe('myNewEvent', vi.fn((event) => console.log(`Second subscription Event: ${event.type} called.`)));

	test('Check Result', () => expect(subscribr.unsubscribe(subscription) && subscribr.unsubscribe(secondSubscription)).toEqual(true));
});

describe('isSubscribed', () => {
	const subscribr = new Subscribr();

	const subscription = subscribr.subscribe('myIsSubscribedEvent', (event) => console.log(`Event: ${event.type} called.`));

	test('Is Actually Subscribed', () => expect(subscribr.isSubscribed(subscription)).toEqual(true));

	const secondSubscribr = new Subscribr();
	const secondSubscription = secondSubscribr.subscribe('mySecondIsSubscribedEvent', (event) => console.log(`Event: ${event.type} called.`));

	test('Is Not Subscribed', () => expect(subscribr.isSubscribed(secondSubscription)).toEqual(false));
});

describe('Event Name Validation', () => {
	const subscribr = new Subscribr();

	test('Subscribe with empty string should throw TypeError', () => {
		expect(() => subscribr.subscribe('', vi.fn())).toThrow(TypeError);
		expect(() => subscribr.subscribe('', vi.fn())).toThrow('Event name must be a non-empty string');
	});

	test('Subscribe with non-string should throw TypeError', () => {
		// @ts-expect-error Testing invalid input
		expect(() => subscribr.subscribe(null, vi.fn())).toThrow(TypeError);
		// @ts-expect-error Testing invalid input
		expect(() => subscribr.subscribe(undefined, vi.fn())).toThrow(TypeError);
		// @ts-expect-error Testing invalid input
		expect(() => subscribr.subscribe(123, vi.fn())).toThrow(TypeError);
	});

	test('Subscribe with leading whitespace should throw Error', () => {
		expect(() => subscribr.subscribe(' myEvent', vi.fn())).toThrow(Error);
		expect(() => subscribr.subscribe(' myEvent', vi.fn())).toThrow('Event name cannot have leading or trailing whitespace');
	});

	test('Subscribe with trailing whitespace should throw Error', () => {
		expect(() => subscribr.subscribe('myEvent ', vi.fn())).toThrow(Error);
		expect(() => subscribr.subscribe('myEvent ', vi.fn())).toThrow('Event name cannot have leading or trailing whitespace');
	});

	test('Publish with empty string should throw TypeError', () => {
		expect(() => subscribr.publish('')).toThrow(TypeError);
		expect(() => subscribr.publish('')).toThrow('Event name must be a non-empty string');
	});

	test('Publish with non-string should throw TypeError', () => {
		// @ts-expect-error Testing invalid input
		expect(() => subscribr.publish(null)).toThrow(TypeError);
		// @ts-expect-error Testing invalid input
		expect(() => subscribr.publish(undefined)).toThrow(TypeError);
		// @ts-expect-error Testing invalid input
		expect(() => subscribr.publish(123)).toThrow(TypeError);
	});

	test('Publish with whitespace should throw Error', () => {
		expect(() => subscribr.publish(' myEvent')).toThrow(Error);
		expect(() => subscribr.publish('myEvent ')).toThrow(Error);
	});
});

describe('Error Handling in Event Handlers', () => {
	test('Handler error should not prevent other handlers from executing', () => {
		const subscribr = new Subscribr();
		const firstHandler = vi.fn(() => { throw new Error('First handler error'); });
		const secondHandler = vi.fn();
		const thirdHandler = vi.fn();

		subscribr.subscribe('errorEvent', firstHandler);
		subscribr.subscribe('errorEvent', secondHandler);
		subscribr.subscribe('errorEvent', thirdHandler);

		// Suppress console.error for this test
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		subscribr.publish('errorEvent');

		expect(firstHandler).toHaveBeenCalled();
		expect(secondHandler).toHaveBeenCalled();
		expect(thirdHandler).toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Error in event handler for 'errorEvent':",
			expect.any(Error)
		);

		consoleErrorSpy.mockRestore();
	});

	test('Custom error handler should be called on handler error', () => {
		const subscribr = new Subscribr();
		const errorHandler = vi.fn();
		const testError = new Error('Test error');
		const faultyHandler = vi.fn(() => { throw testError; });

		subscribr.setErrorHandler(errorHandler);
		subscribr.subscribe('errorEvent', faultyHandler);

		const event = new CustomEvent('errorEvent');
		const data = { test: 'data' };
		subscribr.publish('errorEvent', event, data);

		expect(errorHandler).toHaveBeenCalledWith(testError, 'errorEvent', event, data);
		expect(faultyHandler).toHaveBeenCalled();
	});

	test('Custom error handler receives correct parameters', () => {
		const subscribr = new Subscribr();
		let capturedError: Error | null = null;
		let capturedEventName: string | null = null;
		let capturedEvent: Event | null = null;
		let capturedData: unknown = null;

		subscribr.setErrorHandler((error, eventName, event, data) => {
			capturedError = error;
			capturedEventName = eventName;
			capturedEvent = event;
			capturedData = data;
		});

		const testError = new Error('Handler failure');
		subscribr.subscribe('testEvent', () => { throw testError; });

		const customEvent = new CustomEvent('testEvent');
		const eventData = { userId: 123 };
		subscribr.publish('testEvent', customEvent, eventData);

		expect(capturedError).toBe(testError);
		expect(capturedEventName).toBe('testEvent');
		expect(capturedEvent).toBe(customEvent);
		expect(capturedData).toEqual(eventData);
	});

	test('Error handler should not be called when handlers succeed', () => {
		const subscribr = new Subscribr();
		const errorHandler = vi.fn();
		const successHandler = vi.fn();

		subscribr.setErrorHandler(errorHandler);
		subscribr.subscribe('successEvent', successHandler);
		subscribr.publish('successEvent');

		expect(successHandler).toHaveBeenCalled();
		expect(errorHandler).not.toHaveBeenCalled();
	});
});

describe('Once Subscription', () => {
	test('subscribe() with once option should create a one-time subscription', () => {
		const subscribr = new Subscribr();
		const handler = vi.fn();
		const subscription = subscribr.subscribe('onceEvent', handler, handler, { once: true });

		expect(subscription).toBeInstanceOf(Subscription);
		expect(subscribr.isSubscribed(subscription)).toBe(true);
		
		subscribr.publish('onceEvent');
		expect(handler).toHaveBeenCalledTimes(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);
		
		subscribr.publish('onceEvent');
		expect(handler).toHaveBeenCalledTimes(1);
	});

	test('once handler should be called on first publish', () => {
		const subscribr = new Subscribr();
		const handler = vi.fn();
		subscribr.subscribe('onceEvent', handler, handler, { once: true });

		const event = new CustomEvent('onceEvent');
		const data = { test: 'data' };
		subscribr.publish('onceEvent', event, data);

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith(event, data);
	});

	test('once handler should not be called on second publish', () => {
		const subscribr = new Subscribr();
		const handler = vi.fn();
		const subscription = subscribr.subscribe('onceEvent', handler, handler, { once: true });

		subscribr.publish('onceEvent');
		expect(handler).toHaveBeenCalledTimes(1);
		expect(subscribr.isSubscribed(subscription)).toBe(false);

		subscribr.publish('onceEvent');
		expect(handler).toHaveBeenCalledTimes(1);
	});

	test('once should auto-unsubscribe after first event', () => {
		const subscribr = new Subscribr();
		const handler = vi.fn();
		const subscription = subscribr.subscribe('onceEvent', handler, handler, { once: true });

		expect(subscribr.isSubscribed(subscription)).toBe(true);
		subscribr.publish('onceEvent');
		expect(subscribr.isSubscribed(subscription)).toBe(false);
	});

	test('once can be manually unsubscribed before trigger', () => {
		const subscribr = new Subscribr();
		const handler = vi.fn();
		const subscription = subscribr.subscribe('onceEvent', handler, handler, { once: true });

		expect(subscribr.isSubscribed(subscription)).toBe(true);
		subscribr.unsubscribe(subscription);
		expect(subscribr.isSubscribed(subscription)).toBe(false);

		subscribr.publish('onceEvent');
		expect(handler).not.toHaveBeenCalled();
	});

	test('once with custom context should preserve context', () => {
		const subscribr = new Subscribr();
		const context = { value: 'test-context' };
		let capturedContext: unknown = null;

		subscribr.subscribe('onceEvent', function(this: unknown) {
			capturedContext = this;
		}, context, { once: true });

		subscribr.publish('onceEvent');
		expect(capturedContext).toBe(context);
	});

	test('Multiple once subscriptions should each fire once', () => {
		const subscribr = new Subscribr();
		const handler1 = vi.fn();
		const handler2 = vi.fn();
		const handler3 = vi.fn();

		subscribr.subscribe('multiOnce', handler1, handler1, { once: true });
		subscribr.subscribe('multiOnce', handler2, handler2, { once: true });
		subscribr.subscribe('multiOnce', handler3, handler3, { once: true });

		subscribr.publish('multiOnce');
		expect(handler1).toHaveBeenCalledTimes(1);
		expect(handler2).toHaveBeenCalledTimes(1);
		expect(handler3).toHaveBeenCalledTimes(1);

		subscribr.publish('multiOnce');
		expect(handler1).toHaveBeenCalledTimes(1);
		expect(handler2).toHaveBeenCalledTimes(1);
		expect(handler3).toHaveBeenCalledTimes(1);
	});

	test('once should validate event name', () => {
		const subscribr = new Subscribr();
		expect(() => subscribr.subscribe('', vi.fn(), vi.fn(), { once: true })).toThrow(TypeError);
		expect(() => subscribr.subscribe(' event', vi.fn(), vi.fn(), { once: true })).toThrow(Error);
	});
});
