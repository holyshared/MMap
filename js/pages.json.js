(function() {

	var onMarkerClick = function(event) {
		this.orderToFront();
		this.map.setCenter(this.getPosition());
	};

	var markers = [
		{
			"latlng": {"lat": 35.665326, "lng": 139.726325}, "title": "aaaaaaaaaaaa",
			"content": "<p>Some text Some text Some text Some text<br />Some text Some text Some text Some text</p><p>Some text Some text Some text Some text<br />Some text Some text Some text Some text</p>",
			"onClick": onMarkerClick
		},
		{
			"latlng": {"lat": 35.621822, "lng": 139.735863},
			"title": "Tokyo ART Center",
			"url": "http://holyshared.github.com/MMap/",
			"src": "http://holyshared.github.com/MMap/images/index/img_event1.jpg",
			"onClick": onMarkerClick
		},
		{
			"latlng": {"lat": 35.682951, "lng": 139.686895},
			"images": [
				{"title": "Tokyo ART Center1", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event2.jpg"},
				{"title": "Tokyo ART Center2", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event3.jpg"},
				{"title": "Tokyo ART Center3", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event4.jpg"},
				{"title": "Tokyo ART Center4", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event5.jpg"}
			],
			"interval": 1000,
			"onClick": onMarkerClick
		}
	];

if (!Pages) var Pages = {};

Pages.JSON = {

	"options": {
		"center": {"lat": 35.665326, "lng": 139.726325},
		"zoom": 13,
		"mapType": "roadmap"
	},

	initialize: function(markers) {
		this.current = 0;
		this.markers = markers;
		this.setupInterface();
	},

	setupInterface: function() {
		this.map = new MMap($("map"), this.options);
		this.map.loadJSON(this.markers);
	}

};
window.addEvent("domready", Pages.JSON.initialize.bind(Pages.JSON, [markers]));

}());