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
		className: 'marker html',
		title: 'Marker title text',
		content: 'Marker content text xxxx xxxx xxxx xxxx xxxx xxxxxx xx',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onPositionChanged: function(event) {
			logger.log('events', "onPositionChanged");
		},
		onZIndexChanged: function(event) {
		},
		onTitleChanged: function(event) {
		},
		onContentChanged: function(event) {
		},
		onVisibleChanged: function(event) {
		},
		onMouseOver: function(event) {
		},
		onMouseOut: function(event) {
		},
		onMouseUp: function(event) {
		},
		onMouseDown: function(event) {
		},
		onAdd: function(event) {
			marker.setPosition(new google.maps.LatLng(35.6666870, 139.731869));
		}
	});

});

}(document.id));