(function($){

window.addEvent("domready", function(){

	var logger = new Logger();

	var Tester = new Class({

		Extends: MMap.OverlayView,

		Implements: [MMap.Position],

		options: {
			map: null,
			zIndex: 0,
			visible: false
		},

		initialize: function(options){
			this.parent(options);
		},

		_setup: function(container){
			container.addClass('marker imageDefault');
			var photo = new Element('p', {'class': 'photo'}); 
			var img = new Element('img', {src: '../Demos/images/demo/img05.jpg'});
			var a = new Element('a', {href: 'http://sharedhat.com/'});
			img.inject(a);
			a.inject(photo);
			photo.inject(container);
			return photo;
		},

		_setupListeners: function(){
			var self = this;
			var marker = this._getInstance();
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
			var props = [ 'position', 'zIndex', 'visible', 'active' ];
			var values = Object.subset(this.options, props);
			for (var key in values){
				this.set(key, values[key]);
			}
			for (var key in props){ delete this.options[key]; };
		},

		draw: function(){
			if (!this.isAdded()) return;
			var projection = this.getProjection();
			var position = this.get('position');
			var size = this.instance.getSize();
			var xy = projection.fromLatLngToDivPixel(position);
			var styles = {
				position: 'absolute',
				left: xy.x -(size.x / 2),
				top: xy.y -(size.y / 2)
			};
			this.instance.setStyles(styles);
		}

	});

	var defaultPosition =  new google.maps.LatLng(35.6566870, 139.750859);

	var map = new google.maps.Map($('gmap'), {
		zoom: 13,
		center: defaultPosition,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var o1 = new Tester({
		map: map,
		zIndex: 1000,
		visible: false,
		position: defaultPosition,
		onPositionChanged: function(){
			logger.log("events", 'events - onPositionChanged OK' );
		}
	});

	var position = o1.getPosition();
	logger.log("options", (position == defaultPosition) ? 'options - position OK' : 'options - position NG' );
	logger.log("methods", (position == defaultPosition) ? 'getPosition OK' : 'getPosition NG' );

	var next = new google.maps.LatLng(35.6566000, 139.750859);
	o1.setPosition(next);
	position = o1.getPosition();
	logger.log("methods", (position == next) ? 'setPosition OK' : 'setPosition NG' );

});

}(document.id));