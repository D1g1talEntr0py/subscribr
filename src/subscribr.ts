import { SetMultiMap } from '@d1g1tal/collections';
import { ContextEventHandler } from './context-event-handler';
import type { Subscription, SubscriptionOptions, PublishOptions, EventHandler, ErrorHandler, ContextAwareEventHandler } from './types';

const defaultErrorHandler: ErrorHandler = (error, eventName) => console.error(`Error in event handler for '${eventName}':`, error);

/** A class that allows objects to subscribe to events and be notified when the event is published. */
class Subscribr {
	readonly #subscribers = new SetMultiMap<string, ContextAwareEventHandler>();
	readonly #errorHandlers = new WeakMap<ContextAwareEventHandler, ErrorHandler>();

	/**
	 * Subscribe to an event
	 *
	 * @param eventName The event name to subscribe to.
	 * @param eventHandler The event handler to call when the event is published.
	 * @param options Subscription options.
	 * @param options.context The context to bind to the event handler. Defaults to the event handler itself if not provided.
	 * @param options.once If true, the subscription is removed before the handler is first invoked.
	 * @returns An object used to check if the subscription still exists and to unsubscribe from the event.
	 */
	subscribe(eventName: string, eventHandler: EventHandler, { context = eventHandler, once = false, errorHandler }: SubscriptionOptions = {}): Subscription {
		this.#validateEventName(eventName);

		// If once option is set, wrap the handler to auto-unsubscribe
		if (once) {
			const originalHandler = eventHandler;
			eventHandler = (event: Event, data?: unknown) => {
				this.unsubscribe(subscription);
				originalHandler.call(context, event, data);
			};
		}

		const contextEventHandler = new ContextEventHandler(context, eventHandler);

		if (errorHandler !== undefined) { this.#errorHandlers.set(contextEventHandler, errorHandler) }

		this.#subscribers.add(eventName, contextEventHandler);

		// Cannot inline subscription here because it is used in the closure above for the once option.
		const subscription = { eventName, contextEventHandler };

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
	 * Listeners are snapshotted at the start; additions wait for the next publish,
	 * and listeners removed before their turn are skipped.
	 *
	 * @template T
	 * @param eventName The name of the event.
	 * @param options Publish options.
	 * @param options.event The event to be handled. Defaults to a new `CustomEvent` named after the event.
	 * @param options.data The value to be passed to the event handler as a parameter.
	 * @param options.errorHandler Handles synchronous event handler errors when a subscription has no error handler.
	 */
	publish<T>(eventName: string, { event, data, errorHandler }: PublishOptions<T> = {}): void {
		this.#validateEventName(eventName);

		const contextEventHandlers = this.#subscribers.get(eventName);

		if (contextEventHandlers === undefined || contextEventHandlers.size === 0) { return }

		event ??= new CustomEvent(eventName);

		for (const contextEventHandler of [ ...contextEventHandlers ]) {
			// Skip this handler if it has been removed from the subscribers list before its turn.
			if (!this.#subscribers.hasValue(eventName, contextEventHandler)) { continue }

			try { contextEventHandler.dispatch(event, data) } catch (error) {
				const handlerError = error instanceof Error ? error : new Error('Event handler threw a non-Error value', { cause: error });

				(this.#errorHandlers.get(contextEventHandler) ?? errorHandler ?? defaultErrorHandler)(handlerError, eventName, event, data);
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
		return subscription == null || typeof subscription !== 'object' ? false : this.#subscribers.hasValue(subscription.eventName, subscription.contextEventHandler);
	}

	/**
	 * Validate the event name
	 *
	 * @param eventName The event name to validate.
	 * @throws {TypeError} If the event name is not a non-empty string.
	 * @throws {Error} If the event name has leading or trailing whitespace.
	 */
	#validateEventName(eventName: string) {
		if (!eventName || typeof eventName !== 'string') { throw new TypeError('Event name must be a non-empty string') }

		if (eventName.trim() !== eventName) { throw new Error('Event name cannot have leading or trailing whitespace') }
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

export { Subscribr, ContextEventHandler };
export type { Subscription, SubscriptionOptions, PublishOptions, EventHandler, ErrorHandler };