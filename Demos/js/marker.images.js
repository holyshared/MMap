(function($){

window.addEvent('domready', function(){

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker.Images({
		map: map,
		className: 'marker images imagesPaper',
		position: new google.maps.LatLng(35.6666870, 139.731859),
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
		}, {
			title: 'demo4',
			image: 'http://holyshared.github.com/MMap/images/demo/img04.jpg',
			url: 'http://sharedhat.com'
		}, {
			title: 'demo5',
			image: 'http://holyshared.github.com/MMap/images/demo/img05.jpg',
			url: 'http://sharedhat.com'
		}]
	});

	SyntaxHighlighter.all();

});

}(document.id));