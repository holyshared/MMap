/*
---
description: Custom information window.

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

MMap.Window = new Class({

	Implements: [Options, MMap.Events],

	options: {
		"className": "default",
		"latlng": null,
		"title": null,
		"zIndex": null,
		"content": null,
		"width": 400
	},

	overlayType: "window",
	container: null,
	body: null,
	latlng: null,
	panel: null,

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
		this.setupEvents();
		if (this.options.content) { this.setContent(this.options.content); }
		if (this.options.title) { this.text.set("html", this.options.title); }
		MMap.Overlay.Windows.add(this);
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
		this.arrow = new Element("div", {"class": "arrow"});

		this.inner = new Element("div", {"class": "inner"});
		this.point = new Element("span", {"class": "point"});
		this.point.inject(this.inner);
		this.inner.inject(this.footer);

		this.header.inject(this.body, "before");
		this.footer.inject(this.body, "after");
		this.arrow.inject(this.footer, "after");

		this.setContent(this.options.content);
	},

	setupEvents: function() {
		this.close.addEvent("click", function(event) {
			event.stop();
			this.setMap(null);
			google.maps.event.trigger(this, "close");
		}.bind(this));
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

	setTitle: function(title) { this.text.set("html", title); },
	getTitle: function() { return this.text.get("html"); },

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

	close: function() {
		this.setMap(null);
	},

	draw: function() {
		var wSize = this.container.getSize();
		var projection = this.getProjection();
		var position = this.anchor.getPosition();
		var container = this.anchor.getContainer();
		var aSize = container.getSize();

		var bounds		= this.map.getBounds();
		var aPoint		= projection.fromLatLngToDivPixel(position);				//Anchor Point
		var mapPoint	= projection.fromLatLngToDivPixel(this.map.getCenter());	//Map Point
		var nePoint		= projection.fromLatLngToDivPixel(bounds.getNorthEast());	//NorthEast Point

		var center = this.map.getCenter();
		var windowPoint = aPoint.y - aSize.y - wSize.y; //InfoWindow Point
		if (nePoint.y > windowPoint) {
			//All information windows are displayed.
			var y1 = Math.abs(nePoint.y);
			var y2 = Math.abs(windowPoint);
			var diff = y1 - y2;

			var mapPointY = (nePoint.y > 0) ? mapPoint.y - diff : mapPoint.y + diff;
			center = projection.fromDivPixelToLatLng(new google.maps.Point(mapPoint.x, mapPointY));
		}

		this.map.setCenter(center);
		this.container.setStyles({
			"position": "absolute",
			"top": aPoint.y - aSize.y - wSize.y,
			"left": aPoint.x - (wSize.x / 2)
		});
		this.point.set("html", "latitude: " + position.lat() + ", longitude: " + position.lng());
	},

	onAdd: function() {
		var panes = this.getPanes();
		this.panel = panes.floatPane;
		this.container.inject(this.panel);
		var controlsWidth = this.controls.getSize().x;
		this.container.setStyle("width", this.options.width);
		this.title.setStyle("width",  this.options.width - controlsWidth);
		this.controls.setStyle("margin-left", this.options.width - controlsWidth);
		this.footer.setStyle("margin-left", this.options.width - controlsWidth);
		this.inner.setStyle("width", this.options.width - controlsWidth);
		this.inner.setStyle("left", -(this.options.width - controlsWidth));
	},

	onRemove: function() { this.container.destroy(); },
	getPanel: function() { return this.panel; }

});
