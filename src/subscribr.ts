import { SetMultiMap } from '@d1g1tal/collections/src';
import { ContextEventHandler } from './context-event-handler';
import { Subscription } from './subscription';
import type { EventHandler, ErrorHandler, SubscriptionOptions } from './@types';

/** A class that allows objects to subscribe to events and be notified when the event is published. */
export class Subscribr {
	private readonly subscribers: SetMultiMap<string, ContextEventHandler> = new SetMultiMap();
	private errorHandler?: ErrorHandler;

	/**
	 * Set a custom error handler for handling errors that occur in event listeners.
	 * If not set, errors will be logged to the console.
	 *
	 * @param errorHandler The error handler function to call when an error occurs in an event listener.
	 */
	setErrorHandler(errorHandler: ErrorHandler): void {
		this.errorHandler = errorHandler;
	}

	/**
	 * Subscribe to an event
	 *
	 * @param eventName The event name to subscribe to.
	 * @param eventHandler The event handler to call when the event is published.
	 * @param context The context to bind to the event handler.
	 * @param options Subscription options.
	 * @returns An object used to check if the subscription still exists and to unsubscribe from the event.
	 */
	subscribe(eventName: string, eventHandler: EventHandler, context: unknown = eventHandler, options?: SubscriptionOptions): Subscription {
		this.validateEventName(eventName);

		// If once option is set, wrap the handler to auto-unsubscribe
		if (options?.once) {
			const originalHandler = eventHandler;
			eventHandler = (event: Event, data?: unknown) => {
				originalHandler.call(context, event, data);
				this.unsubscribe(subscription);
			};
		}

		const contextEventHandler = new ContextEventHandler(context, eventHandler);
		this.subscribers.set(eventName, contextEventHandler);

		const subscription = new Subscription(eventName, contextEventHandler);

		return subscription;
	}

	/**
	 * Unsubscribe from the event
	 *
	 * @param subscription The subscription to unsubscribe.
	 * @returns true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
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
	 * @param eventName The name of the event.
	 * @param event The event to be handled.
	 * @param data The value to be passed to the event handler as a parameter.
	 */
	publish<T>(eventName: string, event: Event = new CustomEvent(eventName), data?: T): void {
		this.validateEventName(eventName);
		this.subscribers.get(eventName)?.forEach((contextEventHandler: ContextEventHandler) => {
			try {
				contextEventHandler.handle(event, data);
			} catch (error) {
				if (this.errorHandler) {
					this.errorHandler(error as Error, eventName, event, data);
				} else {
					console.error(`Error in event handler for '${eventName}':`, error);
				}
			}
		});
	}

	/**
	 * Check if the event and handler are subscribed.
	 *
	 * @param subscription The subscription object.
	 * @returns true if the event name and handler are subscribed, false otherwise.
	 */
	isSubscribed({ eventName, contextEventHandler }: Subscription): boolean {
		return this.subscribers.get(eventName)?.has(contextEventHandler) ?? false;
	}

	/**
	 * Validate the event name
	 *
	 * @param eventName The event name to validate.
	 * @throws {TypeError} If the event name is not a non-empty string.
	 * @throws {Error} If the event name has leading or trailing whitespace.
	 */
	private validateEventName(eventName: string): void {
		if (!eventName || typeof eventName !== 'string') {
			throw new TypeError('Event name must be a non-empty string');
		}

		if (eventName.trim() !== eventName) {
			throw new Error('Event name cannot have leading or trailing whitespace');
		}
	}

	/**
	 * Clears all subscriptions. The instance should not be used after calling this method.
	 */
	destroy(): void {
		this.subscribers.clear();
	}

	/**
	 * A String value that is used in the creation of the default string
	 * description of an object. Called by the built-in method {@link Object.prototype.toString}.
	 *
	 * @returns The default string description of this object.
	 */
	get [Symbol.toStringTag](): string {
		return 'Subscribr';
	}
}