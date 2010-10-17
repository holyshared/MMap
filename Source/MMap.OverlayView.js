/*
---
name: MMap.OverlayView

description: Overlayview that can be treated like Mootools.
An original marker and the information window can be defined by making this class a subclass.

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

provides: [MMap.OverlayView]

...
*/

(function($){

var MMap = (this.MMap || {});
	
MMap.OverlayView = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
		map: null,
		zIndex: 0,
		visible: true,
/*
		onClick
		onDblClick
		onMouseover
		onMouseout
		onMouseup
		onMousedown
		onVisibleChanged: $empty
		onzIndexChanged: $empty
*/
	},

	initialize: function(options){
		var subclass = this;
		subclass = Object.append(new google.maps.OverlayView(), subclass);
		for (var k in subclass) {
			this[k] = subclass[k];
		}
		this.instance = this.getInstance();
		this.setOptions(options);
	},

	build: function(){
		var panel = this.getPanes().overlayImage;
		this.body = this.setup(this.getInstance());
		this.getInstance().inject(panel);
	},

	getInstance: function() {
		if (!this.instance) {
			this.instance = new Element('div', {'class': 'ovarlayView'});
		}
		return this.instance;
	},

	//abstract method
	setup: function(container){
	},

	//abstract method
	draw: function(){
	},

	onAdd: function(){
		this.build();
	},

	onRemove: function(){
		this.removeEvents();
		this.unbindall();
		this.container.destory();
	},

	getVisible: function() {
		return this.get('visible');
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	setVisible: function(value){
		if (typeOf(value) != 'boolean') new TypeError('The data type is not an boolean.');
		this.set('visible', value);
		var container = this.getInstance();
		if (value) {
			container.setStyle('display', '');
		} else {
			container.setStyle('display', 'none');
		}
		this.fireEvent('visibleChanged');
		return this;
	},

	setZIndex: function(index){
		if (typeOf(index) != 'number') new TypeError('The data type is not an integer.');
		this.set('zIndex', index);
		var container = this.getInstance();
		container.setStyle('z-index', index);
		this.fireEvent('zIndexChanged');
		return this;
	}

});

}(document.id))