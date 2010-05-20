# MMap
Map using Google Maps Api Version 3. A comprehensible map can be displayed by using the custom marker.

![Screenshot](http://holyshared.github.com/MMap/logo.png)

## How to use

### MMap
A description necessary to use MMap is as follows.A description necessary to use MMap is as follows.

#### HTML
The mark putting of HTML becomes as follows.The mark putting of HTML becomes as follows.

	#HTML
	<div id="map"></div>

#### Javascript

Javascript that should be described becomes as follows. It looks like usual Google Map API.

	#JS
	window.addEvent("load", function(){
		var gmap = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});
	});

#### Options

* **center**: *(object)* - Displayed coordinates position.
* **zoom**: *(interger)* - Zoom level
* **mapType**: *(string)* - Map type of Google Map. Hybrid, roadmap, satellite, and terrain can be specified.
* **onClick**: *(MouseEvent)* - When the map is clicked, it is generated. 
* **onDblClick**: *(MouseEvent)* - When the map is double clicked, it is generated. 
* **onDrag**: *(void)* - It is generated while the mouse is being dragged. 
* **onDragEnd**: *(void)* - When mouse's drug is completed, it is generated.
* **onDragStart**: *(void)* - When mouse's drug is begun, it is generated.
* **onMouseMove**: *(MouseEvent)* - It is generated while moving the mouse. 
* **onMouseOver**: *(MouseEvent)* - When the mouse cursor comes in succession in the marker, this event is generated.
* **onMouseOut**: *(MouseEvent)* - When the mouse cursor parts from the marker, this event is generated.




### MMap.Marker

#### HTML

The structure of the marker is as follows.The structure of the marker is as follows.

	#HTML
	<div class="marker html">
		<div class="header"></div>
		<div class="body"></div>
		<div class="footer"></div>
	</div>

#### Javascript

Javascript becomes as follows.Javascript becomes as follows.

	#JS
	window.addEvent("load", function(){

		var gmap = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});

		var content = "<p>";
		content += "<strong>demo4</strong><br />";
		content += "<a href=\"demo5.html\">demo5.html</a>";
		content += "</p>";

		new MMap.Marker(gmap, {
			"latlng": {"lat": 35.68000, "lng": 139.765066},
			"title": "demo4", "content": content
		});
	});


#### Options

* **className**: *(string)* - Class name of marker style. Default is image.
* **latlng**: *(interger)* - Displayed coordinates position.
* **title**: *(string)* - Displayed title.
* **content**: *(string)* - Content displayed in marker.
* **zIndex**: *(interger)* - The order of piling. An initial value is null.
* **onClick**: *(event)* - When the marker is clicked, this event is generated.
* **onMouseOver**: *(event)* - When the mouse cursor comes in succession in the marker, this event is generated.
* **onMouseOut**: *(event)* - When the mouse cursor parts from the marker, this event is generated.
* **onMouseDown**: *(event)* - When mouse's button is pushed on the marker, it is generated.
* **onMouseUp**: *(event)* - When the button on the marker is pushed, and released, it is generated.




### MMap.Marker.Image

#### HTML

The structure of the image marker is as follows.

	#HTML
	<div class="marker image">
		<div class="body">
			<p class="photo"><a href="http://holyshared.github.com/MMap/"><img src="photo.jpg" alt="photo" /></a></p>
		</div>
	</div>

#### Javascript

Javascript becomes as follows.Javascript becomes as follows.

	#JS
	window.addEvent("load", function(){
		var gmap = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});

		new MMap.Marker.Image(gmap, {
			"latlng": {"lat": 35.68000, "lng": 139.765066},
			"title": "some title", "src": "image.jpg", "url": "http://holyshared.github.com/MMap/"
		});
	});

#### Options

* **className**: *(string)* - Class name of marker style. Default is image.
* **latlng**: *(interger)* - Displayed coordinates position.
* **title**: *(string)* - Displayed title.
* **url**: *(string)*  - Linked Websites URL
* **src**: *(string)* -  - URL of displayed thumbnail image.
* **zIndex**: *(interger)* - The order of piling. An initial value is null.
* **onClick**: *(event)* - When the marker is clicked, this event is generated.
* **onMouseOver**: *(event)* - When the mouse cursor comes in succession in the marker, this event is generated.
* **onMouseOut**: *(event)* - When the mouse cursor parts from the marker, this event is generated.
* **onMouseDown**: *(event)* - When mouse's button is pushed on the marker, it is generated.
* **onMouseUp**: *(event)* - When the button on the marker is pushed, and released, it is generated.




