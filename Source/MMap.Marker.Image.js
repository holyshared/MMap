/*
---
name: MMap.Marker.Image

description: Marker who can do mapping of image on map

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Browser
  - Core/Array
  - Core/Function
  - Core/Number
  - Core/String
  - Core/Hash
  - Core/Event
  - Core/Class
  - Core/Class.Extras
  - Core/Element
  - Core/Element.Event
  - Core/Element.Style
  - Core/Element.Dimensions
  - Core/Selecter
  - Core/DomReady
  - Core/Fx
  - Core/Fx.CSS
  - Core/Fx.Tween
  - Core/Fx.Transitions
  - More/Tips
  - MMap/MMap.Marker

provides: [MMap.Marker.Image]
...
*/

MMap.Marker.Image = new Class({

	Extends: MMap.Marker,

	options: {
		className: 'square',
		latlng: null,
		title: null,
		url: null,
		src: null,
		zIndex: null		
	},

	initialize: function(map, options){
		this.parent(map, options);
	},

	build: function(){
		this.container.addClass('image')
		this.photo = new Element('p', {'class': 'photo'});
		this.trigger = new Element('a', {'title': this.options.title, 'href': this.options.url});
		this.image = new Element('img', {'src': this.options.src});
		this.image.inject(this.trigger);
		this.trigger.inject(this.photo);
		this.setContent(this.photo);
	},

	/**
	 * @id MMap.Marker.setImage
	 */
	setImage: function(image){
		this.options.src = image;
	}, 

	/**
	 * @id MMap.Marker.getImage
	 */
	getImage: function(){
		return this.options.src;
	} 	

});