(function($){

window.addEvent('domready', function(){

	var logger = new Logger();

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker.Images({
		map: map,
		className: 'marker images imagesPaper',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onPositionChanged: function(event) {
			logger.log('events', 'onPositionChanged');
		},
		onZIndexChanged: function(event) {
			logger.log('events', 'onZIndexChanged');
		},
		onVisibleChanged: function(event) {
			logger.log('events', 'onVisibleChanged');
		},
/*
		onMouseOver: function(event) {
			logger.log('events', 'onMouseOver');
		},
		onMouseOut: function(event) {
			logger.log('events', 'onMouseOut');
		},
*/
		onMouseUp: function(event) {
			logger.log('events', 'onMouseUp');
		},
		onMouseDown: function(event) {
			logger.log('events', 'onMouseDown');
		},
		onAdd: function(event) {
			var latlng = new google.maps.LatLng(35.6666870, 139.731869);
			marker.setPosition(latlng);
			var position = marker.getPosition();
			logger.log('methods', (position == latlng) ? 'Position setter/getter OK' : 'Position setter/getter NG');

			marker.setZIndex(10);
			var zIndex = marker.getZIndex();
			logger.log('methods', (zIndex == 10) ? 'ZIndex setter/getter OK' : 'ZIndex setter/getter NG');
		}
	});

	var i1 = {
		title: 'demo1',
		src: '../Demos/images/demo/img01.jpg',
		url: 'http://sharedhat.com'
	};
	marker.addImage(i1);


	var i2 = {
		title: 'demo2',
		src: '../Demos/images/demo/img02.jpg',
		url: 'http://sharedhat.com'
	};
	marker.addImage(i2);

	marker.addImages([
		{
			title: 'demo3',
			src: '../Demos/images/demo/img03.jpg',
			url: 'http://sharedhat.com'
		},
		{
			title: 'demo4',
			src: '../Demos/images/demo/img04.jpg',
			url: 'http://sharedhat.com'
		},
		{
			title: 'demo5',
			src: '../Demos/images/demo/img05.jpg',
			url: 'http://sharedhat.com'
		}
	]);
	marker.removeImages(i1, i2);

	var className =	marker.options.className;
	logger.log('options', (className == 'marker images imagesPaper') ? 'className option OK' : 'className option NG');

	var position = marker.get('position');
	logger.log('options', (position.lat() == 35.6666870) ? 'position option OK' : 'position option NG');

	var zIndex = marker.get('zIndex');
	logger.log('options', (zIndex == 0) ? 'zIndex option OK' : 'zIndex option NG');

	var visible = marker.get('visible');
	logger.log('options', (visible == true) ? 'visible option OK' : 'visible option NG');

});

}(document.id));