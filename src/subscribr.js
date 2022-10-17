import { SetMultiMap } from '@d1g1tal/collections';
import ContextEventHandler from './context-event-handler.js';
import Subscription from './subscription.js';

export default class Subscribr {
	/** @type {SetMultiMap<string, ContextEventHandler>} */
	#subscribers;

	constructor() {
		this.#subscribers = new SetMultiMap();
	}

	/**
	 * Subscribe to an event
	 *
	 * @param {string} eventName The event name to subscribe to.
	 * @param {function(*): void} eventHandler The event handler to call when the event is published.
	 * @param {*} [context] The context to bind to the event handler.
	 * @returns {Subscription} An object used to check if the subscription still exists and to unsubscribe from the event.
	 */
	subscribe(eventName, eventHandler, context) {
		const contextEventHandler = new ContextEventHandler(context, eventHandler);
		this.#subscribers.set(eventName, contextEventHandler);

		return new Subscription(eventName, contextEventHandler, () => this.#unsubscribe(eventName, contextEventHandler));
	}

	/**
	 * Publish an event
	 *
	 * @param {string} eventName The name of the event.
	 * @param {*} [data] The value to be passed to the event handler as a parameter.
	 */
	publish(eventName, data) {
		this.#subscribers.get(eventName)?.forEach(({context, eventHandler}) => eventHandler.call(context, data));
	}

	/**
	 * Check if the event and handler are subscribed.
	 *
	 * @param {Subscription} subscription The subscription object.
	 * @param {string} subscription.eventName The name of the event to check.
	 * @param {function(*)} subscription.eventHandler The event handler to check.
	 * @returns {boolean} true if the event name and handler are subscribed, false otherwise.
	 */
	isSubscribed({ eventName, eventHandler: handler}) {
		return Array.from(this.#subscribers.get(eventName))?.some(({ eventHandler }) => eventHandler === handler);
	}

	get [Symbol.toStringTag]() {
		return 'Subscribr';
	}

	/**
	 * Unsubscribe from the event
	 *
	 * @param {string} eventName The event name to subscribe to.
	 * @param {ContextEventHandler} contextEventHandler The event handler to call when the event is published.
	 * @returns {boolean} true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
	 */
	#unsubscribe(eventName, contextEventHandler) {
		const contextEventHandlers = this.#subscribers.get(eventName);
		const removed = contextEventHandlers?.delete(contextEventHandler);

		if (removed && contextEventHandlers.size == 0) {
			this.#subscribers.delete(eventName);
		}

		return removed;
	}
}