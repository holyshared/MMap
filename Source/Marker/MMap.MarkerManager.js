/*
---
name: MMap.MarkerManager

description: The marker displayed in the map is managed.

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

provides: [MMap.MarkerManager]

...
*/

(function($){

var MMap = (this.MMap || {});

MMap.MarkerManager = new Class({

	Extends: MMap.MVCObject,

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
		this._container = new MMap.Container();
		this.setOptions(options);
		this._setup();
		this._init();
	},

	_setup: function(){
		var markers = {
			visibles: [],
			hiddens: [],
			actives: [],
			deactives: []
		};
		this.addMarkers(this.options.markers);
		this.set('state', markers);
		delete this.options.markers;
	},

	_init: function(){
		var self = this;
		var props = ['zoom', 'bounds'];
		props.each(function(key){
			var value = self.options[key];
			self.set(key, value);
			delete self.options[key];
		});
	},

	setMap: function(map) {
		var markers = this.getContainer().rewind();
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
		var container = this.getContainer();
		container.addItem(marker);
		marker.setMap(this.getMap());
	},

	addMarkers: function(markers){
		for (var i = 0; l = markers.length, i < l; i++) {
			this.addMarker(markers[i]);
		}
	},

	removeMarker: function(marker){
		var container = this.getContainer();
		container.removeItem(marker);
		marker.setMap(null);
	},

	removeMarkers: function(){
		var marker = null, markers = [], args = Array.from(arguments);
		if ((args.length <= 0)) { args = this.getContainer().getItems(); };
		while (args.length > 0) {
			markers.push(args.shift());
		};
		markers = markers.flatten();
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

	getContainer: function() {
		return this._container;
	},

	getMarkers: function() {
		return this.getContainer().getItems();
	},

	setMarkers: function(markers) {
		var l = markers.length, items = [];
		for(var i = 0; i < l; i++){
			items.push(markers[i]);
		}
		this.getContainer().empty();
		this.addMarkers(items);
		this._displayMarkerChange();
	},

	getState: function(){
		var state = this.get('state');
		return state;
	},

	_displayMarkerChange: function() {
		var markers = this.getContainer().rewind();
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
			visibles: visibleMarkers,
			hiddens: hiddenMarkers,
			actives: activeMarkers,
			deactives: deactiveMarkers
		};
		return this.set('state', markers);
	},

	hasDisplayMarkers: function() {
		var state = this.getState();
		return (state.visibles.length > 0) ? true : false;
	},

	hasMarker: function(marker) {
		var findMaker = false;
		var markers = this.getContainer().rewind();
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
		var markers = this.getContainer().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setActive(closer(target, current));
			markers.next();
		}
	},

	_visibleMarkers: function(target, closer) {
		var markers = this.getContainer().rewind();
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