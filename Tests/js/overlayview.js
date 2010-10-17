(function($){

window.addEvent("domready", function(){

	this.Logger = new Class({
		initialize: function() {
			var main = $(document.body).getElement(".main");
			this.events = main.getElement(".events ul");
			this.methods = main.getElement(".methods ul");
			this.options = main.getElement(".options ul");
		},

		log: function(type, message) {
			var li = new Element("li",{"html": message});
			switch (type) {
				case "events": li.inject(this.events, 'top'); return
				case "methods": li.inject(this.methods, 'top'); return
				case "options": li.inject(this.options, 'top'); return
			}
		}
	});

	var Tester = new Class({
		
		Extends: MMap.OverlayView,

		options: {
			map: null,
			zIndex: 0,
			visible: false,
			position: null
		},

		initialize: function(options){
			this.parent(options);
//			this.setOptions(options);
		},

		setup: function(container){
			var photo = new Element('p'); 
			var img = new Element('img', {src: 'images/img_demo_s1.jpg'});
			var a = new Element('a', {href: 'http://sharedhat.com'});
			img.inject(a);
			a.inject(photo);
			photo.inject(container);
			return photo;
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
		}
	});

	var logger = new Logger();

	var map = new google.maps.Map($('gmap'), {
		zoom: 13,
		center: new google.maps.LatLng(35.6566870, 139.750859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var o1 = new Tester({
		map: map,
		zInbex: 1000,
		visible: false,
		position: new google.maps.LatLng(35.6566870, 139.750859),
		onZIndexChanged: function(){
			logger.log('events', 'o1 - onZIndexChanged');
		},
		onVisibleChanged: function(){
			logger.log('events', 'o1 - onVisibleChanged');
		}
	});

	o1.setVisible(true);
	logger.log('methods', 'o1 - visible: ' + o1.getVisible());

	o1.setZIndex(100);
	logger.log('methods', 'o1 - z-index: ' + o1.getZIndex());
	logger.log('methods', 'o1 - get: ' + o1.get('position').lat() + ' ' + o1.get('position').lng());
});

}(document.id));