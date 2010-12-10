(function($){

var RadiusWidget = this.RadiusWidget = new Class({

	Extends: MMap.MVCObject,

	Implements: [MMap.Events],

	initialize: function(){
		this._values = [200, 300, 400, 500];
		this._circle = new google.maps.Circle({
			fillColor: '#ffffff',
			fillOpacity: 0,
			strokeColor: '#ff0000',
			radius: 200
		});
		this._setup();
		this._setupListner();
	},

	_setup: function(){
		var self = this;
		this._container = new Element('div', {'class': 'radiusWidget'});
		this._options = new Element('ul', {'class': 'options'});
		this._values.each(function(radius){
			var li = new Element('li');
			var a = new Element('a', {
				'href': '#' + radius.toString(),
				'title': radius.toString() + 'm',
				'html': radius.toString() + 'm'
			});
			a.inject(li);
			li.inject(self._options);
		});
		this._options.inject(this._container);
		this._radius = this._options.getElements('a');
		this._selected(0);
	},

	_setupListner: function(){
		var self = this;
		self._radius.addEvent('click', function(event){
			if (self._radius.contains(event.target)) {
				var index = self._radius.indexOf(event.target);
				self._selected(index);
			}
		});
	},

	_selected: function(index){
		var self = this;
		var value = this._values[index].toInt();
		this._radius.each(function(element, key){
			if (index == key) {
				self._radius[key].addClass('selected');
			} else {
				self._radius[key].removeClass('selected');
			}
		});
		self.setRadius(value);
	},

	setRadius: function(value){
		var current = this._circle.getRadius();
		if (!this._values.contains(value)) return;
		if (current == value.toInt()) return;
		this._circle.set('radius', value.toInt());
		this.set('radius', value.toInt());
	},

	getRadius: function(){
		return this._circle.get('radius');
	},
	
	getBounds: function(){
		return this._circle.getBounds();
	},

	setCenter: function(value){
		var current = this.get('center');
		if (current == value) return;
		this._circle.setCenter(value);
		this.set('center', value);
	},

	getCenter: function(){
		return this.get('center');
	},

	setMap: function(map){
		this._circle.setMap(map);
		this.setCenter(map.getCenter());
	},

	getMap: function(){
		return this._circle.getMap();
	},

	getInstance: function(){
		return this._container;
	}

});

window.addEvent("domready", function(){

	/*
	 * The map is made.
	 * The marker is arranged in this map.
     */
	var map = new google.maps.Map($('gmap'), {
		disableDefaultUI: true,
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	//The marker is made based on the parameter of the marker.
	var markers = [{
		title: 'Marker1',
		image: '../Demos/images/demo/img01.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859)
	}, {
		title: 'Marker2',
		image: '../Demos/images/demo/img02.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.733859)
	}, {
		title: 'Marker3',
		image: '../Demos/images/demo/img03.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6650870, 139.729859)
	}, {
		title: 'Marker4',
		image: '../Demos/images/demo/img04.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6686870, 139.728859)
	},	{
		title: 'Marker5',
		image: '../Demos/images/demo/img05.jpg',
		url: 'http://sharedhat.com/',
		visible: false,
		position: new google.maps.LatLng(35.6646870, 139.726859)
	}];

	var manageMarkers = [];
	markers.each(function(context){
		var imageMarker = new MMap.Marker.Image(context);
		manageMarkers.push(imageMarker);
	});

	//The marker manager is made, and the managed marker is set.
	var markerManager = new MMap.MarkerManager({
		markers: manageMarkers
	});
	markerManager.setMap(map); //The arranged map is specified for all managed markers.


	//The widget that can specify the radius is arranged in the upper right of the map.
	var radiusWidget = new RadiusWidget();
	radiusWidget.setMap(map);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(radiusWidget.getInstance());

	//An initial value is set.
	markerManager.visible(radiusWidget.getBounds());

	//When the center of the map changes, the displayed marker is adjusted with the radius.
	google.maps.event.addListener(map, 'center_changed', function(){
		radiusWidget.setCenter(map.getCenter());
		markerManager.visible(radiusWidget.getBounds());
	});

	google.maps.event.addListener(radiusWidget, 'radius_changed', function(){
		markerManager.visible(radiusWidget.getBounds());
	});

	SyntaxHighlighter.all();
});

}(document.id));