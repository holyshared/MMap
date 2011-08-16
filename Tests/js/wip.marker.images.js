(function($, TestSuite){

window.addEvent('domready', function(){

	var tester = new TestSuite();

	/**
	 * Test case before it adds it to map.
	 */
	tester.addTestCase(function(){

		var marker = new MMap.Marker.Images({
			className: 'marker images imagesPaper',
			position: new google.maps.LatLng(35.6666870, 139.731859),
			zIndex: 0,
			visible: true,
			images: [{
				title: 'demo1',
				image: '../Demos/images/demo/img01.jpg',
				url: 'http://sharedhat.com'
			}]
		});

		var images = marker.get('images');
		this.logger.log('options', (images.length == 1) ? 'options - images OK' : 'options - images NG');

		var image1 = {
			title: 'demo1',
			image: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com'
		};
	
		marker.addImage(image1);
		var images = marker.get('images');
		this.logger.log('methods', (images.length == 2) ? 'before - addImage OK' : 'before - addImage NG');
	
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
	
		marker.addImages([ image2, image3 ]);
		var images = marker.get('images');
		this.logger.log('methods', (images.length == 4) ? 'before - addImages OK' : 'before - addImages NG');
	
		marker.removeImage(image1);
		var images = marker.get('images');
		this.logger.log('methods', (images.length == 3) ? 'before - removeImage OK' : 'before - removeImage NG');
	
		marker.removeImages([ image2, image3 ]);
		var images = marker.get('images');
		this.logger.log('methods', (images.length == 1) ? 'before - removeImages OK' : 'before - removeImages NG');

		marker.setImages([{
			title: 'demo2',
			image: '../Demos/images/demo/img02.jpg',
			url: 'http://sharedhat.com'
		}, {
			title: 'demo3',
			image: '../Demos/images/demo/img03.jpg',
			url: 'http://sharedhat.com'
		}]);
		var images = marker.get('images');
		this.logger.log('methods', (images.length == 2) ? 'before - setImages OK' : 'before - setImages NG');

		marker.setCurrent(1);
		this.logger.log('methods', (marker.getCurrent() == 1) ? 'before - getCurrent1 OK' : 'before - getCurrent1 NG');

		marker.setCurrent(2);
		this.logger.log('methods', (marker.getCurrent() == 1) ? 'before - getCurrent2 OK' : 'before - getCurrent2 NG');

		marker.setCurrent(-1);
		this.logger.log('methods', (marker.getCurrent() == 1) ? 'before - getCurrent3 OK' : 'before - getCurrent3 NG');
	});


	/**
	 * Test case after it adds it to map.
	 */
	tester.addTestCase(function(){
		var tester = this;

		var marker = new MMap.Marker.Images({
			className: 'marker images imagesPaper',
			position: new google.maps.LatLng(35.6666870, 139.731859),
			zIndex: 0,
			visible: true,
			images: [{
				title: 'demo1',
				image: '../Demos/images/demo/img01.jpg',
				url: 'http://sharedhat.com'
			}]
		});

		marker.addEvent('add', function(){
	
			var image1 = {
				title: 'demo2',
				image: '../Demos/images/demo/img02.jpg',
				url: 'http://sharedhat.com'
			};
	
			marker.addImage(image1);
			var images = marker.get('images');
			tester.logger.log('methods', (images.length == 2) ? 'after - addImage OK' : 'after - addImage NG');

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
		
			marker.addImages([ image2, image3 ]);
			var images = marker.get('images');
			tester.logger.log('methods', (images.length == 4) ? 'after - addImages OK' : 'after - addImages NG');

			marker.removeImage(image1);
			var images = marker.get('images');
			tester.logger.log('methods', (images.length == 3) ? 'after - removeImage OK' : 'after - removeImage NG');
		
			marker.removeImages([ image2, image3 ]);
			var images = marker.get('images');
			tester.logger.log('methods', (images.length == 1) ? 'after - removeImages OK' : 'after - removeImages NG');

			marker.setImages([{
				title: 'demo2',
				image: '../Demos/images/demo/img02.jpg',
				url: 'http://sharedhat.com'
			}, {
				title: 'demo3',
				image: '../Demos/images/demo/img03.jpg',
				url: 'http://sharedhat.com'
			}]);
			var images = marker.get('images');
			tester.logger.log('methods', (images.length == 2) ? 'after - setImages OK' : 'after - setImages NG');


			marker.setCurrent(1);
			tester.logger.log('methods', (marker.getCurrent() == 1) ? 'after - getCurrent1 OK' : 'after - getCurrent1 NG');
	
			marker.setCurrent(2);
			tester.logger.log('methods', (marker.getCurrent() == 1) ? 'after - getCurrent2 OK' : 'after - getCurrent2 NG');
	
			marker.setCurrent(-1);
			tester.logger.log('methods', (marker.getCurrent() == 1) ? 'after - getCurrent3 OK' : 'after - getCurrent3 NG');

		});
		marker.setMap(tester.map);

	});

	tester.run();

});

}(document.id, TestSuite));