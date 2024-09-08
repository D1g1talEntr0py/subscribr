import type { ContextEventListener } from './@types';

/** A wrapper for an event handler that binds a context to the event handler. */
export class ContextEventHandler {
	private readonly context: unknown;
	private readonly eventListener: ContextEventListener;

	/**
	 * @param {unknown} context The context to bind to the event handler.
	 * @param {ContextEventListener} eventListener The event handler to call when the event is published.
	 */
	constructor(context: unknown, eventListener: ContextEventListener) {
		this.context = context;
		this.eventListener = eventListener;
	}

	/**
	 * Call the event handler for the provided event.
	 *
	 * @param {Event} event The event to handle
	 * @param {unknown?} [data] The value to be passed to the event handler as a parameter.
	 */
	handle(event: Event, data?: unknown): void {
		this.eventListener.call(this.context, event, data);
	}

	/**
	 * A String value that is used in the creation of the default string
	 * description of an object. Called by the built-in method {@link Object.prototype.toString}.
	 *
	 * @returns {string} The default string description of this object.
	 */
	get [Symbol.toStringTag](): string {
		return 'ContextEventHandler';
	}
}