MMap.Marker.Images = new Class({

	options: {
		"className": "square",
		"latlng": null,
		"title": null,
		"url": null,
		"src": null
	},

	initialize: function(map, options) {
		this.parent(map, options);
	},

	build: function() {
		var container = this.getContainer();
		this.photo = new Element("p", {"class": "photo"});
		this.trriger = new Element("a", {"title": this.options.title, "href": this.options.url});
		this.image = new Element("img", {"src": this.options.src});
		this.image.inject(this.trriger);
		this.trriger.inject(this.photo);
		this.photo.inject(container);
	}

});
