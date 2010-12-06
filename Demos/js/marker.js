(function($){

window.addEvent("domready", function(){

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
		visible: true
	});

});

}(document.id));