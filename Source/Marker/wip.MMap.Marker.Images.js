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

		return this._photos;
	},

	_onPrepare: function(){
		this._state.next();
		this._state.orderByFront();
		if (this.options.autoplay) {
			this._next();
			this._start = true;
		}
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
	},

	isStart: function(){
		return (this._start) ? true : false;
	},

	start: function(){
		if (this.isStart()) return;
		this._next();
		this._start = true;
	},

	stop: function(){
		clearTimeout(this._timerID);
		this._start = false;
	},

	_nextImage: function() {
		var self = this;

		//Current image
		var image = this.elements[this.getCurrent()];
		image.setStyle('z-index', 1);

		var index = (this.getCurrent() + 1 < this.elements.length) ? this.getCurrent() + 1 : 0;

		this.setCurrent(index);

console.log(index);
		//Next image
		var image = this.elements[index];
		image.setStyle('z-index', 2);
		var tween = image.get('tween');
		tween.start('opacity', 0, 1);
	},

	_next: function(){
		this._timerID = this._nextImage.delay(this.options.interval, this);
	}

});







/*
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
*/



















function State(marker) {
	this._marker = marker;
	this._progress = 0;
	this.stateChange(this._progress);
};

State.implement({
/*
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

	orderByFront: function(){
		this._state.orderByFront();
	},
*/
	next: function(){
		this.stateChange(++this._progress);
	},

	stateChange: function(index){
		var nextState = null;
		switch(index) {
			case 1:
				this._state.finish();
				this._state = new AddMapAfterState(this._marker);
				this._state.start();
				break;
			case 0:
			default:
				this._state = new AddMapBeforeState(this._marker);
				break;
		}
	}

});


(function(State){

var proxies = [
	'addImage', 'addImages', 'setImages',
	'removeImage', 'removeImages', 'getLength',
	'orderByFront'
];
var mixins = {}; 
proxies.each(function(key){
	mixins[key] = function(){
		this._state[key].apply(this._state, arguments);
	};
});
State.implement(mixins);

}(State));






function MarkerState(marker) {
	this._marker = marker;
};



MarkerState.implement({

	getMarker: function(){
		return this._marker;
	},

	getOptions: function(){
		return this.getMarker().options;
	},

	getContainer: function(){
		return this.getMarker()._photos;
	},

	getElements: function(){
		return this.getMarker().elements;
	},

	setElements: function(elements){
		return this.getMarker().elements = elements;
	},

	getImages: function(){
		return this.getMarker().get('images');
	},

	set: function(key, value){
		this.getMarker().set(key, value);
	},

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
		var state = this;
		element.set('tween', {
			duration: options.duration,
			onComplete: function() {
				if (marker.isStart()) {
					state.orderByFront();
					marker._next();
				}
			}
		});
		element.addEvent('mouseover', marker._MouseOver.bind(marker));
		return element;
	},

	orderByFront: function(){
		var marker = this.getMarker();
		var elements = this.getElements();
		var i = 0, length = elements.length, image = null, style = {};
		for (i = 0; i < length; i++) {
			image = elements[i];
			style = (i == marker.getCurrent()) ? { 'z-index': 1, opacity: 1 } : { 'z-index': 0, opacity: 0 };
			image.setStyles(style);
		}
	},

	getLength: function(){
		return this.getImages().length;
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
		this.set('images', images);
	},

	addImage: function(image){
		var images = this.getImages();
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
		var images = this.getImages();
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
//		var marker = this.getMarker();
		var images = this.getImages();
		var container = this.getContainer();

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
		var container = this.getContainer();
		var elements = container.getElements('li');
		this.setElements(elements);
	},

	setImages: function(images){
		var elements = [];
		var container = this.getContainer();
		container.empty();

		images.each(function(image){
			var element = this.createElement(image);
			element.inject(container);
			elements.push(element);
		}, this);
		this.set('images', images);
		this.setElements(elements);
	},

	addImage: function(image){
		var elements = this.getElements();
		var images = this.getImages();

		if (!images.contains(image)) {
			images.push(image);
		}
		var container = this.getContainer();
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
		var images = this.getImages();
		var elements = this.getElements();

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