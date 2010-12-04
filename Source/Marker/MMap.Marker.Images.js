/*
---
name: MMap.Marker.Images

description: Marker who does slide while doing two or more images in fadein/fadeout.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Function
  - Core/Object
  - Core/Event
  - Core/Browser
  - Core/Class
  - Core/Element
  - Core/Element.Style
  - Core/Element.Event
  - Core/Element.Dimensions
  - MMap/MMap.Core
  - MMap/MMap.Utils
  - MMap/MMap.OverlayView
  - MMap/MMap.Marker
  - MMap/MMap.Marker.Images

provides: [MMap.Marker.Images]

...
*/

(function($){

var MMap = (this.MMap || {});
MMap.Marker = (this.MMap.Marker || {});

MMap.Marker.Images = this.MMap.Marker.Images = new Class({

	Extends: MMap.BaseMarker,

	options: {
		map: null,
		className: 'marker image imagesDefault',
		images: [],
		defaultIndex: 0,
		interval: 2000,
		duration: 2000,
		zIndex: 0,
		position: null,
		visible: true
	},

	initialize: function(options){
		this.parent(options);
		this._elements = [];
		this._stack = [];
		this._index = 0;
	},

	_setup: function(container){
		this.addEvent('add', this._onPrepare.bind(this));

		var className = this.options.className;
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		this._photos = new Element('ul', {'class': 'photos'});
		this._photos.inject(container);

		var images = this.get('images');
		if (images && Type.isArray(images)) {
			this.addImages(images);
		}
		return this._photos;
	},

	_init: function(){
		this.parent();
		this.set('images', this.options['images']);
		delete this.options['images'];
	},

	_onPrepare: function(){
		var l = this._stack.length;
		for (var i = 0; i < l; i++) {
			var image = this._stack[i];
			image.inject(this._photos);
		}
		delete this._stack;
		var index = this.options.defaultIndex;
		this.setCurrent(index);
		this._timerID = this._next.delay(this.options.interval, this);
	},

	_next: function() {
		var self = this;
		var image = this._elements[this._index];
		image.setStyle('z-index', 1);
		this._index = (this._index + 1 < this._elements.length) ? this._index + 1 : 0;
		var image = this._elements[this._index];
		image.setStyle('z-index', 2);
		var tween = image.get('tween');
		tween.start('opacity', 0, 1);
	},

	_buildElement: function(context){
		var li = new Element('li');
		var a = new Element('a', {href: context.url, title: context.title});
		var img = new Element('img', {src: context.image, title: context.title});
		img.inject(a);
		a.inject(li);

		var self = this;
		li.set('tween', {
			duration: this.options.duration,
			onComplete: function() {
				self.setCurrent(self._index);
				self._timerID = self._next.delay(this.options.interval, self);
			}
		});
		return li;
	},

	setCurrent: function(index){
		var i = 0, length = this._elements.length, image = null, style = {};
		for (i = 0; i < length; i++) {
			image = this._elements[i];
			style = (i == index) ? { 'z-index': 1, opacity: 1 } : { 'z-index': 0, opacity: 0 };
			image.setStyles(style);
		}
		this._index = index;
	},

	getImages: function(){
		return this.get('images');
	},

	setImages: function(images){
		clearTimeout(this._timerID);
		this._elements = [];
		this._index = 0;
		if (this.isAdded()) {
			this._photos.dispose();
		}
		this.set('images', images);
		this.addImages(images);
	},

	addImage: function(image){
		var li = this._buildElement(image);
		var images = this.get('images');

		if (!images.contains(image)) images.push(image);
		if (!this.isAdded()) {
			this._stack.push(li);
		} else {
			li.inject(this._photos);
		}
		this._elements.push(li);
		return this;
	},

	addImages: function(images){
		var i = 0, length = images.length;
		for (i = 0; i < length; i++) {
			this.addImage(images[i]);
		}
	},

	removeImage: function(image){
		var images = this.get('images');
		var index = images.indexOf(image);
		if (index >= 0) {
			var element = this._elements[index];
			this._elements.erase(element);
			if (this._stack && this._stack.contains(element)) {
				this._stack.erase(element);
			}
			images.erase(image);
			element.destroy();
		}
	},

	removeImages: function(){
		var self = this;
		var images = Array.from(arguments);
		images.each(function(image){
			self.removeImage(image);
		});
	}

});

}(document.id))