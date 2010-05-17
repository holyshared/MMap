MMap
===========

Map using Google Maps Api Version 3. A comprehensible map can be displayed by using the custom marker.

![Screenshot](http://holyshared.github.com/MMap/logo.jpg)

How to use
----------


How to use
----------

### MMap

A description necessary to use MMap is as follows.

The mark putting of HTML becomes as follows.

	#HTML
	<div id="map">
	</div>

The description of CSS becomes as follows.
It becomes full screen specifying 100% in height for body and the html element.


Javascript is described at the end. The height of the screen is acquired and it specifies it for container element (*div#container*,*ul#exhibition*). 
It is necessary to note it because it doesn't become full screen if this processing is not done.

	#JS
	window.addEvent("domready", function() {

		var height = (Browser.Engine.trident && Browser.Engine.version <= 6) ? document.documentElement.clientHeight : window.innerHeight;
		var container = $("container");
		var exhibition = $("exhibition");

		container.setStyle("height", height);
		exhibition.setStyle("height", height);

		var images = exhibition.getElements("li");
		new Exhibition(exhibition, images, {"defaultIndex": Math.round((images.length - 1)/2)});

	});

Options
-------

All options have default values assigned, hence are optional.

### Version 1.0.1

* **defaultIndex**: (int) Index initial value of image
* **duration**: (int) duration of animation.
* **transition**: (string) Transition of animation. ex: expo:in:out, sine:in
* **blank**: (int) Interval between image and image.
* **onPreload**: When reading all images is completed, it is generated.
* **onNext**: It is generated before it changes into the following image.
* **onPrev**: It is generated before it changes into the previous image.
* **onSelect**: When selected, it is generated.
* **onActive**: When the image becomes active, it is generated.


Screenshots
-----------

![Exhibition](http://holyshared.github.com/Exhibition/images/exhibition.jpg)
![Exhibition.Horizontal](http://holyshared.github.com/Exhibition/images/exhibition-horizontal.jpg)
![Exhibition.Vertical](http://holyshared.github.com/Exhibition/images/exhibition-vertical.jpg)


Wordpress Theme Exhibition
-----------

The theme of this wordpress is being developed.
The one on the way can be confirmed on a site here.
[Exhibition](http://exhibition.sharedhat.com/)

![Exhibition](http://holyshared.github.com/Exhibition/images/theme.png)
