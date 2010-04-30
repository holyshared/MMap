MMap.Marker.Image = new Class({

	Extends: MMap.Marker,

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
		this.container.addClass("image")
		this.photo = new Element("p", {"class": "photo"});
		this.trigger = new Element("a", {"title": this.options.title, "href": this.options.url});
		this.image = new Element("img", {"src": this.options.src});
		this.image.inject(this.trigger);
		this.trigger.inject(this.photo);
		this.setContent(this.photo);
	},

	/**
	 * @id MMap.Marker.setImage
	 */
	setImage: function(image) { this.options.src = image; }, 

	/**
	 * @id MMap.Marker.getImage
	 */
	getImage: function() { return this.options.src; } 	

});
