(function($){

var MMap = (this.MMap || {});
MMap.Marker = (this.MMap.Marker || {});

MMap.Marker.Image = this.MMap.Marker.Image = new Class({

	Extends: MMap.Marker,

	options: {
		map: null,
		className: 'marker image imageDefault',
		title: '',
		src: '',
		url: '',
		position: null,
		zIndex: 0,
		visible: true
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		var className = this.get('className');
		container.addClass(className);
		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);
		var photo = new Element('p', {'class': 'photo'});
		this.anchor = new Element('a', {
			'title': this.get('title'),
			'href': this.get('url')
		});
		this.image = new Element('img', {'src': this.get('src')});
		photo.inject(container);
		this.anchor.inject(photo);
		this.image.inject(this.anchor);
		return photo;
	},

	_update: function(){
		this.setTitle(this.get('title'))
		.setImage(this.get('src'))
		.setURL(this.get('url'));
	},

	getTitle: function() {
		return this.get('title');
	},

	getImage: function() {
		return this.get('src');
	},

	getURL: function() {
		return this.get('url');
	},

	setTitle: function(title){
		if (this.get('title') == title) return this;
		this.set('title', title);
		this.image.set('title', title);
		this.anchor.set('title', title);
		this.notify('title');
		return this;
	},

	setImage: function(src){
		if (this.get('src') == src) return this;
		this.set('src', src);
		this.image.set('src', src);
		this.notify('image');
		return this;
	},

	setURL: function(url){
		if (this.get('url') == url) return this;
		this.set('url', url);
		this.anchor.set('href', url);
		this.notify('url');
	}
});

}(document.id))