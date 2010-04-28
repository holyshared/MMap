MMap.Marker = new Class({

	Implements: [Options],

	options: {
		"className": "square",

		"latitude": -34.397,
		"longitude": 150.644,

		"latlng": null,
		"title": null,
		"url": null,
		"src": null
	},

	/**
	 * @id MMap.Marker.initialize
	 */
	initialize: function(map, options) {
		this.setOptions(options);
//		this.setLatLng(this.options.latlng);
		$extend(this, new google.maps.OverlayView());
		this.build();
		this.setMap(map.getMap());
	},

	/**
	 * @id MMap.Marker.build
	 */
	build: function() {
		this.container = new Element("div", {"class": "marker " + this.options.className});
		this.photo = new Element("p", {"class": "photo"});
		this.trriger = new Element("a", {"title": this.options.title, "href": this.options.src});
		this.image = new Element("img", {"src": this.options.src});
		this.image.inject(this.trriger);
		this.trriger.inject(this.photo);
		this.photo.inject(this.container);

		this.trriger.addEvent("click",		this.eventProxy.bind(this));
		this.trriger.addEvent("dblclick",	this.eventProxy.bind(this));
	},

	eventProxy: function(event) {
		event.stop();
		var e = new Event(event);
		google.maps.event.trigger(this, event.type, e);
	},	

	/**
	 * @id MMap.Marker.addEvent
	 */
	addEvent: function(type, handler) {
		google.maps.event.addListener(this, type, handler);
	},

	/**
	 * @id MMap.Marker.addEvents
	 */
	addEvents: function(handlers) {
		for (var type in handlers) {
			this.addEvent(type, handlers[type]);
		}
	},

	/**
	 * @id MMap.Marker.setImage
	 */
	setImage: function(image) { this.options.src = image; }, 

	/**
	 * @id MMap.Marker.getImage
	 */
	getImage: function() { return this.options.src; }, 

	/**
	 * @id MMap.Marker.setURL
	 */
	setURL: function(url) { this.options.url = url; }, 

	/**
	 * @id MMap.Marker.getURL
	 */
	getURL: function() { return this.options.url; }, 


	setLatLng: function(latlng) {
		this.options.latlng = latlng;
	},

	getLatLng: function() {
		return this.options.latlng;
	},

	/**
	 * @id MMap.Marker.draw
	 */
	draw: function() {
		var size = this.container.getSize();
		var projection = this.getProjection();
		var point = projection.fromLatLngToDivPixel(this.options.latlng);
		this.container.setStyles({
			"position": "absolute",
			"top": point.y - size.y,
			"left": point.x - (size.x / 2)
		});
	},

	onAdd: function() {
		var panes = this.getPanes();
		var panel = panes.overlayImage;
		this.container.inject(panel);
	},

	onRemove: function() {
		this.container.destory();
	}
	
});
