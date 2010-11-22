(function($){

	var Logger = this.Logger = new Class({
	
		initialize: function() {
			var main = $(document.body).getElement(".main");
			this.events = main.getElement(".events ul");
			this.methods = main.getElement(".methods ul");
			this.options = main.getElement(".options ul");
		},
	
		log: function(type, message) {
			var li = new Element("li",{"html": message});
			switch (type) {
				case "events": li.inject(this.events, 'top'); return
				case "methods": li.inject(this.methods, 'top'); return
				case "options": li.inject(this.options, 'top'); return
			}
		}
	
	});

}(document.id));