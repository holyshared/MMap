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
			url: 'http://mootools.net'
		}, {
			title: 'demo2',
			image: 'http://holyshared.github.com/MMap/images/demo/img02.jpg',
			url: 'http://mootools.net/core/'
		}, {
			title: 'demo3',
			image: 'http://holyshared.github.com/MMap/images/demo/img03.jpg',
			url: 'http://mootools.net/more/'
		}, {
			title: 'demo4',
			image: 'http://holyshared.github.com/MMap/images/demo/img04.jpg',
			url: 'http://mootools.net/forge/'
		}, {
			title: 'demo5',
			image: 'http://holyshared.github.com/MMap/images/demo/img05.jpg',
			url: 'http://mootools.net/blog/'
		}],
		onClick: function(event){
			var image = this.getCurrentImage();
			window.location.href = image.url;
		}
	});

	SyntaxHighlighter.all();

});

}(document.id));