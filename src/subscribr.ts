import { SetMultiMap } from '@d1g1tal/collections/set-multi-map';
import { ContextEventHandler } from './context-event-handler';
import type { Subscription, SubscriptionOptions, EventHandler, ErrorHandler, ContextAwareEventHandler } from './@types';

/** A class that allows objects to subscribe to events and be notified when the event is published. */
export class Subscribr {
	#errorHandler?: ErrorHandler;
	readonly #subscribers: SetMultiMap<string, ContextAwareEventHandler> = new SetMultiMap();

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
		this.#validateEventName(eventName);

		// If once option is set, wrap the handler to auto-unsubscribe
		if (options?.once) {
			const originalHandler = eventHandler;
			eventHandler = (event: Event, data?: unknown) => {
				this.unsubscribe(subscription);
				originalHandler.call(context, event, data);
			};
		}

		const contextEventHandler = new ContextEventHandler(context, eventHandler);
		const subscription = { eventName, contextEventHandler };

		this.#subscribers.add(eventName, contextEventHandler);

		return subscription;
	}

	/**
	 * Unsubscribe from the event
	 *
	 * @param subscription The subscription to unsubscribe.
	 * @returns true if eventListener has been removed successfully. false if the value is invalid or not found.
	 */
	unsubscribe(subscription: Subscription): boolean {
		if (subscription === null || typeof subscription !== 'object') { return false }

		return this.#subscribers.deleteValue(subscription.eventName, subscription.contextEventHandler);
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
		this.#validateEventName(eventName);

		const contextEventHandlers = this.#subscribers.get(eventName);

		if (contextEventHandlers === undefined || contextEventHandlers.size === 0) { return }

		for (const contextEventHandler of contextEventHandlers) {
			try {
				contextEventHandler.handle(event, data);
			} catch (error) {
				if (this.#errorHandler !== undefined) {
					this.#errorHandler(error as Error, eventName, event, data);
				} else {
					console.error(`Error in event handler for '${eventName}':`, error);
				}
			}
		}
	}

	/**
	 * Check if the event and handler are subscribed.
	 *
	 * @param subscription The subscription object.
	 * @returns true if the event name and handler are subscribed, false otherwise.
	 */
	isSubscribed(subscription: Subscription): boolean {
		if (subscription === null || typeof subscription !== 'object') { return false }

		return this.#subscribers.hasValue(subscription.eventName, subscription.contextEventHandler);
	}

	/**
	 * Set a custom error handler for handling errors that occur in event listeners.
	 * If not set, errors will be logged to the console.
	 *
	 * @param errorHandler The error handler function to call when an error occurs in an event listener.
	 */
	setErrorHandler(errorHandler: ErrorHandler): void {
		this.#errorHandler = errorHandler;
	}

	/**
	 * Validate the event name
	 *
	 * @param eventName The event name to validate.
	 * @throws {TypeError} If the event name is not a non-empty string.
	 * @throws {Error} If the event name has leading or trailing whitespace.
	 */
	#validateEventName(eventName: string) {
		if (!eventName || typeof eventName !== 'string') {
			throw new TypeError('Event name must be a non-empty string');
		}

		if (eventName.trim() !== eventName) {
			throw new Error('Event name cannot have leading or trailing whitespace');
		}
	}

	/** Clears all subscriptions. The instance should not be used after calling this method. */
	destroy(): void {
		this.#subscribers.clear();
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

export { ContextEventHandler } from './context-event-handler';
export type { Subscription, EventHandler } from './@types';