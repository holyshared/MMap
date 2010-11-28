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
		active: false,
/*
		onClick
		onDblClick
		onMouseover
		onMouseout
		onMouseup
		onMousedown
		onVisibleChanged
		onZIndexChanged
		onActive
		onDeactive
*/
	},

	initialize: function(options){
		var subclass = this;
		subclass = Object.append(new google.maps.OverlayView(), subclass);
		for (var k in subclass) {
			this[k] = subclass[k];
		}
		this.instance = this._getInstance();
		this.setOptions(options);
		this.set('added', false);
	},

	build: function(){
		var panel = this.getPanes().overlayImage;
		this.body = this._setup(this._getInstance());
		this._getInstance().inject(panel);
		this._setupListeners();
		this.set('added', true);
		this.fireEvent("add");
	},

	_getInstance: function() {
		if (!this.instance) {
			this.instance = new Element('div', {'class': 'ovarlayView'});
		}
		return this.instance;
	},

	//abstract method
	_setup: function(container){
	},

	//abstract method
	_setupListeners: function(){
	},

	//abstract method
	draw: function(){
	},

	onAdd: function(){
		this.build();
	},

	onRemove: function(){
		this.removeEvents();
		this.unbindAll();
		this.instance.destroy();
		delete this.instance;
		this.set('added', false);
	},

	getVisible: function() {
		return this.get('visible');
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	isAdded: function() {
		return this.get('added');
	},

	isVisible: function() {
		return this.get('visible');
	},

	isActive: function() {
		return this.get('active');
	},

	setVisible: function(value){
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		if (value == this.get('visible')) return this;
		this.set('visible', value);
		var container = this._getInstance();
		if (value) {
			container.setStyle('display', '');
		} else {
			container.setStyle('display', 'none');
		}
		this.notify('visible');
		return this;
	},

	setZIndex: function(index){
		if (!Type.isNumber(index)) new TypeError('The data type is not an integer.');
		if (index == this.get('zIndex')) return this;
		this.set('zIndex', index);
		var container = this._getInstance();
		container.setStyle('z-index', index);
		this.notify('zindex');
		return this;
	},

	setActive: function(value) {
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		if (value == this.get('active')) return this;
		this.set('active', value);
		var container = this._getInstance();
		if (value) {
			container.addClass('active');
		} else {
			container.removeClass('active');
		}
		this.notify('active');
		return this;
	}

});

}(document.id))