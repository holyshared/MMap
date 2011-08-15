/*
---
name: MMap.Window

description: Simple information window.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Position
  - MMap/MMap.OverlayView

provides: [MMap.Window]

...
*/

(function(MMap, maps){

var	_offsetY = 15;

MMap.Window = new Class({

	Extends: MMap.OverlayView,

	Implements: [MMap.Position],

	options: {
		className: 'window windowDefault',
		title: '',
		content: '',
		zIndex: 0,
		visible: true,
		active: false
		/*
			onOpen: $empty
			onClose: $empty
			onVisibleChanged: $empty
			onZIndexChanged: $empty
			onPositionChanged: $empty,
			onTitleChanged: $empty,
			onContentChanged: $empty
		*/
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		var className = this.options.className;
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		var win = new Element('div', {'class': 'inner'});
		var hd = new Element('div', {'class': 'hd'});
		var bd = new Element('div', {'class': 'bd'});
		var ft = new Element('div', {'class': 'ft'});
		win.adopt([hd, bd, ft]);
		win.inject(container);

		var hdgroup = new Element('div', {'class': 'hdgroup'});
		hdgroup.inject(hd);

		var close = new Element('p', {'class': 'close'});
		this._title = new Element('p', {'class': 'title'});

		hdgroup.adopt([ this._title, close ]);

		this._closeButton = new Element('a', {title: 'Close', href: '#', html: 'Close'});
		this._closeButton.inject(close);

		this._content = new Element('div', {'class': 'content'});
		this._content.inject(bd);

		return win;
	},

	_setupListeners: function(){
		var self = this;
		var win = this.toElement();
		this._closeButton.addEvent('click', function(event){
			self.close();
			self.fireEvent('close');
		});
	},

	_init: function(){
		var self = this;
		var props = ['title', 'content', 'position', 'zIndex', 'visible', 'active'];
		props.each(function(key){
			self.set(key, self.options[key]);
		});
	},

	draw: function(){
		if (!this.isAdded() || !this.isOpen()) return this;

		this.refresh();

		var anchorHeight = 0;
		if (this._anchor) {
			var anchor = this._anchor;
			var instance = anchor.instance;
			anchorHeight = instance.getSize().y;
		}
		var projection = this.getProjection();
		var position = this.get('position');

		var size = this.instance.getSize();
		var xy = projection.fromLatLngToDivPixel(position);
		var top = xy.y - size.y - anchorHeight;
		var left = xy.x - (size.x / 2);
		var styles = {
			position: 'absolute',
			left: left,
			top: top
		};
		this.instance.setStyles(styles);

		var offset = 0;
		if (top < _offsetY && top >= 0) {
			offset = _offsetY - top;
		} else if (top <= 0) {
			offset = Math.abs(top) + _offsetY;
		}

		var point = new maps.Point(xy.x, xy.y - offset);
		var latlng = projection.fromDivPixelToLatLng(point);

		this.getMap().panTo(latlng);
	},

	refresh: function(){
		if (!this.isAdded()) return this;
		this._updateVisibleState();
		this._update();
	},

	_updateVisibleState: function(){
		this.setZIndex(this.get('zIndex'))
		.setVisible(this.get('visible'));
	},

	_update: function(){
		this._title.set('html', this.get('title'));
		this._content.set('html', this.get('content'));
	},

	open: function(map, anchor){
		this._anchor = anchor;
		this.setPosition(anchor.getPosition());
		if (this.isOpen()) return;
		this.setMap(map);
		this.fireEvent('open');
		this._opened = true;
	},

	close: function(){
		this._opened = false;
		this.fireEvent('close');
		this.setMap(null);
	},

	isOpen: function(){
		return (this._opened) ? true : false;
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	setZIndex: function(index){
		if (!Type.isNumber(index)) new TypeError('The data type is not an integer.');
		this.set('zIndex', index);
		var container = this.toElement();
		container.setStyle('z-index', index);
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
		this.draw();
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
		this.draw();
		return this;
	},

	setActive: function(value) {
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('active', value);
		var container = this.toElement();
		if (value) {
			this.fireEvent('active');
			container.addClass('active');
		} else {
			container.removeClass('active');
		}
		return this;
	}

});

}(MMap, google.maps));