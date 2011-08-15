/*
---
name: MMap

description: Core module of MMap.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Class

provides: [MMap, MMap.MVCObject]

...
*/

(function(){

var MMap = this.MMap = {};

MMap.version = '0.2.3';

MMap.MVCObject = new Class({

	initialize: function(){
	}

});
MMap.MVCObject.prototype = new google.maps.MVCObject();

}());

/*
---
name: MMap.Utils

description: It comes to be able to treat Event and Options like Mootools.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Object
  - Core/Class
  - MMap/MMap

provides: [MMap.Options, MMap.Events]

...
*/

(function(MMap){

MMap.Options = new Class({

	setOptions: function(options){
		var clone = Object.clone(this.options);
		var options = Object.append(clone, options);
		for (var key in options) {
			var value = options[key]; 
			if (key == 'map') {
				this.setMap(value);
				delete options[key];
			} else if (instanceOf(value, Function) && (/^on[A-Z]/).test(key)) {
				this.addEvent(key, value);
				delete options[key];
			}
		}
		this.options = options;
		return this;
	}

});

}(MMap));


(function(MMap, observer){

var removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

var toNotifyFormat = function(string){
	var regex = /(Changed)$/;
	return string.replace(regex, '_$1').toLowerCase();
};

var toFormat = function(string){
	return toNotifyFormat(removeOn(string));
};

MMap.Events = new Class({

	_events: {},
	_handles: {},

	addEvent: function(type, fn){
		var listener = null;
		type = toFormat(type);
		listener = observer.addListener(this, type, fn);
		this._handles[type] = (this._handles[type] || []).include(fn);
		this._events[type] = (this._events[type] || []).include(listener);
		return this;
	},

	addEvents: function(events){
		for (var key in events) {
			this.addEvent(key, events[key]);
		}
		return this;
	},

	removeEvent: function(type, fn){
		type = toFormat(type);
		var find = this._handles[type].contains(fn);
		if (find) {
			var index = this._handles[type].indexOf(fn);
			var target = this._events[type][index];
			observer.removeListener(target);
			this._events[type].erase(target);
			this._handles[type].erase(fn);
		}
		return this;
	},

	removeEvents: function(events){
		if (!events) {
			observer.clearInstanceListeners(this);
			return this;
		} else if (typeOf(events) == 'object') {
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		for (type in this._events){
			if (events && events != type) continue;
			var fns = this._events[type];
			for (var i = fns.length; i--;) this.removeEvent(type, fns[i]);
		}
		return this;
	},

	fireEvent: function(type, args){
		type = toFormat(type);
		if (!this._events[type]) return this;
		var callArguments = [this, type];
		if (Type.isArray(args)) {
			var l = args.length;
			for (var i = 0; i < l; i++) {
				callArguments.push(args[i]);
			}
		} else {
			callArguments.push(args);
		}
		observer.trigger.apply(this, callArguments);
		return this;
	}

});

}(MMap, google.maps.event));

/*
---
name: MMap.Position

description: The function that the display position can be specified by coordinates is built in.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap

provides: [MMap.Position]

...
*/

(function(MMap, maps){

MMap.Position = new Class({

	options: {
		position: null
	},

	getPosition: function(){
		return this.get('position');
	},

	setPosition: function(position){
		if (!instanceOf(position, maps.LatLng)) {
			new TypeError('The data type is not an Latlng.');
		}
		this.set('position', position);
		this.draw();
		return this;
	}

});

}(MMap, google.maps));


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


/*
---
name: MMap.Container

description: Container that can store MVCObject.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Array
  - Core/Type
  - MMap/MMap

provides: [MMap.Container]

...
*/

(function(MMap){

MMap.Container = new Class({

	Extends: MMap.MVCObject,

	initialize: function() {
		var map = Array.from(arguments).link({ items: Type.isArray });
		this.setItems(map.items || []);
		this.setCurrent(0);
	},

	isValid: function(){
		var index = this.get('index');
		return this.hasItem(index);
	},

	getItem: function(index){
		if (!this.hasItem(index)) return;
		var items = this.getItems();
		return items[index];
	},

	getItems: function(){
		return this.get('items');
	},

	getCurrent: function(){
		var items = this.getItems();
		var index = this.get('index');
		return items[index];
	},

	setItems: function(items){
		if (!Type.isArray(items)) return;
		this.set('items', items);
		return this;
	},

	setCurrent: function(index){
		if (!Type.isNumber(index)) return;
		this.set('index', index);
		return this;
	},

	addItem: function(item){
		if (this.hasItem(item)) return;
		var items = this.getItems();
		items.push(item);
		return this;
	},

	hasItem: function(item){
		var items = this.getItems();
		if (Type.isNumber(item)) {
			return (items[item]) ? true : false;
		} else {
			return (items.contains(item)) ? true : false;
		}
	},

	count: function(){
		return this.getItems().length;
	},

	removeItem: function(item){
		if (!this.hasItem(item)) return;
		var items = this.get('items');
		items.erase(item);
		return this;
	},

	next: function() {
		var index = this.get('index');
		var items = this.getItems();
		var nextIndex = index + 1;
		this.setCurrent(nextIndex);
		if (this.isValid()) {
			return items[nextIndex];
		}
		return false;
	},

	rewind: function() {
		this.setCurrent(0);
		return this;
	},

	empty: function() {
		var items = this.getItems();
		this.rewind();
		items.empty();
	},

	find: function(key, value) {
		while(this.isValid()) {
			var item = this.getCurrent();
			if (item[key] == value) {
				return item;
			}
			this.next();
		}
		return false;
	},

	findAll: function(key, value){
		var find = [];
		while(this.isValid()) {
			var item = this.getCurrent();
			if (item[key] == value) {
				find.push(item);
			}
			this.next();
		}
		return (find.length <= 0) ? false : find;
	}

});

}(MMap));

/*
---
name: MMap.OverlayView

description: Overlayview that can be treated like Mootools. An original marker and the information window can be defined by making this class a subclass.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Object
  - Core/Class
  - Core/Element
  - Core/Element.Style
  - MMap/MMap
  - MMap/MMap.Options
  - MMap/MMap.Events

provides: [MMap.OverlayView]

...
*/

(function(MMap, maps){

MMap.OverlayView = new Class({

	Implements: [maps.OverlayView, MMap.Events, MMap.Options],

	options: {
		map: null,
		zIndex: 0,
		visible: true,
		active: false
/*
		onClick
		onDblClick
		onMouseover
		onMouseout
		onMouseup
		onMousedown
		onVisibleChanged
		onZIndexChanged
		onActive
		onDeactive
*/
	},

	initialize: function(options){
		this.instance = this.toElement();
		this.setOptions(options);
		this._added = false;
		this._init();
	},

	build: function(){
		var panel = this.getPanes().overlayImage;
		this.body = this._setup(this.toElement());
		this.toElement().inject(panel);
		this._setupListeners();
		this._added = true;
		this.fireEvent("add");
	},

	toElement: function() {
		if (!this.instance) {
			this.instance = new Element('div', {'class': 'ovarlayView'});
		}
		return this.instance;
	},

	//abstract method
	_setup: function(container){
	},

	//abstract method
	_setupListeners: function(){
	},

	_init: function(){
	},

	//abstract method
	draw: function(){
	},

	onAdd: function(){
		this.build();
	},

	onRemove: function(){
		this.removeEvents();
		this.unbindAll();
		this.instance.destroy();
		delete this.instance;
		this._added = false;
	},

	getVisible: function() {
		return this.get('visible');
	},

	isAdded: function() {
		return this._added;
	},

	isVisible: function() {
		return this.get('visible');
	},

	isActive: function() {
		return this.get('active');
	},

	setVisible: function(value){
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('visible', value);
		var container = this.toElement();
		if (value) {
			container.setStyle('display', '');
		} else {
			container.setStyle('display', 'none');
		}
		return this;
	},

	setActive: function(value) {}

});

}(MMap, google.maps));

/*
---
name: MMap.Marker

description: A general marker who can display the title and the content can be used.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Position
  - MMap/MMap.Draggable
  - MMap/MMap.OverlayView

provides: [MMap.Marker, MMap.Marker.Core, MMap.Marker.HTML]

...
*/

(function(MMap){

MMap.Marker = {};

MMap.Marker.Core = new Class({

	Extends: MMap.OverlayView,

	Implements: [MMap.Position, MMap.Draggable],

	options: {
		map: null,
		className: 'marker markerDefault',
		zIndex: null,
		visible: true,
		active: false
		/*
			onClick: $empty
			onDblClick: $empty
			onMouseover: $empty
			onMouseout: $empty
			onMouseup: $empty
			onMousedown: $empty
			onVisibleChanged: $empty
			onzIndexChanged: $empty
			onPositionChanged: $empty,
		*/
	},

	initialize: function(options) {
		this.parent(options);
	},

	_init: function(){
		var self = this;
		var props = ['position', 'zIndex', 'visible', 'active', 'draggable'];
		props.each(function(key){
			var value = self.options[key];
			self.set(key, value);
			delete self.options[key];
		});
	},

	_updateVisibleState: function(){
		this.setZIndex(this.get('zIndex'))
		.setVisible(this.get('visible'));
	},

	_update: function(){
	},

	setDefaultZIndex:function(){
		var zIndex = this.get('zIndex');
		if (!zIndex){
			var projection = this.getProjection();
			var position = this.get('position');
			var xy = projection.fromLatLngToDivPixel(position);
			this.setZIndex(xy.y);
		} else {
			this.setZIndex(zIndex);
		}
	},

	draw: function(){
		if (!this.isAdded()) return;
		this.refresh();
		var projection = this.getProjection();
		var position = this.get('position');
		var size = this.instance.getSize();
		var xy = projection.fromLatLngToDivPixel(position);
		var styles = {
			position: 'absolute',
			left: xy.x -(size.x / 2),
			top: xy.y - size.y
		};
		this.instance.setStyles(styles);
	},

	refresh: function(){
		if (!this.isAdded()) return;
		this._updateVisibleState();
		this._update();
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	setZIndex: function(index){
		if (!Type.isNumber(index)) new TypeError('The data type is not an integer.');
		this.set('zIndex', index);
		var container = this.toElement();
		if (!this.isActive()) {
			container.setStyle('z-index', index);
		}
		return this;
	},

	setActive: function(value) {
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('active', value);
		var container = this.toElement();
		if (value) {
			this.fireEvent('active');
			container.setStyle('z-index', 10000);
			container.addClass('active');
		} else {
			container.setStyle('z-index', this.getZIndex());
			container.removeClass('active');
		}
		return this;
	}

});


MMap.Marker.HTML = new Class({

	Extends: MMap.Marker.Core,

	options: {
		map: null,
		className: 'marker markerDefault',
		title: '',
		content: '',
		zIndex: null,
		visible: true
		/*
			onClick: $empty
			onDblClick: $empty
			onMouseover: $empty
			onMouseout: $empty
			onMouseup: $empty
			onMousedown: $empty
			onVisibleChanged: $empty
			onzIndexChanged: $empty
			onPositionChanged: $empty,
			onTitleChanged: $empty,
			onContentChanged: $empty
		*/
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		this.setDefaultZIndex();

		var className = this.options.className;
		container.addClass(className);

		var marker = new Element('div', {'class': 'inner'});
		var hd = new Element('div', {'class': 'hd'});
		var bd = new Element('div', {'class': 'bd'});
		var ft = new Element('div', {'class': 'ft'});
		marker.adopt([hd, bd, ft]);

		this._title = new Element('p', {'class': 'title'});
		this._content = new Element('div', {'class': 'content'});

		marker.inject(container);
		this._title.inject(hd);
		this._content.inject(bd);

		return marker;
	},

	_setupListeners: function(){
		var self = this;
		var marker = this.toElement();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		}
		var events = ['click', 'dblclick', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
		});
	},

	_init: function(){
		this.parent();
		var self = this;
		var props = ['title', 'content'];
		props.each(function(key){
			self.set(key, self.options[key]);
			delete self.options[key];
		});
	},

	_update: function(){
		this._title.set('html', this.get('title'));
		this._content.set('html', this.get('content'));
	},

	getTitle: function() {
		return this.get('title');
	},

	setTitle: function(title){
		if (!Type.isString(title)) {
			new TypeError('The data type is not a character string.');
		}
		this.set('title', title);
		this.draw();
		return this;
	},

	getContent: function() {
		return this.get('content');
	},

	setContent: function(content){
		if (!Type.isString(content) || !Type.isElement(content)) {
			new TypeError('The data type is a character string or not an element.');
		}
		this.set('content', content);
		this.draw();
		return this;
	}

});

}(MMap));

