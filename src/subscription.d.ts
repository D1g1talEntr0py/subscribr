export default class Subscription {
    /**
     *
     * @param {string} eventName
     * @param {import('./context-event-handler.js').default} contextEventHandler
     * @param {function(string, function(*): void): boolean} unsubscribe
     */
    constructor(eventName: string, contextEventHandler: import('./context-event-handler.js').default, unsubscribe: (arg0: string, arg1: (arg0: any) => void) => boolean);
    /**
     * Gets the event name for the subscription.
     *
     * @returns {string} The event name.
     */
    get eventName(): string;
    /**
     * Gets the context which will be bound to the event handler when it is called.
     *
     * @returns {*} The event handler context.
     */
    get context(): any;
    /**
     * Gets the event handler for the subscription.
     *
     * @returns {function(*): void} The event handler.
     */
    get eventHandler(): (arg0: any) => void;
    /**
     * Unsubscribes from the event.
     *
     * @returns {boolean} true if eventListener has been removed successfully. false if the value is not found or if the value is not an object.
     */
    unsubscribe(): boolean;
    #private;
}
