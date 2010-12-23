(function($){

var MarkerStateView = this.MarkerStateView = new Class({

	Extends: MMap.MVCObject,

	Implements: [MMap.Events],

	initialize: function(){
		this._setup();
	},

	_setup: function(){
		var self = this;
		this._container = new Element('div', {'class': 'markerStateView'});
		this._options = new Element('dl', {'class': 'states'});

		var label = new Element('dt', {'html': 'Marker within the range: '});
		var count = new Element('dd');
		this._options.adopt([label, count]);
		this._visibles = count;
		
		var label = new Element('dt', {'html': 'Marker outside range: '});
		var count = new Element('dd');
		this._options.adopt([label, count]);
		this._hiddens = count;
		this._options.inject(this._container);
	},

	getInstance: function(){
		return this._container;
	},

	state_changed: function(){
		var state = this.get('state');
		this._visibles.set('html', state.visibles.length);
		this._hiddens.set('html', state.hiddens.length);
	}

});

}(document.id));