/*
---
name: MMap.Marker.Image

description: Simple image marker.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Marker
  - MMap/MMap.Marker.Core

provides: [MMap.Marker.Image]

...
*/

(function(MMap, Marker){

Marker.Image = new Class({

	Extends: Marker.Core,

	options: {
		map: null,
		className: 'marker image imageDefault',
		title: '',
		image: '',
		url: '',
		position: null,
		zIndex: 0,
		visible: true
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		this.setDefaultZIndex();

		var className = this.options.className;
		container.addClass(className);
		var photo = new Element('p', {'class': 'photo'});
		this._anchor = new Element('a', {
			'title': this.get('title'),
			'href': this.get('url')
		});
		this._image = new Element('img', {'src': this.get('image')});
		photo.inject(container);
		this._anchor.inject(photo);
		this._image.inject(this._anchor);
		return photo;
	},

	_setupListeners: function(){
		var self = this;
		var marker = this.toElement();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		}
		var events = ['click', 'dblclick', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
		});
	},

	_init: function(){
		this.parent();
		var self = this;
		var props = ['title', 'image', 'url'];
		props.each(function(key){
			self.set(key, self.options[key]);
			delete self.options[key];
		});
	},

	_update: function(){
		this._anchor.set({
		    title: this.get('title'),
		    href: this.get('url')
		});
		this._image.set({
			title: this.get('title'),
			image: this.get('image')
		});
	},

	getTitle: function() {
		return this.get('title');
	},

	getImage: function() {
		return this.get('image');
	},

	getURL: function() {
		return this.get('url');
	},

	setTitle: function(title){
		this.set('title', title);
		this.draw();
		return this;
	},

	setImage: function(image){
		this.set('image', image);
		this.draw();
		return this;
	},

	setURL: function(url){
		this.set('url', url);
		this.draw();
		return this;
	}

});

}(MMap, MMap.Marker));

