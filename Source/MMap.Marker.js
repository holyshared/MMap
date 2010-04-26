MMap.Marker = new Class({

	Implements: [Options],

	initialize: function(map, options) {
		this.setOptions(options);
		this.build();
		this.setMap(map);
		this.setLatLng(this.options.position);
		$extend(this, new google.maps.OverlayView());
	},

	build: function() {
		this.container = new Element("div", {"class": this.options.className});
		this.photo = new Element("img", {"src": this.options.src});
		this.photo.inject(this.container);
	},

	setLatLng: function(latlng) {
		this.latlng = latlng;
		this.draw();
	}, 

	setImage: function(image) {
	}, 

	getImage: function() {
	}, 

	onAdd: function() {
		var imagePanel = this.getPanes().overlayImage;
		this.container.inject(imagePanel);
	},

	draw: function() {
		var size = this.container.getSize();
		var projection = this.getProjection();
		var point = projection.fromLatLngToDivPixel(this.latlng);
		this.container.setStyles({
			"top": point.y - size.y,
			"left": point.x - (size.x/2)
		});
	},

	onRemove: function() {
		this.container.destory();
	},

	onClick: function() {
	}


	
	
});
