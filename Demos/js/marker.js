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
		title: 'Marker who contains simple contents',
		content: 'HTML contents can be inserted. <br />It is usual to put sentences and photographs of several lines.',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		visible: true
	});

	SyntaxHighlighter.all();
});

}(document.id));