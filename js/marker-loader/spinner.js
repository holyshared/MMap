(function($){

var Spinner = this.Spinner = new Class({

	Extends: MMap.MVCObject,

	Implements: [MMap.Options],

	options:{
		map: null,
		message: 'Now Loading...'
	},

	initialize: function(options){
		this.setOptions(options);
		this._spinner = new Element('div', {'class': 'spinner'});
		this._message = new Element('p', {'class': 'message'});
		this._message.inject(this._spinner);
		this._spinner.inject(document.body);
		this._message.set('html', this.options.message);
	},

	setMap: function(map){
		if (!(map instanceof google.maps.Map)) {
			throw new TypeError('The specified value is not a map object.');
		} 
		this.set('map', map);
	},

	getMap: function(){
		return this.get('map');
	},

	setMessage: function(message){
		if (!message) return false;
		this.set('message', message);
		this._message.set('html', message);
	},

	getMessage: function(){
		return this.get('message');
	},

	center: function(){
		var map = this.getMap();
		var container = map.getDiv();
		var mSize = container.getSize();
		var sSize = this._spinner.getSize();
		var position = container.getPosition();
		var spPosition = {};
		spPosition.x = position.x + (mSize.x/2) - (sSize.x/2);
		spPosition.y = position.y + (mSize.y/2) - (sSize.y/2);
		this._spinner.setStyles({
			top: spPosition.y,
			left: spPosition.x
		});
	},

	show: function(){
		var args = Array.from(arguments);
		var message = args.shift();
		this.setMessage(message);
		this.center();
		this._spinner.fade('in');
	},

	hide: function(){
		this._spinner.fade('out');
	}

});

}(document.id));