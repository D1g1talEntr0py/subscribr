export default class Subscribr {
    /**
     * Subscribe to an event
     *
     * @param {string} eventName The event name to subscribe to.
     * @param {function(*): void} eventHandler The event handler to call when the event is published.
     * @param {*} [context] The context to bind to the event handler.
     * @returns {Subscription} An object used to check if the subscription still exists and to unsubscribe from the event.
     */
    subscribe(eventName: string, eventHandler: (arg0: any) => void, context?: any): Subscription;
    /**
     * Publish an event
     *
     * @param {string} eventName The name of the event.
     * @param {*} [data] The value to be passed to the event handler as a parameter.
     */
    publish(eventName: string, data?: any): void;
    /**
     * Check if the event and handler are subscribed.
     *
     * @param {Subscription} subscription The subscription object.
     * @param {string} subscription.eventName The name of the event to check.
     * @param {function(*)} subscription.eventHandler The event handler to check.
     * @returns {boolean} true if the event name and handler are subscribed, false otherwise.
     */
    isSubscribed({ eventName, eventHandler: handler }: Subscription): boolean;
    get [Symbol.toStringTag](): string;
    #private;
}
import Subscription from "./subscription.js";
