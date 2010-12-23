(function($){

var CurrentMarkerView = this.CurrentMarkerView = new Class({

	Extends: MMap.MVCObject,

	Implements: [MMap.Events],

	initialize: function(){
		this._setup();
	},

	_setup: function(){
		var self = this;
		var title = new Element('h3', {'html': 'Information'});
		this._container = new Element('div', {'class': 'currentMarkerView'});
		title.inject(this._container);

		this._options = new Element('dl', {'class': 'states'});

		var label = new Element('dt', {'html': 'Title:'});
		var title = new Element('dd');
		this._options.adopt([label, title]);
		this._title = title;

		var label = new Element('dt', {'html': 'Url: '});
		var url = new Element('dd');
		var link = new Element('a');
		link.inject(url);

		this._options.adopt([label, url]);
		this._url = url;
		this._link = link;
		this._options.inject(this._container);
	},

	getInstance: function(){
		return this._container;
	},

	title_changed: function(){
		var title = this.get('title');
		this._title.set('html', title);
		this._link.set('title', title);
	},

	url_changed: function(){
		var url = this.get('url');
		this._link.set('html', url);
		this._link.set('href', url);
	}

});

}(document.id));