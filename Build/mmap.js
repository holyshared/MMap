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
		this._dragging = false;
		this._strategy.disable();
		this._toggleMapDraggable();
		overlayView.fireEvent('dragStart', [this._getCurrentPosition()]);
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
			if (event.preventDefault) event.preventDefault();
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
			if (event.preventDefault) event.preventDefault();
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

//State namespace
var MarkerState = {};

MarkerState.Methods = [
	'setCurrent', 'setImages',
	'addImage', 'addImages',
	'removeImage', 'removeImages',
	'isStart', 'start', 'stop'
];

MarkerState.States = [ 'AddMapBeforeState', 'AddMapAfterState' ];

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
		this.state = new MarkerState.StateWrapper(this);
		this.parent(options);
	},

	_init: function(){
		this.parent();
		var self = this;
		var props = ['images', 'defaultIndex'];
		props.each(function(key){
			self.set(key, self.options[key]);
			delete self.options[key];
		});
	},

	_setup: function(container){

		this.setDefaultZIndex();

		var className = this.options.className;
		container.addClass(className);

		this._photos = new Element('ul', {'class': 'photos'});
		this._photos.inject(container);

		this.addEvent('add', this._onPrepare.bind(this));

		return this._photos;
	},

	_onPrepare: function(){
		var slideOptions = {
			images: this.get('images'),
			observer: this.toElement(),
			container: this._photos
		};
		var handlers = this._createEventProxies(this);

		var opts = Object.merge(this.options, handlers, slideOptions);

		if (this.getVisible() == false || this.state.isStart() == false){
			opts.autoplay = false;
		}
		this.state.nextState(opts);
	},

	_createEventProxies: function(target){
		var handlers = {};
		var events = [
			'onClick', 'onDblClick',
			'onMouseOver', 'onMouseOut',
			'onMouseUp', 'onMouseDown'
		];
		var proxy = function(event){
			event.target = target;
			target.fireEvent(event.type, [event]);
		};
		events.each(function(key, index){
			handlers[key] = proxy;
		});

		handlers.onCurrentChanged = function(){
			target.fireEvent('currentChanged', Array.from(arguments));
		};

		return handlers;
	},

	getCurrent: function(){
		return this.get('current');
	},

	getCurrentImage: function(){
		var images = this.getImages(); 
		return images[this.get('current')];
	},

	getImages: function(){
		return this.get('images');
	},

	visible_changed: function(){
		var visible = this.getVisible();
		if (visible == false && this.isAdded()) {
			this.stop();
		}
	}

});


(function(){

	var marker = Marker.Images,
		methods = MarkerState.Methods,
		hooks = {};

	methods.each(function(key, index){
		hooks[key] = function(){
			return this.state[key].apply(this.state, arguments);
		}
	});
	marker.implement(hooks);

}());


MarkerState.StateWrapper = new Class({

	progress: 0,
	state: null,
	marker: null,

	initialize: function(marker){
		this.marker = marker;
		this.nextState();
	},

	nextState: function(options){
		var stateName = MarkerState.States[this.progress++];
		this.state = this.createState.call(this, stateName, options);
	},

	createState: function(state, options){
		if (!MarkerState[state]) {
			throw new Error('instance!!');
		}
		var stateClass = MarkerState[state];
		return new stateClass(this.marker, options);
	}

});


//The api hook to MarkerState.State instance is made.
(function(){

	var warapper = MarkerState.StateWrapper,
		methods = MarkerState.Methods
		hooks = {};

	methods.each(function(key, index){
		hooks[key] = function(){
			return this.state[key].apply(this.state, arguments);
		};
	});
	warapper.implement(hooks);

}());


