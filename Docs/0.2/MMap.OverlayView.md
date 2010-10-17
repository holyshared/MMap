
Class: MMap.OverlayView {#MMap.OverlayView}
============================================

Details of class
-----------------------------------------------------------------

The overlay view class is a subclass of OverlayView. 
An original overlay view can be defined based on this class. 

*Google Maps API Version 3*: [OverlayView](http://code.google.com/intl/us/apis/maps/documentation/javascript/reference.html#OverlayView)

### Implements:

MMap.Events, MMap.Options


MMap.OverlayView Method: constructor {#MMap.OverlayView:constructor}
-----------------------------------------------------------------

### Syntax:

	var overlayView = new MMap.OverlayView(options);

### Arguments:

1. options - (*mixed*) Option that can be specified

### Options:

* map - (*object*) Instance of Google Map [google.maps.Map](http://code.google.com/intl/us/apis/maps/documentation/javascript/reference.html#Map "google.maps.Map")
* zIndex - (*number*) The order of display displaying it in map
* visible - (*number*) Displayed flag
* onClick - (*function*) When clicking, this event is generated.
* onDblClick - (*function*) When double-clicking it, it is generated.
* onMouseover - (*function*) When the mouse cursor gets on, it is generated.
* onMouseout - (*function*) When the mouse cursor comes off, it is generated.
* onMouseup - (*function*) When the mouse button returns pushing, it is generated.
* onMousedown - (*function*) When the mouse button is pushed, it is generated.
* onZIndexChanged - (*function*) When the order of the display changes, it is generated.
* onVisibleChanged - (*function*) When the display changes, it is generated.


MMap.OverlayView Method: getInstance {#MMap.OverlayView:getInstance}
-------------------------------------------------------------------

The container element that stores the overlay view is acquired.  
DOM trees such as markers and information windows are stored in this container element.

### Syntax:

	var container = overlayView.getInstance();

### Returns:

(element) Container element that stores overlay view.


MMap.OverlayView Method: setup {#MMap.OverlayView:setup}
-------------------------------------------------------

This method generates the DOM tree of the overlay view class by the abstraction method.

### Arguments:

1. container - (*element*) Container element that inserts dom tree

### Returns:

(element) Dom tree of overlay view.

### Notes:

This method is an abstraction method.



MMap.OverlayView Method: draw {#MMap.OverlayView:draw}
-------------------------------------------------------

The overlay view is displayed.  
Please confirm the document of Google Maps to a detailed specification.    

*Google Maps API Version 3*: [OverlayView](http://code.google.com/intl/us/apis/maps/documentation/javascript/reference.html#OverlayView)

### Syntax:

	overlayView.draw();

### Notes:

This method is an abstraction method.


MMap.OverlayView Method: getVisible {#MMap.OverlayView:getVisible}
-------------------------------------------------------------------

The display of this overlay view is returned.  
True is a display, and false is in the state of non-display. 

### Syntax:

	overlayView.getVisible();

### Returns:

(boolean) Present state of display.

MMap.OverlayView Method: getZIndex {#MMap.OverlayView:getZIndex}
-----------------------------------------------------------------

The order of the display of this overlay view is returned. 

### Syntax:

	overlayView.getZIndex();

### Returns:

(integer) The present order of display.



MMap.OverlayView Method: setVisible {#MMap.OverlayView:setVisible}
-------------------------------------------------------------------

The display of this overlay is switched.  
When it is displayed that true is specified, and specifies false, it makes it to non-display.

### Syntax:

	overlayView.setVisible(true);

### Arguments:

1. value - (*boolean*) Value of display/non-display.  
   It displays with true, and it non-displays it with false. 


MMap.OverlayView Method: setZIndex {#MMap.OverlayView:setZIndex}
-----------------------------------------------------------------

The order of the display of this overlay view is specified.

### Syntax:

	overlayView.setZIndex(0);

### Arguments:

1. index - (*integer*) Number of the order of display

