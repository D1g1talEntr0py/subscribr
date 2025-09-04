import type { ContextEventHandler } from './context-event-handler';

/** Represents a subscription to an event. */
export class Subscription {
	private readonly _eventName: string;
	private readonly _contextEventHandler: ContextEventHandler;

	/**
	 * @param eventName The event name.
	 * @param contextEventHandler The context event handler.
	 */
	constructor(eventName: string, contextEventHandler: ContextEventHandler) {
		this._eventName = eventName;
		this._contextEventHandler = contextEventHandler;
	}

	/**
	 * Gets the event name for the subscription.
	 *
	 * @returns The event name.
	 */
	get eventName(): string {
		return this._eventName;
	}

	/**
	 * Gets the context event handler.
	 *
	 * @returns The context event handler
	 */
	get contextEventHandler(): ContextEventHandler {
		return this._contextEventHandler;
	}

	/**
	 * A String value that is used in the creation of the default string
	 * description of an object. Called by the built-in method {@link Object.prototype.toString}.
	 *
	 * @returns The default string description of this object.
	 */
	get [Symbol.toStringTag](): string {
		return 'Subscription';
	}
}