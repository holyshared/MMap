(function($){

window.addEvent("domready", function(){

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	//MMap.Marker.HTML
	var marker = new MMap.Marker.HTML({
		map: map,
		className: 'marker markerDefault',
		title: 'Marker who contains simple contents',
		content: 'HTML contents can be inserted. <br />'
			+ 'It is usual to put sentences and photographs of several lines.',
		position: new google.maps.LatLng(35.6666870, 139.741859),
		visible: true,
		draggable: true
	});

	//MMap.Marker.Image
	var marker1 = new MMap.Marker.Image({
		map: map,
		title: 'Title of image marker [1]',
		image: 'http://holyshared.github.com/MMap/images/demo/img01.jpg',
		url: 'http://mootools.net',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		draggable: true,
		onClick: function(event){
			event.prevnetDefault();
		}
	});

	//MMap.Marker.Images
	var marker = new MMap.Marker.Images({
		map: map,
		className: 'marker images imagesPaper',
		position: new google.maps.LatLng(35.6646970, 139.721959),
		images: [{
			title: 'demo1',
			image: 'http://holyshared.github.com/MMap/images/demo/img01.jpg',
			url: 'http://sharedhat.com'
		}, {
			title: 'demo2',
			image: 'http://holyshared.github.com/MMap/images/demo/img02.jpg',
			url: 'http://sharedhat.com'
		}, {
			title: 'demo3',
			image: 'http://holyshared.github.com/MMap/images/demo/img03.jpg',
			url: 'http://sharedhat.com'
		}],
		draggable: true,
		onClick: function(event){
			event.prevnetDefault();
		}
	});

	SyntaxHighlighter.all();
});

}(document.id));