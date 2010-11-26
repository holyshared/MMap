(function($){

var MMap = (this.MMap || {});


MMap.MarkerManager = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
		map: null,
		bounds: null,
		markers: []
	},

	initialize: function(options) {
		var subclass = this;
		subclass = Object.append(new google.maps.MVCObject(), subclass);
		for (var k in subclass) { this[k] = subclass[k]; };
		this.setOptions(options);
		this._setup();
	},

	_setup: function(){
		this.set('container', new MMap.Container());
		this.addMarkers(this.get('markers'));
		var bounds = (!this.get('bounds')) ? this.getMap().getBounds() : this.get('bounds');
		this.setBounds(bounds);
	},
	
	addMarker: function(marker){
		var container = this.getMarkers();
		container.addItem(markers[i]);
	},

	addMarkers: function(markers){
		for (var i = 0; i < 10; i++) {
			this.addMarker(markers[i]);
		}
	},

	getMarkers: function() {
		return this.get('container');
	},

	setBounds: function(bounds) {
		var current = this.getBounds();
		if (current == bounds) return;
		this.set('bounds', bounds);
		this.set('displayMarkers', this._getDisplayMarkers());
	},

	getBounds: function() {
		return this.get('bounds');
	},

	getDisplayMarkers: function() {
		return this.get('displayMarkers');
	},

	_getDisplayMarkers: function() {
		var markers = this.getMarkers();
		var bounds = this.getBounds();
		var displayMarkers = [];
		while(markers.isValid()) {
			var marker = markers.getCurrent();
			displayMarkers.push(marker);
			markers.next();
		}
		return displayMarkers;
	},

	hasDisplayMarkers: function() {
		return (this.getDisplayMarkers()) ? true : false;
	},

	hasMarker: function() {
	},

	_setActivate: function(marker, closer) {
		var markers = this.getMarkers();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setActive(closer(marker, current));
			markers.next();
		}
	},

	activate: function(marker) {
		this._setActivate(marker, function(target, current){
			return (target == current) ? true : false;
		});
	},

	deactivate: function(marker) {
		this._setActivate(marker, function(target, current){
			return (target == current) ? false : true;
		});
	}

});

}(document.id))