import { _type } from '@d1g1tal/chrysalis';
import '@d1g1tal/chrysalis/ext/object-is-type.js';
import { describe, expect, jest, test } from '@jest/globals';
import ContextEventHandler from '../src/context-event-handler.js';
import Subscribr from '../src/subscribr.js';
import Subscription from '../src/subscription.js';

describe('Subscribr Object Creation', () => {
	const subscribr = new Subscribr();

	test('Type Of', () => expect(typeof subscribr).toEqual('object'));
	test('_type', () => expect(_type(subscribr)).toEqual(Subscribr));
	test('Object.prototype.type()', () => expect(Object.isType(subscribr, Subscribr)).toEqual(true));
	test('Instance Of', () => expect(subscribr instanceof Subscribr).toEqual(true));
	test('Constructor Type', () => expect(subscribr.constructor).toEqual(Subscribr));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscribr)).toEqual('[object Subscribr]'));
});

describe('Subscription Object Creation', () => {
	const subscription = new Subscribr().subscribe('myEvent', jest.fn(function (event, data) {
		console.log(`Event: ${event.type} called with data: ${data}.`);
	}));

	test('Type Of', () => expect(typeof subscription).toEqual('object'));
	test('_type', () => expect(_type(subscription)).toEqual(Subscription));
	test('Object.prototype.type()', () => expect(Object.isType(subscription, Subscription)).toEqual(true));
	test('Instance Of', () => expect(subscription instanceof Subscription).toEqual(true));
	test('Constructor Type', () => expect(subscription.constructor).toEqual(Subscription));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscription)).toEqual('[object Subscription]'));
});

describe('ContextEventHandler Object Creation', () => {
	const contextEventHandler = new Subscribr().subscribe('myEvent', jest.fn(function (event, data) {
		console.log(`Event: ${event.type} called with data: ${data}.`);
	})).contextEventHandler;

	test('Type Of', () => expect(typeof contextEventHandler).toEqual('object'));
	test('_type', () => expect(_type(contextEventHandler)).toEqual(ContextEventHandler));
	test('Object.prototype.type()', () => expect(Object.isType(contextEventHandler, ContextEventHandler)).toEqual(true));
	test('Instance Of', () => expect(contextEventHandler instanceof ContextEventHandler).toEqual(true));
	test('Constructor Type', () => expect(contextEventHandler.constructor).toEqual(ContextEventHandler));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(contextEventHandler)).toEqual('[object ContextEventHandler]'));
});

describe('Subscribe', () => {
	const subscribr = new Subscribr();
	const myNewEvent = new CustomEvent('myNewEvent');

	const eventListener = jest.fn(function(event, data) {
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

	test('Publish Data', () => {
		const data = { global: true, children: [] };
		subscribr.publish(myNewEvent.type, data);
		expect(eventListener).toHaveBeenCalledWith(myNewEvent, data);
	});
});

describe('Unsubscribe', () => {
	const eventListener = jest.fn((event) => console.log(`Event: ${event.type} called.`));
	const subscribr = new Subscribr();
	const subscription = subscribr.subscribe('myNewEvent', eventListener);

	test('Check Result', () => expect(subscribr.unsubscribe(subscription)).toEqual(true));
});

describe('Unsubscribe with Existing Subscriptions', () => {
	const eventListener = jest.fn((event) => console.log(`Event: ${event.type} called.`));
	const subscribr = new Subscribr();
	const subscription = subscribr.subscribe('myNewEvent', eventListener);
	const secondSubscription = subscribr.subscribe('myNewEvent', jest.fn((event) => console.log(`Second subscription Event: ${event.type} called.`)));

	test('Check Result', () => expect(subscribr.unsubscribe(subscription) && subscribr.unsubscribe(secondSubscription)).toEqual(true));
});

describe('isSubscribed', () => {
	const subscribr = new Subscribr();

	const subscription = subscribr.subscribe('myIsSubscribedEvent', (event) => console.log(`Event: ${event.type} called.`));

	test('Is Actually Subscribed', () => expect(subscribr.isSubscribed(subscription)).toEqual(true));
});