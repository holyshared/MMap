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
		this.testPositionChanged();
	},

	testPositionChanged: function(){
		var that = this;
		this.overlayView.addEvent('onPositionChanged', function(){
			that.logger.log('events', 'events - onPositionChanged OK');
		});
		this.overlayView.setPosition(new google.maps.LatLng(35.6556870, 139.750859));
	},

	tearDown: function(){
		this.overlayView.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, PositionTestSuite, TestSuite.Testcase));