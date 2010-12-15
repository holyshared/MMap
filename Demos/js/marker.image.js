(function($){

window.addEvent('domready', function(){

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker1 = new MMap.Marker.Image({
		map: map,
		title: 'Title of image marker [1]',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img01.jpg',
		url: 'http://mootools.net',
		position: new google.maps.LatLng(35.6666870, 139.731859)
	});

	var marker2 = new MMap.Marker.Image({
		map: map,
		className: 'imagePaper',
		title: 'Title of image marker [2]',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img02.jpg',
		url: 'http://mootools.net/forge',
		position: new google.maps.LatLng(35.6626870, 139.730859)
	});

	SyntaxHighlighter.all();

});

}(document.id));