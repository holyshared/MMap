(function($){

window.addEvent("domready", function(){
	var logger = new Logger();

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var markers = [
	    {
			title: 'Marker title text',
			src: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com/',
			position: new google.maps.LatLng(35.6666870, 139.731859)
		},
	    {
			title: 'Marker title text',
			src: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com/',
			position: new google.maps.LatLng(35.6666870, 139.731859)
		},
	    {
			title: 'Marker title text',
			src: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com/',
			position: new google.maps.LatLng(35.6666870, 139.731859)
		},
	    {
			title: 'Marker title text',
			src: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com/',
			position: new google.maps.LatLng(35.6666870, 139.731859)
		},
	    {
			title: 'Marker title text',
			src: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com/',
			position: new google.maps.LatLng(35.6666870, 139.731859)
		}
	];

	var manageMarkers = []; 
	markers.each(function(props){
		var options = Object.append(props, map);
		var marker = new MMap.Marker.Image(options);
		manageMarkers.push(marker);
	});

	var manager = new MMap.MakerManager({
		map: map,
		markers: manageMarkers
	});

});

}(document.id));