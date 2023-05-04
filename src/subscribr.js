import SetMultiMap from '@d1g1tal/collections/set-multi-map.js';
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
	 * @param {function(Event, *): void} eventHandler The event handler to call when the event is published.
	 * @param {*} [context] The context to bind to the event handler.
	 * @returns {Subscription} An object used to check if the subscription still exists and to unsubscribe from the event.
	 */
	subscribe(eventName, eventHandler, context = eventHandler) {
		const contextEventHandler = new ContextEventHandler(context, eventHandler);
		this.#subscribers.set(eventName, contextEventHandler);

		return new Subscription(eventName, contextEventHandler);
	}

	/**
	 * Unsubscribe from the event
	 *
	 * @param {Subscription} subscription The subscription to unsubscribe.
	 * @param {string} subscription.eventName The event name to subscribe to.
	 * @param {ContextEventHandler} subscription.contextEventHandler The event handler to call when the event is published.
	 * @returns {boolean} true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
	 */
	unsubscribe({ eventName, contextEventHandler }) {
		const contextEventHandlers = this.#subscribers.get(eventName);
		const removed = contextEventHandlers?.delete(contextEventHandler);

		if (removed && contextEventHandlers.size == 0) {
			this.#subscribers.delete(eventName);
		}

		return removed;
	}

	/**
	 * Publish an event
	 *
	 * @param {string} eventName The name of the event.
	 * @param {Event} event The event to be handled.
	 * @param {*} [data] The value to be passed to the event handler as a parameter.
	 */
	publish(eventName, event = new CustomEvent(eventName), data) {
		if (data == null && !(event instanceof Event)) {
			// Swap the event and data parameters because only data was passed without an event object
			[data, event] = [event, new CustomEvent(eventName)];
		}
		this.#subscribers.get(eventName)?.forEach((contextEventHandler) => contextEventHandler.handle(event, data));
	}

	/**
	 * Check if the event and handler are subscribed.
	 *
	 * @param {Subscription} subscription The subscription object.
	 * @param {string} subscription.eventName The name of the event to check.
	 * @param {ContextEventHandler} subscription.contextEventHandler The event handler to check.
	 * @returns {boolean} true if the event name and handler are subscribed, false otherwise.
	 */
	isSubscribed({ eventName, contextEventHandler }) {
		return this.#subscribers.get(eventName)?.has(contextEventHandler);
	}

	get [Symbol.toStringTag]() {
		return 'Subscribr';
	}
}