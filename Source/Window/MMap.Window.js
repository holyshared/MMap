/*
---
name: MMap.Window

description: Simple information window.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Function
  - Core/Object
  - Core/Event
  - Core/Browser
  - Core/Class
  - Core/Element
  - Core/Element.Style
  - Core/Element.Event
  - Core/Element.Dimensions
  - MMap/MMap.Core
  - MMap/MMap.OverlayView
  - MMap/MMap.Utils.js

provides: [MMap.Window]

...
*/

(function($){

var MMap = (this.MMap || {});

var	_offsetY = 15;

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
		self.addEvent('click', function(event){
			if (event.target == self._closeButton) {
				self.close();
				self.fireEvent('close');
			}
		});
	},

	_init: function(){
		var self = this;
		var props = ['title', 'content', 'position', 'zIndex', 'visible'];
		props.each(function(key){
			self.set(key, self.options[key]);
		});
	},

	draw: function(){
		if (!this.isAdded() || !this.isOpen()) return this;

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

		var point = new google.maps.Point(xy.x, xy.y - offset);
		var latlng = projection.fromDivPixelToLatLng(point);

		this.getMap().panTo(latlng);
		this.refresh();
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

	getPosition: function() {
		return this.get('position');
	},

	setPosition: function(position){
		if (!instanceOf(position, google.maps.LatLng)) {
			new TypeError('The data type is not an Latlng.');
		}
		this.set('position', position);
		this.draw();
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
		this.refresh();
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
		this.refresh();
		return this;
	}

});

}(document.id));