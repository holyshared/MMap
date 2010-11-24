
Class: MMap.Options {#MMap.Options}
===================================

When this class is used, it comes to be able to optional specify it for the object like Mootools.

MMap.Options Method: setOptions {#MMap.Options:setOptions}
-----------------------------------------------------------

Merges the default options of the Class with the options passed in.

### Syntax:

overlayView.setOptions({
	title: 'cafe'
	content: 'cafe description'
	zIndex: 0
});

### Arguments:

1. options - (*mixed*) Option that can be specified for object

### Returns:

(object) Object that built in this object


Class: MMap.Events {#MMap.Events}
=================================

The function that the event operation of Google Maps API can be executed can be mounted on the object.  
It comes to be able to operate the event of Google Maps API by building it in the object of this class like Mootools.

Google Maps API Version 3: [event](http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#event "event")

MMap.Events Method: addEvent {#MMap.Events:addEvent}
-----------------------------------------------------

Attaches an event listener to a DOM element.

### Syntax:

overlayView.addEvent('mouseover', function() {
	aleft('mouse over');
});

### Arguments:

1. type - (*string*) The event name (e.g. 'click')
2. fn - (*function*) The function to execute.


### Returns:

(object) Object that built in this object


MMap.Events Method: addEvents {#MMap.Events:addEvents}
-------------------------------------------------------

Two or more event listeners are registered.  
The event name and the event listener are specified by the pair.

### Syntax:

overlayView.addEvents({
	mouseover: function(){},
	mouseout: function(){}
});

### Arguments:

1. events - (*object*) An object with key/value representing: key the event name, and value the function that is called when the Event occurs.

### Returns:

(object) Object that built in this object


MMap.Events Method: removeEvent {#MMap.Events:removeEvent}
-----------------------------------------------------------

Works as Element.addEvent, but instead removes the specified event listener.

### Syntax:

overlayView.removeEvent('click', clickHandler);

### Arguments:

1. type - (*string*) The event name (e.g. 'click')
2. fn - (*function*) The function to remove.

### Returns:

(object) Object that built in this object


MMap.Events Method: removeEvents {#MMap.Events:removeEvents}
-------------------------------------------------------------

All the event listeners corresponding to the specified event are deleted. 
All the event listeners are deleted when executing it without the argument.

### Syntax:

overlayView.removeEvents('click');

overlayView.removeEvents({
	mouseover: mouseoverLisner,
	mouseout: mouseoutLisner
});

### Arguments:

1. events - (optional) if not passed removes all events from the element.
	* (string) The event name (e.g. 'click'). Removes all events of that type.
	* (object) An object of type function pairs.

### Returns:

(object) Object that built in this object


MMap.Events Method: fireEvent {#MMap.Events:fireEvent}
-------------------------------------------------------

The event specified for the object is executed.(e.g. 'click', 'dblclick')  
The argument can be specified.

### Syntax:

overlayView.fireEvent('click');

overlayView.fireEvent('click', [index]);

### Arguments:

1. type - (*string*) The event name (e.g. 'click')
2. args - (*mixed, optional*) Array or single object, arguments to pass to the function. If more than one argument, must be an array.

### Returns:

(object) Object that built in this object