(function($){

window.addEvent("domready", function(){
	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker({
		map: map,
		className: 'marker',
		title: 'title',
		content: 'content',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0
	});
});

/*
	new google.maps.Marker({
		map: gmap.getInstance(),
		position: new google.maps.LatLng(35.6666870, 139.731859),
		title: "A"
	});
*/
}(document.id));