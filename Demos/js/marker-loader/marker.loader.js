(function($){

window.addEvent("domready", function(){

	var mapDiv = $('gmap');
	var map = new google.maps.Map(mapDiv, {
		disableDefaultUI: true,
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var spinner = new Spinner({ map: map });
	var manager = new MMap.MarkerManager();
	var loader = new MMap.MarkerLoader({
		onPreload: function(){
			spinner.show();
		},
		onLoad: function(markers){
			manager.setMarkers(markers);
			manager.setMap(map);
			manager.visible();
			spinner.hide();
		}
	});
	loader.load('http://holyshared.github.com/MMap/Demos/js/marker-loader/markers.json');

	SyntaxHighlighter.all();
});

}(document.id));