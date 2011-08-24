(function($, TestSuite, Testcase){

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		this.logger = testsuite.logger;

		this.marker = new MMap.Marker.Images({
			map: this.map,
			className: 'marker images imagesPaper',
			position: new google.maps.LatLng(35.6666870, 139.731859),
			zIndex: 1,
			visible: false,
			active: true,
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
			]
		});
	},

	test: function(){
		this.testPositionOption();
		this.testZIndexOption();
		this.testVisibleOption();
		this.testImagesOption();
		this.testActiveOption();
	},

	testPositionOption: function(){
		var position = this.marker.get('position');
		this.logger.log('options', (position.lat() == 35.6666870) ? 'options - position OK' : 'options - position NG');
	},

	testZIndexOption: function(){
		var index = this.marker.get('zIndex');
		this.logger.log('options', (index == 1) ? 'options - zIndex OK' : 'options - zIndex NG');
	},

	testVisibleOption: function(){
		var visible = this.marker.get('visible');
		this.logger.log('options', (visible == false) ? 'options - visible OK' : 'options - visible NG');
	},

	testImagesOption: function(){
		var images = this.marker.get('images');
		this.logger.log('options', (images.length == 2) ? 'options - images OK' : 'options - images NG');
	},

	testActiveOption: function(){
		var active = this.marker.get('active');
		this.logger.log('options', (active == true) ? 'options - active OK' : 'options - active NG');
	},

	tearDown: function(){
		this.marker.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, MarkerImagesTestSuite, TestSuite.Testcase));