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
		options = Object.append(this.options, options);
		for (var key in options) {
			var value = options[key]; 
			if (key == 'map') {
				this.setMap(value);
			} else if (instanceOf(value, Function)) {
				this.addEvent(key, value);
			} else {
				this.set(key, value);
			}
		}
		delete options;
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

var toNotifyFormat = function(string){
	var regex = /(Changed)$/;
	return string.replace(regex, '_$1').toLowerCase();
};

var toFormat = function(string){
	return toNotifyFormat(removeOn(string));
};

MMap.Events = new Class({

	_events: {},
	_handles: {},

	addEvent: function(type, fn){
		var listener = null;
		var domEvents = MMap.Events._domEvents;
		type = toFormat(type);
		if (domEvents.contains(type.toLowerCase())) {
			listener = google.maps.event.addDomListener(this.instance, type.toLowerCase(), fn.bind(this));
		} else {
			listener = google.maps.event.addListener(this, type, fn);
		}
		this._handles[type] = (this._handles[type] || []).include(fn);
		this._events[type] = (this._events[type] || []).include(listener);
		return this;
	},

	addEvents: function(events){
		for (var key in events) {
			this.addEvent(key, events[key]);
		}
		return this;
	},

	removeEvent: function(type, fn){
		type = toFormat(type);
		var find = this._handles[type].contains(fn);
		if (find) {
			var index = this._handles[type].indexOf(fn);
			var target = this._events[type][index];
			google.maps.event.removeListener(target);
			this._events[type].erase(target);
			this._handles[type].erase(fn);
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
		type = toFormat(type);
		for (type in this._events){
			if (events && events != type) continue;
			var fns = this._events[type];
			for (var i = fns.length; i--;) this.removeEvent(type, fns[i]);
		}
		return this;		
	},

	fireEvent: function(type, args){
		type = toFormat(type);
		var domEvents = MMap.Events._domEvents;
		if (!this._events[type]) return this;
		var target = (domEvents.contains(type.toLowerCase())) ? this.instance : this;
		google.maps.event.trigger(target, type, Array.from(args));
		return this;
	}

});
MMap.Events._domEvents = ["mouseover", "mouseout", "mouseup", "mousedown", "click", "dblclick"];

}(document.id))