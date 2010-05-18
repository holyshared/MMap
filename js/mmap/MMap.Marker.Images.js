/*
---
description: Marker who can do mapping of image on map. Two or more images can be used and the image changes at regular intervals.

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

MMap.Marker.Images = new Class({

	Extends: MMap.Marker,

	options: {
		"className": "square",
		"latlng": null,
		"images": [],
		"interval": 1000,
		"zIndex": null		
	},

	initialize: function(map, options) {
		this.parent(map, options);
		this.current = 0;
		this.id = 0;
		this.over = false;
		this.trigger.addEvent("mouseover",	this.onMouseOver.bind(this));
		this.photo.addEvent("mouseout",		this.onMouseOut.bind(this));
	},

	build: function() {
		this.container.addClass("image");
		this.photo = new Element("ul", {"class": "photo"});
		this.buildImages();
		this.trigger = $(this.photo).getElements("a");
		this.setContent(this.photo);
	},

	buildImages: function() {
		var images = this.options.images;
		images.each(function(image) {
			var container = new Element("li");
			var trigger = new Element("a", {"title": image.title, "href": image.url});
			var photo = new Element("img", {"title": image.title, "src": image.src});
			photo.inject(trigger);
			trigger.inject(container);
			container.inject(this.photo);
		}, this);
	},

	onAdd: function() {
		this.parent();
		this.setupStyles();
	},

	setupStyles: function() {
		var left = 0;
		var zIndex = this.getZIndex() + this.trigger.length;

		MMap.Overlay.setZIndex(this.overlayType, zIndex);

		this.width = this.photo.getSize().x;
		this.trigger.each(function(image, key) {
			var container = image.parentNode;
			var thumbWidth = image.getSize().x;
			var styles = {
				"position": "absolute",
				"left": left,
				"z-index": zIndex,
				"padding-left": (this.width - thumbWidth) / 2
			}
			container.setStyles(styles);
			zIndex--;
		}, this);

	},

	onMouseOver: function() {
		if (this.over) return false;
		this.over = true;
		this.next();
	},

	onMouseOut: function() {
		$clear(this.id);
		this.over = false;
	},

	next: function() {
		if (this.over == false) return false;
		this.id = this.activate.delay(this.options.interval, this);
	},

	toFront: function() {
		var current = this.trigger[this.current].parentNode;
		current.setStyles({"z-index": this.getZIndex() + 1, "opacity": 1});

		this.trigger.each(function(image, key){
			var li = image.parentNode;
			if (this.current != key) {
				var zIndex= li.getStyle("z-index");
				li.setStyle("z-index", zIndex.toInt() + 1);
			}
		}, this);

		((this.current + 1) >= this.trigger.length) ? this.current = 0 : this.current++;
	},

	activate: function() {
		var current = this.trigger[this.current].parentNode;
		var fx = current.get("morph", {
			"duration": 600,
			"transition": "expo:in",
			"onComplete": function() {
				this.toFront();
				this.next();
			}.bind(this)
		});
		fx.start({"opacity": [1, 0]});
	}

});
