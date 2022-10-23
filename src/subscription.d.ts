/** @typedef {import('./context-event-handler.js').default} ContextEventHandler */
export default class Subscription {
    /**
     * @param {string} eventName The event name.
     * @param {ContextEventHandler} contextEventHandler Then context event handler.
     */
    constructor(eventName: string, contextEventHandler: ContextEventHandler);
    /**
     * Gets the event name for the subscription.
     *
     * @returns {string} The event name.
     */
    get eventName(): string;
    /**
     * Gets the context event handler.
     *
     * @returns {ContextEventHandler} The context event handler
     */
    get contextEventHandler(): import("./context-event-handler.js").default;
    get [Symbol.toStringTag](): string;
    #private;
}
export type ContextEventHandler = import('./context-event-handler.js').default;
