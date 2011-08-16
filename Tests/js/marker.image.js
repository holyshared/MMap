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
		image: '../Demos/images/demo/img01.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onPositionChanged: function(event) {
			logger.log('events', 'onPositionChanged OK');
		},
		onZIndexChanged: function(event) {
			logger.log('events', 'onZIndexChanged OK');
		},
		onTitleChanged: function(event) {
			logger.log('events', 'onTitleChanged OK');
		},
		onImageChanged: function(event) {
			logger.log('events', 'onImageChanged OK');
		},
		onURLChanged: function(event) {
			logger.log('events', 'onURLChanged OK');
		},
		onVisibleChanged: function(event) {
			logger.log('events', 'onVisibleChanged OK');
		},
		onDblClick: function(event) {
			logger.log('events', 'onDblClick OK');
		},
		onClick: function(event) {
			logger.log('events', 'onClick OK');
		},
		onMouseOver: function(event) {
			logger.log('events', 'onMouseOver OK');
		},
		onMouseOut: function(event) {
			logger.log('events', 'onMouseOut OK');
		},
		onMouseUp: function(event) {
			logger.log('events', 'onMouseUp OK');
		},
		onMouseDown: function(event) {
			logger.log('events', 'onMouseDown OK');
		}
	});



	var binder = new google.maps.MVCObject();
	binder.bindTo('title', marker, 'title');
	binder.bindTo('image', marker, 'image');
	binder.bindTo('url', marker, 'url');
	binder.bindTo('position', marker, 'position');
	binder.bindTo('zIndex', marker, 'zIndex');
	binder.bindTo('visible', marker, 'visible');

	var titleListener = google.maps.event.addListener(binder, 'title_changed', function(){
		logger.log('events', "bindTo title_changed OK");
	});
	var imageListener = google.maps.event.addListener(binder, 'image_changed', function(){
		logger.log('events', "bindTo image_changed OK");
	});
	var urlListener = google.maps.event.addListener(binder, 'url_changed', function(){
		logger.log('events', "bindTo url_changed OK");
	});
	var positionListener = google.maps.event.addListener(binder, 'position_changed', function(){
		logger.log('events', "bindTo position_changed OK");
	});
	var zindexListener = google.maps.event.addListener(binder, 'zindex_changed', function(){
		logger.log('events', "bindTo zindex_changed OK");
	});
	var visibleListener = google.maps.event.addListener(binder, 'visible_changed', function(){
		logger.log('events', "bindTo visible_changed OK");
	});	





	var className =	marker.options.className;
	logger.log('options', (className == 'marker image imageDefault') ? 'className option OK' : 'className option NG');

	var title =	marker.get('title');
	logger.log('options', (title == 'Marker title text') ? 'title option OK' : 'title option NG');

	var image = marker.get('image');
	logger.log('options', (image == '../Demos/images/demo/img01.jpg') ? 'image option OK' : 'image option NG');

	var url = marker.get('url');
	logger.log('options', (url == 'http://sharedhat.com/') ? 'url option OK' : 'url option NG');

	var position = marker.get('position');
	logger.log('options', (position.lat() == 35.6666870) ? 'position option OK' : 'position option NG');

	var zIndex = marker.get('zIndex');
	logger.log('options', (zIndex == 0) ? 'zIndex option OK' : 'zIndex option NG');

	var visible = marker.get('visible');
	logger.log('options', (visible == true) ? 'visible option OK' : 'visible option NG');


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

});

}(document.id));