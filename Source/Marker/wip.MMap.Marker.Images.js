/*
---
name: MMap.Marker.Images

description: Marker who does slide while doing two or more images in fadein/fadeout.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Marker
  - MMap/MMap.Marker.Core

provides: [MMap.Marker.Images]

...
*/

(function(MMap, Marker){

Marker.Images = new Class({

	Extends: Marker.Core,

	options: {
		map: null,
		className: 'marker image imagesDefault',
		images: [],
		defaultIndex: 0,
		interval: 2000,
		duration: 2000,
		autoplay: true,
		zIndex: 0,
		position: null,
		visible: true
	},

	initialize: function(options){
		this.parent(options);
		this._state = new State(this);
/*

		this._elements = [];
		this._stack = [];
		this._index = 0;
		this._start = false;
		this._mouseovered = false;
*/
		this._mouseovered = false;
	},

	_init: function(){
		this.parent();
		this.set('images', this.options.images);
		this.set('current', this.options.defaultIndex);
		delete this.options.images;
	},

	_setup: function(container){

		this.setDefaultZIndex();

		var className = this.options.className;
		container.addClass(className);

		this._photos = new Element('ul', {'class': 'photos'});
		this._photos.inject(container);

		this.addEvent('add', this._onPrepare.bind(this));


//		var images = this.get('images');
//		if (images && Type.isArray(images)) {





//			this.addImages(images);
	//	}
		return this._photos;
	},

	_onPrepare: function(){
		this._state.next();
/*
		var l = this._stack.length;
		for (var i = 0; i < l; i++) {
			var image = this._stack[i];
			image.inject(this._photos);
		}

		delete this._stack;

*/
//		var index = this.options.defaultIndex;
//		this.setCurrent(index);
/*		if (this.options.autoplay) {
			this._timerID = this._next.delay(this.options.interval, this);
			this._start = true;
		}
*/
	},




	_setupListeners: function(){
		var self = this;
		var marker = this.toElement();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		}
		var events = ['click', 'dblclick', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
		});
		marker.addEvent('mouseout', this._MouseOut.bind(this));
	},

	_MouseOver: function(event){
		if (this._mouseovered) return false;
		event.target = this;
		this.fireEvent(event.type, event);
		this._mouseovered = true;
	},

	_MouseOut: function(event){
		if (!(event.target == this._photos || event.target == this.toElement())) return false;
		if (!this._mouseovered) return false;
		event.target = this;
		this.fireEvent(event.type, event);
		this._mouseovered = false;
	},


/*
	_onPrepare: function(){
		var l = this._stack.length;
		for (var i = 0; i < l; i++) {
			var image = this._stack[i];
			image.inject(this._photos);
		}
		delete this._stack;
		var index = this.options.defaultIndex;
		this.setCurrent(index);
		if (this.options.autoplay) {
			this._timerID = this._next.delay(this.options.interval, this);
			this._start = true;
		}
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
				if (self.isStart()) {
					self.setCurrent(self._index);
					self._timerID = self._next.delay(this.options.interval, self);
				}
			}
		});
		li.addEvent('mouseover', self._mouseover.bind(this));
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
		return this;
	},

	addImage: function(image){
		var li = this._buildElement(image);
		var images = this.get('images');

		if (!images.contains(image)) images.push(image);
		if (!this.isAdded()) {
console.log('stack = ' + this._stack.length.toString());

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
	},

	isStart: function(){
		return (this._start) ? true : false;
	},

	start: function(){
		if (this.isStart()) return;
		this._timerID = this._next.delay(this.options.interval, this);
		this._start = true;
	},

	stop: function(){
		clearTimeout(this._timerID);
		this._start = false;
	}
*/

	setCurrent: function(index){
		var len = this.get('images').length - 1;
		if (index < 0 || index > len) {
			return;
		}
		this.set('current', index);
	},

	getCurrent: function(){
		return this.get('current');
	},

	setImages: function(images){
		this._state.setImages(images);
	},

	addImage: function(image){
		this._state.addImage(image);
	},

	addImages: function(images){
		this._state.addImages(images);
	},

	removeImage: function(image){
		this._state.removeImage(image);
	},

	removeImages: function(images){
		this._state.removeImages(images);
	},

	getContainer: function(){
		return this._photos;
	}

});





function State(marker) {
	this._marker = marker;
	this._progress = 0;
	this.stateChange(this._progress);
}

