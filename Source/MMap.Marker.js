MMap.Marker = new Class({

	Implements: [Options],

	options: {
		"className": "square",
		"latlng": null,
		"title": null,
		"url": null,
		"src": null
	},

	proxyEvents: ["click", "mouseover", "mouseout", "mousedown", "mouseup"],

	/**
	 * @id MMap.Marker.initialize
	 */
	initialize: function(map, options) {
		this.setOptions(options);
		$extend(this, new google.maps.OverlayView());
		this.build();
		this.setupProxy();
		this.setMap(map.getInstance());
	},

	/**
	 * @id MMap.Marker.build
	 */
	build: function() {
		this.container = new Element("div", {"class": "marker " + this.options.className});
		this.photo = new Element("p", {"class": "photo"});
		this.trriger = new Element("a", {"title": this.options.title, "href": this.options.url});
		this.image = new Element("img", {"src": this.options.src});
		this.image.inject(this.trriger);
		this.trriger.inject(this.photo);
		this.photo.inject(this.container);
		new Tips(this.trriger);
	},

	setupProxy: function(event) {
		this.proxyEvents.each(function(eventType) {
			this.trriger.addEvent(eventType, this.eventProxy.bind(this));
		}, this);
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
		var eventType = Events.removeOn(type);
		eventType = eventType.toLowerCase();
		google.maps.event.addListener(this, eventType, handler);
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

	/**
	 * @id MMap.Marker.setPosition
	 */
	setPosition: function(latlng) {
		this.options.latlng = latlng;
	},

	/**
	 * @id MMap.Marker.getPosition
	 */
	getPosition: function() {
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
