(function($, TestSuite){

window.addEvent('domready', function(){

	var tester = new TestSuite();

	tester.addTestCase(function(){
		var images = new Images({
			observer: $('overlayView'),
			container: $('photos')
		});

		var img1 = {
			title: 'demo1',
			image: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com'
		};
		images.addImage(img1);

		tester.logger.log('methods', (images.getLength() == 1) ? 'addImage OK' : 'addImage NG');


		var img2 = {
			title: 'demo2',
			image: '../Demos/images/demo/img02.jpg',
			url: 'http://sharedhat.com'
		};
		var img3 = {
			title: 'demo3',
			image: '../Demos/images/demo/img03.jpg',
			url: 'http://sharedhat.com'
		};
		images.addImages(img2, img3);

		tester.logger.log('methods', (images.getLength() == 3) ? 'addImages OK' : 'addImages NG');

		var img4 = {
			title: 'demo4',
			image: '../Demos/images/demo/img04.jpg',
			url: 'http://sharedhat.com'
		};

		tester.logger.log('methods', (images.hasImage(img2) !== null) ? 'hasImage paturn1 OK' : 'hasImage paturn1 hasImage NG');
		tester.logger.log('methods', (images.hasImage(img4) == null) ? 'hasImage paturn2 OK' : 'hasImage paturn2 hasImage NG');

		images.removeImage(img1);
		tester.logger.log('methods', (images.getLength() == 2) ? 'removeImage OK' : 'removeImage NG');

		images.removeImages(img2, img3);
		tester.logger.log('methods', (images.getLength() == 0) ? 'removeImages OK' : 'removeImages NG');

	});

	tester.addTestCase(function(){

		var img1 = {
			title: 'demo1',
			image: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com'
		};
		var img2 = {
			title: 'demo2',
			image: '../Demos/images/demo/img02.jpg',
			url: 'http://sharedhat.com'
		};
		var img3 = {
			title: 'demo3',
			image: '../Demos/images/demo/img03.jpg',
			url: 'http://sharedhat.com'
		};

		var images = new Images({
			images: [img1, img2, img3],
			observer: $('overlayView'),
			container: $('photos'),
			onComplete: function(index){
				tester.logger.log('events', 'event onComplete OK');
				console.log(index);
			},
			onMouseOver: function(event){
				tester.logger.log('events', 'event onMouseOver OK');
			},
			onMouseOut: function(event){
				tester.logger.log('events', 'event onMouseOut OK');
			},
			onClick: function(event){
				tester.logger.log('events', 'event onClick OK');
			},
			onDblClick: function(event){
				tester.logger.log('events', 'event onDblClick OK');
			}
		});
		tester.logger.log('options', (images.getLength() == 3) ? 'options images OK' : 'options images NG');

	});



	tester.addTestCase(function(){

		var img1 = {
			title: 'demo1',
			image: '../Demos/images/demo/img01.jpg',
			url: 'http://sharedhat.com'
		};
		var img2 = {
			title: 'demo2',
			image: '../Demos/images/demo/img02.jpg',
			url: 'http://sharedhat.com'
		};
		var img3 = {
			title: 'demo3',
			image: '../Demos/images/demo/img03.jpg',
			url: 'http://sharedhat.com'
		};

		var observer = $('overlayViewAutoPlay');
		var container = observer.getElement('.photos');

		var images = new Images({
			images: [img1, img2, img3],
			observer: observer,
			container: container,
			autoplay: false,
			onMouseOver: function(){
				images.start();
			},
			onMouseOut: function(){
				images.stop();
			}
		});

	});

	tester.run();

});

}(document.id, TestSuite));