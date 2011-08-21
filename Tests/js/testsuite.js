(function(win){

	var Base = {};
	Base.TestSuite = {

		Implements: [Options],

		options: {
			container: null,
			center: null
		},

		initialize: function(options){
			this.setOptions(options);
			this.applyOptions(options);
			this.logger = new Logger();
		},

		applyOptions: function(opts){
			if (opts.container && opts.center) {
				this.map = new google.maps.Map($(opts.container), {
					zoom: 15,
					center: opts.center,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
			}
		},

		run: function(){
			var that = this;
			TestSuite.testcases.each(function(testcase){
				testcase.setTestSuite(that);
				if (testcase.setup){
					testcase.setup.call(testcase);
				}
				if (testcase.test){
					testcase.test.call(testcase);
				}
				if (testcase.tearDown){
					testcase.tearDown.call(testcase);
				}
			});
		}

	};

	Base.TestSuitStatic = {

		testcases: [],

		addTestCase: function(testcase){
			this.testcases.push(testcase);
		}

	};

	Base.createTestSuite = function() {
		var clone = new Class(Base.TestSuite);
		Object.append(clone, Base.TestSuitStatic);
		Object.append(clone, {
			run: function() {
				var that = this;
				clone.testcases.each(function(testcase){
					testcase.setTestSuite(that);
					if (testcase.setup){
						testcase.setup.call(testcase);
					}
					if (testcase.test){
						testcase.test.call(testcase);
					}
					if (testcase.tearDown){
						testcase.setup.call(testcase);
					}
				});
			}
		});
		return clone;
	}


	var TestSuite = this.TestSuite = new Class(Base.TestSuite);
	Object.append(TestSuite, Base.TestSuitStatic);
	Object.append(TestSuite, {
		create: function(){
			return Base.createTestSuite();
		}
	});


	TestSuite.Testcase = new Class({

		initialize: function(testcase){
			for (var key in testcase){
				this[key] = testcase[key];
			}
		},

		setTestSuite: function(testSuite){
			this.testSuite = testSuite;
		},

		getTestSuite: function(){
			return this.testSuite;
		}

	});
	

}(window));
