MMap.Marker.Images = new Class({

	Extends: MMap.Marker,

	options: {
		"className": "square",
		"latlng": null,
		"images": [],
		"interval": 600
	},

	initialize: function(map, options) {
		this.parent(map, options);
		this.current = 0;
		this.intervalID = 0;
		this.addEvent("mouseover", function(event) {
			this.intervalID = this.next.periodical(300, this);
		}.bind(this));
		this.addEvent("mouseout", function(event) {
			$clear(this.intervalID);
		}.bind(this));
		this.activate();
	},

	build: function() {
		this.container.addClass("image");
		this.imageList = new Element("ul");
		this.buildImages();
		this.trigger = $(this.imageList).getElements("a");
		this.setContent(this.imageList);
	},

	buildImages: function() {
		var images = this.options.images;
		images.each(function(image) {
			var container = new Element("li");
			var trigger = new Element("a", {"title": image.title, "href": image.url});
			var photo = new Element("img", {"title": image.title, "src": image.src});
			photo.inject(trigger);
			trigger.inject(container);
			container.inject(this.imageList);
		}, this);
	},

	next: function() {
		((this.current + 1) >= this.trigger.length)
		? this.current = 0
		: this.current++;
		this.activate();
	},

	activate: function() {
		this.trigger.each(function(image, key){
			(this.current == key)
			? image.setStyle("display", "")
			: image.setStyle("display", "none");
		}, this);
	}

});
