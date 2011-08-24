(function($, TestSuite, Testcase){

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		this.logger = testsuite.logger;

		this.overlayView = new MockOverlayView({
			map: this.map,
			zIndex: 1000,
			visible: false,
			position: new google.maps.LatLng(35.6566870, 139.750859)
		});
	},

	test: function(){
		this.testPositionOption();
	},

	testPositionOption: function(){
		var position = this.overlayView.get('position');
		this.logger.log('options', (position.lat() == 35.6566870) ? 'options - position OK' : 'options - position NG');
	},

	tearDown: function(){
		this.overlayView.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, PositionTestSuite, TestSuite.Testcase));