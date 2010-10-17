/*
---
name: MMap.Utils

description: It comes to be able to treat Event and Options like Mootools.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Function
  - Core/Object
  - Core/Event
  - Core/Browser
  - Core/Class
  - Core/Element
  - Core/Element.Style
  - Core/Element.Event
  - Core/Element.Dimensions

provides: [MMap.Options, MMap.Events]

...
*/

(function($){

var MMap = (this.MMap || {});

MMap.Options = new Class({

	setOptions: function(options){
		this.options = (this.options || {});
		for (var key in options) {
			this.options[key] = options[key];
		}

		for (var key in this.options) {
			var value = this.options[key]; 
			if (key == 'map') {
				this.setMap(value);
			} else if (instanceOf(value, Function)) {
				this.addEvent(key, value);
			} else {
				this.set(key, value);
			}
			delete this.options[key];
		}
		delete this.options;
		return this;
	}

});

}(document.id));


(function($){

var MMap = (this.MMap || {});

var removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

MMap.Events = new Class({

	$events: {},
	$handles: {},

	addEvent: function(type, fn){
		var listener = null;
		var domEvents = MMap.Events.$domEvents;
		type = removeOn(type);
		if (domEvents.indexOf(type) > -1) {
			listener = google.maps.event.addDomListener(this.instance, type, fn);
		} else {
			listener = google.maps.event.addListener(this, type, fn);
		}
		this.$handles[type] = (this.$handles[type] || []).include(fn);
		this.$events[type] = (this.$events[type] || []).include(listener);
		return this;
	},

	addEvents: function(events){
		for (var key in events) {
			this.addEvent(key, events[key]);
		}
		return this;
	},

	removeEvent: function(type, fn){
		type = removeOn(type);
		var index = this.$handles[type].indexOf(fn);
		if (index > -1) {
			var target = this.$events[type][index];
			google.maps.event.removeListener(target);
			this.$events[type].erase(target);
			this.$handles[type].erase(fn);
		}
		return this;
	},

	removeEvents: function(events){
		if (!events) {
			google.maps.event.clearInstanceListeners(this);
			return this;
		} else if (typeOf(events) == 'object') {
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

	fireEvent: function(type, args){
		type = removeOn(type);
		var domEvents = MMap.Events.$domEvents;
		if (!this.$events[type]) return this;
		var target = (domEvents.indexOf(type) > -1) ? this.instance : this;
		google.maps.event.trigger(target, type, Array.from(args));
		return this;
	}

});
MMap.Events.$domEvents = ["mouseover", "mouseout", "mouseup", "mousedown", "click", "dblclick"];

}(document.id))