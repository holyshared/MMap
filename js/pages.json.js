(function() {

if (!Pages) var Pages = {};

Pages.JSON = {

	"options": {
		"center": {"lat": 35.665326, "lng": 139.726325},
		"zoom": 12,
		"mapType": "roadmap"
	},

	"markers": [
		{
			"latlng": {"lat": 35.665326, "lng": 139.726325}, "title": null,
			"content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		},
		{
			"latlng": {"lat": 35.621822, "lng": 139.735863},
			"title": "Tokyo ART Center",
			"url": "http://holyshared.github.com/MMap/",
			"src": "http://holyshared.github.com/MMap/images/index/img_event1.jpg"
		},
		{
			"latlng": {"lat": 35.682951, "lng": 139.686895},
			"images": [
{"title": "Tokyo ART Center", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event2.jpg"},
{"title": "Tokyo ART Center", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event3.jpg"},
{"title": "Tokyo ART Center", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event4.jpg"},
{"title": "Tokyo ART Center", "url": "http://holyshared.github.com/MMap/", "src": "http://holyshared.github.com/MMap/images/index/img_event5.jpg"}
			],
			"interval": 1000
		}
	],

	initialize: function() {
		this.current = 0;
		this.setupInterface();
	},

	setupInterface: function() {
		this.map = new MMap($("map"), this.options);
		this.map.loadJSON(this.markers);
	}

};
window.addEvent("domready", Pages.JSON.initialize.bind(Pages.JSON));

}());