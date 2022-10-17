export default class ContextEventHandler {
    /**
     *
     * @param {*} context The context to bind to the event handler.
     * @param {function(*): void} eventHandler The event handler to call when the event is published.
     */
    constructor(context: any, eventHandler: (arg0: any) => void);
    get context(): any;
    get eventHandler(): (arg0: any) => void;
    get [Symbol.toStringTag](): string;
    #private;
}
