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

	var logger = new Logger();


	var map = new google.maps.Map($('gmap'), {
		zoom: 13,
		center: new google.maps.LatLng(35.6566870, 139.750859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var Tester = new Class({

		Implements: [MMap.Events, MMap.Options],

		initialize: function(options) {
			var subclass = Object.append(new google.maps.OverlayView(), this);
			for (var k in subclass) {
				this[k] = subclass[k];
			}
			this.instance = new Element('div', {
				'class': 'instance'
			});
			this.setOptions(options);
			this.instance.addClass(this.get('className'));
			
			var photo = new Element('p'); 
			var img = new Element('img', {src: 'images/img_demo_s1.jpg'});
			var a = new Element('a', {href: 'http://sharedhat.com'});
			img.inject(a);
			a.inject(photo);
			photo.inject(this.instance);
		},

		onAdd: function() {
			var panel = this.getPanes().overlayImage;
			this.instance.inject(panel);
			this.fireEvent("add");
		},

		onRemove: function() {
			this.unbindAll();
			this.removeEvents();
			this.instance.destroy();
		},

		draw: function() {
			var projection = this.getProjection();
			var position = this.get("position");
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

	var overlayView1 = new Tester({
		map: map,
		zIndex: 0,
		position: new google.maps.LatLng(35.6666870, 139.731859),
		className: 'ov1',
		onClick: function(event){
			event.preventDefault();
			logger.log('events', 'overlayView1 - click');
		}
	});
	
	var mouseover11 = function(){
		logger.log("events", "overlayView1 - mouseover1");
	};
	var mouseover12 = function(){
		logger.log("events", "overlayView1 - mouseover2");
	};
	
	overlayView1.addEvent('mouseover', mouseover11)
		.addEvent('mouseover', mouseover12)
		.removeEvent('mouseover', mouseover11)
		.removeEvent('mouseover', mouseover12);
/*
	var overlayView2 = new Tester({
		map: map,
		zIndex: 0,
		position: new google.maps.LatLng(35.6566870, 139.731870),
		className: 'ov2'
	});

	//addEvents, removeEvents
	var click = function() { logger.log("events", "overlayView2 - click"); };
	var mouseover1 = function() { logger.log("events", "overlayView2 - mouseover-1"); };
	var mouseover2 = function() { logger.log("events", "overlayView2 - mouseover-2"); };
	var onAdd = function() { logger.log("events", "overlayView2 - onAdd"); };

	logger.log("methods", "overlayView2 - addEvents - click, mouseover1, onAdd");
	overlayView2.addEvents({
		click: click,
		mouseover: mouseover1,
		onAdd: onAdd
	});

	logger.log("methods", "overlayView2 - addEvent - mouseover2");
	overlayView2.addEvent("mouseover", mouseover2);

	logger.log("methods", "overlayView2 - removeEvent - mouseover1");
	overlayView2.removeEvent("mouseover", mouseover1);

	logger.log("methods", "overlayView2 - fireEvent - mouseover");
	overlayView2.fireEvent("mouseover");

	var overlayView3 = new Tester({
		zIndex: 0,
		position: new google.maps.LatLng(35.6666870, 139.832870),
		className: 'ov3'
	});

	//addEvents, removeEvents
	var click3 = function() { logger.log("events", "overlayView3 - click"); };
	var mouseover31 = function() { logger.log("events", "overlayView3 - mouseover-1"); };
	var mouseover32 = function() { logger.log("events", "overlayView3 - mouseover-2"); };
	var onAdd3 = function() { logger.log("events", "overlayView3 - onAdd"); };

	overlayView3.addEvents({
		"click": click3,
		"mouseover": mouseover31,
		"onAdd": onAdd3
	});

	logger.log("methods", "overlayView3 - addEvents - mouseover32");
	overlayView3.addEvents("mouseover", mouseover32);

	logger.log("methods", "overlayView3 - removeEvent - mouseover31");
	overlayView3.removeEvent("mouseover", mouseover31);

	logger.log("methods", "overlayView3 - removeEvents - mouseover");
	overlayView3.removeEvents("mouseover");

	logger.log("methods", "overlayView3 - removeEvents - click");
	overlayView3.removeEvents("click");

	logger.log("methods", "overlayView3 - setMap");
	overlayView3.setMap(map);
*/
});

}(document.id));