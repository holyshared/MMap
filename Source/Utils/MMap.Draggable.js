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

(function(MMap){

MMap.Draggable = new Class({

	options: {
		draggable: false
	},

	_dragging: false,
	_draggable: false,

	draggable: function(){
		if (this._draggable == false) {
			this._draggable = true;
			var instance = this._getInstance();
			instance.addEvent('mousedown', this._onMouseDown.bind(this));
		}
	},

	isDragging: function(){
		return this._dragging;
	},

	_setMousePosition: function(event){
		var client = event.client;
		this._currentMouse = {
			x: client.x,
			y: client.y
		};
	},

	_getMousePosition: function(){
		return this._currentMouse;
	},

	_onMouseDown: function(event){
		if (this.isDragging()) {
			return;
		}
		var instance = this._getInstance();
		instance.setCapture(true);

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
		var current, cX, cY, dX, dY, cp, position;

		current = this._getMousePosition();

		dX = event.client.x - current.x;
		dY = event.client.y - current.y;

		cp = this._getInstance().getStyles('left', 'top');
		cX = parseInt(cp.left.replace('px', ''));
		cY = parseInt(cp.top.replace('px', ''));

		return {
			left: cX + dX,
			top: cY + dY
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
		var map, instance;

		this._toggleMapDraggable();

		instance = this._getInstance();
		instance.addEvents({
			'mouseup': this._onMouseUp.bind(this),
			'mousemove': this._onMouseMove.bind(this)
		});

		this._setMousePosition(event);
		this._dragging = true;
		this.fireEvent('dragStart');
	},

	_drag: function(event){
		var instance, current, position, point;

		current = this._computeDragPosition(event);

		instance = this._getInstance();
		instance.setStyles(current);

		this._setMousePosition(event);

	//	point = new google.maps.Point(current.left, current.top);

//		position = this.getProjection().fromDivPixelToLatLng(point);
//		this.setPosition(position);
		this.fireEvent('drag');
	},

	_dragStop: function(){
		var instance;

		this._toggleMapDraggable();

		instance = this._getInstance();
		instance.removeEvents({
			'mouseup': this._onMouseUp.bind(this),
			'mousemove': this._onMouseMove.bind(this)
		});
		instance.releaseCapture();

		this._dragging = false;
		this.fireEvent('dragEnd');
	}

});

}(MMap));
