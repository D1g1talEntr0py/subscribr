interface ContextAwareEventHandler {
	/** The actual event handler function. */
	handle(event: Event, data?: unknown): void;
}

/** Context event listener function. */
type EventHandler = ContextAwareEventHandler['handle'];

/** Error handler function for handling errors in event listeners. */
type ErrorHandler = (error: Error, eventName: string, event: Event, data?: unknown) => void;

type Subscription = {
	eventName: string,
	contextEventHandler: ContextAwareEventHandler
};

/** Subscription options. */
type SubscriptionOptions = {
	/** If true, the subscription will automatically unsubscribe after the first event. */
	once?: boolean
};

export type { EventHandler, ErrorHandler, SubscriptionOptions, Subscription, ContextAwareEventHandler };