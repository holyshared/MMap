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
		onClick: function(event){
			event.preventDefault();
			if (!win) {
				win = new MMap.Window({
					title: 'aa',
					content: 'aa',
					onOpen: function(event){
						logger.log('events', 'Open event OK');
					},
					onAdd: function() {
						win.setZIndex(9999);
						logger.log('methods', (win.getZIndex() == 9999) ? 'ZIndex setter/getter  OK' : 'ZIndex setter/getter NG');

						win.setVisible(false);
						logger.log('methods', (win.getVisible() == false) ? 'Visible setter/getter  OK' : 'Visible setter/getter NG');

						win.setVisible(true);
						win.close();
						logger.log('methods', (!win.isOpen()) ? 'isOpen2 method OK' : 'isOpen2 method NG');

						win.setTitle('bar bar foo foo');
						logger.log('methods', (win.getTitle() == 'bar bar foo foo') ? 'Title setter/getter  OK' : 'Title setter/getter NG');

						win.setContent('new content');
						logger.log('methods', (win.getContent() == 'new content') ? 'Content setter/getter  OK' : 'Content setter/getter NG');
					},
					onClose: function(event){
						logger.log('events', 'Close event OK');
					}
				});
			}
			win.open(this.getMap(), this);
			logger.log('methods', (win.isOpen()) ? 'isOpen1 method OK' : 'isOpen1 method NG');

		}
	});





});

}(document.id));