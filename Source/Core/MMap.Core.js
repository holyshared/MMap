/*
---
name: MMap

description: Core module of MMap.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Class

provides: [MMap, MMap.MVCObject]

...
*/

(function(){

var MMap = this.MMap = {};

MMap.version = '0.2.3';

MMap.MVCObject = new Class({

	initialize: function(){
	}

});
MMap.MVCObject.prototype = new google.maps.MVCObject();

}());