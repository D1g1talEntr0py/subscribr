import { _type } from '@d1g1tal/chrysalis';
import '@d1g1tal/chrysalis/ext/object-is-type.js';
import { describe, expect, jest, test } from '@jest/globals';
import Subscribr from '../src/subscribr.js';
import Subscription from '../src/subscription.js';

describe('Object Creation', () => {
	const subscribr = new Subscribr();

	test('Type Of', () => expect(typeof subscribr).toEqual('object'));
	test('_type', () => expect(_type(subscribr)).toEqual(Subscribr));
	test('Object.prototype.type()', () => expect(Object.isType(subscribr, Subscribr)).toEqual(true));
	test('Instance Of', () => expect(subscribr instanceof Subscribr).toEqual(true));
	test('Constructor Type', () => expect(subscribr.constructor).toEqual(Subscribr));
	test('Object.prototype.toString', () => expect(Object.prototype.toString.call(subscribr)).toEqual('[object Subscribr]'));
});

describe('Subscribe', () => {
	const subscribr = new Subscribr();

	const eventListener = jest.fn(function(event) {
		console.log(`Event: ${event.type} called.`);
	});

	const subscription = subscribr.subscribe('myNewEvent', eventListener);

	test('typeof', () => expect(typeof subscription).toEqual('object'));
	test('_type', () => expect(_type(subscription)).toEqual(Subscription));

	test('Publish', () => {
		subscribr.publish('myNewEvent', new Event('myNewEvent'));
		expect(eventListener).toHaveBeenCalled();
	});
});

describe('Unsubscribe', () => {
	const eventListener = jest.fn((event) => console.log(`Event: ${event.type} called.`));
	const subscription = new Subscribr().subscribe('myNewEvent', eventListener);

	test('Check Result', () => expect(subscription.unsubscribe()).toEqual(true));
});

describe('isSubscribed', () => {
	const subscribr = new Subscribr();

	const eventName = 'myIsSubscribedEvent';
	const eventHandler = (event) => console.log(`Event: ${event.type} called.`);
	const subscription = subscribr.subscribe(eventName, eventHandler);

	test('Is Actually Subscribed', () => expect(subscribr.isSubscribed(subscription)).toEqual(true));
});