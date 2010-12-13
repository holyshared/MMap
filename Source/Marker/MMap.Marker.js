/*
---
name: MMap.Marker

description: A general marker who can display the title and the content can be used.

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
  - MMap/MMap.Utils
  - MMap/MMap.OverlayView

provides: [MMap.Marker, MMap.BaseMarker]

...
*/

(function($){

var MMap = (this.MMap || {});

MMap.BaseMarker = new Class({

	Extends: MMap.OverlayView,

	options: {
		map: null,
		className: 'marker markerDefault',
		position: '',
		zIndex: null,
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
		*/
	},

	initialize: function(options) {
		this.parent(options);
	},

	_init: function(){
		var self = this;
		var props = ['position', 'zIndex', 'visible'];
		props.each(function(key){
			var value = self.options[key];
			self.set(key, value);
			delete self.options[key];
		});
	},

	_setup: function(container){
		var zIndex = this.get('zIndex');
		if (!zIndex){
			var projection = this.getProjection();
			var position = this.get('position');
			var xy = projection.fromLatLngToDivPixel(position);
			this.setZIndex(xy.y);
		} else {
			this.setZIndex(zIndex);
		}
	},

	_updateVisibleState: function(){
		this.setZIndex(this.get('zIndex'))
		.setVisible(this.get('visible'));
	},

	_update: function(){
	},

	draw: function(){
		if (!this.isAdded()) return;
		var projection = this.getProjection();
		var position = this.get('position');
		var size = this.instance.getSize();
		var xy = projection.fromLatLngToDivPixel(position);
		var styles = {
			position: 'absolute',
			left: xy.x -(size.x / 2),
			top: xy.y - size.y
		};
		this.instance.setStyles(styles);
		this.refresh();
	},

	refresh: function(){
		if (!this.isAdded()) return;
		this._updateVisibleState();
		this._update();
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	setZIndex: function(index){
		if (!Type.isNumber(index)) new TypeError('The data type is not an integer.');
		this.set('zIndex', index);
		var container = this._getInstance();
		container.setStyle('z-index', index);
		return this;
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
	}

});


MMap.Marker = new Class({

	Extends: MMap.BaseMarker,

	options: {
		map: null,
		className: 'marker markerDefault',
		title: '',
		content: '',
		position: '',
		zIndex: null,
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
		this.parent(container);

		var className = this.options.className;
		container.addClass(className);

		var marker = new Element('div', {'class': 'inner'});
		var hd = new Element('div', {'class': 'hd'});
		var bd = new Element('div', {'class': 'bd'});
		var ft = new Element('div', {'class': 'ft'});
		marker.adopt([hd, bd, ft]);

		this._title = new Element('p', {'class': 'title'});
		this._content = new Element('div', {'class': 'content'});

		marker.inject(container);
		this._title.inject(hd);
		this._content.inject(bd);

		return marker;
	},

	_setupListeners: function(){
		var self = this;
		var marker = this._getInstance();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		}
		var events = ['click', 'dblclick', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
		});
	},

	_init: function(){
		this.parent();
		var self = this;
		var props = ['title', 'content'];
		props.each(function(key){
			self.set(key, self.options[key]);
			delete self.options[key];
		});
	},

	_update: function(){
		this._title.set('html', this.get('title'));
		this._content.set('html', this.get('content'));
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
MMap.Marker.Html = MMap.Marker;

}(document.id));