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

provides: [MMap,MMap.Marker,MMap.Marker.Image,MMap.Marker.Images]
...
*/

var MMap = new Class({

	Implements: [Options],

	options: {
		"center": null,
		"zoom": 10,
		"mapType": "roadmap"
	},

	initialize: function(container, options) {
		this.container = container;
		this.setOptions(options);
		var latlng = this.options.center;
		this.map = new google.maps.Map(this.container, {
			"zoom": this.options.zoom,
			"center": new google.maps.LatLng(latlng.lat, latlng.lng),
			"mapTypeId": this.getType(this.options.mapType)
		});
	},

	getInstance: function() {
		return this.map;
	},

	getType: function(type) {
		var typeId = google.maps.MapTypeId.ROADMAP;
		switch (type) {
			case "hybrid": typeId = google.maps.MapTypeId.HYBRID; break;
			case "satellite": typeId = google.maps.MapTypeId.SATELLITE; break;
			case "terrain": typeId = google.maps.MapTypeId.TERRAIN; break;
			case "roadmap": typeId = google.maps.MapTypeId.ROADMAP; break;
		}
		return typeId;
	},

	getCenter: function() { return this.map.getCenter(); },
	setCenter: function(latlng) {
		var point = new google.maps.LatLng(latlng.lat, latlng.lng);
		this.map.setCenter(point);
	},
	setZoom: function(zoom) { this.map.setZoom(zoom); },
	getZoom: function() { return this.map.getZoom(); }

});
