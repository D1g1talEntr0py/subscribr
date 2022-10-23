export default class ContextEventHandler {
    /**
     * @param {*} context The context to bind to the event handler.
     * @param {function(*): void} eventHandler The event handler to call when the event is published.
     */
    constructor(context: any, eventHandler: (arg0: any) => void);
    /**
     * Call the event handler for the provided event.
     *
     * @param {Event} event The event to handle
     * @param {*} [data] The value to be passed to the event handler as a parameter.
     */
    handle(event: Event, data?: any): void;
    /**
     * Get the event handler
     *
     * @returns {function(*)} The event handler
     */
    get eventHandler(): (arg0: any) => any;
    get [Symbol.toStringTag](): string;
    #private;
}
