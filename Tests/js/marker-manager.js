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
				image: '../Demos/images/demo/img01.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6666870, 139.731859)
			},
		    {
				title: 'Marker2',
				image: '../Demos/images/demo/img02.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6666870, 139.733859)
			},
		    {
				title: 'Marker3',
				image: '../Demos/images/demo/img03.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6650870, 139.729859)
			},
		    {
				title: 'Marker4',
				image: '../Demos/images/demo/img04.jpg',
				url: 'http://sharedhat.com/',
				position: new google.maps.LatLng(35.6686870, 139.728859)
			},
		    {
				title: 'Marker5',
				image: '../Demos/images/demo/img05.jpg',
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
		
		var self = this.logger;
		this.manager.addEvent('boundsChanged', function(){
			self.log('events', 'boundsChanged');
		});
		this.manager.addEvent('zoomChanged', function(){
			self.log('events', 'zoomChanged');
		});
		this.manager.addEvent('markersChanged', function(){
			self.log('events', 'markersChanged');
		});

		//LatLngBounds
		var sw = new google.maps.LatLng(35.6646870, 139.726859)
		var ne = new google.maps.LatLng(35.6666870, 139.731859)
		this.bounds = new google.maps.LatLngBounds(sw, ne);

		this.runTest();
	},

	runTest: function()	{
		this.testBindTo();
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
		this.testSetZoom();
		this.testAll();
	},

	testOptions: function(){
		var marker = new MMap.Marker({
			map: this.map
		});
		var mks = [marker];
		var sw = new google.maps.LatLng(35.6646870, 139.726859)
		var ne = new google.maps.LatLng(35.6666870, 139.931859)
		var bounds = new google.maps.LatLngBounds(sw, ne);
		var manager = new MMap.MarkerManager({
			map: this.map,
			zoom: 10,
			bounds: bounds,
			markers: mks
		});

		var zoom = manager.getZoom();
		this.logger.log('options', (zoom == 10) ? 'options zoom ok' : 'options zoom ng');

		var map = manager.getMap();
		this.logger.log('options', (map == map) ? 'options map ok' : 'options map ng');

		var nbounds = manager.getBounds();
		this.logger.log('options', (nbounds == bounds) ? 'options bounds ok' : 'options bounds ng');

		var nbounds = manager.getMarkers();
		this.logger.log('options', (mks == bounds) ? 'options markers ok' : 'options markers ng');
	},

	testVisibleMarkerByMarker: function(){
		this.manager.visible(this.manageMarkers.getLast());

		var state = this.manager.getState();
		var hidden = state.hiddens.some(function(item, index){
			return !item.isVisible();
		});

		if (state.visibles.getLast() == this.manageMarkers.getLast()) {
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

		var state = this.manager.getState();
		var deactive = state.deactives.some(function(item, index){
			return !item.isActive();
		});
	
		if (state.actives.getLast() == this.manageMarkers.getLast()) {
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
		var state = this.manager.getState();
		this.logger.log('methods', (this.manager.hasMarker(state.actives.getLast()))
			? 'hasMarker method OK' : 'hasMarker method NG');
	},

	testGetMarkers: function(){
		this.logger.log('methods', (Type.isArray(this.manager.getMarkers()))
			? 'getMarkers method OK' : 'getMarkers method NG');

		var mks = this.manager.getMarkers();
		var count = mks.length;
		this.manager.setMarkers(mks);
		var mks = this.manager.getMarkers();

		this.logger.log('methods', (mks.length == count)
			? 'setMarkers method OK' : 'setMarkers method NG');
	},

	testVisibleMarkerByBounds: function(){
		var self = this;
		this.manager.visible(this.bounds);
	
		var state = this.manager.getState();
		var contains = state.visibles.some(function(item, index){
			return self.bounds.contains(item.getPosition());
		});

		var hidden = state.hiddens.some(function(item, index){
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

		var state = this.manager.getState();
		var deactive = state.deactives.some(function(item, index){
			return !item.isActive();
		});

		var active = state.actives.some(function(item, index){
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
		var container = this.manager.getContainer();
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

		var container = this.manager.getContainer();
		var items = container.getItems();
		if (items.length >= 0) {
			this.logger.log('methods', 'addMarkers method OK');
			this.logger.log('methods', 'addMarkers method OK');
		} else {
			this.logger.log('methods', 'addMarkers method NG');
			this.logger.log('methods', 'addMarkers method NG');
		};
	},

	testSetZoom: function(){
		this.manager.setZoom(18);
		var zoom = this.manager.getZoom();
		if (zoom == 18) {
			this.logger.log('methods', 'setZoom method OK');
		} else {
			this.logger.log('methods', 'setZoom method OK');
		}
	},

	testBindTo: function(){
		var binder = new google.maps.MVCObject();
		binder.bindTo('zoom', this.manager, 'zoom');
		binder.bindTo('bounds', this.manager, 'bounds');
		binder.bindTo('state', this.manager, 'state');

		var self = this;
		google.maps.event.addListener(binder, 'zoom_changed', function(){
			self.logger.log('events', 'zoom_changed OK');
		});
		google.maps.event.addListener(binder, 'bounds_changed', function(){
			self.logger.log('events', 'bounds_changed OK');
		});
		google.maps.event.addListener(binder, 'state_changed', function(){
			self.logger.log('events', 'state_changed OK');
		});
		this.manager.setZoom(10);
	},

	testAll: function(){
		var markers = this.manager.getContainer();
		var checkCount = 0;
		var count = markers.count();

		this.manager.visible();

		markers = markers.rewind();
		while(markers.isValid()) {
			var current = markers.getCurrent();
			if (current.isVisible()) checkCount++;
			markers.next();
		}
		this.logger.log('methods', (count == checkCount) ? 'visible all OK' : 'visible all NG');

		this.manager.active();
		markers = markers.rewind();
		checkCount = 0;
		while(markers.isValid()) {
			var current = markers.getCurrent();
			if (current.isActive()) checkCount++;
			markers.next();
		}
		this.logger.log('methods', (count == checkCount) ? 'active all OK' : 'active all NG');
	}

};

window.addEvent("domready", MarkerManagerTest.initialize.bind(MarkerManagerTest));

}(document.id))
