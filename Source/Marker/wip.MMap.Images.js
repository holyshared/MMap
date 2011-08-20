(function(){

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
		['observer', 'container', '_current'].each(function(key){
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
	},

	addImages: function(/* mixed */){
		var elements = Array.from(arguments);
		elements.each(function(element){
			this.addImage(element);
		}, this);
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
	},

	removeImages: function(/* mixed */){
		var elements = Array.from(arguments);
		elements.each(function(element){
			this.removeImage(element);
		}, this);
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
		return this.initElement(li);
	},

	initElement: function(element){
		var that = this;
		var opts = this.options;
		element.set('tween', {
			duration: opts.duration,
			onComplete: function() {
				var current = that.getCurrent();
				that._orderByFront(current);
				that.fireEvent('complete', current);
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

}());