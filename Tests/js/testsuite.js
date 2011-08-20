(function(win){

	var TestSuite = this.TestSuite = function(options) {
		this.setOptions(options);
		this.applyOptions();
		this.logger = new Logger();
		this.testcases = [];
	}

	TestSuite.implement({

		applyOptions: function(){
			var opts = this.options;
			if (opts.container && opts.center) {
				this.map = new google.maps.Map($(opts.container), {
					zoom: 15,
					center: opts.center,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
			}
		},

		setOptions: function(options){
			this.options = options || {};
		},

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
