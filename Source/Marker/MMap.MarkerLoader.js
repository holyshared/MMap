/*
---
name: MMap.MarkerLoader

description: The loading of the marker can be done by using json and ajax(The response is json).

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
  - MMap/MMap.Core
  - MMap/MMap.OverlayView
  - MMap/MMap.Utils
  - MMap/MMap.Marker

provides: [MMap.MarkerLoader, MMap.MarkerLoader.Parser, MMap.MarkerLoader.Context, MMap.MarkerLoader.JSON]

...
*/

(function($){

var MMap = (this.MMap || {});

MMap.MarkerLoader = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
/*
		onPreload: $empty,
		onFailure: $empty,
		onComplete: $empty,
		onLoad: $empty
*/
	},

	initialize: function(options){
		this.setOptions(options);
	},

	load: function(){
		var self = this;
		var args = Array.from(arguments);
		var loader = (Type.isArray(args[0]))
		? new MMap.MarkerLoader.Context() : new MMap.MarkerLoader.JSON();
		loader.addEvents({
			'onPreload': function(){
				self.fireEvent('preload');
			},
			'onFailure': function(){
				var args = Array.from(arguments);
				self.fireEvent('failure', args);
			},
			'onComplete': function(response){
				self.fireEvent('complete', [response]);
			},
			'onLoad': function(markers){
				self.fireEvent('load', [self.build(markers)]);
			}
		});
		loader.load.apply(loader, args);
	},

	build: function(context){
		var markers = [], length = context.length;
		for (var i = 0; i < length; i++) {
			var options = context[i];
			var type = options.type || 'html';
			type = type.capitalize();
			delete options.type;
			if (!MMap.Marker[type]) throw TypeError('Specified marker type "' + type + '" is not found.');
			var marker = new MMap.Marker[type](options);
			markers.push(marker);
		};
		return markers;
	}

});


MMap.MarkerLoader.Parser = new Class({

	Implements: [Events],

	parse: function(markers){
		var result = [];
		var l = markers.length;
		for (var i = 0; i < l; i++){
			var marker = markers[i];
			var latlng = marker.position;
			delete marker.position;
			marker.position = new google.maps.LatLng(latlng.latitude, latlng.longitude);
			result.push(marker);
		}
		return result;
	}

});

MMap.MarkerLoader.Context = new Class({

	Extends: MMap.MarkerLoader.Parser,

	load: function(context){
		this.fireEvent('preload');
		try {
			this.fireEvent('complete', [context]);
			var markers = this.parse(context);
			this.fireEvent('load', [markers]);
		} catch (error) {
			this.fireEvent('failure', [error]);
		}
	}

});

MMap.MarkerLoader.JSON = new Class({

	Extends: MMap.MarkerLoader.Parser,

	_onRequest: function(){
		this.fireEvent('preload');
	},

	_onFailure: function(xhr){
		this.fireEvent('failure', [xhr]);
	},

	_onSuccess: function(json, text){
		this.fireEvent('complete', [json]);
		var markers = json.markers;
		var l = markers.length;
		var response = this.parse(markers);
		this.fireEvent('load', [response]);
	},

	getRequest: function(json){
		if (this.request) return this.request;
		var self = this;
		var events = ['_onRequest', '_onFailure', '_onSuccess'];
		this.request = new Request.JSON({ url: json, method: 'post' });
		events.each(function(type){
			var handler = self[type].bind(self);
			var eventType = type.replace('_', '');
			self.request.addEvent(eventType, handler);
			delete self[type];
		});
		return this.request;
	},

	load: function(){
		var args = Array.from(arguments);
		this.getRequest(args.shift()).send(args);
	}

});

}(document.id));
