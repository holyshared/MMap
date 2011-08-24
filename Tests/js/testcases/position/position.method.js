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
		this.testAccesserPosition();
	},

	testAccesserPosition: function(){

		var position = new google.maps.LatLng(35.6566875, 139.750859);
		this.overlayView.setPosition(position);

		var position = this.overlayView.get('position');
		var result = (position.lat() == this.overlayView.getPosition().lat());
		this.logger.log('methods', (result) ? 'methods - position accesser OK' : 'methods - position accesser NG');
	},

	tearDown: function(){
		this.overlayView.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, PositionTestSuite, TestSuite.Testcase));