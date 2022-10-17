export default class Subscription {
	#eventName;
	#contextEventHandler;
	#unsubscribe;

	/**
	 *
	 * @param {string} eventName
	 * @param {import('./context-event-handler.js').default} contextEventHandler
	 * @param {function(string, function(*): void): boolean} unsubscribe
	 */
	constructor(eventName, contextEventHandler, unsubscribe) {
		this.#eventName = eventName;
		this.#contextEventHandler = contextEventHandler;
		this.#unsubscribe = unsubscribe;
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
	 * Gets the context which will be bound to the event handler when it is called.
	 *
	 * @returns {*} The event handler context.
	 */
	get context() {
		return this.#contextEventHandler.context;
	}

	/**
	 * Gets the event handler for the subscription.
	 *
	 * @returns {function(*): void} The event handler.
	 */
	get eventHandler() {
		return this.#contextEventHandler.eventHandler;
	}

	/**
	 * Unsubscribes from the event.
	 *
	 * @returns {boolean} true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
	 */
	unsubscribe() {
		return this.#unsubscribe();
	}
}