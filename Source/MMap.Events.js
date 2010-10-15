(function($){

var MMap = (this.MMap || {});

var removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

MMap.Events = new Class({

	$events: {},

	addEvent: function(type, fn){
		var eventListener = null;
		var domEvents = MMap.Events.$domEvents;
		type = removeOn(type);
		if (domEvents.indexOf(type) > -1) {
			fn = google.maps.event.addDomListener(this, type, fn);
		} else {
			fn = google.maps.event.addListener(this, type, fn);
		}
		this.$events[type] = (this.$events[type] || []).include(fn);
	},

	addEvents: function(eventListners){
		for (var key in eventListners) {
			this.addEvent(key, eventListners[key]);
		}
	},

	removeEvent: function(type, fn){
		type = removeOn(type);
		if (this.$events[type].indexOf(fn) > -1) {
			var eventListener = this.$events[type];
			google.maps.event.removeListener(this, eventListener);
		}
	},

	removeEvents: function(events){
		if (!events) {
			google.maps.event.clearInstanceListeners(this);
			return this;
		}

		var type;
		if (typeOf(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		events = removeOn(events);
		for (type in this.$events){
			if (events && events != type) continue;
			var fns = this.$events[type];
			for (var i = fns.length; i--;) this.removeEvent(type, fns[i]);
		}
		return this;		
	},

	fireEvent: function(type, args, delay){
		type = removeOn(type);
		var events = this.$events[type];
		if (!events) return this;
		args = Array.from(args);
		events.each(function(fn){
			if (delay) fn.delay(delay, this, args);
			else fn.apply(this, args);
		}, this);
		return this;
	}

});
MMap.Events.$domEvents = ["mouseover", "mouseout", "mouseup", "mousedown", "click", "dblclick"];

}(document.id))