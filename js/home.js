var EventController = new Class({

	Implements: [Events, Options],

	options: {
		"perpage": 2,
		"controller": "contentController",
		"element": "unit"
	},

	initialize: function(container, options) {
		this.setOptions(options);
		this.current = 0;
		this.container = container;
		this.setupMember();
		this.setupInterface();
		this.set(this.current);
	},

	setupMember: function() {
		this.controller = $(this.container).getElement("." + this.options.controller);
		this.calendar = $(this.container).getElement(".vcalendar");
		this.events = $(this.calendar).getElements("." + this.options.element);
	},

	setupInterface: function(){
		this.prevButton = $(this.controller).getElement(".prev");
		this.nextButton = $(this.controller).getElement(".next");
		this.prevButton.addEvent("click", this.onPrev.bind(this));
		this.nextButton.addEvent("click", this.onNext.bind(this));
	},
	
	set: function(index) {
		this.current = index;
		this.range = this.getRange();
		this.events.each(function(event, key) {
			var vevent = event.getElement(".vevent");
			(this.range.from <= key && this.range.to >= key)
			? event.setStyle("display", "")
			: event.setStyle("display", "none");
			(this.range.to == key) ? event.addClass("lastUnit") : event.removeClass("lastUnit");
			(this.current == key) ? vevent.addClass("active") : vevent.removeClass("active");
		}, this);
	},

	getRange: function() {
		var sIndex = eIndex = this.current;
		if (this.current == 0) {
			eIndex = this.current + this.options.perpage;
		} else if (this.current == this.events.length - 1) {
			sIndex = this.current - this.options.perpage;
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

		new MMap.Marker.Image(this.map, {
			"latlng": {"lat": 35.6666870, "lng": 139.731859},
			"src": "images/index/img_event1.jpg"
		});
		new EventController($("calendar"));
	}

};

window.addEvent("domready", Home.initialize.bind(this));