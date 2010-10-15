(function($){

var MMap = (this.MMap || {});

MMap.Options = new Class({

	setOptions: function(options){
		for (var key in options) {
			var value = options[key];
			if (instanceOf(value, Function)) {
				this.addEvent(key, value);
			} else if (key == 'map') {
				this.setMap(value);
			} else {
				this.set(key, value);
			}
			delete this.options[key];
		}
		delete this.options;
	}

});

}(document.id))