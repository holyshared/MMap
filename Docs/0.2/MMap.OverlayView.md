
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

	var myMMap.OverlayView = new MMap.OverlayView(options);

### Arguments:

1. options - (*mixed*) Option that can be specified


MMap.OverlayView Method: getWarpper {#MMap.OverlayView:getWarpper}
-------------------------------------------------------------------

The container element that stores the overlay view is acquired.  
DOM trees such as markers and information windows are stored in this container element.

### Syntax:

	var container = overlayView.getWarpper();

### Returns:

(element) Container element that stores overlay view.


MMap.OverlayView Method: draw {#MMap.OverlayView:draw}
-------------------------------------------------------

The overlay view is displayed.  
Please confirm the document of Google Maps to a detailed specification.    

*Google Maps API Version 3*: [OverlayView](http://code.google.com/intl/us/apis/maps/documentation/javascript/reference.html#OverlayView)

### Syntax:

	overlayView.draw();


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

