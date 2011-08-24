/*
---
name: MMap.Utils

description: It comes to be able to treat Event and Options like Mootools.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Object
  - Core/Class
  - MMap/MMap

provides: [MMap.Options, MMap.Events]

...
*/

(function(MMap){

MMap.Options = new Class({

	setOptions: function(options){
		var clone = Object.clone(this.options);
		options = Object.append(clone, options);
		for (var key in options) {
			var value = options[key]; 
			if (key == 'map') {
				this.setMap(value);
				delete options[key];
			} else if (instanceOf(value, Function) && (/^on[A-Z]/).test(key)) {
				this.addEvent(key, value);
				delete options[key];
			}
		}
		this.options = options;
		return this;
	}

});

}(MMap));


(function(MMap, observer){

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
		type = toFormat(type);
		listener = observer.addListener(this, type, fn);
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
			observer.removeListener(target);
			this._events[type].erase(target);
			this._handles[type].erase(fn);
		}
		return this;
	},

	removeEvents: function(events){
		if (!events) {
			observer.clearInstanceListeners(this);
			return this;
		} else if (typeOf(events) == 'object') {
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		for (type in this._events){
			if (events && events != type) continue;
			var fns = this._events[type];
			for (var i = fns.length; i--;) this.removeEvent(type, fns[i]);
		}
		return this;
	},

	fireEvent: function(type, args){
		type = toFormat(type);
		if (!this._events[type]) return this;
		var callArguments = [this, type];
		if (Type.isArray(args)) {
			var l = args.length;
			for (var i = 0; i < l; i++) {
				callArguments.push(args[i]);
			}
		} else {
			callArguments.push(args);
		}
		observer.trigger.apply(this, callArguments);
		return this;
	}

});

}(MMap, google.maps.event));