/*
---
name: MMap.Marker.Images

description: Marker who does slide while doing two or more images in fadein/fadeout.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Marker
  - MMap/MMap.Marker.Core

provides: [MMap.Marker.Images]

...
*/

(function(MMap, Marker){

Marker.Images = new Class({

	Extends: Marker.Core,

	options: {
		map: null,
		className: 'marker image imagesDefault',
		images: [],
		defaultIndex: 0,
		interval: 2000,
		duration: 2000,
		autoplay: true,
		zIndex: 0,
		position: null,
		visible: true
	},

	initialize: function(options){
		this.parent(options);
		this._elements = [];
		this._stack = [];
		this._index = 0;
		this._start = false;
		this._mouseovered = false;
	},

	_setup: function(container){
		this.setDefaultZIndex();

		this.addEvent('add', this._onPrepare.bind(this));

		var className = this.options.className;
		container.addClass(className);

		this._photos = new Element('ul', {'class': 'photos'});
		this._photos.inject(container);

		var images = this.get('images');
		if (images && Type.isArray(images)) {
			this.addImages(images);
		}
		return this._photos;
	},

	_setupListeners: function(){
		var self = this;
		var marker = this.toElement();
		var proxy = function(event){
			event.target = self;
			self.fireEvent(event.type, event);
		}
		var events = ['click', 'dblclick', 'mouseup', 'mousedown'];
		events.each(function(type){
			marker.addEvent(type, proxy);
		});
		marker.addEvent('mouseout', this._mouseout.bind(this));
	},

	_init: function(){
		this.parent();
		this.set('images', this.options['images']);
		delete this.options['images'];
	},

	_onPrepare: function(){
		var l = this._stack.length;
		for (var i = 0; i < l; i++) {
			var image = this._stack[i];
			image.inject(this._photos);
		}
		delete this._stack;
		var index = this.options.defaultIndex;
		this.setCurrent(index);
		if (this.options.autoplay) {
			this._timerID = this._next.delay(this.options.interval, this);
			this._start = true;
		}
	},

	_next: function() {
		var self = this;
		var image = this._elements[this._index];
		image.setStyle('z-index', 1);
		this._index = (this._index + 1 < this._elements.length) ? this._index + 1 : 0;
		var image = this._elements[this._index];
		image.setStyle('z-index', 2);
		var tween = image.get('tween');
		tween.start('opacity', 0, 1);
	},

	_buildElement: function(context){
		var li = new Element('li');
		var a = new Element('a', {href: context.url, title: context.title});
		var img = new Element('img', {src: context.image, title: context.title});
		img.inject(a);
		a.inject(li);

		var self = this;
		li.set('tween', {
			duration: this.options.duration,
			onComplete: function() {
				if (self.isStart()) {
					self.setCurrent(self._index);
					self._timerID = self._next.delay(this.options.interval, self);
				}
			}
		});
		li.addEvent('mouseover', self._mouseover.bind(this));
		return li;
	},

	_mouseover: function(event){
		if (this._mouseovered) return false;
		event.target = this;
		this.fireEvent(event.type, event);
		this._mouseovered = true;
	},
	
	_mouseout: function(event){
		if (!(event.target == this._photos || event.target == this.toElement())) return false;
		if (!this._mouseovered) return false;
		event.target = this;
		this.fireEvent(event.type, event);
		this._mouseovered = false;
	},

	setCurrent: function(index){
		var i = 0, length = this._elements.length, image = null, style = {};
		for (i = 0; i < length; i++) {
			image = this._elements[i];
			style = (i == index) ? { 'z-index': 1, opacity: 1 } : { 'z-index': 0, opacity: 0 };
			image.setStyles(style);
		}
		this._index = index;
	},

	getImages: function(){
		return this.get('images');
	},

	setImages: function(images){
		clearTimeout(this._timerID);
		this._elements = [];
		this._index = 0;
		if (this.isAdded()) {
			this._photos.dispose();
		}
		this.set('images', images);
		this.addImages(images);
		return this;
	},

	addImage: function(image){
		var li = this._buildElement(image);
		var images = this.get('images');

		if (!images.contains(image)) images.push(image);
		if (!this.isAdded()) {
			this._stack.push(li);
		} else {
			li.inject(this._photos);
		}
		this._elements.push(li);
		return this;
	},

	addImages: function(images){
		var i = 0, length = images.length;
		for (i = 0; i < length; i++) {
			this.addImage(images[i]);
		}
	},

	removeImage: function(image){
		var images = this.get('images');
		var index = images.indexOf(image);
		if (index >= 0) {
			var element = this._elements[index];
			this._elements.erase(element);
			if (this._stack && this._stack.contains(element)) {
				this._stack.erase(element);
			}
			images.erase(image);
			element.destroy();
		}
	},

	removeImages: function(){
		var self = this;
		var images = Array.from(arguments);
		images.each(function(image){
			self.removeImage(image);
		});
	},

	isStart: function(){
		return (this._start) ? true : false;
	},

	start: function(){
		if (this.isStart()) return;
		this._timerID = this._next.delay(this.options.interval, this);
		this._start = true;
	},

	stop: function(){
		clearTimeout(this._timerID);
		this._start = false;
	}

});

}(MMap, MMap.Marker));

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

