/*
---
name: MMap.OverlayView

description: Overlayview that can be treated like Mootools. An original marker and the information window can be defined by making this class a subclass.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Object
  - Core/Class
  - Core/Element
  - Core/Element.Style
  - MMap/MMap
  - MMap/MMap.Options
  - MMap/MMap.Events

provides: [MMap.OverlayView]

...
*/

(function(){

var MMap = (this.MMap || {});

MMap.OverlayView = new Class({

	Implements: [google.maps.OverlayView, MMap.Events, MMap.Options],

	options: {
		map: null,
		zIndex: 0,
		visible: true,
		active: false
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
		this.instance = this._getInstance();
		this.setOptions(options);
		this._added = false;
		this._init();
	},

	build: function(){
		var panel = this.getPanes().overlayImage;
		this.body = this._setup(this._getInstance());
		this._getInstance().inject(panel);
		this._setupListeners();
		this._added = true;
		this.fireEvent("add");
	},

	_getInstance: function() {
		if (!this.instance) {
			this.instance = new Element('div', {'class': 'ovarlayView'});
		}
		return this.instance;
	},

	toElement: function() {
		return this._getInstance();
	},

	//abstract method
	_setup: function(container){
	},

	//abstract method
	_setupListeners: function(){
	},

	_init: function(){
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
		this._added = false;
	},

	getVisible: function() {
		return this.get('visible');
	},

	isAdded: function() {
		return this._added;
	},

	isVisible: function() {
		return this.get('visible');
	},

	isActive: function() {
		return this.get('active');
	},

	setVisible: function(value){
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('visible', value);
		var container = this._getInstance();
		if (value) {
			container.setStyle('display', '');
		} else {
			container.setStyle('display', 'none');
		}
		return this;
	},

	setActive: function(value) {}

});

}());