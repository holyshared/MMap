/*
---
description: Marker who can do mapping of image on map

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

MMap.Marker.Image = new Class({

	Extends: MMap.Marker,

	options: {
		"className": "square",
		"latlng": null,
		"title": null,
		"url": null,
		"src": null,
		"zIndex": null		
	},

	initialize: function(map, options) {
		this.parent(map, options);
	},

	build: function() {
		this.container.addClass("image")
		this.photo = new Element("p", {"class": "photo"});
		this.trigger = new Element("a", {"title": this.options.title, "href": this.options.url});
		this.image = new Element("img", {"src": this.options.src});
		this.image.inject(this.trigger);
		this.trigger.inject(this.photo);
		this.setContent(this.photo);
	},

	/**
	 * @id MMap.Marker.setImage
	 */
	setImage: function(image) { this.options.src = image; }, 

	/**
	 * @id MMap.Marker.getImage
	 */
	getImage: function() { return this.options.src; } 	

});