### MMap.Marker.Images

#### HTML

HTML of the image marker becomes as follows. Please refer applying the style.

	#HTML
	<div class="marker image">
		<div class="body">
			<p class="photo"><a href="http://holyshared.github.com/MMap/"><img src="photo.jpg" alt="photo" /></a></p>
		</div>
	</div>

#### Javascript

Javascript using the image marker is as follows.

	#JS
	window.addEvent("load", function(){
		var gmap = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});

		new MMap.Marker.Images(gmap, {
			"latlng": {"lat": 35.5666870, "lng": 139.731859},
			"images": [
				{"title": "demo1", "src": "images/img_demo_s1.jpg", "url": "demo1.html"},
				{"title": "demo2", "src": "images/img_demo_s2.jpg", "url": "demo2.html"},
				{"title": "demo3", "src": "images/img_demo_s3.jpg", "url": "demo3.html"},
				{"title": "demo4", "src": "images/img_demo_s4.jpg", "url": "demo4.html"}
			]
		});
	});


#### Options

* **className**: *(string)* - Class name of marker style. Default is image.
* **latlng**: *(interger)* - Displayed coordinates position.
* **images**: *(array)* - [Thumbnail image group that displays it.](#images "Thumbnail image group that displays it.") 
* **interval**: *(interger)* - Interval when image changes.
* **zIndex**: *(interger)* - The order of piling. An initial value is null.
* **onClick**: *(event)* - When the marker is clicked, this event is generated.
* **onMouseOver**: *(event)* - When the mouse cursor comes in succession in the marker, this event is generated.
* **onMouseOut**: *(event)* - When the mouse cursor parts from the marker, this event is generated.
* **onMouseDown**: *(event)* - When mouse's button is pushed on the marker, it is generated.
* **onMouseUp**: *(event)* - When the button on the marker is pushed, and released, it is generated.

##### Thumbnail image group that displays it.

The image group is an array of the object with the following property.

* **title**: *(string)* - Displayed title
* **src**: *(string)* - URL of displayed thumbnail image.
* **url**: *(interger)* - Linked Websites URL



### MMap.Window

#### HTML

The HTM structure of the information window becomes as follows. Please refer when you specify the style.

	#HTML
	<div class="window default">
		<div class="header">
			<p class="title"><strong>Hara Museum</strong></p>

			<p class="controls"><a class="close"></a></p>
		</div>
		<div class="body">
			<div class="content">
				<h3><a href="http://holyshared.github.com/MMap/index.html" title="Hara Museum">Hara Museum</a></h3>
				<p>start: Tue May 11 2010 19:00:00 GMT+0900<br>end: Tue May 11 2010 20:00:00 GMT+0900<br>Location:Hara Museum<br>35.621822, 139.735863</p>

				<p><a href="http://holyshared.github.com/MMap/index.html" title="Hara Museum">http://holyshared.github.com/MMap/index.html</a></p>
			</div>
		</div>
									
		<div class="footer">
			<div class="inner">
				<span class="point">latitude: 35.621822, longitude: 139.735863</span>
			</div>
		</div>

		<div class="arrow"></div>
	</div>



#### Javascript

Javascript that displays the information window becomes the one as follows.

	#JS
	window.addEvent("load", function(){
		var gmap = new MMap($("map"), {
			"center": {"lat": 35.6666870, "lng": 139.731859},
			"zoom": 10,
			"mapType": "roadmap"
		});

		var marker = new MMap.Marker.Image(gmap, {
			"latlng": {"lat": 35.5666870, "lng": 139.731859},
			"url": "http://holyshared.github.com/MMap", "src": "photo.jpg",
			"onClick": function(event) {
				event.stop();
				var window = new MMap.Window({"content": "some content"});
				window.open(gmap, this);
			}
		});
	});


#### Options

* **className**: *(string)* - Class name of window style. Default is default.
* **latlng**: *(object)* - Displayed coordinates position.
* **title**: *(string)* - Displayed title.
* **zIndex**: *(interger)* - The order of piling. An initial value is null.
* **content**: *(string)* - Content displayed in window.
* **width**: *(interger)* - The width and the default of the window are 400px.
* **onClose**: *(void)* - When the shutting button is clicked, it is generated.
