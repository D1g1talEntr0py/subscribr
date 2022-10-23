export default class ContextEventHandler {
	#context;
	#eventHandler;

	/**
	 * @param {*} context The context to bind to the event handler.
	 * @param {function(*): void} eventHandler The event handler to call when the event is published.
	 */
	constructor(context, eventHandler) {
		this.#context = context;
		this.#eventHandler = eventHandler;
	}

	/**
	 * Call the event handler for the provided event.
	 *
	 * @param {Event} event The event to handle
	 * @param {*} [data] The value to be passed to the event handler as a parameter.
	 */
	handle(event, data) {
		this.#eventHandler.call(this.#context, event, data);
	}

	get [Symbol.toStringTag]() {
		return 'ContextEventHandler';
	}
}