MarkerState.State = new Class({

	Implements: [Options],

	initialize: function(marker, options){
		this.setOptions(options);
		this.marker = marker;
	},

	setCurrent: function(index){
		var len = this.marker.get('images').length - 1;
		if (index < 0 || index > len) {
			return;
		}
		this.marker.set('current', index);
	},

	setImages: function(images){
		this.marker.set('images', this._validateImages(images));
	},

	addImage: function(image){
		var images = this.marker.get('images');
		if (!images.contains(image)) {
			images.push(image);
		}
		return this;
	},

	addImages: function(images){
		images = this._validateImages(images);
		images.each(function(image){
			this.addImage(image);
		}, this);
		return this;
	},

	removeImage: function(image){
		var images = this.marker.get('images');
		images.erase(image);
		return this;
	},

	removeImages: function(images){
		images.each(function(image){
			this.removeImage(image);
		}, this);
		return this;
	},

	_validateImages: function(images) {
		if (!Type.isArray(images)){
			throw new TypeError('The image is an array.');
		}
		return images;
	}

});


//SState before marker is added to map.
MarkerState.AddMapBeforeState = new Class({

	Extends: MarkerState.State,

	started: true,

	initialize: function(marker, options){
		this.parent(marker);
	},

	isStart: function(){
		return this.started;
	},

	start: function(){
		this.started = true;
	},

	stop: function(){
		this.started = false;
	}

});

//State after marker is added to map.
MarkerState.AddMapAfterState = new Class({

	Extends: MarkerState.State,

	initialize: function(marker, options){
		this.parent(marker);
		this.imageChanger = new Images(options);
	},

	setCurrent: function(index){
		try {
			this.imageChanger.setCurrent(index);
		} catch(exp) {
			throw exp;
		}
		this.parent(index);
	},

	setImages: function(images){
		this.parent(images);
		this.imageChanger.setImages(images);
		return this;
	},

	addImage: function(image){
		this.parent(image);
		this.imageChanger.addImage(image);
		return this;
	},

	addImages: function(images){
		this.parent(images);
		this.imageChanger.addImages(images);
		return this;
	},

	removeImage: function(image){
		this.parent(image);
		this.imageChanger.removeImage(image);
		return this;
	},

	removeImages: function(images){
		this.parent(images);
		this.imageChanger.removeImages(images);
		return this;
	},

	isStart: function(){
		return this.imageChanger.isStart();
	},

	start: function(){
		this.imageChanger.start();
	},

	stop: function(){
		this.imageChanger.stop();
	}

});


