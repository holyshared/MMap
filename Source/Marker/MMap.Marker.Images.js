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

//State namespace
var MarkerState = {};

MarkerState.Methods = [
	'setCurrent', 'setImages',
	'addImage', 'addImages',
	'removeImage', 'removeImages',
	'isStart', 'start', 'stop'
];

MarkerState.States = [ 'AddMapBeforeState', 'AddMapAfterState' ];

Marker.Images = new Class({

	Extends: Marker.Core,

	options: {
		map: null,
		className: 'marker image imagesDefault',
		images: [],
		current: 0,
		interval: 2000,
		duration: 2000,
		autoplay: true,
		zIndex: 0,
		position: null,
		visible: true
	},

	initialize: function(options){
		this.state = new MarkerState.StateWrapper(this);
		this.parent(options);
	},

	_init: function(){
		this.parent();
		var self = this;
		var props = ['images', 'current'];
		props.each(function(key){
			self.set(key, self.options[key]);
			delete self.options[key];
		});
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

<<<<<<< HEAD
	_setupListeners: function(){
		var self = this;
		var marker = this._getInstance();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		};
		var events = ['click', 'dblclick', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
=======
	_onPrepare: function(){
		var slideOptions = {
			images: this.get('images'),
			observer: this.toElement(),
			container: this._photos
		};
		var handlers = this._createEventProxies(this);

		var opts = Object.merge(this.options, handlers, slideOptions);

		if (this.getVisible() == false || this.state.isStart() == false){
			opts.autoplay = false;
		}
		this.state.nextState(opts);
	},

	_createEventProxies: function(target){
		var handlers = {
			onImageChangeStart: function(index){
				target.setCurrent(index);
			},
			onImageChangeEnd: function(){
				target.fireEvent('currentImageChanged', Array.from(arguments));
			}
		};

		var events = [
			'onClick', 'onDblClick',
			'onMouseOver', 'onMouseOut',
			'onMouseUp', 'onMouseDown'
		];
		var proxy = function(event){
			event.target = target;
			target.fireEvent(event.type, [event]);
		};
		events.each(function(key, index){
			handlers[key] = proxy;
>>>>>>> remotes/origin/0.2.3
		});

		return handlers;
	},

	getCurrent: function(){
		return this.get('current');
	},

	getCurrentImage: function(){
		var images = this.getImages(); 
		return images[this.getCurrent()];
	},

	getImages: function(){
		return this.get('images');
	},

	visible_changed: function(){
		var visible = this.getVisible();
		if (visible == false && this.isAdded()) {
			this.stop();
		}
	}

});


(function(){

	var marker = Marker.Images,
		methods = MarkerState.Methods,
		hooks = {};

	methods.each(function(key, index){
		hooks[key] = function(){
			return this.state[key].apply(this.state, arguments);
		}
	});
	marker.implement(hooks);

}());


MarkerState.StateWrapper = new Class({

	progress: 0,
	state: null,
	marker: null,

	initialize: function(marker){
		this.marker = marker;
		this.nextState();
	},

	nextState: function(options){
		var stateName = MarkerState.States[this.progress++];
		this.state = this.createState.call(this, stateName, options);
	},

	createState: function(state, options){
		if (!MarkerState[state]) {
			throw new Error('instance!!');
		}
		var stateClass = MarkerState[state];
		return new stateClass(this.marker, options);
	}

});


//The api hook to MarkerState.State instance is made.
(function(){

	var warapper = MarkerState.StateWrapper,
		methods = MarkerState.Methods
		hooks = {};

	methods.each(function(key, index){
		hooks[key] = function(){
			return this.state[key].apply(this.state, arguments);
		};
	});
	warapper.implement(hooks);

}());


MarkerState.State = new Class({

	Implements: [Options],

	initialize: function(marker, options){
		this.setOptions(options);
		this.marker = marker;
	},

	setCurrent: function(index){
		var len = this.marker.get('images').length - 1;
		if (index < 0 || index > len) {
			return;
		}
		this.marker.set('current', index);
	},

	setImages: function(images){
		this.marker.set('images', this._validateImages(images));
	},

	addImage: function(image){
		var images = this.marker.get('images');
		if (!images.contains(image)) {
			images.push(image);
		}
		return this;
	},

	addImages: function(images){
		images = this._validateImages(images);
		images.each(function(image){
			this.addImage(image);
		}, this);
		return this;
	},

	removeImage: function(image){
		var images = this.marker.get('images');
		images.erase(image);
		return this;
	},

	removeImages: function(images){
		images.each(function(image){
			this.removeImage(image);
		}, this);
		return this;
	},

	_validateImages: function(images) {
		if (!Type.isArray(images)){
			throw new TypeError('The image is an array.');
		}
		return images;
	}

});


//SState before marker is added to map.
MarkerState.AddMapBeforeState = new Class({

	Extends: MarkerState.State,

	started: true,

	initialize: function(marker, options){
		this.parent(marker);
	},

	isStart: function(){
		return this.started;
	},

	start: function(){
		this.started = true;
	},

	stop: function(){
		this.started = false;
	}

});

//State after marker is added to map.
MarkerState.AddMapAfterState = new Class({

	Extends: MarkerState.State,

	initialize: function(marker, options){
		this.parent(marker);
		this.imageChanger = new Images(options);
	},

	setCurrent: function(index){
		try {
			this.imageChanger.setCurrent(index);
		} catch(exp) {
			throw exp;
		}
		this.parent(index);
	},

	setImages: function(images){
		this.parent(images);
		this.imageChanger.setImages(images);
		return this;
	},

	addImage: function(image){
		this.parent(image);
		this.imageChanger.addImage(image);
		return this;
	},

	addImages: function(images){
		this.parent(images);
		this.imageChanger.addImages(images);
		return this;
	},

	removeImage: function(image){
		this.parent(image);
		this.imageChanger.removeImage(image);
		return this;
	},

	removeImages: function(images){
		this.parent(images);
		this.imageChanger.removeImages(images);
		return this;
	},

	isStart: function(){
		return this.imageChanger.isStart();
	},

	start: function(){
		this.imageChanger.start();
	},

	stop: function(){
		this.imageChanger.stop();
	}

});


var Images = this.Images = new Class({

	//Mxins meta classes
	Implements: [Options, Events],

	//protected members
	_current: 0,
	_elements: [],
	_observer: null,
	_container: null,
	_mouseovered: false,
	_timerId: null,
	_started: null,

	options: {
		className: 'marker image imagesDefault',
		current: 0,
		images: [],
		observer: null,
		container: null,
		interval: 2000,
		duration: 2000,
		autoplay: true
	},

	initialize: function(options){
		this.setOptions(this._prepare(options));
		this._setupListeners();
		this._setup();
	},

	_prepare: function(opts){
		['observer', 'container', 'current'].each(function(key){
			if (opts[key]) {
				this['_' + key] = opts[key];
			}
			delete opts[key];
		}, this);
		if (opts.images){
			this.addImages.apply(this, opts.images);
		}
		return opts;
	},

	_setup: function(){
		var opts = this.options;
		this._orderByFront(this.getCurrent());
		if (opts.autoplay) {
			this.start();
		}
	},

	_setupListeners: function(){
		var self = this;
		var events = {
			'click': 'click',
			'dblclick': 'dblClick',
			'mouseup': 'mouseUp',
			'mousedown': 'mouseDown'
		};
		var proxy = function(event){
			if (event.preventDefault) event.preventDefault();
			event.target = self;
			self.fireEvent(events[event.type], [event]);
		}
		Object.each(events, function(type, domEventName){
			this.getObserver().addEvent(domEventName, proxy);
		}, this);
		this.getObserver().addEvent('mouseout', this._MouseOut.bind(this));
	},

	setContainer: function(container){
		this._container = container;
	},

	getContainer: function(){
		return this._container;
	},

	setObserver: function(observer){
		this._observer = observer;
	},

	getObserver: function(){
		return this._observer;
	},

	setCurrent: function(index){
		if (!this.isValid(index)){
			throw new Error('Specified ' + index + ' is an invalid value.');
		}
		this._current = index;
	},

	getCurrent: function(){
		return this._current;
	},

	isValid: function(index){
		return (index <= 0 || index <= this._elements.length) ? true : false;
	},

	addImage: function(image){
		if (!Type.isObject(image)){
			throw new Error('');
		}
		var element = this.createElement(image);
		var container = this.getContainer();

		element.inject(container);
		this._elements.push(element);
		return this;
	},

	addImages: function(/* mixed */){
		var elements = Array.from(arguments);
		elements.each(function(element){
			this.addImage(element);
		}, this);
		return this;
	},

	hasImage: function(image){
		var result = null;
		this._elements.some(function(element, index){
			var src = element.getElement('img').get('src');
			if (image.image == src) {
				result = index;
				return true;
			} else {
				return false;
			}
		});
		return result;
	},

	removeImage: function(image){
		var index = this.hasImage(image);
		if (!Type.isNumber(index)) {
			return;
		}
		var target = this._elements[index];
		this._elements.erase(target);
		target.destroy();
		return this;
	},

	removeImages: function(/* mixed */){
		var elements = Array.from(arguments);
		elements.each(function(element){
			this.removeImage(element);
		}, this);
		return this;
	},

	getLength: function(){
		return this._elements.length;
	},

	createElement: function(context){
		var li = new Element('li');
		var a = new Element('a', {href: context.url, title: context.title});
		var img = new Element('img', {src: context.image, title: context.title});
		img.inject(a);
		a.inject(li);
		li.store('marker.images.context', context);
		return this.initElement(li);
	},

	initElement: function(element){
		var that = this;
		var opts = this.options;
		element.set('tween', {
			duration: opts.duration,
			onComplete: function() {
				var current = that.getCurrent();
				var element = that._elements[current];
				var context = element.retrieve('marker.images.context');
				that._orderByFront(current);
				that.fireEvent('imageChangeEnd', [current, context]);
				that._next();
			}
		});
		element.addEvent('mouseover', this._MouseOver.bind(this));
		return element;
	},

	_next: function(){
		this._timerId = this._changeImage.delay(this.options.interval, this);
	},

	_changeImage: function() {
		if (this.getLength() <= 0){
			this.stop();
			return;
		}

		var image = this._elements[this.getCurrent()];
		image.setStyle('z-index', 1);

		var index = (this.getCurrent() + 1 < this._elements.length) ? this.getCurrent() + 1 : 0;
		var image = this._elements[index];
		this.setCurrent(index);

		image.setStyle('z-index', 2);
		var tween = image.get('tween');
		tween.start('opacity', 0, 1);

		this.fireEvent('imageChangeStart', [index, image]);
	},

	_orderByFront: function(targetIndex){
		this._elements.each(function(element, index){
			var style = (targetIndex == index) ? { 'z-index': 1, opacity: 1 } : { 'z-index': 0, opacity: 0 };
			element.setStyles(style);
		});
	},

	isStart: function(){
		return (this._started) ? true : false;
	},

	start: function(){
		if (this.isStart()) return;
		this._next();
		this._started = true;
	},

	stop: function(){
		clearTimeout(this._timerId);
		this._started = false;
	},

	_MouseOver: function(event){
		if (this._mouseovered) return false;
		event.target = this;
		this.fireEvent('mouseOver', event);
		this._mouseovered = true;
	},

	_MouseOut: function(event){
		if (!(event.target == this.getContainer() || event.target == this.getObserver())) return false;
		if (!this._mouseovered) return false;
		event.target = this;
		this.fireEvent('mouseOut', event);
		this._mouseovered = false;
	}

});

}(MMap, MMap.Marker));