var Thumbnailer = new Class({

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
		this.triggers = $(this.container).getElements(".summary a");
	},

	setupInterface: function(){
		this.prevButton = $(this.controller).getElement(".prev");
		this.nextButton = $(this.controller).getElement(".next");
		this.prevButton.addEvent("click", this.onPrevClick.bind(this));
		this.nextButton.addEvent("click", this.onNextClick.bind(this));
		this.triggers.addEvent("click", this.onSummaryClick.bind(this));
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
		this.fireEvent("active", [this.current, this.events[this.current]]);
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

	onSummaryClick: function(event) {
		event.stop();
		var index = this.triggers.indexOf(event.target);
		this.set(index);
	},

	onPrevClick: function(event) {
		event.stop();
		this.prev();
	},

	onNextClick: function(event) {
		event.stop();
		this.next();
	}
});