(function(MMap){

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

}(MMap));

/*
---
name: MMap.MarkerLoader

description: The loading of the marker can be done by using json and ajax(The response is json).

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Events
  - MMap/MMap
  - MMap/MMap.Options
  - MMap/MMap.Events

provides: [MMap.MarkerLoader, MMap.MarkerLoader.Parser, MMap.MarkerLoader.Context, MMap.MarkerLoader.JSON]

...
*/

(function(MMap){

MMap.MarkerLoader = new Class({

	Implements: [MMap.Events, MMap.Options],

	options: {
		'format': 'array'
/*
		onPreload: $empty,
		onFailure: $empty,
		onComplete: $empty,
		onLoad: $empty
*/
	},

	initialize: function(options){
		this.setOptions(options);
	},

	load: function(context){
		var self = this;
		if (context) {
			if (Type.isArray(context)) {
				Object.merge(this.options, { 'markers' : context });
			} else {
				Object.merge(this.options, context);
			}
		}
		var format = this.options.format;
		var	loader = MMap.MarkerLoader.factory(format);

		loader.addEvents({
			'onPreload': function(){
				self.fireEvent('preload');
			},
			'onFailure': function(){
				var args = Array.from(arguments);
				self.fireEvent('failure', args);
			},
			'onComplete': function(response){
				self.fireEvent('complete', [response]);
			},
			'onLoad': function(markers){
				self.fireEvent('load', [self.build(markers)]);
			}
		});
		loader.load(this.options);
	},

	build: function(context){
		var markers = [], length = context.length;
		for (var i = 0; i < length; i++) {
			var options = context[i];
			var type = options.type || 'html';
			type = (type == 'html') ? 'HTML' : type.capitalize();
			delete options.type;
			if (!MMap.Marker[type]) throw TypeError('Specified marker type "' + type + '" is not found.');
			var marker = new MMap.Marker[type](options);
			markers.push(marker);
		};
		return markers;
	}

});

MMap.MarkerLoader.factory = function(format){
	var loader = null;
	switch(format){
		case 'array':
			loader = new MMap.MarkerLoader.Context();
			break;
		//TODO Kml support 0.2.2
		case 'kml':
			break;
		case 'json':
		default:
			loader = new MMap.MarkerLoader.JSON();
			break;
	}
	return loader;
};


MMap.MarkerLoader.Parser = new Class({

	Implements: [Events],

	parse: function(markers){
		var result = [];
		var l = markers.length;
		for (var i = 0; i < l; i++){
			var marker = markers[i];
			var latlng = marker.position;
			delete marker.position;
			marker.position = new google.maps.LatLng(latlng.latitude, latlng.longitude);
			result.push(marker);
		}
		return result;
	}

});

MMap.MarkerLoader.Context = new Class({

	Extends: MMap.MarkerLoader.Parser,

	load: function(context){
		this.fireEvent('preload');
		try {
			this.fireEvent('complete', [context.markers]);
			var markers = this.parse(context.markers);
			this.fireEvent('load', [markers]);
		} catch (error) {
			this.fireEvent('failure', [error]);
		}
	}

});

MMap.MarkerLoader.JSON = new Class({

	Extends: MMap.MarkerLoader.Parser,

	_onRequest: function(){
		this.fireEvent('preload');
	},

	_onFailure: function(xhr){
		this.fireEvent('failure', [xhr]);
	},

	_onSuccess: function(json, text){
		this.fireEvent('complete', [json]);
		var markers = json.markers;
		var l = markers.length;
		var response = this.parse(markers);
		this.fireEvent('load', [response]);
	},

	getRequest: function(context){
		if (this.request) {
			this.request.setOptions(context);			
			return this.request;
		};
		var self = this;
		var events = ['_onRequest', '_onFailure', '_onSuccess'];
		this.request = new Request.JSON(context);
		events.each(function(type){
			var handler = self[type].bind(self);
			var eventType = type.replace('_', '');
			self.request.addEvent(eventType, handler);
			delete self[type];
		});
		return this.request;
	},

	load: function(context){
		this.getRequest(context).send();
	}

});

}(MMap));


