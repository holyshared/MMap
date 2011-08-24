(function($, TestSuite, Testcase){

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		this.logger = testsuite.logger;
		this.overlayView = new MockDraggableOverlayView({
			map: this.map,
			visible: true,
			draggable: true,
			position: new google.maps.LatLng(35.6666870, 139.731859)
		});
	},

	test: function(){
		this.testDraggableOption();
	},

	testDraggableOption: function(){
		var draggable = this.overlayView.get('draggable');
		this.logger.log('options', (draggable == true) ? 'options - draggable OK' : 'options - draggable NG');

		this.overlayView.set('draggable', false);

		var draggable = this.overlayView.get('draggable');
		this.logger.log('options', (draggable == false) ? 'options - draggable OK' : 'options - draggable NG');
	},

	tearDown: function(){
		this.overlayView.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, DraggableTestSuite, TestSuite.Testcase));