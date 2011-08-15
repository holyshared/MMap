/*
---
name: MMap.Draggable

description: Enhancing to be able to do drag and drop is built into the overlay view.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap

provides: [MMap.Draggable]

...
*/

(function(MMap, maps, Point){

MMap.Draggable = new Class({

	options: {
		draggable: false
	},

	_mouseX: null,
	_mouseY: null,
	_dragging: false,
	_mouseEvents: null,

	setDraggable: function(value){
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('draggable', value);
	},

	isDraggable: function(){
		return this.get('draggable');
	},

	isDragging: function(){
		return this._dragging;
	},

	draggable_changed: function(){
		var element = this.toElement();
		var events = this._mouseEvents = new MouseEventHandler(this);
		if (this.isDraggable()) {
			element.addEvent('mousedown', this._mouseEvents.mousedown);
		} else {
			element.removeEvent('mousedown', this._mouseEvents.mousedown);
		}
	},

	_dragStart: function(event){
		this._dragging = true;
		this._mouseX = event.client.x;
		this._mouseY = event.client.y;
		this._startCapture();
		this._toggleMapDraggable();
		this._enableDragListeners();
		this.fireEvent('dragStart', [this._getCurrentPosition()]);
	},

	_drag: function(event){
		var position = this._updatePosition(event);
		this.fireEvent('drag', [position]);
	},

	_dragStop: function(){
		this._dragging = false;
		this._stopCapture();
		this._toggleMapDraggable();
		this._disableDragListeners();
		this.fireEvent('dragEnd', [this._getCurrentPosition()]);
	},

	_getCurrentPosition: function(){
		var element = this.toElement();
		var position = element.getStyles('left', 'top');
		var size = element.getSize();
		var point = new Point(
			position.left.toInt() + (size.x / 2),
			position.top.toInt() + (size.y / 2)
		);
		var latlng = this.getProjection().fromDivPixelToLatLng(point);
		return {
			latlng: latlng,
			pixel: point
		}
	},

	_toggleMapDraggable: function(){
		var map = this.getMap();
		if (this._mapDraggableOption == null){
			this._mapDraggableOption = map.get('draggable') || true;
			map.set('draggable', false);
		} else {
			map.set('draggable', this._mapDraggableOption);
			this._mapDraggableOption = null;
		}
	},

	_updatePosition: function(event){
		var element = this.toElement();

		var size = element.getSize();
		var position = element.getStyles('left', 'top');

		var diffX = event.client.x - this._mouseX;
		var diffY = event.client.y - this._mouseY;

		this._mouseX = event.client.x;
		this._mouseY = event.client.y;

		var next = {
			left: position.left.toInt() + diffX,
			top: position.top.toInt() + diffY
		};
		element.setStyles(next);

		return this._getCurrentPosition();
	},

	_enableDragListeners: function(){
		var element = this.toElement();
		var events = this._mouseEvents;
		element.addEvents({
			'mouseup': events.mouseup,
			'mousemove': events.mousemove
		});
	},

	_disableDragListeners: function(){
		var element = this.toElement();
		var events = this._mouseEvents;
		element.removeEvents({
			'mouseup': events.mouseup,
			'mousemove': events.mousemove
		});
	},

	_startCapture: function() {
		var element = this.toElement();
		element.setCapture(true);
	},

	_stopCapture: function() {
		var element = this.toElement();
		element.releaseCapture();
	}

});


function MouseEventHandler(overlayView){
	var events = {
		mousedown: this._onMouseDown,
		mouseup: this._onMouseUp,
		mousemove: this._onMouseMove
	}
	for (var key in events) {
		this[key] = events[key].bind(overlayView)
	}
}

MouseEventHandler.implement({

	_onMouseDown: function(event){
		if (this.isDragging()) return;
		this._dragStart(event);
	},

	_onMouseUp: function(event){
		if (!this.isDragging()) return;
		this._dragStop();
	},

	_onMouseMove: function(event){
		if (!this.isDragging()) return;
		this._drag(event);
	}

});


}(MMap, google.maps, google.maps.Point));
