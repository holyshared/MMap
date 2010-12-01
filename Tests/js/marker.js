(function($){

window.addEvent("domready", function(){
	var logger = new Logger();

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});



	var marker = new MMap.Marker({
		map: map,
		className: 'marker markerDefault',
		title: 'Marker title text',
		content: 'Marker content text xxxx xxxx xxxx xxxx xxxx xxxxxx xx',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onPositionChanged: function(event) {
			logger.log('events', "onPositionChanged");
		},
		onZIndexChanged: function(event) {
			logger.log('events', "onZIndexChanged");
		},
		onTitleChanged: function(event) {
			logger.log('events', "onTitleChanged");
		},
		onContentChanged: function(event) {
			logger.log('events', "onContentChanged");
		},
		onVisibleChanged: function(event) {
			logger.log('events', "onVisibleChanged");
		},
		onMouseOver: function(event) {
			logger.log('events', "onMouseOver");
		},
		onMouseOut: function(event) {
			logger.log('events', "onMouseOut");
		},
		onMouseUp: function(event) {
			logger.log('events', "onMouseUp");
		},
		onMouseDown: function(event) {
			logger.log('events', "onMouseDown");
		}
	});

	var binder = new google.maps.MVCObject();
	binder.bindTo('title', marker, 'title');
	binder.bindTo('content', marker, 'content');
	binder.bindTo('position', marker, 'position');
	binder.bindTo('zIndex', marker, 'zIndex');
	binder.bindTo('visible', marker, 'visible');

	var titleListener = google.maps.event.addListener(binder, 'title_changed', function(){
		logger.log('events', "bindTo title_changed OK");
	});
	var contentListener = google.maps.event.addListener(binder, 'content_changed', function(){
		logger.log('events', "bindTo content_changed OK");
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
	logger.log('options', (className == 'marker markerDefault') ? 'className option OK' : 'className option NG');

	var title =	marker.get('title');
	logger.log('options', (title == 'Marker title text') ? 'title option OK' : 'title option NG');

	var content = marker.get('content');
	logger.log('options', (content == 'Marker content text xxxx xxxx xxxx xxxx xxxx xxxxxx xx') ? 'content option OK' : 'content option NG');

	var position = marker.get('position');
	logger.log('options', (position.lat() == 35.6666870) ? 'position option OK' : 'position option NG');
	
	var zIndex = marker.get('zIndex');
	logger.log('options', (zIndex == 0) ? 'position zIndex OK' : 'position zIndex NG');

	var visible = marker.get('visible');
	logger.log('options', (visible == true) ? 'position visible OK' : 'position visible NG');

	var latlng = new google.maps.LatLng(35.6666870, 139.731869);
	marker.setPosition(latlng);
	var position = marker.getPosition();
	logger.log('methods', (position == latlng) ? "Position setter/getter OK" : "Position setter/getter NG");

	marker.setVisible(false);
	var visible = marker.getVisible();
	logger.log('methods', (visible == false) ? "Visible setter/getter OK" : "Visible setter/getter NG");

	marker.setZIndex(10);
	var zIndex = marker.getZIndex();
	logger.log('methods', (zIndex == 10) ? "ZIndex setter/getter OK" : "ZIndex setter/getter NG");
			
	marker.setTitle("foo");
	var title = marker.getTitle();
	logger.log('methods', (title == "foo") ? "Title setter/getter OK" : "Title setter/getter NG");

	marker.setContent("foo bar");
	var content = marker.getContent();
	logger.log('methods', (content == "foo bar") ? "Content setter/getter OK" : "Content setter/getter NG");

	marker.setVisible(true);

});

}(document.id));