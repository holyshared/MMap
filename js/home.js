var EventController = new Class({

	options: {
		"per": 3,
		"controller": "contentController"
	},

	initialize: function(container) {
		this.container = container;
		this.controller = $(this.container).getElement("." + this.options.controller);
		this.events = $(this.container).getElement("." + this.options.controller);
		this.prev = $(this.controller).getElement(".prev");
		this.next = $(this.controller).getElement(".next");
		this.current = 0;
	},

	set: function(index) {
		var start = 0, end = 0;

		this.current = index;
		if (index == 0) {
			start = index, end = index + 3;
		} else if (index == this.events.length) {
			start = index - 3, end = index;
		} else {
			start = index, end = index + 3;
		}

		this.events.each(function(event, key) {
			(start >= index && end <= index)
			? event.setStyle("display", "")
			: event.setStyle("display", "none");
		});
	},

	getRange: function(index) {
		var range = {"start": index, "end": index};
		if (index == 0) {
			range.end = index + 2;
		} else if (index == this.events.length) {
			range.start = range.start - 2;
		} else {
			range.start	= index - 1;
			range.end	= index + 1;
		}
		return range;
	},
	
	prev: function() {
		if (this.current - 1 > 0) return false;
		this.current--;
		this.set(this.current);
	},

	next: function() {
		if (this.current + 1 <= this.events.length) return false;
		this.current++;
		this.set(this.current);
	}
	
});


var Home = {

	initialize: function() {
		this.map = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});
	}

};

window.addEvent("domready", Home.initialize.bind(this));