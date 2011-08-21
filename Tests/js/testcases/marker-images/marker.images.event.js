(function($, TestSuite, Testcase){

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		var logger = this.logger = testsuite.logger;

		this.marker = new MMap.Marker.Images({
			map: this.map,
			className: 'marker images imagesPaper',
			position: new google.maps.LatLng(35.6666870, 139.731859),
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
			onPositionChanged: function() {
				logger.log('events', 'onPositionChanged OK');
			},
			onZIndexChanged: function() {
				logger.log('events', 'onZIndexChanged OK');
			},
			onVisibleChanged: function() {
				logger.log('events', 'onVisibleChanged OK');
			},
			onDblClick: function(event) {
				logger.log('events', 'onDblClick OK');
			},
			onClick: function(event) {
				logger.log('events', 'onClick OK');
			},
			onMouseOver: function(event) {
				logger.log('events', 'onMouseOver OK');
			},
			onMouseOut: function(event) {
				logger.log('events', 'onMouseOut OK');
			},
			onMouseUp: function(event) {
				logger.log('events', 'onMouseUp OK');
			},
			onMouseDown: function(event) {
				logger.log('events', 'onMouseDown OK');
			},
			onCurrentChanged: function(index, image) {
				logger.log('events', 'onCurrentChanged index=' + index + ' src=' + image.image + ' OK');
			}
		});
	},

	test: function(){
	},

	tearDown: function(){
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, MarkerImagesTestSuite, TestSuite.Testcase));