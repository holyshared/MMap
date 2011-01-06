(function($){

window.addEvent("domready", function(){

	var markers = [{
		title: 'Marker1',
		image: 'http://holyshared.github.com/MMap/images/demo/img01.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859)
	}, {
		title: 'Marker2',
		image: 'http://holyshared.github.com/MMap/images/demo/img02.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.733859)
	}, {
		title: 'Marker3',
		image: 'http://holyshared.github.com/MMap/images/demo/img03.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6650870, 139.729859)
	}, {
		title: 'Marker4',
		image: 'http://holyshared.github.com/MMap/images/demo/img04.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6686870, 139.728859)
	},	{
		title: 'Marker5',
		image: 'http://holyshared.github.com/MMap/images/demo/img05.jpg',
		url: 'http://sharedhat.com/',
		visible: false,
		position: new google.maps.LatLng(35.6646870, 139.726859)
	}];



	/*
	 * The map is made.
	 * The marker is arranged in this map.
     */
	var mapDiv = $('gmap');
	var map = new google.maps.Map(mapDiv, {
		disableDefaultUI: true,
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	//The marker is made based on the parameter of the marker.
	var manageMarkers = [];
	markers.each(function(context){
		var imageMarker = new MMap.Marker.Image(context);
		manageMarkers.push(imageMarker);
	});

	//The marker manager is made, and the managed marker is set.
	var markerManager = new MMap.MarkerManager({
		markers: manageMarkers
	});
	markerManager.setMap(map); //The arranged map is specified for all managed markers.


	var container = mapDiv.getParent();
	var stateView = new MarkerStateView();
	stateView.bindTo('state', markerManager, 'state');
	stateView.getInstance().inject(container);


	//The widget that can specify the radius is arranged in the upper right of the map.
	var radiusWidget = new RadiusWidget();
	radiusWidget.setMap(map);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(radiusWidget.getInstance());

	//An initial value is set.
	markerManager.visibleByBounds(radiusWidget.getBounds());

	//When the center of the map changes, the displayed marker is adjusted with the radius.
	google.maps.event.addListener(map, 'center_changed', function(){
		radiusWidget.setCenter(map.getCenter());
		markerManager.visibleByBounds(radiusWidget.getBounds());
	});

	google.maps.event.addListener(radiusWidget, 'radius_changed', function(){
		markerManager.visibleByBounds(radiusWidget.getBounds());
	});


	SyntaxHighlighter.all();
});

}(document.id));