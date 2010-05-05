MMap.Overlay = {
	zIndex: 900,

	setZIndex: function(index) {
		this.zIndex = index;
	},

	getCurrent: function() {
		return this.zIndex;
	},

	next: function() {
		this.zIndex++;
		return this.zIndex;
	}

};

MMap.Overlay.Markers = {

	markers: [],
	minIndex: 0,
	maxIndex: 0,

	add: function(marker) {
		this.markers.push(marker);
		this.minIndex = Math.min(this.minIndex, marker.getZIndex());
		this.maxIndex = Math.max(this.maxIndex, marker.getZIndex());
	},

	orderToFront: function(marker) {
		var zIndex = this.maxIndex;
		marker.setZIndex(zIndex);
		var container = marker.getContainer();
		container.addClass("active");
		this.markers.each(function(target) {
			zIndex--;
			if (target != marker) {
				target.setZIndex(zIndex);
				var container = target.getContainer();
				container.removeClass("active");
			}
		});
	},

	orderToBack: function(marker) {
		var zIndex = this.minIndex;
		marker.setZIndex(zIndex);
		marker.deactivate();
		this.markers.each(function(target) {
			zIndex++;
			if (target != marker) target.setZIndex(zIndex);
		});
	}

};

MMap.Marker = new Class({

	Implements: [Options],

	options: {
		"className": "html",
		"latlng": null,
		"title": null,
		"url": null,
		"zIndex": null,
		"content": null
	},

	proxyEvents: ["click", "mouseover", "mouseout", "mousedown", "mouseup"],

	panel: null,
	container: null,
	body: null,

	/** @id MMap.Marker.initialize */
	initialize: function(map, options) {
		this.setOptions(options);
		$extend(this, new google.maps.OverlayView());
		this.container = new Element("div", {"class": "marker " + this.options.className});
		this.body = new Element("div", {"class": "body"});
		this.body.inject(this.container);
		this.build();
		this.setZIndex(this.generateZIndex());
		this.setupProxy();
		this.setMap(map.getInstance());
		MMap.Overlay.Markers.add(this);
	},

	/** @id MMap.Marker.build */
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

	/** @id MMap.Marker.addEvent */
	addEvent: function(type, handler) {
		var eventType = Events.removeOn(type);
		eventType = eventType.toLowerCase();
		google.maps.event.addListener(this, eventType, handler);
	},

	/** @id MMap.Marker.addEvents */
	addEvents: function(handlers) {
		for (var type in handlers) {
			this.addEvent(type, handlers[type]);
		}
	},

	generateZIndex: function() {
		var zIndex = null; 
		if (this.options.zIndex) {
			zIndex = this.options.zIndex;
		} else {
			zIndex = MMap.Overlay.getCurrent();
			MMap.Overlay.next();
		}
		return zIndex;
	},

	getContainer: function() {
		return this.container;
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

	/** @id MMap.Marker.setURL */
	setURL: function(url) { this.options.url = url; }, 

	/** @id MMap.Marker.getURL */
	getURL: function() { return this.options.url; }, 

	/** @id MMap.Marker.setPosition */
	setPosition: function(latlng) {
		this.options.latlng = latlng;
	},

	/** @id MMap.Marker.getPosition */
	getPosition: function() {
		return this.options.latlng;
	},

	/** @id MMap.Marker.setPosition */
	setZIndex: function(index) {
		this.options.zIndex = index;
		this.container.setStyle("z-index", this.options.zIndex);
	},

	/** @id MMap.Marker.getPosition */
	getZIndex: function() { return this.options.zIndex; },

	/** @id MMap.Marker.draw */
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
		this.panel = panes.overlayImage;
		this.container.inject(this.panel);
	},

	onRemove: function() {
		this.container.destory();
	},

	getPanel: function() {
		return this.panel;
	},

	orderToFront: function() {
		MMap.Overlay.Markers.orderToFront(this);
	},

	orderToBack:  function() {
		MMap.Overlay.Markers.orderToBack(this);
	}

});
