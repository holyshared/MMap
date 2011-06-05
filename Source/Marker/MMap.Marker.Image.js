/*
---
name: MMap.Marker.Image

description: Simple image marker.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Marker
  - MMap/MMap.Marker.Core

provides: [MMap.Marker.Image]

...
*/

(function(){

var MMap = (this.MMap || {});
MMap.Marker = (this.MMap.Marker || {});

MMap.Marker.Image = this.MMap.Marker.Image = new Class({

	Extends: MMap.Marker.Core,

	options: {
		map: null,
		className: 'marker image imageDefault',
		title: '',
		image: '',
		url: '',
		position: null,
		zIndex: 0,
		visible: true
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		this.setDefaultZIndex();

		var className = this.options.className;
		container.addClass(className);
		var photo = new Element('p', {'class': 'photo'});
		this._anchor = new Element('a', {
			'title': this.get('title'),
			'href': this.get('url')
		});
		this._image = new Element('img', {'src': this.get('image')});
		photo.inject(container);
		this._anchor.inject(photo);
		this._image.inject(this._anchor);
		return photo;
	},

	_setupListeners: function(){
		var self = this;
		var marker = this._getInstance();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		}
		var events = ['click', 'dblclick', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
		});
	},

	_init: function(){
		this.parent();
		var self = this;
		var props = ['title', 'image', 'url'];
		props.each(function(key){
			self.set(key, self.options[key]);
			delete self.options[key];
		});
	},

	_update: function(){
		this._anchor.set({
		    title: this.get('title'),
		    href: this.get('url')
		});
		this._image.set({
			title: this.get('title'),
			image: this.get('image')
		});
	},

	getTitle: function() {
		return this.get('title');
	},

	getImage: function() {
		return this.get('image');
	},

	getURL: function() {
		return this.get('url');
	},

	setTitle: function(title){
		this.set('title', title);
		this.draw();
		return this;
	},

	setImage: function(image){
		this.set('image', image);
		this.draw();
		return this;
	},

	setURL: function(url){
		this.set('url', url);
		this.draw();
		return this;
	}

});

}());