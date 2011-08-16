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
		images: [{
			title: 'demo1',
			image: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com'
		}],
		onPositionChanged: function(event) {
			logger.log('events', 'onPositionChanged');
		},
		onZIndexChanged: function(event) {
			logger.log('events', 'onZIndexChanged');
		},
		onVisibleChanged: function(event) {
			logger.log('events', 'onVisibleChanged');
		},
		onCurrentChanged: function(event) {


		}
	});


});

}(document.id));