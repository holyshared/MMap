/*
---
description: Custom marker who can insert HTML contents

license: MIT-style

authors:
- Noritaka Horio

requires:
  core/1.2.4:
  - Core/Core
  - Core/Browser
  - Native/Array
  - Native/Function
  - Native/Number
  - Native/String
  - Native/Hash
  - Native/Event
  - Class/Class
  - Class/Class.Extras
  - Element/Element
  - Element/Element.Event
  - Element/Element.Style
  - Element/Element.Dimensions
  - Utilities/Selecter
  - Utilities/DomReady
  - Fx/Fx
  - Fx/Fx.CSS
  - Fx/Fx.Tween
  - Fx/Fx.Transitions

more/1.2.4.4:
  - Tips

provides: [MMap,MMap.Marker,MMap.Marker.Image,MMap.Marker.Images,MMap.Window]
...
*/

MMap.Marker = new Class({

	Implements: [Options, MMap.Events],

	options: {
		"className": "html",
		"latlng": null,
		"title": null,
//		"url": null,
		"zIndex": null,
		"content": null
	},

	overlayType: "marker",
	latlng: null,
	container: null,
	body: null,
	panel: null,

	/** @id MMap.Marker.initialize */
	initialize: function(map, options) {
		this.setOptions(options);
		$extend(this, new google.maps.OverlayView());
		this.container = new Element("div", {"class": "marker " + this.options.className});
		this.body = new Element("div", {"class": "body"});
		this.body.inject(this.container);
		this.build();
		this.setZIndex(this.generateZIndex());
		this.setupEvents();
		this.setPosition(new google.maps.LatLng(this.options.latlng.lat, this.options.latlng.lng));
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

	setupEvents: function(event) {
		var proxy = function(event) {
			event.stop();
			var proxyEvent = new Event(event);
			proxyEvent.target = this;
			this.fireEvent(proxyEvent.type, proxyEvent);
		}.bind(this);
		this.trigger.addEvent("click", proxy);
		this.trigger.addEvent("mouseover", proxy);
		this.trigger.addEvent("mouseout", proxy);
		this.trigger.addEvent("mousedown", proxy);
		this.trigger.addEvent("mouseup", proxy);
	},

	generateZIndex: function() {
		var zIndex = null; 
		if (this.options.zIndex) {
			zIndex = this.options.zIndex;
		} else {
			zIndex = MMap.Overlay.getCurrent(this.overlayType);
			MMap.Overlay.next(this.overlayType);
		}
		return zIndex;
	},

	getContainer: function() { return this.container; },

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
	setPosition: function(latlng) { this.latlng = latlng; },

	/** @id MMap.Marker.getPosition */
	getPosition: function() { return this.latlng; },

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
		var latlng = new google.maps.LatLng(position.lat, position.lng);
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

	onRemove: function() { this.container.destroy(); },
	getPanel: function() { return this.panel; },

	orderToFront: function() {
		MMap.Overlay.Markers.orderToFront(this);
	}

});
