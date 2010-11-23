(function($){

window.addEvent("domready", function(){
	var logger = new Logger();

	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker.Image({
		map: map,
		title: 'Marker title text',
		src: '../Demos/images/demo/img01.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onClick: function(event){
			event.preventDefault();
			var window = new MMap.Window({
				title: 'aa',
				content: 'aa'
			});
			window.open(this.getMap(), this);
		}
	});

});

}(document.id));