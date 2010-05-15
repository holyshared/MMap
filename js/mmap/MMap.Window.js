/*
---
description:

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

provides: [MMap,MMap.Marker,MMap.Marker.Image,MMap.Marker.Images]
...
*/

MMap.Window = new Class({

	Implements: [Options],

	options: {
		"className": "default",
		"latlng": null,
		"title": null,
		"zIndex": null,
		"content": null
	},

	proxyEvents: ["click", "mouseover", "mouseout", "mousedown", "mouseup"],

	panel: null,
	container: null,
	body: null,
	latlng: null,

	initialize: function(options) {
		this.setOptions(options);
		$extend(this, new google.maps.OverlayView());
		this.container = new Element("div", {"class": "window " + this.options.className});
		this.body = new Element("div", {"class": "body"});
		this.content = new Element("div", {"class": "content"});
		this.content.inject(this.body);
		this.body.inject(this.container);
		this.build();
		this.setZIndex(this.generateZIndex());
		this.setupProxy();
if (this.options.content) {
	this.setContent(this.options.content);
}

if (this.options.title) {
	this.text.set("html", this.options.title);
}




//		MMap.Overlay.Markers.add(this);
	},

	build: function() {
		this.header = new Element("div", {"class": "header"});
		this.title = new Element("p", {"class": "title"});
		this.text = new Element("strong");
		this.close = new Element("a", {"class": "close"});
		this.controls = new Element("p", {"class": "controls"});
		this.text.inject(this.title);
		this.close.inject(this.controls);
		this.header.adopt([this.title, this.controls]);

		this.footer = new Element("div", {"class": "footer"});

		var p = new Element("p");
		this.resize = new Element("a", {"class": "resize"});
		this.resize.inject(p);
		p.inject(this.footer);

		this.header.inject(this.body, "before");
		this.footer.inject(this.body, "after");
		this.setContent(this.options.content);
	},

	setupProxy: function(event) {
		this.proxyEvents.each(function(eventType) {
		//	this.trigger.addEvent(eventType, this.eventProxy.bind(this));
		}, this);
		this.close.addEvent("click", function(event) {
			event.stop();
			var e = new Event(event);
			this.setMap(null);
			google.maps.event.trigger(this, "close", e);
		}.bind(this));
	},

	eventProxy: function(event, triggerType) {
		event.stop();
		var argEvent = new Event(event);
		var argType = (triggerType) ? triggerType: event.type;
		google.maps.event.trigger(this, argType, argEvent);
	},

	addEvent: function(type, handler) {
		var eventType = Events.removeOn(type);
		eventType = eventType.toLowerCase();
		google.maps.event.addListener(this, eventType, handler);
	},

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

	getContainer: function() { return this.container; },

	setContent: function(content) {
		if (!content) return false;
		this.contentHTML = content;
		this.content.set("html", "");
		($type(this.contentHTML) == "string")
		? this.content.set("html", this.contentHTML)
		: content.inject(this.contentHTML);
	},

	getContent: function() { return this.contentHTML; },
	setPosition: function(latlng) { this.latlng = latlng; },
	getPosition: function() { return this.latlng; },
	setZIndex: function(index) {
		this.options.zIndex = index;
		this.container.setStyle("z-index", this.options.zIndex);
	},

	getZIndex: function() { return this.options.zIndex; },

	open: function(map, anchor) {
		this.anchor = anchor;
		this.setMap(map.getInstance());
	},

	draw: function() {
		var size = this.container.getSize();
		var projection = this.getProjection();
		var position = this.anchor.getPosition();
		var point = projection.fromLatLngToDivPixel(position);
		this.container.setStyles({
			"position": "absolute",
			"top": point.y - size.y,
			"left": point.x - (size.x / 2)
		});
	},

	onAdd: function() {
		var panes = this.getPanes();
		this.panel = panes.floatPane;
		this.container.inject(this.panel);
	},

	onRemove: function() { this.container.destroy(); },
	getPanel: function() { return this.panel; }

});
