(function($){

window.addEvent("domready", function(){
	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker.Image({
		map: map,
		className: 'marker image paper',
		title: 'title',
		src: 'images/img_demo_s1.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0
	});

});

}(document.id))