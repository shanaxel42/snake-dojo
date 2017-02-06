/**
 * Created by saxelrod on 12/5/16.
 */

function EventCenter() {
	this.EVENT_NAME_FOOD_ATE = "foodAte";

	this.eventListeners = { };

	this.fireEvent = function (eventName, obj) {
		if(!this.eventListeners[eventName]) {
			return;
		}

		for (var i = 0; i < this.eventListeners[eventName].length; i++) {
			var f = this.eventListeners[eventName][i];
			f(obj);
		}
	},

	this.listenToEvent = function (eventName, f) {
		if (!this.eventListeners[eventName]) {
			this.eventListeners[eventName] = [];
		}

		this.eventListeners[eventName].push(f);
	}
}

module.exports = {
	EventCenter : EventCenter
}
