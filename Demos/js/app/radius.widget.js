(function($){

var RadiusWidget = this.RadiusWidget = new Class({

	Extends: MMap.MVCObject,

	Implements: [MMap.Events],

	initialize: function(){
		this._values = [200, 300, 400, 500];
		this._circle = new google.maps.Circle({
			fillColor: '#ffffff',
			fillOpacity: 0,
			strokeColor: '#ff0000',
			radius: 200
		});
		this._setup();
		this._setupListner();
	},

	_setup: function(){
		var self = this;
		this._container = new Element('div', {'class': 'radiusWidget'});
		this._options = new Element('ul', {'class': 'options'});
		this._values.each(function(radius){
			var li = new Element('li');
			var a = new Element('a', {
				'href': '#' + radius.toString(),
				'title': radius.toString() + 'm',
				'html': radius.toString() + 'm'
			});
			a.inject(li);
			li.inject(self._options);
		});
		this._options.inject(this._container);
		this._radius = this._options.getElements('a');
		this._selected(0);
	},

	_setupListner: function(){
		var self = this;
		self._radius.addEvent('click', function(event){
			if (self._radius.contains(event.target)) {
				var index = self._radius.indexOf(event.target);
				self._selected(index);
			}
		});
	},

	_selected: function(index){
		var self = this;
		var value = this._values[index].toInt();
		this._radius.each(function(element, key){
			if (index == key) {
				self._radius[key].addClass('selected');
			} else {
				self._radius[key].removeClass('selected');
			}
		});
		self.setRadius(value);
	},

	setRadius: function(value){
		var current = this._circle.getRadius();
		if (!this._values.contains(value)) return;
		if (current == value.toInt()) return;
		this._circle.set('radius', value.toInt());
		this.set('radius', value.toInt());
	},

	getRadius: function(){
		return this._circle.get('radius');
	},
	
	getBounds: function(){
		return this._circle.getBounds();
	},

	setCenter: function(value){
		var current = this.get('center');
		if (current == value) return;
		this._circle.setCenter(value);
		this.set('center', value);
	},

	getCenter: function(){
		return this.get('center');
	},

	setMap: function(map){
		this._circle.setMap(map);
		this.setCenter(map.getCenter());
	},

	getMap: function(){
		return this._circle.getMap();
	},

	getInstance: function(){
		return this._container;
	}

});

}(document.id));