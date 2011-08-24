(function($){

window.addEvent("domready", function(){

	var logger = new Logger();

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
		onZIndexChanged: function(){
			logger.log('events', 'o1 - onZIndexChanged');
		},
		onVisibleChanged: function(){
			logger.log('events', 'o1 - onVisibleChanged');
		},
		onActiveChanged: function(){
			logger.log('events', 'o1 - onActiveChanged');
		}
	});


//	logger.log('options', (o1.getZIndex() == 1000) ? 'zIndex option OK' : 'zIndex option NG' );
	logger.log('options', (o1.getVisible() == false) ? 'visible option OK' : 'visible option NG');
	logger.log('options', (o1.isActive() == false) ? 'active option OK' : 'active option NG');

	o1.setVisible(true);
	logger.log('methods', 'o1 - visible: ' + o1.getVisible());

//	o1.setZIndex(100);
//	logger.log('methods', 'o1 - z-index: ' + o1.getZIndex());
	logger.log('methods', 'o1 - get: ' + o1.get('position').lat() + ' ' + o1.get('position').lng());

	o1.set('active', true);
	logger.log('methods', 'o1 - active: ' + o1.isActive());

	o1.set('active', false);
	logger.log('methods', 'o1 - deactive: ' + o1.isActive());

});

}(document.id));