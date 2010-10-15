(function($){

var MMap = this.MMap = {
}

MMap.Events = new Class({

	addEvent: function(){
	},

	addEvents: function(){
	},

	removeEvent: function(){
	},

	removeEvents: function(){
	}

});



MMap.OverlayView = new Class({

	initialize: function(options){
		this.setOptions(options);
	},

	build: function(){
		this.container = this.buildWarpper();
		this.body = this.buildBody(this.container);
	},

	buildWarpper: function(){
	},

	//abstract method
	buildBody: function(this.container){
	},

	getWarpper: function(){
		return this.container;
	},

	draw: function(){
	},

	onAdd: function(){
		this.build();
	},

	onRemove: function(){
	}

});


}(document.id))