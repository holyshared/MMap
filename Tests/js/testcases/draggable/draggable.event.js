(function($, TestSuite, Testcase){

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		this.logger = testsuite.logger;
		this.overlayView = new MockDraggableOverlayView({
			map: this.map,
			visible: true,
			position: new google.maps.LatLng(35.6666870, 139.731859),
			draggable: true
		});
	},

	test: function(){
		this.testDragStart();
		this.testDrag();
		this.testDragEnd();
	},

	testDragStart: function(){
		var that = this;
		var map = this.map;
		this.overlayView.addEvent('onDragStart', function(event){
			var marker = new google.maps.Marker({
				position: event.latlng
			});
			marker.setMap(map);
			that.logger.log('events', 'onDragStart - ' + event.latlng.toString() + ' OK');
		});
	},

	testDrag: function(){
		var that = this;
		this.overlayView.addEvent('onDrag', function(event){
			that.logger.log('events', 'onDrag - ' + event.latlng.toString() + ' OK');
		});
	},

	testDragEnd: function(){
		var that = this;
		var map = this.map;
		this.overlayView.addEvent('onDragEnd', function(event){
			var marker = new google.maps.Marker({
				position: event.latlng
			});
			marker.setMap(map);
			that.logger.log('events', 'onDragEnd - ' + event.latlng.toString() + ' OK');
		});
	},

	tearDown: function(){
//		this.overlayView.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, DraggableTestSuite, TestSuite.Testcase));