(function($){

var MarkerManagerTest = {

	initialize: function(){
		this.logger = new Logger();
		this.map = new google.maps.Map($('gmap'), {
			zoom: 15,
			center: new google.maps.LatLng(35.6666870, 139.731859),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		this.markers = [
		    {
				title: 'Marker1',
				src: '../Demos/images/demo/img01.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6666870, 139.731859)
			},
		    {
				title: 'Marker2',
				src: '../Demos/images/demo/img02.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6666870, 139.733859)
			},
		    {
				title: 'Marker3',
				src: '../Demos/images/demo/img03.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6650870, 139.729859)
			},
		    {
				title: 'Marker4',
				src: '../Demos/images/demo/img04.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6686870, 139.728859)
			},
		    {
				title: 'Marker5',
				src: '../Demos/images/demo/img05.jpg',
				url: 'http://sharedhat.com/',
				visible: false,
				position: new google.maps.LatLng(35.6646870, 139.726859)
			}
		];

		var manageMarkers = []; 
		this.markers.each(function(props){
			var options = Object.append(props, { map: this.map });
			var marker = new MMap.Marker.Image(options);
			manageMarkers.push(marker);
		});
		this.manageMarkers = manageMarkers;

		var manager = new MMap.MarkerManager({
			map: this.map,
			markers: manageMarkers
		});
		this.manager = manager;

		//LatLngBounds
		var sw = new google.maps.LatLng(35.6646870, 139.726859)
		var ne = new google.maps.LatLng(35.6666870, 139.731859)
		this.bounds = new google.maps.LatLngBounds(sw, ne);
		
		this.runTest();
	},

	runTest: function()	{
		this.testVisibleMarkerByMarker();
		this.testActiveMarkerByMarker();
		this.testHasDisplayMarkers();
		this.testHasMarker();
		this.testGetMarkers();
		this.testVisibleMarkerByBounds();
		this.testActiveMarkerByBounds();
		this.testSetBounds();
		this.testRemoveMaker();
		this.testAddMarker();
	},

	testVisibleMarkerByMarker: function(){
		this.manager.visible(this.manageMarkers.getLast());

		var visibleMarkers = this.manager.getVisibleMarkers();
		var hiddenMarkers = this.manager.getHiddenMarkers();

		var hidden = hiddenMarkers.some(function(item, index){
			return !item.isVisible();
		});

		if (visibleMarkers.getLast() == this.manageMarkers.getLast()) {
			this.logger.log('methods', 'visible method OK (argumetns marker)');
			this.logger.log('methods', 'getVisibleMarkers method OK (argumetns marker)');
		} else {
			this.logger.log('methods', 'visible method NG (argumetns marker)');
			this.logger.log('methods', 'getVisibleMarkers method NG (argumetns marker)');
		}
		this.logger.log('methods', (hidden)
			? 'getHiddenMarkers method OK (argumetns LatLngBounds)' : 'getHiddenMarkers method NG (argumetns LatLngBounds)');
	},

	testActiveMarkerByMarker: function(){
		this.manager.active(this.manageMarkers.getLast());

		var deactiveMarkers = this.manager.getDeactiveMarkers();
		var deactive = deactiveMarkers.some(function(item, index){
			return !item.isActive();
		});
	
		var activeMarkers = this.manager.getActiveMarkers();

		if (activeMarkers.getLast() == this.manageMarkers.getLast()) {
			this.logger.log('methods', 'active method OK (argumetns marker)');
			this.logger.log('methods', 'getActiveMarkers method OK (argumetns marker)');
		} else {
			this.logger.log('methods', 'active method NG (argumetns marker)');
			this.logger.log('methods', 'getActiveMarkers method NG (argumetns marker)');
		}

		this.logger.log('methods', (deactive)
			? 'getDeactiveMarkers method OK (argumetns LatLngBounds)' : 'getDeactiveMarkers method NG (argumetns LatLngBounds)');
	},

	testHasDisplayMarkers: function() {
		this.logger.log('methods', (this.manager.hasDisplayMarkers())
			? 'hasDisplayMarkers method OK' : 'hasDisplayMarkers method NG');
	},

	testHasMarker: function(){
		var activeMarkers = this.manager.getActiveMarkers();
		this.logger.log('methods', (this.manager.hasMarker(activeMarkers.getLast()))
			? 'hasMarker method OK' : 'hasMarker method NG');
	},

	testGetMarkers: function(){
		this.logger.log('methods', (instanceOf(this.manager.getMarkers(), MMap.Container))
			? 'getMarkers method OK' : 'getMarkers method NG');
	},

	testVisibleMarkerByBounds: function(){
		var self = this;
		this.manager.visible(this.bounds);
	
		var visibleMarkers = this.manager.getVisibleMarkers();
		var contains = visibleMarkers.some(function(item, index){
			return self.bounds.contains(item.getPosition());
		});

		var hiddenMarkers = this.manager.getHiddenMarkers();
		var hidden = hiddenMarkers.some(function(item, index){
			return !item.isVisible();
		});

		if (contains) {
			this.logger.log('methods', 'visible method OK (argumetns LatLngBounds)');
			this.logger.log('methods', 'getVisibleMarkers method OK (argumetns LatLngBounds)');
		} else {
			this.logger.log('methods', 'visible method NG (argumetns LatLngBounds)');
			this.logger.log('methods', 'getVisibleMarkers method NG (argumetns LatLngBounds)');
		}

		this.logger.log('methods', (hidden)
			? 'getHiddenMarkers method OK (argumetns LatLngBounds)' : 'getHiddenMarkers method NG (argumetns LatLngBounds)');
	},

	testActiveMarkerByBounds: function(){
		this.manager.active(this.bounds);

		var deactiveMarkers = this.manager.getDeactiveMarkers();
		var deactive = deactiveMarkers.some(function(item, index){
			return !item.isActive();
		});

		var activeMarkers = this.manager.getActiveMarkers();
		var active = activeMarkers.some(function(item, index){
			return item.isActive();
		});

		if (active) {
			this.logger.log('methods', 'active method OK (argumetns LatLngBounds)');
			this.logger.log('methods', 'getActiveMarkers method OK (argumetns LatLngBounds)');
		} else {
			this.logger.log('methods', 'active method NG (argumetns LatLngBounds)');
			this.logger.log('methods', 'getActiveMarkers method NG (argumetns LatLngBounds)');
		}
		
		this.logger.log('methods', (deactive)
			? 'getDeactiveMarkers method OK (argumetns LatLngBounds)' : 'getDeactiveMarkers method NG (argumetns LatLngBounds)');
		
		this.logger.log('methods', (this.manager.hasDisplayMarkers()) ? 'hasDisplayMarkers method OK' : 'hasDisplayMarkers method NG');
	},

	testSetBounds: function(){
		var sw = new google.maps.LatLng(35.6646870, 139.726859)
		var ne = new google.maps.LatLng(35.6666870, 139.931859)
		var bounds = new google.maps.LatLngBounds(sw, ne);
		this.manager.setBounds(bounds);
		
		if (bounds == this.manager.getBounds()) {
			this.logger.log('methods', 'setBounds method OK');
			this.logger.log('methods', 'getBounds method OK');
		}
		else {
			this.logger.log('methods', 'setBounds method NG');
			this.logger.log('methods', 'getBounds method NG');
		}
	},

	testRemoveMaker: function(){
		var container = this.manager.getMarkers();
		var items = container.getItems();

		this.manager.visible(this.map.getBounds());
		this.manager.removeMarkers(items);

		var items = container.getItems();
		if (items.length <= 0) {
			this.logger.log('methods', 'removeMarker method OK');
			this.logger.log('methods', 'removeMarkers method OK');
		} else {
			this.logger.log('methods', 'removeMarker method NG');
			this.logger.log('methods', 'removeMarkers method NG');
		};
	},

	testAddMarker: function(){
		this.manager.addMarkers(this.manageMarkers);

		var container = this.manager.getMarkers();
		var items = container.getItems();
		if (items.length >= 0) {
			this.logger.log('methods', 'addMarkers method OK');
			this.logger.log('methods', 'addMarkers method OK');
		} else {
			this.logger.log('methods', 'addMarkers method NG');
			this.logger.log('methods', 'addMarkers method NG');
		};
	}

};

window.addEvent("domready", MarkerManagerTest.initialize.bind(MarkerManagerTest));

}(document.id))
