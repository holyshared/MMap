var MMap = new Class({

	Implements: [Events, Options],

	"options": {
		"latitude": -34.397,
		"longitude": 150.644,
		"zoom": 10,
		"mapType": "roadmap"
	},

	initialize: function(container, options) {
		this.setOptions(options);
		this.container = container;
///		var latlng = new google.maps.LatLng(this.options.latitude, this.options.longitude);
		var map = new google.maps.Map(this.container, {
			"zoom": this.options.zoom,
			"center": new google.maps.LatLng(this.options.latitude, this.options.longitude),
			"mapTypeId": this.getType(this.options.mapType)
		});
		$extend(this, map);
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
	}
	
});
