(function($){

var MMap = (this.MMap || {});
	
MMap.OverlayView = new Class({

	Implements: [MMap.Events, MMap.Options],

	initialize: function(options){
		var subclass = this;
		subclass = Object.append(new google.maps.OverlayView(), subclass);
		for (var k in subclass) {
			this[k] = subclass[k];
		}
		this.setOptions(options);
	},

	build: function(){
		var panel = this.getPanes().overlayImage;
		this.instance = this.buildWarpper();
		this.body = this.buildBody(this.instance);
		this.instance.inject(panel);
	},

	buildWarpper: function() {
		return new Element('div', {'class': 'ovarlayView'});
	},

	//abstract method
	buildBody: function(container){
	},

	getWarpper: function(){
		return this.instance;
	},

	draw: function(){
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
	},

	onAdd: function(){
		this.build();
	},

	onRemove: function(){
		this.removeEvents();
		this.container.destory();
	},

	getVisible: function() {
		return this.get('visible');
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	setVisible: function(value){
		this.set('visible', value);
		var container = this.getWarpper();
		if (value) {
			container.setStyle('display', '');
		} else {
			container.setStyle('display', 'none');
		}
	},

	setZIndex: function(index){
		this.set('zIndex', index);
		var container = this.getWarpper();
		container.setStyle('z-index', index);
	}

});

}(document.id))