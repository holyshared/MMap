(function($){

var MMap = (this.MMap || {});
MMap.Marker = (this.MMap.Marker || {});

MMap.Marker.Image = this.MMap.Marker.Image = new Class({

	Extends: MMap.Marker,

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
		var className = this.options.className;
		container.addClass(className);
		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);
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

	_init: function(){
		var self = this;
		var props = ['title', 'image', 'url', 'position', 'zIndex', 'visible'];
		props.each(function(key){
			self.set(key, self.options[key]);
		});
	},

	_update: function(){
		this.setTitle(this.get('title'))
		.setImage(this.get('image'))
		.setURL(this.get('url'));
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
		if (this.get('title') == title) return this;
		this.set('title', title);
		this._image.set('title', title);
		this._anchor.set('title', title);
		return this;
	},

	setImage: function(image){
		if (this.get('image') == image) return this;
		this.set('image', image);
		this._image.set('src', image);
		return this;
	},

	setURL: function(url){
		if (this.get('url') == url) return this;
		this.set('url', url);
		this._anchor.set('href', url);
	}

});

}(document.id))