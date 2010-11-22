(function($){

var MMap = (this.MMap || {});
MMap.Marker = (this.MMap.Marker || {});

MMap.Marker.Images = this.MMap.Marker.Images = new Class({

	Extends: MMap.Marker,

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
		this._images = [];
		this._stack = [];
		this._index = 0;
	},

	_setup: function(container){

		this.addEvent('add', this._onPrepare.bind(this));

		var className = this.get('className');
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		this._photos = new Element('ul', {'class': 'photos'});
		this._photos.inject(container);

		var images = this.get('images');
		if (images && typeOf(images) == 'array') {
			this.addImages(images);
		}
		return this._photos;
	},

	_update: function(){
	},

	_onPrepare: function(){
		for (var i = 0; l = this._stack.length, i < l; i++) {
			var image = this._stack[i];
			image.inject(this._photos);
		}
		delete this._stack;
		var index = this.get('defaultIndex');
		this.setCurrent(index);
		this.next.delay(this.get('interval'), this);
	},

	setCurrent: function(index){
		var i = length = this._images.length, image = null, style = {};
		for (i = 0; i < length; i++) {
			image = this._images[i];
			if (i == index) {
				style = { 'z-index': 1, opacity: 1 };
			} else {
				style = { 'z-index': 0, opacity: 0 };
			}
			image.setStyles(style);
		}
		this._index = index;
	},

	next: function() {
		var self = this;
		var image = this._images[this._index];
		image.setStyle('z-index', 1);
		this._index = (this._index + 1 < this._images.length) ? this._index + 1 : 0;
		var image = this._images[this._index];
		image.setStyle('z-index', 2);
		var tween = image.get('tween');
		tween.start('opacity', 0, 1);
	},

	addImage: function(image){
		var li = new Element('li');
		var a = new Element('a', {href: image.url, title: image.title});
		var img = new Element('img', {src: image.src, title: image.title});
		img.inject(a);
		a.inject(li);

		var self = this;
		li.set('tween', {
			duration: this.get('duration'),
			onComplete: function() {
				self.setCurrent(self._index);
				self.next.delay(self.get('interval'), self);
			}
		});
		this._images.push(li);
		if (this.get('added') === false) {
			this._stack.push(li);
			return this;
		}
		li.inject(this._photos);
	},

	addImages: function(images){
		var i = length = images.length;
		for (i = 0; i < length; i++) {
			this.addImage(images[i]);
		}
	}

});

}(document.id))