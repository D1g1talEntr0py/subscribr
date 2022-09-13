export default class Subscribr {
	/** @type {Map.<string, Array.<function(Event, Object)>>} */
  #subscribers;

  constructor() {
    this.#subscribers = new Map();
  }

	/**
	 * Subscribe to an event
	 *
	 * @memberOf Subscribr.prototype
	 * @param {string} eventType
	 * @param {function(Event, Object)} eventListener
	 * @return {{unsubscribe: function()}}
	 */
  subscribe(eventType, eventListener) {
		if (!this.#subscribers.has(eventType)) {
			this.#subscribers.set(eventType, []);
		}

		const subscribr = this;
		const index = this.#subscribers.get(eventType).push(eventListener) - 1;

		return {
			/**
			 * Unsubscribe from the event
			 */
			unsubscribe: () => subscribr.#subscribers.get(eventType).splice(index, 1)
		};
	}

	/**
	 * Publish an event
	 *
	 * @memberOf Subscribr.prototype
	 * @param {string} eventType
	 * @param {Event} [event]
	 * @param {Object} [data]
	 */
	publish(eventType, event, data) {
		if (!this.#subscribers.has(eventType)) {
			return;
		}

		this.#subscribers.get(eventType).forEach(function(eventListener) {
			eventListener.call(this, event, data);
		});
	}
}