export interface ContextAwareEventHandler {
	/** Dispatch the event to the bound event handler with the provided context. */
	dispatch(event: Event, data?: unknown): void;
}

/** Context event handler function. */
export type EventHandler = ContextAwareEventHandler['dispatch'];

/** Error handler function for handling errors in event listeners. */
export type ErrorHandler = (error: Error, eventName: string, event: Event, data?: unknown) => void;

/** Represents a subscription to an event with a context-aware event handler. */
export type Subscription = {
	eventName: string,
	contextEventHandler: ContextAwareEventHandler
};

/** Subscription options. */
export type SubscriptionOptions = {
	/** The context to bind to the event handler. Defaults to the event handler itself. */
	context?: unknown,
	/** If true, the subscription will automatically unsubscribe after the first event. Defaults to false. */
	once?: boolean,
	/** Handles synchronous errors thrown by this subscription's event handler. */
	errorHandler?: ErrorHandler
};

/** Publish options. */
export type PublishOptions<T> = {
	/** The event to be handled. Defaults to a new `CustomEvent` named after the event. */
	event?: Event,
	/** The value to be passed to the event handler as a parameter. */
	data?: T,
	/** Handles synchronous event handler errors for this publish when the subscription has no error handler. */
	errorHandler?: ErrorHandler
};