var Images = this.Images = new Class({

	//Mxins meta classes
	Implements: [Options, Events],

	//protected members
	_current: 0,
	_elements: [],
	_observer: null,
	_container: null,
	_mouseovered: false,
	_timerId: null,
	_started: null,

	options: {
		className: 'marker image imagesDefault',
		current: 0,
		images: [],
		observer: null,
		container: null,
		interval: 2000,
		duration: 2000,
		autoplay: true
	},

	initialize: function(options){
		this.setOptions(this._prepare(options));
		this._setupListeners();
		this._setup();
	},

	_prepare: function(opts){
		['observer', 'container', 'current'].each(function(key){
			if (opts[key]) {
				this['_' + key] = opts[key];
			}
			delete opts[key];
		}, this);
		if (opts.images){
			this.addImages.apply(this, opts.images);
		}
		return opts;
	},

	_setup: function(){
		var opts = this.options;
		this._orderByFront(this.getCurrent());
		if (opts.autoplay) {
			this.start();
		}
	},

	_setupListeners: function(){
		var self = this;
		var events = {
			'click': 'click',
			'dblclick': 'dblClick',
			'mouseup': 'mouseUp',
			'mousedown': 'mouseDown'
		};
		var proxy = function(event){
			if (event.preventDefault) event.preventDefault();
			event.target = self;
			self.fireEvent(events[event.type], [event]);
		}
		Object.each(events, function(type, domEventName){
			this.getObserver().addEvent(domEventName, proxy);
		}, this);
		this.getObserver().addEvent('mouseout', this._MouseOut.bind(this));
	},

	setContainer: function(container){
		this._container = container;
	},

	getContainer: function(){
		return this._container;
	},

	setObserver: function(observer){
		this._observer = observer;
	},

	getObserver: function(){
		return this._observer;
	},

	setCurrent: function(index){
		if (!this.isValid(index)){
			throw new Error('Specified ' + index + ' is an invalid value.');
		}
		this._current = index;
	},

	getCurrent: function(){
		return this._current;
	},

	isValid: function(index){
		return (index <= 0 || index <= this._elements.length) ? true : false;
	},

	addImage: function(image){
		if (!Type.isObject(image)){
			throw new Error('');
		}
		var element = this.createElement(image);
		var container = this.getContainer();

		element.inject(container);
		this._elements.push(element);
		return this;
	},

	addImages: function(/* mixed */){
		var elements = Array.from(arguments);
		elements.each(function(element){
			this.addImage(element);
		}, this);
		return this;
	},

	hasImage: function(image){
		var result = null;
		this._elements.some(function(element, index){
			var src = element.getElement('img').get('src');
			if (image.image == src) {
				result = index;
				return true;
			} else {
				return false;
			}
		});
		return result;
	},

	removeImage: function(image){
		var index = this.hasImage(image);
		if (!Type.isNumber(index)) {
			return;
		}
		var target = this._elements[index];
		this._elements.erase(target);
		target.destroy();
		return this;
	},

	removeImages: function(/* mixed */){
		var elements = Array.from(arguments);
		elements.each(function(element){
			this.removeImage(element);
		}, this);
		return this;
	},

	getLength: function(){
		return this._elements.length;
	},

	createElement: function(context){
		var li = new Element('li');
		var a = new Element('a', {href: context.url, title: context.title});
		var img = new Element('img', {src: context.image, title: context.title});
		img.inject(a);
		a.inject(li);
		li.store('marker.images,context', context);
		return this.initElement(li);
	},

	initElement: function(element){
		var that = this;
		var opts = this.options;
		element.set('tween', {
			duration: opts.duration,
			onComplete: function() {
				var current = that.getCurrent();
				var element = that._elements[current];
				var context = element.retrieve('marker.images,context');
				that._orderByFront(current);
				that.fireEvent('currentChanged', [current, context]);
				that._next();
			}
		});
		element.addEvent('mouseover', this._MouseOver.bind(this));
		return element;
	},

	_next: function(){
		this._timerId = this._changeImage.delay(this.options.interval, this);
	},

	_changeImage: function() {
		if (this.getLength() <= 0){
			this.stop();
			return;
		}

		var image = this._elements[this.getCurrent()];
		image.setStyle('z-index', 1);

		var index = (this.getCurrent() + 1 < this._elements.length) ? this.getCurrent() + 1 : 0;
		var image = this._elements[index];
		this.setCurrent(index);

		image.setStyle('z-index', 2);
		var tween = image.get('tween');
		tween.start('opacity', 0, 1);
	},

	_orderByFront: function(targetIndex){
		this._elements.each(function(element, index){
			var style = (targetIndex == index) ? { 'z-index': 1, opacity: 1 } : { 'z-index': 0, opacity: 0 };
			element.setStyles(style);
		});
	},

	isStart: function(){
		return (this._started) ? true : false;
	},

	start: function(){
		if (this.isStart()) return;
		this._next();
		this._started = true;
	},

	stop: function(){
		clearTimeout(this._timerId);
		this._started = false;
	},

	_MouseOver: function(event){
		if (this._mouseovered) return false;
		event.target = this;
		this.fireEvent('mouseOver', event);
		this._mouseovered = true;
	},

	_MouseOut: function(event){
		if (!(event.target == this.getContainer() || event.target == this.getObserver())) return false;
		if (!this._mouseovered) return false;
		event.target = this;
		this.fireEvent('mouseOut', event);
		this._mouseovered = false;
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
			if (event.prevnetDefault) event.prevnetDefault();
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
