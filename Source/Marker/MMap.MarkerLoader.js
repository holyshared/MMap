/*
---
name: MMap.MarkerLoader

description: The loading of the marker can be done by using json and ajax(The response is json).

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Events
  - MMap/MMap
  - MMap/MMap.Options
  - MMap/MMap.Events

provides: [MMap.MarkerLoader, MMap.MarkerLoader.Parser, MMap.MarkerLoader.Context, MMap.MarkerLoader.JSON]

...
*/

(function(MMap){

MMap.MarkerLoader = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
		'format': 'array'
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

	load: function(context){
		var self = this;
		if (context) {
			if (Type.isArray(context)) {
				Object.merge(this.options, { 'markers' : context });
			} else {
				Object.merge(this.options, context);
			}
		}
		var format = this.options.format;
		var	loader = MMap.MarkerLoader.factory(format);

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
		loader.load(this.options);
	},

	build: function(context){
		var markers = [], length = context.length;
		for (var i = 0; i < length; i++) {
			var options = context[i];
			var type = options.type || 'html';
			type = (type == 'html') ? 'HTML' : type.capitalize();
			delete options.type;
			if (!MMap.Marker[type]) throw TypeError('Specified marker type "' + type + '" is not found.');
			var marker = new MMap.Marker[type](options);
			markers.push(marker);
		};
		return markers;
	}

});

MMap.MarkerLoader.factory = function(format){
	var loader = null;
	switch(format){
		case 'array':
			loader = new MMap.MarkerLoader.Context();
			break;
		//TODO Kml support 0.2.2
		case 'kml':
			break;
		case 'json':
		default:
			loader = new MMap.MarkerLoader.JSON();
			break;
	}
	return loader;
};


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
			this.fireEvent('complete', [context.markers]);
			var markers = this.parse(context.markers);
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

	getRequest: function(context){
		if (this.request) {
			this.request.setOptions(context);			
			return this.request;
		};
		var self = this;
		var events = ['_onRequest', '_onFailure', '_onSuccess'];
		this.request = new Request.JSON(context);
		events.each(function(type){
			var handler = self[type].bind(self);
			var eventType = type.replace('_', '');
			self.request.addEvent(eventType, handler);
			delete self[type];
		});
		return this.request;
	},

	load: function(context){
		this.getRequest(context).send();
	}

});

}(MMap));
