/*
---
name: MMap.Core

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/Array
  - Core/String
  - Core/Number
  - Core/Function
  - Core/Object
  - Core/Event
  - Core/Browser
  - Core/Class

provides: [MMap, MMap.MVCObject]

...
*/

(function($){

var MMap = this.MMap = {};

MMap.version = 0.2;

MMap.MVCObject = new Class({

	initialize: function(){
	}

});
MMap.MVCObject.prototype = new google.maps.MVCObject();

}(document.id));