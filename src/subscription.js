/** @typedef { import('./context-event-handler.js').default } ContextEventHandler */

export default class Subscription {
	#eventName;
	#contextEventHandler;

	/**
	 * @param {string} eventName The event name.
	 * @param {ContextEventHandler} contextEventHandler Then context event handler.
	 */
	constructor(eventName, contextEventHandler) {
		this.#eventName = eventName;
		this.#contextEventHandler = contextEventHandler;
	}

	/**
	 * Gets the event name for the subscription.
	 *
	 * @returns {string} The event name.
	 */
	get eventName() {
		return this.#eventName;
	}

	/**
	 * Gets the context event handler.
	 *
	 * @returns {ContextEventHandler} The context event handler
	 */
	get contextEventHandler() {
		return this.#contextEventHandler;
	}

	get [Symbol.toStringTag]() {
		return 'Subscription';
	}
}