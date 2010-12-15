(function($){

window.addEvent("domready", function(){

	var logger = new Logger();
	var win = null;
	var map = new google.maps.Map($('gmap'), {
		zoom: 15,
		center: new google.maps.LatLng(35.6666870, 139.731859),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var marker = new MMap.Marker.Image({
		map: map,
		title: 'Marker title text',
		image: '../Demos/images/demo/img01.jpg',
		url: 'http://sharedhat.com/',
		position: new google.maps.LatLng(35.6666870, 139.731859),
		zIndex: 0,
		visible: true,
		onAdd: function(){
		    if (document.createEvent) {
		        var evt = document.createEvent('MouseEvents');
		        evt.initEvent( 'click', true, true );
		        this.instance.dispatchEvent(evt);
		    } else if( document.createEventObject ){
		        var evt = document.createEventObject();
		        this.instance.fireEvent('onclick', evt);
		    }
		}
	});

	marker.addEvent('click', function(clickEvent){
		clickEvent.preventDefault();
		if (!win) {
			win = new MMap.Window({
				className: 'window windowDefault',
				title: 'title',
				content: 'content',
				position: new google.maps.LatLng(35.6666870, 139.731859),
				onOpen: function(event){
					logger.log('events', 'Open event OK');
				},
				onClose: function(event){
					logger.log('events', 'Close event OK');
				}
			});


			var binder = new google.maps.MVCObject();
			binder.bindTo('title', win, 'title');
			binder.bindTo('content', win, 'content');
			binder.bindTo('position', win, 'position');
			binder.bindTo('zIndex', win, 'zIndex');
			binder.bindTo('visible', win, 'visible');
		
			var titleListener = google.maps.event.addListener(binder, 'title_changed', function(){
				logger.log('events', "bindTo title_changed OK");
			});
			var contentListener = google.maps.event.addListener(binder, 'content_changed', function(){
				logger.log('events', "bindTo content_changed OK");
			});
			var positionListener = google.maps.event.addListener(binder, 'position_changed', function(){
				logger.log('events', "bindTo position_changed OK");
			});
			var zindexListener = google.maps.event.addListener(binder, 'zindex_changed', function(){
				logger.log('events', "bindTo zindex_changed OK");
			});
			var visibleListener = google.maps.event.addListener(binder, 'visible_changed', function(){
				logger.log('events', "bindTo visible_changed OK");
			});


			var className =	win.options.className;
			logger.log('options', (className == 'window windowDefault') ? 'className option OK' : 'className option NG');
		
			var title =	win.get('title');
			logger.log('options', (title == 'title') ? 'title option OK' : 'title option NG');
		
			var content = win.get('content');
			logger.log('options', (content == 'content') ? 'content option OK' : 'content option NG');
		
			var position = win.get('position');
			logger.log('options', (position.lat() == 35.6666870) ? 'position option OK' : 'position option NG');

			var zIndex = win.get('zIndex');
			logger.log('options', (zIndex == 0) ? 'position zIndex OK' : 'position zIndex NG');
		
			var visible = win.get('visible');
			logger.log('options', (visible == true) ? 'position visible OK' : 'position visible NG');
		}

		win.open(this.getMap(), this);
		logger.log('methods', (win.isOpen()) ? 'isOpen method OK (test1)' : 'isOpen method NG (test1)');

		win.setZIndex(9999);
		logger.log('methods', (win.getZIndex() == 9999) ? 'ZIndex setter/getter  OK' : 'ZIndex setter/getter NG');

		win.setVisible(false);
		logger.log('methods', (win.getVisible() == false) ? 'Visible setter/getter  OK' : 'Visible setter/getter NG');

		win.setVisible(true);
		win.close();
		logger.log('methods', (!win.isOpen()) ? 'isOpen method OK (test2)' : 'isOpen method NG (test2)');

		win.setTitle('bar bar foo foo');
		logger.log('methods', (win.getTitle() == 'bar bar foo foo') ? 'Title setter/getter  OK' : 'Title setter/getter NG');

		win.setContent('new content');
		logger.log('methods', (win.getContent() == 'new content') ? 'Content setter/getter  OK' : 'Content setter/getter NG');

		win.open(this.getMap(), this);

	});

});

}(document.id));