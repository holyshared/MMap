(function($){

window.addEvent("domready", function(){

	var mapDiv = $('gmap');
	var map = new google.maps.Map(mapDiv, {
		disableDefaultUI: true,
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	//The marker is made based on the parameter of the marker.
	var markers = [{
		title: 'MMap.Marker',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img01.jpg',
		url: 'http://holyshared.github.com/marker.html',
		position: new google.maps.LatLng(35.6666870, 139.731859)
	}, {
		title: 'MMap.Marker.Image',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img02.jpg',
		url: 'http://holyshared.github.com/marker.image.html',
		position: new google.maps.LatLng(35.6666870, 139.733859)
	}, {
		title: 'MMap.Marker.Images',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img03.jpg',
		url: 'http://holyshared.github.com/marker.images.html',
		position: new google.maps.LatLng(35.6650870, 139.729859)
	}, {
		title: 'MMap.Window',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img04.jpg',
		url: 'http://holyshared.github.com/window.html',
		position: new google.maps.LatLng(35.6686870, 139.728859)
	},	{
		title: 'MMap.MarkerLoader',
		image: 'http://holyshared.github.com/MMap/Demos/images/demo/img05.jpg',
		url: 'http://holyshared.github.com/marker.loader.html',
		visible: false,
		position: new google.maps.LatLng(35.6646870, 139.726859)
	}];

	var view = new CurrentMarkerView();
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(view.getInstance());

	var onClick = function(event){
		event.preventDefault();
		markerManager.active(this);
	}

	var onActive = function(event){
		view.set('title', this.getTitle());
		view.set('url', this.getURL());
	}

	var manageMarkers = [];
	markers.each(function(context){
		//markerClick
		var options = Object.merge(context, {
			onClick: onClick,
			onActive: onActive
		});
		var imageMarker = new MMap.Marker.Image(options);
		manageMarkers.push(imageMarker);
	});

	//The marker manager is made, and the managed marker is set.
	var markerManager = new MMap.MarkerManager({
		markers: manageMarkers
	});
	markerManager.setMap(map); //The arranged map is specified for all managed markers.
	markerManager.visible();
	markerManager.active(manageMarkers.getLast());

	SyntaxHighlighter.all();
});

}(document.id));