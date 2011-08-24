(function(MMap){

	var MockDraggableOverlayView = this.MockDraggableOverlayView = new Class({

		Extends: MMap.OverlayView,

		Implements: [MMap.Draggable, MMap.Position],

		options: {
			map: null,
			zIndex: 0,
			visible: false,
			position: null
		},

		initialize: function(options){
			this.parent(options);
		},

		_setup: function(container){
			this.setDefaultZIndex();

			container.addClass('marker imageDefault');
			var photo = new Element('p', {'class': 'photo'}); 
			var img = new Element('img', {src: '../Demos/images/demo/img05.jpg'});
			var a = new Element('a', {href: 'http://sharedhat.com/'});
			img.inject(a);
			a.inject(photo);
			photo.inject(container);
			return photo;
		},

		_setupListeners: function(){
			var self = this;
			var marker = this.toElement();
			var proxy = function(event){
				if (event.preventDefault){
					event.preventDefault();
				};
				event.target = self;
				self.fireEvent(event.type, event);
			}
			var events = ['click', 'dblclick', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
			events.each(function(type){
				marker.addEvent(type, proxy);
			});
		},

		_init: function(){
			var props = [ 'position', 'zIndex', 'visible', 'active', 'draggable' ];
			var values = Object.subset(this.options, props);
			for (var key in values){
				this.set(key, values[key]);
			}
			for (var key in props){ delete this.options[key]; };
		},

		setDefaultZIndex:function(){
			var zIndex = this.get('zIndex');
			if (!zIndex){
				var projection = this.getProjection();
				var position = this.get('position');
				var xy = projection.fromLatLngToDivPixel(position);
				this.setZIndex(xy.y);
			} else {
				this.setZIndex(zIndex);
			}
		},

		getZIndex: function() {
			return this.get('zIndex');
		},
	
		setZIndex: function(index){
			if (!Type.isNumber(index)) new TypeError('The data type is not an integer.');
			this.set('zIndex', index);
			var container = this.toElement();
			if (!this.isActive()) {
				container.setStyle('z-index', index);
			}
			return this;
		},

		draw: function(){
			var projection = this.getProjection();
			var position = this.get('position');
			var size = this.instance.getSize();
			var xy = projection.fromLatLngToDivPixel(position);
			var styles = {
				position: 'absolute',
				left: xy.x -(size.x / 2),
				top: xy.y - size.y
			};
			this.instance.setStyles(styles);
		}

	});

}(MMap));