State.implement({

	addImage: function(image){
		this._state.addImage(image);
	},

	addImages: function(images){
		this._state.addImages(images);
	},

	setImages: function(images){
		this._state.setImages(images);
	},

	removeImage: function(image){
		this._state.removeImage(image);
	},

	removeImages: function(images){
		this._state.removeImages(images);
	},

	getLength: function(){
		return this._state.getLength();
	},

	next: function(){
		this.stateChange(++this._progress);
	},

	stateChange: function(index){
		var nextState = null;
		switch(index) {
			case 1:
				this._state.finish();
				this._state = new AddMapAfterState(this._marker);
				break;
			case 0:
			default:
				this._state = new AddMapBeforeState(this._marker);
				break;
		}
	}

});


function MarkerProxy(marker){
	this._marker = marker;
}

MarkerProxy.implement({

	getElements: function(){
		this._marker._elements;
	},

	setElements: function(elements){
		this._marker._elements = elements;
	}

});







function MarkerState(marker) {
	this._marker = marker;
}

MarkerState.implement({

	getMarker: function(){
		return this._marker;
	},

	getOptions: function(){
		return this._marker.options;
	},
/*
	_MouseOver: function(event){
		if (this._mouseovered) return false;
		event.target = this;
		this.getMarker().fireEvent(event.type, event);
		this._mouseovered = true;
	},
*/
	createElement: function(context){

		var li = new Element('li');
		var a = new Element('a', {href: context.url, title: context.title});
		var img = new Element('img', {src: context.image, title: context.title});
		img.inject(a);
		a.inject(li);

		return this.initElement(li);
	},

	initElement: function(element){
		var marker = this.getMarker();
		var options = this.getOptions();
		var self = this;
		element.set('tween', {
			duration: options.duration,
			onComplete: function() {
/*
				if (self.isStart()) {
					self.setCurrent(self._index);
					self._timerID = self._next.delay(this.options.interval, self);

				}
*/
			}
		});
		element.addEvent('mouseover', marker._MouseOver.bind(marker));
		return element;
	},

	getLength: function(){
		var marker = this.getMarker();
		return marker.get('images').length;
	}

});


/**
 * AddMapBeforeState
 *
 * State before it adds it to map.
 */
function AddMapBeforeState(marker) {
	MarkerState.call(this, marker);
}
AddMapBeforeState.implement(new MarkerState());

AddMapBeforeState.implement({

	setImages: function(images){
		var marker = this.getMarker();
		marker.set('images', images);
	},

	addImage: function(image){
		var marker = this.getMarker();
		var images = marker.get('images');
		if (!images.contains(image)) {
			images.push(image);
		}
		return this;
	},

	addImages: function(images){
		images.each(function(image){
			this.addImage(image);
		}, this);
		return this;
	},

	removeImage: function(image){
		var images = this.getMarker().get('images');
		images.erase(image);
		return this;
	},

	removeImages: function(images){
		images.each(function(image){
			this.removeImage(image);
		}, this);
		return this;
	},

	finish: function() {
		var elements = [];
		var marker = this.getMarker();
		var images = marker.get('images');
		var container = marker.getContainer();

		images.each(function(image){
			elements.push(this.createElement(image));
		}, this);
		container.adopt(elements);
	}

});

/**
 * AddMapAfterState
 *
 * State after it adds it to map.
 */
function AddMapAfterState(marker) {
	MarkerState.call(this, marker);
}
AddMapAfterState.implement(new MarkerState());

AddMapAfterState.implement({

	start: function(){
		var marker = this.getMarker();
		var container = marker.getContainer();
		var elements = container.getElements('li');
		marker.elements = elements;
	},

	setImages: function(images){
		var elements = [];
		var marker = this.getMarker();
		var container = marker.getContainer();
		container.empty();

		images.each(function(image){
			var element = this.createElement(image);
			element.inject(container);
			elements.push(element);
		}, this);
		marker.set('images', images);
		marker.elements = elements;
	},

	addImage: function(image){
		var marker = this.getMarker();
		var elements = marker.elements;
		var images = marker.get('images');

		if (!images.contains(image)) {
			images.push(image);
		}
		var container = marker.getContainer();
		var element = this.createElement(image);
		element.inject(container);
		elements.push(element);

		return this;
	},

	addImages: function(images){
		images.each(function(image){
			this.addImage(image);
		}, this);
	},

	removeImage: function(image){
		var marker = this.getMarker();
		var images = marker.get('images');
		var elements = marker.elements;

		if (!images.contains(image)) {
			return;
		}

		var index = images.indexOf(image);
		var element = elements[index];
		images.erase(image);
		elements.erase(element);
		element.destroy();
	},

	removeImages: function(images){
		images.each(function(image){
			this.removeImage(image);
		}, this);
	}

});


}(MMap, MMap.Marker));