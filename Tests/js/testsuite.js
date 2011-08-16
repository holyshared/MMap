(function(win){

	var TestSuite = this.TestSuite = function() {

		this.logger = new Logger();
		this.map = new google.maps.Map($('gmap'), {
			zoom: 15,
			center: new google.maps.LatLng(35.6666870, 139.731859),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		this.testcases = [];

	}

	TestSuite.implement({

		addTestCase: function(testcase){
			this.testcases.push(testcase);
		},

		run: function(){
			var that = this;
			this.testcases.each(function(testcase){
				testcase.call(that);
			});
		}

	});

}(window));
