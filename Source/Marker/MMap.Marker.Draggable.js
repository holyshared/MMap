/*
---
name: MMap.Marker.Draggable

description: Enhancing to be able to do drag and drop is built into the marker.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Marker.Core

provides: [MMap.Marker.Draggable]

...
*/

(function(MMap, Marker){

Marker.Core.implement({

	options: {
		draggable: false
	},

	draggable: function(){
		var marker = this._getInstance();
		marker.addEvent('mousedown', this._onMouseDown.bind(this));
	},

	_setMousePosition: function(event){
		this._currentMouse = {
			x: event.clientX,
			y: event.clientY
		};
	},

	_getMousePosition: function(){
		return this._currentMouse;
	},

	_onMouseDown: function(event){
		if (this.isDragging()) {
			return;
		}
		this._dragStart(event);
	},

	_onMouseUp: function(event){
		if (!this.isDragging()) {
			return;
		}
		this._dragStop();
	},

	_onMouseMove: function(event){
		if (!this.isDragging()) {
			return;
		}
		this._drag(event);
	},

	_computeDragPosition: function(event){
		var current, diffX, diffY, marker, position;

		current = this._getMousePosition();
		diffX = event.clientX - current.x;
		diffY = event.clientX - current.y;

		marker = this._getInstance();
		position = marker.getPosition();

		return {
			left: position.x - diffX,
			top: position.y - diffY
		};
	},

	_toggleMapDraggable: function(){
		var map = this.getMap();
		if (this._mapDraggableOption == null){
			this._mapDraggableOption = map.get('draggable');
			map.set('draggable', false);
		} else {
			map.set('draggable', this._mapDraggableOption);
			this._mapDraggableOption = null;
		}
	},

	_dragStart: function(event){
		var map, marker;

		this._toggleMapDraggable();

		marker = this._getInstance();
		marker.addEvents({
			'mouseup': this._onMouseUp.bind(this),
			'mousemove': this._onMouseMove.bind(this)
		});

		this._setMousePosition(event);
		this._dragging = true;
		this.fireEvent('dragStart');
	},

	_drag: function(event){
		var marker, current, position, point;

		current = this._computeDragPosition(event);

		marker = this._getInstance();
		marker.setStyles(current);

		point = new google.maps.Point(current.left, current.top);

		position = this.getProjection().fromDivPixelToLatLng(point);
		this.setPosition(position);
		this.fireEvent('drag');
	},

	_dragStop: function(){
		var marker;

		this._toggleMapDraggable();

		marker = this._getInstance();
		marker.removeEvents({
			'mouseup': this._onMouseUp.bind(this),
			'mousemove': this._onMouseMove.bind(this)
		});

		this._dragging = false;
		this.fireEvent('dragEnd');
	}

});

}(MMap, MMap.Marker));
