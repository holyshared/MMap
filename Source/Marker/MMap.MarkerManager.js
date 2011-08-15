/*
---
name: MMap.MarkerManager

description: The marker displayed in the map is managed.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Container
  - MMap/MMap.Options
  - MMap/MMap.Events

provides: [MMap.MarkerManager]

...
*/

(function(){

var MMap = (this.MMap || {});

MMap.MarkerManager = new Class({

	Extends: MMap.MVCObject,

	Implements: [MMap.Events, MMap.Options],

	options: {
		map: null,
		markers: []
/*
	onStateChanged
*/
	},

	initialize: function(options) {
		this._container = new MMap.Container();
		this.setOptions(options);
		this._setup();
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

	visible: function(marker){
		var isThis = function(current){
			return (marker == current) ? true : false;
		};
		this._visibleMarkers.apply(this, [isThis]);
		this._displayMarkerChange();
	},

	visibleAll: function(){
		var markers = this.getContainer().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setVisible(true);
			markers.next();
		}
		this._displayMarkerChange();
	},

	visibleByBounds: function(bounds){
		var isBoundsContains = function(current){
			return bounds.contains(current.getPosition());
		};
		this._visibleMarkers.apply(this, [isBoundsContains]);
		this._displayMarkerChange();
	},

	active: function(marker){
		var isThis = function(current){
			return (marker == current) ? true : false;
		};
		this._activeMarkers.apply(this, [isThis]);
		this._displayMarkerChange();
	},

	activeAll: function(){
		var markers = this.getContainer().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setActive(true);
			markers.next();
		}
		this._displayMarkerChange();
	},

	activeByBounds: function(bounds){
		var isBoundsContains = function(current){
			return bounds.contains(current.getPosition());
		};
		this._activeMarkers.apply(this, [isBoundsContains]);
		this._displayMarkerChange();
	},

	_activeMarkers: function(closer) {
		var markers = this.getContainer().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setActive(closer(current));
			markers.next();
		}
	},

	_visibleMarkers: function(closer) {
		var markers = this.getContainer().rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			current.setVisible(closer(current));
			markers.next();
		}
	}

});

}());