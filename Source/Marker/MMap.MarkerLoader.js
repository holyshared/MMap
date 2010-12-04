/*
---
name: MMap.MarkerLoader

description: 

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
  - MMap/MMap.Utils
  - MMap/MMap.Marker

provides: [MMap.MarkerLoader, MMap.MarkerLoader.Context, MMap.MarkerLoader.JSON]

...
*/

(function($){

var MMap = (this.MMap || {});

MMap.MarkerLoader = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
	},

	initialize: function(options){
		this.setOptions(options);
	},

	load: function(){
		var args = Array.from(arguments);
		var loader = (Type.isArray(args[0]))
		? MMap.MarkerLoader.Context() : MMap.MarkerLoader.JSON();
		loader.load.apply(this, args);
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

MMap.MarkerLoader.Context = function(){
	return {
		load: function(context){
			this.fireEvent('preload');
			try {
				var markers = this.build(context);
				this.fireEvent('load', markers);
			} catch (error) {
				this.fireEvent('failure', error);
			}
		}
	};
};

MMap.MarkerLoader.JSON = function(){
	return {
		load: function(url){
			var request = new Request.JSON({
				"url": url,
				"method": "post",
				"onRequest": function() { this.fireEvent('preload'); },
				"onFailure": function(xhr) { this.fireEvent('failure', xhr); },
				"onSuccess": function(responseJSON, responseText) {
					this.fireEvent('load', this.build(responseJSON));
				}
			});
			request.send();
		}
	};
};

}(document.id));
