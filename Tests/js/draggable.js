(function($){

window.addEvent("domready", function(){

	var logger = new Logger();

	var Tester = new Class({

		Extends: MMap.OverlayView,

		Implements: [MMap.Draggable],

		options: {
			map: null,
			zIndex: 0,
			visible: false,
			position: null
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
		},

		getPosition: function() {
			return this.get('position');
		},
	
		setPosition: function(position){
			if (!instanceOf(position, google.maps.LatLng)) {
				new TypeError('The data type is not an Latlng.');
			}
			this.set('position', position);
			this.draw();
			return this;
		}

	});

	var map = new google.maps.Map($('gmap'), {
		zoom: 13,
		center: new google.maps.LatLng(35.6566870, 139.750859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var o1 = new Tester({
		map: map,
		zIndex: 1000,
		visible: false,
		position: new google.maps.LatLng(35.6566870, 139.750859),
		onClick: function(event){
			event.preventDefault();
		},
		onDragStart: function(event){
console.log(event);
		},
		onDragEnd: function(event){
console.log(event);
			this.setPosition(event.latlng);

		},
		onDrag: function(event){
console.log(event);
		}
	});
	o1.setDraggable(true);

});

}(document.id));