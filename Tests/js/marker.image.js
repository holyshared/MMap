(function($){

window.addEvent('domready', function(){

	var logger = new Logger();

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker.Image({
		map: map,
//		className: 'marker image paper',
		title: 'Marker title text',
		src: '../Demos/images/demo/img01.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onPositionChanged: function(event) {
			logger.log('events', 'onPositionChanged');
		},
		onZIndexChanged: function(event) {
			logger.log('events', 'onZIndexChanged');
		},
		onTitleChanged: function(event) {
			logger.log('events', 'onTitleChanged');
		},
		onImageChanged: function(event) {
			logger.log('events', 'onImageChanged');
		},
		onURLChanged: function(event) {
			logger.log('events', 'onURLChanged');
		},
		onVisibleChanged: function(event) {
			logger.log('events', 'onVisibleChanged');
		},
		onMouseOver: function(event) {
			logger.log('events', 'onMouseOver');
		},
		onMouseOut: function(event) {
			logger.log('events', 'onMouseOut');
		},
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
			
			marker.setTitle('foo');
			var title = marker.getTitle();
			logger.log('methods', (title == 'foo') ? 'Title setter/getter OK' : 'Title setter/getter NG');

			marker.setImage('../Demos/images/demo/img02.jpg');
			var image = marker.getImage();
			logger.log('methods', (image == '../Demos/images/demo/img02.jpg') ? 'Image setter/getter OK' : 'Image setter/getter NG');

			marker.setURL('http://mootools.net');
			var url = marker.getURL();
			logger.log('methods', (url == 'http://mootools.net') ? 'Url setter/getter OK' : 'Url setter/getter NG');
		}
	});

	var className =	marker.get('className');
	logger.log('options', (className == 'marker image imageDefault') ? 'className option OK' : 'className option NG');

	var title =	marker.get('title');
	logger.log('options', (title == 'Marker title text') ? 'title option OK' : 'title option NG');

	var src = marker.get('src');
	logger.log('options', (src == '../Demos/images/demo/img01.jpg') ? 'image option OK' : 'image option NG');

	var url = marker.get('url');
	logger.log('options', (url == 'http://sharedhat.com/') ? 'url option OK' : 'url option NG');

	var position = marker.get('position');
	logger.log('options', (position.lat() == 35.6666870) ? 'position option OK' : 'position option NG');

	var zIndex = marker.get('zIndex');
	logger.log('options', (zIndex == 0) ? 'zIndex option OK' : 'zIndex option NG');

	var visible = marker.get('visible');
	logger.log('options', (visible == true) ? 'visible option OK' : 'visible option NG');

});

}(document.id));