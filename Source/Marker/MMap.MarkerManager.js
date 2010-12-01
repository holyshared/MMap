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
	onStateChanged
*/
	},

	initialize: function(options) {
		var subclass = this;
		subclass = Object.append(new google.maps.MVCObject(), subclass);
		for (var k in subclass) { this[k] = subclass[k]; };
		this._container = new MMap.Container();
		this.setOptions(options);
		this._setup();
	},

	_setup: function(){
		var markers = {
			visibleMarkers: [],
			hiddenMarkers: [],
			activeMarkers: [],
			deactiveMarkers: []
		};
		this.addMarkers(this.options.markers);
		this.set('state', markers);
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
		return this._container;
	},

	getState: function(){
		var state = this.get('state');
		return state;
	},

	_displayMarkerChange: function() {
		var markers = this.getMarkers().rewind();
		var visibleMarkers = [], hiddenMarkers = [], activeMarkers = [], deactiveMarkers = [];
		while(markers.isValid()) {
			var marker = markers.getCurrent();
			(marker.isVisible())
			? visibleMarkers.push(marker) : hiddenMarkers.push(marker);

			(marker.isActive())
			? activeMarkers.push(marker) : deactiveMarkers.push(marker);
			markers.next();
		}
		var markers = {
			visibleMarkers: visibleMarkers,
			hiddenMarkers: hiddenMarkers,
			activeMarkers: activeMarkers,
			deactiveMarkers: deactiveMarkers
		};
		return this.set('state', markers);
	},

	hasDisplayMarkers: function() {
		var state = this.getState();
		return (state.visibleMarkers > 0) ? true : false;
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

	active: function() {
		var target = Array.from(arguments).shift(), args = [];
		(target) ? args.push(target) : args.push(null);
		var helper = this._getStateChangeHelper.apply(this, args);
		args.push(helper);
		this._activeMarkers.apply(this, args);
		this._displayMarkerChange();
	},

	visible: function(){
		var target = Array.from(arguments).shift(), args = [];
		(target) ? args.push(target) : args.push(null);
		var helper = this._getStateChangeHelper.apply(this, args);
		args.push(helper);
		this._visibleMarkers.apply(this, args);
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
		var helper = function (target, current) { return true; };
		if (target instanceof google.maps.LatLngBounds) {
			this.setBounds(target);
			helper = function(target, current){
				return target.contains(current.getPosition());
			};
		} else if (instanceOf(target, MMap.BaseMarker)
			|| target instanceof google.maps.Marker) {
			helper = function(target, current){
				return (target == current) ? true : false;
			};
		}
		return helper;
	}

});

}(document.id));