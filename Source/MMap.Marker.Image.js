(function($){

var MMap = (this.MMap || {});
MMap.Marker = (this.MMap.Marker || {});

MMap.Marker.Image = new Class({

	Extends: MMap.Marker,

	options: {
		map: null,
		className: 'imageMarker',
		title: '',
		src: '',
		url: '',
		zIndex: 0
	},

	initialize: function(options) {
		this.parent(options);
	},

	buildBody: function(container) {

		var className = this.get('className');
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		var marker = new Element('div', {'class': 'body'});
		var photo = new Element('p', {'class': 'photo'});

		this.anchor = new Element('a', {
			'title': this.get('title'),
			'href': this.get('url')
		});
		this.image = new Element('img', {'src': this.get('src')});

		marker.inject(container);

		photo.inject(marker);
		this.anchor.inject(photo);
		this.image.inject(this.anchor);

		return marker;
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
		this.set('title', title);
		this.image.set('title', title);
		this.anchor.set('title', title);
	},

	setImage: function(src){
		this.set('src', src);
		this.image.set('src', src);
	},

	setURL: function(url){
		this.set('url', url);
		this.anchor.set('href', url);
	}
});

}(document.id))