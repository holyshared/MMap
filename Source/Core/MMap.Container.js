(function($){

var MMap = (this.MMap || {});

MMap.Container = new Class({

	initialize: function() {
		var map = Array.from(arguments).link({ items: Type.isArray });
		var subclass = this;
		subclass = Object.append(new google.maps.MVCObject(), subclass);
		for (var k in subclass) { this[k] = subclass[k]; };
		this.setItems(map.items || []);
		this.setCurrent(0);
	},

	isValid: function(){
		var index = this.get('index');
		return this.hasItem(index);
	},

	getItem: function(index){
		if (!this.hasItem(index)) return;
		var items = this.getItems();
		return items[index];
	},

	getItems: function(){
		return this.get('items');
	},

	getCurrent: function(){
		var items = this.getItems();
		var index = this.get('index');
		return items[index];
	},

	setItems: function(items){
		if (!Type.isArray(items)) return;
		this.set('items', items);
		return this;
	},

	setCurrent: function(index){
		if (!Type.isNumber(index)) return;
		this.set('index', index);
		return this;
	},

	addItem: function(item){
		if (this.hasItem(item)) return;
		var items = this.getItems();
		items.push(item);
		return this;
	},

	hasItem: function(item){
		var items = this.getItems();
		if (Type.isNumber(item)) {
			return (items[item]) ? true : false;
		} else {
			return (items.contains(item)) ? true : false;
		}
	},

	count: function(){
		return this.getItems().length;		
	},

	removeItem: function(item){
		if (!this.hasItem(item)) return;
		var items = this.get('items');
		items.erase(item);
		return this;
	},

	next: function() {
		var index = this.get('index');
		var items = this.getItems();
		var nextIndex = index + 1;
		this.setCurrent(nextIndex);
		if (this.isValid()) {
			return items[nextIndex];
		}
		return false;
	},

	rewind: function() {
		this.setCurrent(0);
		return this;
	},

	empty: function() {
		var items = this.getItems();
		this.rewind();
		items.empty();
	},

	find: function() {
	},

	findAll: function() {
	}

});

}(document.id))