/*
---
name: MMap.Window

description: Simple information window.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap
  - MMap/MMap.Position
  - MMap/MMap.OverlayView

provides: [MMap.Window]

...
*/

(function(MMap, maps){

var	_offsetY = 15;

MMap.Window = new Class({

	Extends: MMap.OverlayView,

	Implements: [MMap.Position],

	options: {
		className: 'window windowDefault',
		title: '',
		content: '',
		zIndex: 0,
		visible: true,
		active: false
		/*
			onOpen: $empty
			onClose: $empty
			onVisibleChanged: $empty
			onZIndexChanged: $empty
			onPositionChanged: $empty,
			onTitleChanged: $empty,
			onContentChanged: $empty
		*/
	},

	initialize: function(options) {
		this.parent(options);
	},

	_setup: function(container) {
		var className = this.options.className;
		container.addClass(className);

		var zIndex = this.get('zIndex');
		container.setStyle('z-index', zIndex);

		var win = new Element('div', {'class': 'inner'});
		var hd = new Element('div', {'class': 'hd'});
		var bd = new Element('div', {'class': 'bd'});
		var ft = new Element('div', {'class': 'ft'});
		win.adopt([hd, bd, ft]);
		win.inject(container);

		var hdgroup = new Element('div', {'class': 'hdgroup'});
		hdgroup.inject(hd);

		var close = new Element('p', {'class': 'close'});
		this._title = new Element('p', {'class': 'title'});

		hdgroup.adopt([ this._title, close ]);

		this._closeButton = new Element('a', {title: 'Close', href: '#', html: 'Close'});
		this._closeButton.inject(close);

		this._content = new Element('div', {'class': 'content'});
		this._content.inject(bd);

		return win;
	},

	_setupListeners: function(){
		var self = this;
		var win = this.toElement();
		this._closeButton.addEvent('click', function(event){
			self.close();
			self.fireEvent('close');
		});
	},

	_init: function(){
		var self = this;
		var props = ['title', 'content', 'position', 'zIndex', 'visible', 'active'];
		props.each(function(key){
			self.set(key, self.options[key]);
		});
	},

	draw: function(){
		if (!this.isAdded() || !this.isOpen()) return this;

		this.refresh();

		var anchorHeight = 0;
		if (this._anchor) {
			var anchor = this._anchor;
			var instance = anchor.instance;
			anchorHeight = instance.getSize().y;
		}
		var projection = this.getProjection();
		var position = this.get('position');

		var size = this.instance.getSize();
		var xy = projection.fromLatLngToDivPixel(position);
		var top = xy.y - size.y - anchorHeight;
		var left = xy.x - (size.x / 2);
		var styles = {
			position: 'absolute',
			left: left,
			top: top
		};
		this.instance.setStyles(styles);

		var offset = 0;
		if (top < _offsetY && top >= 0) {
			offset = _offsetY - top;
		} else if (top <= 0) {
			offset = Math.abs(top) + _offsetY;
		}

		var point = new maps.Point(xy.x, xy.y - offset);
		var latlng = projection.fromDivPixelToLatLng(point);

		this.getMap().panTo(latlng);
	},

	refresh: function(){
		if (!this.isAdded()) return this;
		this._updateVisibleState();
		this._update();
	},

	_updateVisibleState: function(){
		this.setZIndex(this.get('zIndex'))
		.setVisible(this.get('visible'));
	},

	_update: function(){
		this._title.set('html', this.get('title'));
		this._content.set('html', this.get('content'));
	},

	open: function(map, anchor){
		this._anchor = anchor;
		this.setPosition(anchor.getPosition());
		if (this.isOpen()) return;
		this.setMap(map);
		this.fireEvent('open');
		this._opened = true;
	},

	close: function(){
		this._opened = false;
		this.fireEvent('close');
		this.setMap(null);
	},

	isOpen: function(){
		return (this._opened) ? true : false;
	},

	getZIndex: function() {
		return this.get('zIndex');
	},

	setZIndex: function(index){
		if (!Type.isNumber(index)) new TypeError('The data type is not an integer.');
		this.set('zIndex', index);
		var container = this.toElement();
		container.setStyle('z-index', index);
		return this;
	},

	getTitle: function() {
		return this.get('title');
	},

	setTitle: function(title){
		if (!Type.isString(title)) {
			new TypeError('The data type is not a character string.');
		}
		this.set('title', title);
		this.draw();
		return this;
	},

	getContent: function() {
		return this.get('content');
	},

	setContent: function(content){
		if (!Type.isString(content) || !Type.isElement(content)) {
			new TypeError('The data type is a character string or not an element.');
		}
		this.set('content', content);
		this.draw();
		return this;
	},

	setActive: function(value) {
		if (!Type.isBoolean(value)) new TypeError('The data type is not an boolean.');
		this.set('active', value);
		var container = this.toElement();
		if (value) {
			this.fireEvent('active');
			container.addClass('active');
		} else {
			container.removeClass('active');
		}
		return this;
	}

});

}(MMap, google.maps));
