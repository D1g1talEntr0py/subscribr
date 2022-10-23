export default class Subscribr {
    /**
     * Subscribe to an event
     *
     * @param {string} eventName The event name to subscribe to.
     * @param {function(Event, *): void} eventHandler The event handler to call when the event is published.
     * @param {*} [context] The context to bind to the event handler.
     * @returns {Subscription} An object used to check if the subscription still exists and to unsubscribe from the event.
     */
    subscribe(eventName: string, eventHandler: (arg0: Event, arg1: any) => void, context?: any): Subscription;
    /**
     * Unsubscribe from the event
     *
     * @param {Subscription} subscription The subscription to unsubscribe.
     * @param {string} subscription.eventName The event name to subscribe to.
     * @param {ContextEventHandler} subscription.contextEventHandler The event handler to call when the event is published.
     * @returns {boolean} true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
     */
    unsubscribe({ eventName, contextEventHandler }: Subscription): boolean;
    /**
     * Publish an event
     *
     * @param {string} eventName The name of the event.
     * @param {Event} event The event to be handled.
     * @param {*} [data] The value to be passed to the event handler as a parameter.
     */
    publish(eventName: string, event?: Event, data?: any): void;
    /**
     * Check if the event and handler are subscribed.
     *
     * @param {Subscription} subscription The subscription object.
     * @param {string} subscription.eventName The name of the event to check.
     * @param {ContextEventHandler} subscription.contextEventHandler The event handler to check.
     * @returns {boolean} true if the event name and handler are subscribed, false otherwise.
     */
    isSubscribed({ eventName, contextEventHandler }: Subscription): boolean;
    get [Symbol.toStringTag](): string;
    #private;
}
import Subscription from "./subscription.js";
