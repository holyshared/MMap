(function($){

var MMap = (this.MMap || {});

MMap.Window = new Class({

	Extends: MMap.OverlayView,

	options: {
		className: 'window windowDefault',
		title: '',
		content: '',
		position: '',
		zIndex: 0,
		visible: true
		/*
			onClick: $empty
			onDblClick: $empty
			onMouseover: $empty
			onMouseout: $empty
			onMouseup: $empty
			onMousedown: $empty
			onVisibleChanged: $empty
			onzIndexChanged: $empty
			onPositionChanged: $empty,
			onTitleChanged: $empty,
			onContentChanged: $empty
		*/
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		var className = this.get('className');
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		var window = new Element('div', {'class': 'inner'});
		var hd = new Element('div', {'class': 'hd'});
		var bd = new Element('div', {'class': 'bd'});
		var ft = new Element('div', {'class': 'ft'});
		window.adopt([hd, bd, ft]);

		this._title = new Element('p', {'class': 'title'});
		this._content = new Element('div', {'class': 'content'});

		window.inject(container);
		this._title.inject(hd);
		this._content.inject(bd);

		return window;
	},

	draw: function(){
		if (this.get('added') === false) {
			return this;
		}

		var projection = this.getProjection();
		var position = this.get('position');
		var size = this.instance.getSize();
		var xy = projection.fromLatLngToDivPixel(position);
		var styles = {
			position: 'absolute',
			left: xy.x -(size.x / 2),
			top: xy.y -(size.y / 2)
		};
		this.instance.setStyles(styles);
		this.refresh();
	},

	refresh: function(){
		this._updateVisibleState();
		this._update();
	},

	_updateVisibleState: function(){
		this.setZIndex(this.get('zIndex'))
		.setVisible(this.get('visible'));
	},

	_update: function(){
		this.setTitle(this.get('title'))
		.setContent(this.get('content'));
	},

	open: function(map, anchor){
		this.set('anchor', anchor);
		this.setPosition(anchor.getPosition());
		this.setMap(map);
	},

	close: function(){
		this.setMap(null);
	},

	getPosition: function() {
		return this.get('position');
	},

	setPosition: function(position){
		if (!instanceOf(position, google.maps.LatLng)) {
			new TypeError('The data type is not an Latlng.');
		}
		this.set('position', position);
		this.draw();
		this.fireEvent("positionChanged");
		return this;
	},

	getTitle: function() {
		return this.get('title');
	},

	setTitle: function(title){
		if (!Type.isString(title)) {
			new TypeError('The data type is not a character string.');
		}
		this.set('title', title);
		this._title.set('html', title);
		this.fireEvent("titleChanged");
		return this;
	},

	getContent: function() {
		return this.get('content');
	},

	setContent: function(content){
		if (!Type.isString(content) || !Type.isElement(content)) {
			new TypeError('The data type is a character string or not an element.');
		}
		this.set('content', content);
		this._content.set('html', content);
		this.fireEvent("contentChanged");
		return this;
	}

});

}(document.id))