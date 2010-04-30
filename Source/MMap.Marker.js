MMap.Marker = new Class({

	Implements: [Options],

	options: {
		"className": "html",
		"latlng": null,
		"title": null,
		"url": null,
		"content": null
	},

	proxyEvents: ["click", "mouseover", "mouseout", "mousedown", "mouseup"],

	/**
	 * @id MMap.Marker.initialize
	 */
	initialize: function(map, options) {
		this.setOptions(options);
		$extend(this, new google.maps.OverlayView());
		this.container = new Element("div", {"class": "marker " + this.options.className});
		this.body = new Element("div", {"class": "body"});
		this.body.inject(this.container);
		this.build();
		this.setupProxy();
		this.setMap(map.getInstance());
	},

	/**
	 * @id MMap.Marker.build
	 */
	build: function() {
		this.header = new Element("div", {"class": "header"});
		this.footer = new Element("div", {"class": "footer"});
		this.header.inject(this.body, "before");
		this.footer.inject(this.body, "after");
		this.trigger = this.container;
		this.setContent(this.options.content);
	},

	setupProxy: function(event) {
		this.proxyEvents.each(function(eventType) {
			this.trigger.addEvent(eventType, this.eventProxy.bind(this));
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

	setContent: function(content) {
		if (!content) return false;
		this.content = content;
		this.body.set("html", "");
		($type(this.content) == "string")
		? this.body.set("html", this.content)
		: this.content.inject(this.body);
	},

	getContent: function() { return this.content; },

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
		var position = this.options.latlng;
		var latlng = new google.maps.LatLng(position.lat, position.lng)
		var point = projection.fromLatLngToDivPixel(latlng);
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
