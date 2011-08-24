/*
---
name: MMap.Position

description: The function that the display position can be specified by coordinates is built in.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - MMap/MMap

provides: [MMap.Position]

...
*/

(function(MMap, maps){

MMap.Position = new Class({

	options: {
		position: null
	},

	getPosition: function(){
		return this.get('position');
	},

	setPosition: function(position){
		if (!instanceOf(position, maps.LatLng)) {
			new TypeError('The data type is not an Latlng.');
		}
		this.set('position', position);
		this.draw();
		return this;
	}

});

}(MMap, google.maps));
