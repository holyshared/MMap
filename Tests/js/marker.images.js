(function($, MarkerTestSuite, TestSuite){

window.addEvent('domready', function(){

	var tester = new TestSuite({
		container: $('gmap'),
		center: new google.maps.LatLng(35.6666870, 139.731859)
	});
	tester.run();

});

}(document.id, MarkerImagesTestSuite, TestSuite));