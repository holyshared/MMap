(function($){

var MMap = (this.MMap || {});

MMap.Marker = new Class({

	initizline: function(options) {
		var defaults = {
			className: 'marker'
			title: ''
			content: ''
			zIndex: 0
		};
		markerOptions = Object.extend(defaults, options);
		this.setOptions(markerOptions);
	},

	buildBody: function(container) {

		var className = this.get("className");
		container.addClass(className);

		var zIndex = this.get("zIndex");
		container.setStyle("z-index", zIndex);

		var marker = new Element("div", {"class": "body"});
		var header = new Element("div", {"class": "header"});
		var footer = new Element("div", {"class": "footer"});
		header.inject(marker, 'before');
		footer.inject(marker, 'after');

		marker.inject(container);

		return marker;
	},

	getPosition: function() {
		return this.get("position");
	},

	getTitle: function() {
		return this.get("title");
	},

	getContent: function() {
		return this.get("content");
	},

	getVisible: function() {
		return this.get("visible");
	},

	getZIndex: function() {
		return this.get("zIndex");
	},

	setPosition: function(position){
		if (!instanceOf(position, google.maps.Latlng)) {
			new Error("aaa");
		}
		this.set("position", position);
		this.draw();
	},

	setTitle: function(title){
		this.set("title", title);
		this.title.set("html", title);
	},

	setContent: function(content){
		this.set("content", content);
		this.content.set("html", title);
	},

	setVisible: function(value){
		this.set("visible", value);
		var container = this.getWarpper();
		if (value) {
			container.setStyle("display", "");
		} else {
			container.setStyle("display", "none");
		}
	},

	setZIndex: function(index){
		this.set("zIndex", index);
		var container = this.getWarpper();
		container.setStyle("z-index", index);
	},

	orderToFront: function() {
	}

});


}(document.id))