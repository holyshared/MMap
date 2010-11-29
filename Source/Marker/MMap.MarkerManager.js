(function($){

var MMap = (this.MMap || {});

MMap.MarkerManager = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
		map: null,
		zoom: null,
		bounds: null,
		markers: []
/*
	onZoomChanged
	onBoundsChanged
	onDisplayMarkersChanged
*/
	},

	initialize: function(options) {
		var subclass = this;
		subclass = Object.append(new google.maps.MVCObject(), subclass);
		for (var k in subclass) { this[k] = subclass[k]; };
		this.set('container', new MMap.Container());
		this.setOptions(options);
		this._setup();
	},

	_setup: function(){
		this.addMarkers(this.get('markers'));
		this.set('displayMarkers', this.getMarkers().getItems());
		this.set('hiddenMarkers', []);
		this.set('activeMarkers', []);
		this.set('deactiveMarkers', []);
		this.bindTo('bounds', this.getMap(), 'bounds');
		this.bindTo('zoom', this.getMap(), 'zoom');
		this.defaultBounds = function(){
			if (!this.get('bounds')) {
				var bounds = this.getMap().getBounds();
				this.setBounds(bounds);
			}
			this.removeEvent('boundsChanged', this.defaultBounds);
		};
		this.defaultZoom = function(){
			if (!this.get('zoom')) {
				var zoom = this.getMap().getZoom();
				this.setZoom(zoom);
			}
			this.removeEvent('zoomChanged', this.defaultZoom);
		};
		this.addEvent('zoomChanged', this.defaultZoom);
		this.addEvent('boundsChanged', this.defaultBounds);
	},

	setMap: function(map) {
		var markers = this.getMarkers().rewind();
		this.set('map', map);
		while(markers.isValid()) {
			var marker = markers.getCurrent();
			marker.setMap(map);
			markers.next();
		}
	},

	getMap: function() {
		return this.get('map');
	},

	addMarker: function(marker){
		var container = this.getMarkers();
		container.addItem(marker);
		marker.setMap(this.getMap());
	},

	addMarkers: function(markers){
		for (var i = 0; l = markers.length, i < l; i++) {
			this.addMarker(markers[i]);
		}
	},

	removeMarker: function(marker){
		var container = this.getMarkers();
		container.removeItem(marker);
		marker.setMap(null);
	},

	removeMarkers: function(markers){
		var marker = null;
		while(markers.length > 0) {
			marker = markers.shift();
			this.removeMarker(marker);
		}
	},

	setZoom: function(zoom) {
		var current = this.getZoom();
		if (current == zoom) return;
		this.set('zoom', zoom);
		this._displayMarkerChange();
	},

	getZoom: function(){
		return this.get('zoom');
	},

	setBounds: function(bounds) {
		var current = this.getBounds();
		if (current == bounds) return;
		this.set('bounds', bounds);
		this._displayMarkerChange();
	},

	getBounds: function() {
		return this.get('bounds');
	},

	getMarkers: function() {
		return this.get('container');
	},

	getVisibleMarkers: function() {
		return this.get('displayMarkers');
	},

	getHiddenMarkers: function() {
		return this.get('hiddenMarkers');
	},

	getActiveMarkers: function() {
		return this.get('activeMarkers');
	},

	getDeactiveMarkers: function() {
		return this.get('deactiveMarkers');
	},

	_displayMarkerChange: function() {
		var markers = this.getMarkers().rewind();
		var displayMarkers = [], hiddenMarkers = [], activeMarkers = [], deactiveMarkers = [];
		while(markers.isValid()) {
			var marker = markers.getCurrent();
			(marker.isVisible())
			? displayMarkers.push(marker) : hiddenMarkers.push(marker);

			(marker.isActive())
			? activeMarkers.push(marker) : deactiveMarkers.push(marker);
			markers.next();
		}
		this.set('displayMarkers', displayMarkers);
		this.set('hiddenMarkers', hiddenMarkers);
		this.set('activeMarkers', activeMarkers);
		this.set('deactiveMarkers', deactiveMarkers);
		return displayMarkers;
	},

	hasDisplayMarkers: function() {
		return (this.getVisibleMarkers()) ? true : false;
	},

	hasMarker: function(marker) {
		var findMaker = false;
		var markers = this.getMarkers().rewind();
		while(markers.isValid()) {
			if (marker == markers.getCurrent()) {
				findMaker = true;
			}
			markers.next();
		}
		return findMaker;
	},

	active: function(target) {
		var helper = this._getStateChangeHelper(target);
		this._activeMarkers(target, helper);
		this._displayMarkerChange();
	},

	visible: function(target){
		var helper = this._getStateChangeHelper(target);
		this._visibleMarkers(target, helper);
		this._displayMarkerChange();
	},

	_activeMarkers: function(target, closer) {
		var markers = this.getMarkers().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setActive(closer(target, current));
			markers.next();
		}
	},

	_visibleMarkers: function(target, closer) {
		var markers = this.getMarkers().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setVisible(closer(target, current));
			markers.next();
		}
	},

	_getStateChangeHelper: function(target) {
		var helper = null;
		if (target instanceof google.maps.LatLngBounds) {
			this.setBounds(target);
			helper = function(target, current){
				return target.contains(current.getPosition());
			};
		} else if (instanceOf(target, MMap.Marker)) {
			helper = function(target, current){
				return (target == current) ? true : false;
			};
		}
		return helper;
	}

});

}(document.id));