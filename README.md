
MMap
====================================

![Screenshot](http://holyshared.github.com/MMap/logo.png)

Map using Google Maps Api Version 3. A comprehensible map can be displayed by using the custom marker.

How to use
------------------------------------

### MMap

#### Step1 Reading of library.

Mootools and MMap are added in the head element and read. 

	#HTML
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&amp;sensor=false"></script>
	<script type="text/javascript" src="js/lib/mootools-core.js"></script>
	<script type="text/javascript" src="js/lib/mmap-compressed.js"></script>

#### Step2 HTML description of main.

HTML to use MMap becomes as follows.

	#HTML
	<div id="map"></div>

#### Step3 Description of javascript.

	#JS
	(function($){
	
	window.addEvent("domready", function(){

		var map = new google.maps.Map($('map'), {
			zoom: 15,
			center: new google.maps.LatLng(35.6666870, 139.731859),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var marker = new MMap.Marker({
			map: map,
			className: 'marker markerDefault',
			title: 'Marker who contains simple contents',
			content: 'HTML contents can be inserted. <br />'
				+ 'It is usual to put sentences and photographs of several lines.',
			position: new google.maps.LatLng(35.6666870, 139.731859),
			visible: true
		});

	});
	
	}(document.id));

### Online Document

* [English document](http://holyshared.github.com/MMap/Docs/html/en/mmap.overlayview.html)
* [Japanese document](http://holyshared.github.com/MMap/Docs/html/ja/mmap.overlayview.html)

### Online Demonstration

* [English demo](http://holyshared.github.com/MMap/Demos/marker.html)
* [Japanese demo](http://holyshared.github.com/MMap/Demos/ja/marker.html)