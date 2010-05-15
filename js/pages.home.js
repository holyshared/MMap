(function() {

if (!Pages) var Pages = {};

Pages.Home = {

	"options": {
		"center": {"lat": 35.665326, "lng": 139.726325},
		"zoom": 15,
		"mapType": "roadmap"
	},

	initialize: function() {
		this.markers = [];
		this.events = [];
		this.setupInterface();
	},

	setupInterface: function() {
		this.map = new MMap($("map"), this.options);
		this.loadMarkers();
		this.thumbnailer = new Thumbnailer($("calendar"), {
			"onActive": this.onEventActive.bind(this)
		});
	},

	loadMarkers: function() {
		this.events = HCalendar.discover();
		this.events.each(function(event, key) {
			var image = "images/index/img_event" + (key + 1) + ".jpg";
			var geo = event.geo;
			var marker = new MMap.Marker.Image(this.map, {
				"latlng": {"lat": geo.latitude, "lng": geo.longitude},
				"title": event.summary + " - " + event.location,
				"url": event.url, "src": image,
				"onClick": this.onMarkerClick.bind(this, [marker])
			});
			this.markers.push(marker);
		}, this);
	},

	onEventActive: function(index, event) {
		var marker = this.markers[index];
		marker.orderToFront();
		this.map.setCenter(marker.getPosition());
	},

	onMarkerClick: function(marker) {
		marker.orderToFront();
		this.map.setCenter(marker.getPosition());
	}

};
window.addEvent("domready", Pages.Home.initialize.bind(Pages.Home));

}());