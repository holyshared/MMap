/*
---
name: MMap.Draggable

description: Enhancing to be able to do drag and drop is built into the overlay view.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - Core/Element.Event

provides: [MMap.Draggable]

...
*/

(function(win, MMap, maps, Point){

MMap.Draggable = new Class({

	options: {
		draggable: false
	},

	setDraggable: function(value){
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('draggable', value);
	},

	isDraggable: function(){
		return this.get('draggable');
	},

	draggable_changed: function(){
		var that = this;
		var element = this.toElement();
		this._strategy = this._strategy || new DragListenerStrategy(this);
		this._mousedown = this._MouseDown.bind(this);
		if (this.isDraggable()) {
			element.addEvent('mousedown', this._mousedown);
		} else {
			element.removeEvent('mousedown', this._mousedown);
		}
	},

	_MouseDown: function(event){
		if (this._strategy.isDragging()) return;
		this._strategy.onDragStart(event);
	}

});

/**
 * Private Classes.
 * DragListenerStrategy - DragListenerStrategy wrapper class
 * DragListenerStrategy.Window - Chrome, Safari, Opera, IE
 * DragListenerStrategy.Capture - Firefox
 */
var DragListenerStrategy = new Class({

	_overlayView: null,
	_mouseX: null,
	_mouseY: null,
	_dragging: false,
	_mapDraggableOption: null,

	initialize: function(overlayView){
		this._overlayView = overlayView;
		this._strategy = this.createStrategy();
	},

	isCaptureSupport: function() {
		var overlayView = this.getOverlayView();
		var element = overlayView.toElement();
		return (element.setCapture) ? true : false;
	},

	isDragging: function(){
		return this._dragging;
	},

	getOverlayView: function(){
		return this._overlayView;
	},

	onDragStart: function(event){
		var overlayView = this.getOverlayView();
		var element = overlayView.toElement();
		element.addClass('drag');

		this._dragging = true;
		this._strategy.enable();
		this._mouseX = event.client.x;
		this._mouseY = event.client.y;
		this._toggleMapDraggable();
		overlayView.fireEvent('dragStart', [this._getCurrentPosition()]);
	},

	onDrag: function(event){
		var overlayView = this.getOverlayView();
		var position = this._updatePosition(event);
		overlayView.fireEvent('drag', [position]);
	},

	onDragStop: function(event){
		var overlayView = this.getOverlayView();
		var element = overlayView.toElement();
		element.removeClass('drag');

		this._dragging = false;
		this._strategy.disable();
		this._toggleMapDraggable();
		overlayView.fireEvent('dragEnd', [this._getCurrentPosition()]);
	},

	_toggleMapDraggable: function(){
		var overlayView = this.getOverlayView();
		var map = overlayView.getMap();
		if (this._mapDraggableOption == null){
			this._mapDraggableOption = map.get('draggable') || true;
			map.set('draggable', false);
		} else {
			map.set('draggable', this._mapDraggableOption);
			this._mapDraggableOption = null;
		}
	},

	_updatePosition: function(event){
		var ovarleyView = this.getOverlayView();
		var element = ovarleyView.toElement();

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

	_getCurrentPosition: function(){
		var ovarleyView = this.getOverlayView();
		var element = ovarleyView.toElement();
		var position = element.getStyles('left', 'top');
		var size = element.getSize();
		var point = new Point(
            position.left.toInt() + (size.x / 2),
		    position.top.toInt() + size.y
		);
        var latlng = ovarleyView.getProjection().fromDivPixelToLatLng(point);
        return { latlng: latlng, pixel: point }
	},

	createStrategy: function(){
		var that = this;
		var ovarleyView = that.getOverlayView();
		var strategy = null;
		var options = {
			element: this.getOverlayView().toElement(),
			onMouseUp: function(event){
				if (!that.isDragging()) return;
				that.onDragStop();
			},
			onMouseMove: function(event){
				if (!that.isDragging()) return;
				that.onDrag(event);
			}
		}
		if (that.isCaptureSupport()) {
			strategy = new DragListenerStrategy.Capture(options);
		} else {
			strategy = new DragListenerStrategy.Window(options);
		}
		return strategy;
	}

});


DragListenerStrategy.Strategy = new Class({

	initialize: function(options){
		for (var key in options){
			this[key] = options[key];
		}
	}

});


DragListenerStrategy.Window = new Class({

	Extends: DragListenerStrategy.Strategy,

	enable: function(){
		win.addEvents({
        	'mouseup': this.onMouseUp,
    		'mousemove': this.onMouseMove
    	});
	},

	disable: function(){
		win.removeEvents({
        	'mouseup': this.onMouseUp,
    		'mousemove': this.onMouseMove
    	});
	}

});


DragListenerStrategy.Capture = new Class({

	Extends: DragListenerStrategy.Strategy,

	startCapture: function() {
		this.element.setCapture(true);
	},

	stopCapture: function() {
		this.element.releaseCapture();
	},

	enable: function(){
		this.startCapture();
    	this.element.addEvents({
        	'mouseup': this.onMouseUp,
    		'mousemove': this.onMouseMove
		});
	},

	disable: function(){
		this.element.releaseCapture();
    	this.element.removeEvents({
        	'mouseup': this.onMouseUp,
    		'mousemove': this.onMouseMove
		});
	}

});

}(window, MMap, google.maps, google.maps.Point));
