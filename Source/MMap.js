/*
---
description: Map using Google Maps Api Version 3. A comprehensible map can be displayed by using the custom marker.

license: MIT-style

authors:
- Noritaka Horio

requires:
  core/1.2.4:
  - Core/Core
  - Core/Browser
  - Native/Array
  - Native/Function
  - Native/Number
  - Native/String
  - Native/Hash
  - Native/Event
  - Class/Class
  - Class/Class.Extras
  - Element/Element
  - Element/Element.Event
  - Element/Element.Style
  - Element/Element.Dimensions
  - Utilities/Selecter
  - Utilities/DomReady
  - Fx/Fx
  - Fx/Fx.CSS
  - Fx/Fx.Tween
  - Fx/Fx.Transitions

more/1.2.4.4:
  - Tips

provides: [MMap,MMap.Marker,MMap.Marker.Image,MMap.Marker.Images,MMap.Window]
...
*/

var MMap = new Class({

	Implements: [Options],

	options: {
		center: null,
		zoom: 10,
		mapType: 'roadmap'
	},

	initialize: function(container, options){
		this.container = container;
		this.setOptions(options);
		var latlng = this.options.center;
		this.map = new google.maps.Map(this.container, {
			zoom: this.options.zoom,
			center: new google.maps.LatLng(latlng.lat, latlng.lng),
			mapTypeId: this.getType(this.options.mapType)
		});
	},

	getInstance: function(){
		return this.map;
	},

	getType: function(type){
		switch (type) {
			case 'hybrid':return google.maps.MapTypeId.HYBRID;
			case 'satellite': return google.maps.MapTypeId.SATELLITE;
			case 'terrain': return google.maps.MapTypeId.TERRAIN;
			case 'roadmap': return google.maps.MapTypeId.ROADMAP;
		}
		return google.maps.MapTypeId.ROADMAP;
	},

	getCenter: function(){
		return this.map.getCenter();
	},

	setCenter: function(latlng){
		this.map.setCenter(latlng);
	},

	setZoom: function(zoom){
		this.map.setZoom(zoom);
	},

	getZoom: function(){
		return this.map.getZoom();
	},

	/**
	 * var map = new MMap({arg}).loadJSON({marker options});
	 */
	loadJSON:function(markers){
		var map = this;
		markers.each(function(option, key) {
			var marker = null;
			//MMap.Marker.Image
			if (option.src) {
				marker = new MMap.Marker.Image(map, option);
			//MMap.Marker.Images
			} else if (option.images) {
				marker = new MMap.Marker.Images(map, option);
			//MMap.Marker
			} else {
				marker = new MMap.Marker(map, option);
			}
		});
		return this;
	}

});

MMap.Events = new Class({

	fireEvent: function(type, paramters){
		google.maps.event.trigger(this, type, paramters);
	},

	addEvent: function(type, handler){
		var eventType = Events.removeOn(type);
		var target = (this.getInstance) ? this.getInstance() : this;
		eventType = eventType.toLowerCase();
		google.maps.event.addListener(target, eventType, handler);
	},

	addEvents: function(handlers){
		for (var type in handlers) {
			this.addEvent(type, handlers[type]);
		}
	}
});
MMap.implement(new MMap.Events());

MMap.Overlay = {

	zIndex: {
		"marker":  900,
		"window": 1000
	},

	setZIndex: function(overlay, index){
		this.zIndex[overlay] = index;
	},

	getCurrent: function(overlay){
		return this.zIndex[overlay];
	},

	next: function(overlay){
		var zIndex = this.zIndex[overlay]++;
		return zIndex;
	}

};

MMap.Overlay.Collection = new Class({

	overlays: [],
	minIndex: 0,
	maxIndex: 0,

	add: function(overlay){
		this.overlays.push(overlay);
		this.minIndex = Math.min(this.minIndex, overlay.getZIndex());
		this.maxIndex = Math.max(this.maxIndex, overlay.getZIndex());
	},

	orderToFront: function(overlay){
		var zIndex = this.maxIndex;
		overlay.setZIndex(zIndex);
		var container = overlay.getContainer();
		container.addClass('active');
		this.overlays.each(function(target){
			zIndex--;
			if (target != overlay) {
				target.setZIndex(zIndex);
				var container = target.getContainer();
				container.removeClass('active');
			}
		});
	}

});

MMap.Overlay.Markers = new MMap.Overlay.Collection();
MMap.Overlay.Windows = new MMap.Overlay.Collection();