(function($){

window.addEvent("domready", function(){

	var mapDiv = $('gmap');
	var map = new google.maps.Map(mapDiv, {
		disableDefaultUI: true,
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var manager = new MMap.MarkerManager();
	var loader = new MMap.MarkerLoader({
		onPreload: function(){
		},
		onFailure: function(xhr){
			alert(xhr.status);
		},
		onLoad: function(markers){
alert(Type.isArray(markers))
			manager.setMarkers(markers);
			manager.setMap(map);
console.log(markers);
			manager.visible();
		}
	});
	loader.load('js/marker-loader/markers.json');

	SyntaxHighlighter.all();
});

}(document.id));