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
  - MMap/MMap.Utils
  - MMap/MMap.OverlayView

provides: [MMap.Marker]

...
*/

(function($){

var MMap = (this.MMap || {});

MMap.Marker = new Class({

	Extends: MMap.OverlayView,

	options: {
		map: null,
		className: 'marker html',
		title: '',
		content: '',
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

	setup: function(container) {
		var className = this.get('className');
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		var marker = new Element('div', {'class': 'inner'});
		var hd = new Element('div', {'class': 'hd'});
		var bd = new Element('div', {'class': 'bd'});
		var ft = new Element('div', {'class': 'ft'});
		marker.adopt([hd, bd, ft]);

		this.$title = new Element('p', {'class': 'title'});
		this.$content = new Element('div', {'class': 'content'});

		marker.inject(container);
		this.$title.inject(hd);
		this.$content.inject(bd);

		return marker;
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
		this.setTitle(this.get('title'))
			.setContent(this.get('content'))
			.setZIndex(this.get('zIndex'))
			.setVisible(this.get('visible'));
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
		if (typeOf(title) != 'string') {
			new TypeError('The data type is not a character string.');
		}
		this.set('title', title);
		this.$title.set('html', title);
		this.fireEvent("titleChanged");
		return this;
	},

	getContent: function() {
		return this.get('content');
	},

	setContent: function(content){
		if (typeOf(content) != 'string' || typeOf(content) != 'element') {
			new TypeError('The data type is a character string or not an element.');
		}
		this.set('content', content);
		this.$content.set('html', content);
		this.fireEvent("contentChanged");
		return this;
	}

});

}(document.id))