(function($){

var MarkerLoaderTest = {

	initialize: function(){
		this.logger = new Logger();
		this.map = new google.maps.Map($('gmap'), {
			zoom: 15,
			center: new google.maps.LatLng(35.6666870, 139.731859),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		this.manager = new MMap.MarkerManager();
		this.markers = [
			{ title: 'Marker1', content: 'Marker1', position: new google.maps.LatLng(35.6666870, 139.731859) },
		    { title: 'Marker2', content: 'Marker2', position: new google.maps.LatLng(35.6666870, 139.733859) },
		    { title: 'Marker3', content: 'Marker3', position: new google.maps.LatLng(35.6650870, 139.729859) },
		    { title: 'Marker4', content: 'Marker4', position: new google.maps.LatLng(35.6686870, 139.728859) },
		    { title: 'Marker5', content: 'Marker5', position: new google.maps.LatLng(35.6646870, 139.726859) }
		];

		this.imageMarkers = [
		    { type: 'image', title: 'Marker1', image: '../Demos/images/demo/img01.jpg', url: 'http://sharedhat.com/', position: new google.maps.LatLng(35.6666870, 139.731859) },
		    { type: 'image', title: 'Marker2', image: '../Demos/images/demo/img02.jpg', url: 'http://sharedhat.com/', position: new google.maps.LatLng(35.6666870, 139.733859) },
		    { type: 'image', title: 'Marker3', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/', position: new google.maps.LatLng(35.6650870, 139.729859) },
		    { type: 'image', title: 'Marker4', image: '../Demos/images/demo/img04.jpg', url: 'http://sharedhat.com/', position: new google.maps.LatLng(35.6686870, 139.728859) },
		    { type: 'image', title: 'Marker5', image: '../Demos/images/demo/img05.jpg', url: 'http://sharedhat.com/', position: new google.maps.LatLng(35.6646870, 139.726859) }
		];

		this.imagesMarkers = [
			{ type: 'images', position: new google.maps.LatLng(35.6666870, 139.731859), images: [
				{ title: 'Marker1', image: '../Demos/images/demo/img01.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker2', image: '../Demos/images/demo/img02.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker3', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker4', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/' }
			]},

			{ type: 'images', position: new google.maps.LatLng(35.6686870, 139.728859), images: [
				{ title: 'Marker1', image: '../Demos/images/demo/img01.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker2', image: '../Demos/images/demo/img02.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker3', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker4', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/' }
			]},

			{ type: 'images', position: new google.maps.LatLng(35.6650870, 139.729859), images: [
				{ title: 'Marker1', image: '../Demos/images/demo/img01.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker2', image: '../Demos/images/demo/img02.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker3', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/' },
				{ title: 'Marker4', image: '../Demos/images/demo/img03.jpg', url: 'http://sharedhat.com/' }
			]}
		];

		this.runTest();
	},

	runTest: function()	{
		this.testContextLoadTestByHTML();
		this.testContextLoadTestByImage();
		this.testContextLoadTestByImages();
	},

	testContextLoadTestByHTML: function(){
		this._contextLoadTest(this.markers);
	},

	testContextLoadTestByImage: function(){
		this._contextLoadTest(this.imageMarkers);
	},

	testContextLoadTestByImages: function(){
		this._contextLoadTest(this.imagesMarkers);
	},

	_contextLoadTest: function(markers) {
		var self = this, manager = null;
		var loader = new MMap.MarkerLoader({
			onPreload: function(){
				self.logger.log('events', 'onPreload event OK');
			},
			onFailure: function(exception){
				self.logger.log('events', exception);
			},
			onLoad: function(markers){
				self.logger.log('events', 'onLoad event OK');
				self.manager.setMap(null);
				self.manager.removeMarkers();
				self.manager.setMap(self.map);
				self.manager.addMarkers(markers);
			}
		});
		loader.load(markers);
	}

};

window.addEvent("domready", MarkerLoaderTest.initialize.bind(MarkerLoaderTest));

}(document.id))
