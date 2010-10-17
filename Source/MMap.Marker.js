(function($){

var MMap = (this.MMap || {});

MMap.Marker = new Class({

	Extends: MMap.OverlayView,

	options: {
		map: null,
		className: 'marker',
		title: '',
		content: '',
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
		var header = new Element('div', {'class': 'header'});
		var footer = new Element('div', {'class': 'footer'});

		marker.inject(container);

		header.inject(marker, 'before');
		footer.inject(marker, 'after');

		return marker;
	},

	getPosition: function() {
		return this.get('position');
	},

	getTitle: function() {
		return this.get('title');
	},

	getContent: function() {
		return this.get('content');
	},

	setPosition: function(position){
		if (!instanceOf(position, google.maps.Latlng)) {
			new TypeError('aaa');
		}
		this.set('position', position);
		this.draw();
	},

	setTitle: function(title){
		this.set('title', title);
		this.title.set('html', title);
	},

	setContent: function(content){
		this.set('content', content);
		this.content.set('html', title);
	}

});

}(document.id))