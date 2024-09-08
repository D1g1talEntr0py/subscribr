import { SetMultiMap } from '@d1g1tal/collections/src';
import { ContextEventHandler } from './context-event-handler';
import { Subscription } from './subscription';
import type { ContextEventListener } from './@types';

/**
 * A class that allows objects to subscribe to events and be notified when the event is published.
 *
 * @class
 * @exports Subscribr
 */
export class Subscribr {
	private readonly subscribers: SetMultiMap<string, ContextEventHandler>;

	constructor() {
		this.subscribers = new SetMultiMap();
	}

	/**
	 * Subscribe to an event
	 *
	 * @param {string} eventName The event name to subscribe to.
	 * @param {ContextEventListener} eventHandler The event handler to call when the event is published.
	 * @param {unknown} [context] The context to bind to the event handler.
	 * @returns {Subscription} An object used to check if the subscription still exists and to unsubscribe from the event.
	 */
	subscribe(eventName: string, eventHandler: ContextEventListener, context: unknown = eventHandler): Subscription {
		const contextEventHandler = new ContextEventHandler(context, eventHandler);
		this.subscribers.set(eventName, contextEventHandler);

		return new Subscription(eventName, contextEventHandler);
	}

	/**
	 * Unsubscribe from the event
	 *
	 * @param {Subscription} subscription The subscription to unsubscribe.
	 * @returns {boolean} true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
	 */
	unsubscribe({ eventName, contextEventHandler }: Subscription): boolean {
		const contextEventHandlers = this.subscribers.get(eventName) ?? new Set();
		const removed = contextEventHandlers.delete(contextEventHandler);

		if (removed && contextEventHandlers.size === 0) {	this.subscribers.delete(eventName) }

		return removed;
	}

	/**
	 * Publish an event
	 *
	 * @template T
	 * @param {string} eventName The name of the event.
	 * @param {Event} [event=new CustomEvent(eventName)] The event to be handled.
	 * @param {T} [data] The value to be passed to the event handler as a parameter.
	 */
	publish<T>(eventName: string, event: Event = new CustomEvent(eventName), data?: T): void {
		this.subscribers.get(eventName)?.forEach((contextEventHandler: ContextEventHandler) => contextEventHandler.handle(event, data));
	}

	/**
	 * Check if the event and handler are subscribed.
	 *
	 * @param {Subscription} subscription The subscription object.
	 * @returns {boolean} true if the event name and handler are subscribed, false otherwise.
	 */
	isSubscribed({ eventName, contextEventHandler }: Subscription): boolean {
		return this.subscribers.get(eventName)?.has(contextEventHandler) ?? false;
	}

	/**
	 * A String value that is used in the creation of the default string
	 * description of an object. Called by the built-in method {@link Object.prototype.toString}.
	 *
	 * @returns {string} The default string description of this object.
	 */
	get [Symbol.toStringTag](): string {
		return 'Subscribr';
	}
}