(function($, TestSuite){

window.addEvent('domready', function(){


	var tester = new TestSuite();

	tester.addTestCase(function(){

		var map = new google.maps.Map($('gmap'), {
			zoom: 15,
			center: new google.maps.LatLng(35.6666870, 139.731859),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var marker = new MMap.Marker.Images({
			map: map,
			className: 'marker images imagesPaper',
			position: new google.maps.LatLng(35.6666870, 139.731859),
			zIndex: 0,
			visible: true,
			images: [
				{
					title: 'demo1',
					image: '../Demos/images/demo/img01.jpg',
					url: 'http://sharedhat.com'
				}, {
					title: 'demo2',
					image: '../Demos/images/demo/img02.jpg',
					url: 'http://sharedhat.com'
				}
			],
			onClick: function(event) {
				tester.logger.log('events', 'onClick');
			},
			onDblClick: function(event) {
				tester.logger.log('events', 'onDblClick');
			},
			onMouseOver: function(event){
				tester.logger.log('events', 'onMouseOver');
			},
			onMouseOut: function(event){
				tester.logger.log('events', 'onMouseOut');
			},
			onMouseUp: function(event){
				tester.logger.log('events', 'onMouseUp');
			},
			onMouseDown: function(event){
				tester.logger.log('events', 'onMouseDown');
			},
			onPositionChanged: function(event) {
				tester.logger.log('events', 'onPositionChanged');
			},
			onZIndexChanged: function(event) {
				tester.logger.log('events', 'onZIndexChanged');
			},
			onVisibleChanged: function(event) {
				tester.logger.log('events', 'onVisibleChanged');
			},
			onCurrentChanged: function(current) {
				tester.logger.log('events', 'onCurrentChanged - ' + current);
			}
		});

	});

	tester.run();

});

}(document.id, TestSuite));