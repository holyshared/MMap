(function($, TestSuite, Testcase){

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		this.logger = testsuite.logger;
		this.overlayView = new MockDraggableOverlayView({
			map: this.map,
			visible: true,
			position: new google.maps.LatLng(35.6666870, 139.731859)
		});
	},

	test: function(){
		this.testAccesserDraggableOption();
	},

	testAccesserDraggableOption: function(){
		this.overlayView.setDraggable(true);

		var draggable = this.overlayView.get('draggable');
		this.logger.log('methods', (draggable == true) ? 'method - setDraggable OK' : 'method - setDraggable NG');

		this.overlayView.setDraggable(false);

		var draggable = this.overlayView.get('draggable');
		this.logger.log('methods', (draggable == false) ? 'method - getDraggable OK' : 'method - getDraggable NG');
	},

	tearDown: function(){
		this.overlayView.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, DraggableTestSuite, TestSuite.Testcase));