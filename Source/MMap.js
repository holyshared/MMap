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
