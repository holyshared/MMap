(function($){

window.addEvent("domready", function(){

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var contentWindow = new MMap.Window({
		className: 'window windowDefault',
		title: 'Title of window',
		content: 'Contents displayed in window'
	});

	var marker = new MMap.Marker.Image({
		map: map,
		className: 'marker imageDefault',
		title: 'Title of image marker [1]',
		image: 'http://holyshared.github.com/MMap/images/demo/img01.jpg',
		url: 'http://mootools.net',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		onClick: function(event){
			event.preventDefault();
			//The reference to this here is an instance of the marker.
			contentWindow.open(map, this);
		}
	});

	SyntaxHighlighter.all();
});

}(document.id));