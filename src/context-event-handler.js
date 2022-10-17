export default class ContextEventHandler {
	#context;
	#eventHandler;

	/**
	 *
	 * @param {*} context The context to bind to the event handler.
	 * @param {function(*): void} eventHandler The event handler to call when the event is published.
	 */
	constructor(context, eventHandler) {
		this.#context = context;
		this.#eventHandler = eventHandler;
	}

	get context() {
		return this.#context;
	}

	get eventHandler() {
		return this.#eventHandler;
	}

	get [Symbol.toStringTag]() {
		return 'ContextEventHandler';
	}
}