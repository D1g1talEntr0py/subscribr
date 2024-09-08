import { _type } from '@d1g1tal/chrysalis';
import '@d1g1tal/chrysalis/proto/object-is-type.js';
import { describe, expect, test, vi } from 'vitest';
import { ContextEventHandler } from '../src/context-event-handler.js';
import { Subscribr } from '../src/subscribr.js';
import { Subscription } from '../src/subscription.js';

describe('Subscribr Object Creation', () => {
	const subscribr = new Subscribr();

	test('Type Of', () => expect(typeof subscribr).toEqual('object'));
	test('_type', () => expect(_type(subscribr)).toEqual(Subscribr));
	// @ts-expect-error - Property 'type' does not exist on type 'Object'.
	test('Object.prototype.type()', () => expect(Object.isType(subscribr, Subscribr)).toEqual(true));
	test('Instance Of', () => expect(subscribr instanceof Subscribr).toEqual(true));
	test('Constructor Type', () => expect(subscribr.constructor).toEqual(Subscribr));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscribr)).toEqual('[object Subscribr]'));
});

describe('Subscription Object Creation', () => {
	const subscription = new Subscribr().subscribe('myEvent', vi.fn(function (event, data) {
		console.log(`Event: ${event.type} called with data: ${data}.`);
	}));

	test('Type Of', () => expect(typeof subscription).toEqual('object'));
	test('_type', () => expect(_type(subscription)).toEqual(Subscription));
	// @ts-expect-error - Property 'type' does not exist on type 'Object'.
	test('Object.prototype.type()', () => expect(Object.isType(subscription, Subscription)).toEqual(true));
	test('Instance Of', () => expect(subscription instanceof Subscription).toEqual(true));
	test('Constructor Type', () => expect(subscription.constructor).toEqual(Subscription));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscription)).toEqual('[object Subscription]'));
});

describe('ContextEventHandler Object Creation', () => {
	const contextEventHandler = new Subscribr().subscribe('myEvent', vi.fn(function (event, data) {
		console.log(`Event: ${event.type} called with data: ${data}.`);
	})).contextEventHandler;

	test('Type Of', () => expect(typeof contextEventHandler).toEqual('object'));
	test('_type', () => expect(_type(contextEventHandler)).toEqual(ContextEventHandler));
	// @ts-expect-error - Property 'type' does not exist on type 'Object'.
	test('Object.prototype.type()', () => expect(Object.isType(contextEventHandler, ContextEventHandler)).toEqual(true));
	test('Instance Of', () => expect(contextEventHandler instanceof ContextEventHandler).toEqual(true));
	test('Constructor Type', () => expect(contextEventHandler.constructor).toEqual(ContextEventHandler));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(contextEventHandler)).toEqual('[object ContextEventHandler]'));
});

describe('Subscribe', () => {
	const subscribr = new Subscribr();
	const myNewEvent = new CustomEvent('myNewEvent');

	const eventListener = vi.fn(function(event, data) {
		console.log(this);
		console.log(`Event: ${event.type} called with data: ${data}.`);
	});

	const subscription = subscribr.subscribe('myNewEvent', eventListener, {x: 'some value'});

	test('typeof', () => expect(typeof subscription).toEqual('object'));
	test('_type', () => expect(_type(subscription)).toEqual(Subscription));

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