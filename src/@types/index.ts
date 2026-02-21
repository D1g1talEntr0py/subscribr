/** Context event listener function. */
type EventHandler = (event: Event, data?: unknown) => void;

/** Error handler function for handling errors in event listeners. */
type ErrorHandler = (error: Error, eventName: string, event: Event, data?: unknown) => void;

/** Subscription options. */
interface SubscriptionOptions {
	/** If true, the subscription will automatically unsubscribe after the first event. */
	once?: boolean;
}

export type { EventHandler, ErrorHandler, SubscriptionOptions };