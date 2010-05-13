var EventController = new Class({

	Implements: [Events, Options],

	options: {
		"per": 2,
		"controller": "contentController",
		"element": "unit"
	},

	initialize: function(container) {
		this.current = 0;
		this.container = container;
		this.controller = $(this.container).getElement("." + this.options.controller);
		this.calendar = $(this.container).getElement(".vcalendar");
		this.events = $(this.calendar).getElements("." + this.options.element);
		this.prevButton = $(this.controller).getElement(".prev");
		this.nextButton = $(this.controller).getElement(".next");
		this.prevButton.addEvent("click", this.onPrev.bind(this));
		this.nextButton.addEvent("click", this.onNext.bind(this));
		this.set(this.current);
	},

	set: function(index) {
		this.current = index;
		this.range = this.getRange();
		this.events.each(function(event, key) {
			(this.range.from <= key && this.range.to >= key)
			? event.setStyle("display", "")
			: event.setStyle("display", "none");
		}, this);
	},

	getRange: function() {
		var sIndex = eIndex = this.current;
		if (this.current == 0) {
			eIndex = this.current + this.options.per;
		} else if (this.current == this.events.length - 1) {
			sIndex = this.current - this.options.per;
		} else {
			sIndex = this.current - 1;
			eIndex = this.current + 1;
		}
		return {"from": sIndex, "to": eIndex};
	},

	prev: function() {
		if (this.current - 1 < 0) return false;
		this.current--;
		this.set(this.current);
	},

	next: function() {
		if (this.current + 1 >= this.events.length) return false;
		this.current++;
		this.set(this.current);
	},

	onPrev: function(event) {
		event.stop();
		this.prev();
	},

	onNext: function(event) {
		event.stop();
		this.next();
	}
});


var Home = {

	initialize: function() {
		this.map = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});
		new EventController($("calendar"));
	}

};

window.addEvent("domready", Home.initialize.bind(this));