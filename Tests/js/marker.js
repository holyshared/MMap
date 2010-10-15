(function($){

	var map = new google.maps.Map(this.container, {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

/*
	new google.maps.Marker({
		map: gmap.getInstance(),
		position: new google.maps.LatLng(35.6666870, 139.731859),
		title: "A"
	});
*/
}(document.id));