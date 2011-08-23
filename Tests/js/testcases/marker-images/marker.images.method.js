(function($, TestSuite, Testcase){


var image1 = {
	title: 'demo1',
	image: '../Demos/images/demo/img01.jpg',
	url: 'http://sharedhat.com'
};

var image2 = {
	title: 'demo2',
	image: '../Demos/images/demo/img02.jpg',
	url: 'http://sharedhat.com'
};

var image3 = {
	title: 'demo3',
	image: '../Demos/images/demo/img03.jpg',
	url: 'http://sharedhat.com'
};

var image4 = {
	title: 'demo4',
	image: '../Demos/images/demo/img04.jpg',
	url: 'http://sharedhat.com'
};

var image5 = {
	title: 'demo5',
	image: '../Demos/images/demo/img05.jpg',
	url: 'http://sharedhat.com'
};

var testcase = {

	setup: function(){
		var testsuite = this.getTestSuite();
		this.map = testsuite.map;
		this.logger = testsuite.logger;
		this.marker = new MMap.Marker.Images({
			map: this.map,
			className: 'marker images imagesPaper',
			position: new google.maps.LatLng(35.6666870, 139.731859)
		});
	},

	test: function(){
		this.testAcceserImages();
		this.testAcceserCurrent();
		this.testCurrentImage();
		this.testAddImage();
		this.testAddImages();
		this.testRemoveImage();
		this.testRemoveImages();
		this.testStartTop();
	},

	testAcceserImages: function(){
		var images = [
			image1, image2
		];
		this.marker.setImages(images);
		this.logger.log('methods', (this.marker.getImages() == images) ? 'images acceser OK' : 'images acceser NG');
	},

	testAcceserCurrent: function(){
		this.marker.setCurrent(1);
		this.logger.log('methods', (this.marker.getCurrent() == 1) ? 'current acceser OK' : 'current acceser NG');
	},

	testCurrentImage: function(){
		var image = this.marker.getCurrentImage(1);
		this.logger.log('methods', (image == image2) ? 'testCurrentImage OK' : 'testCurrentImage NG');
	},

	testAddImage: function(){
		this.marker.addImage(image3);

		var images = this.marker.getImages();
		this.logger.log('methods', (images.length == 3) ? 'addImage OK' : 'addImage NG');
	},

	testAddImages: function(){

		this.marker.addImages([image4, image5]);

		var images = this.marker.getImages();
		this.logger.log('methods', (images.length == 5) ? 'addImages OK' : 'addImages NG');
	},

	testRemoveImage: function(){

		this.marker.removeImage(image3);

		var images = this.marker.getImages();
		this.logger.log('methods', (images.length == 4) ? 'removeImage OK' : 'removeImage NG');
	},

	testRemoveImages: function(){
		this.marker.removeImages([image4, image5]);

		var images = this.marker.getImages();
		this.logger.log('methods', (images.length == 2) ? 'removeImages OK' : 'removeImages NG');
	},

	testStartTop: function(){
		var that = this;
		var state = that.marker.isStart();
		if (state) {
			that.marker.stop();
			that.logger.log('methods', (that.marker.isStart() == false) ? 'stop OK' : 'stop NG');
		}
		that.marker.start();
		that.logger.log('methods', (that.marker.isStart() == true) ? 'start OK' : 'start NG');
	},

	tearDown: function(){
		this.marker.setMap(null);
	}

};

TestSuite.addTestCase(new Testcase(testcase));

}(document.id, MarkerImagesTestSuite, TestSuite.Testcase));