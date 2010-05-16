(function() {

if (!Pages) var Pages = {};

Pages.Home = {

	"options": {
		"center": {"lat": 35.665326, "lng": 139.726325},
		"zoom": 12,
		"mapType": "roadmap"
	},

	initialize: function() {
		this.current = 0;
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
				"url": event.url, "src": image
			});
			marker.addEvent("click", this.onMarkerClick.bind(this, [marker]));

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
		var index = this.markers.indexOf(marker);
		this.current = index;

		this.map.setCenter(marker.getPosition());
		this.thumbnailer.set(index);

		var event = this.getEvent(this.current);
		var window = this.getWindow();
		window.setTitle(event.title);
		window.setContent(event.content);
		window.open(this.map, marker);
	},

	getWindow: function() {
		if (!this.window) {
			this.window = new MMap.Window({
				"onClose": function() {
					this.window = null;
				}.bind(this)
			});
		}
		return this.window;
	},

	getEvent: function(index) {
		var event = this.events[index];
		var geo = event.geo;
		var content = "";
		content += "<h3><a title='" + event.summary +"'href='" + event.url +"'>" + event.summary + "</a></h3>";
		content += "<p>start: " + event.dtstart + "<br />end: " + event.dtend + "<br />";
		content += event.location + "<br />";
		content += geo.latitude + ", " + geo.longitude + "</p>";
		content += "<p>" + "<a title='" + event.summary +"'href='" + event.url +"'>" + event.url + "</a></p>";
		return {"title": event.summary, "content": content};
	}

};
window.addEvent("domready", Pages.Home.initialize.bind(Pages.Home));

}());