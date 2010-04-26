Exhibition
===========

This plugin beautifully arranges the image. Moreover, the image is smoothly moved.

![Screenshot](http://holyshared.github.com/Exhibition/images/screenshot.jpg)

How to use
----------

A description necessary to use Exhibition is as follows.

The mark putting of HTML becomes as follows.

	#HTML
	<div id="container">
		<ul id="exhibition" class="exhibition">
			<li><a href="#"><img src="images/home/img_tn1.jpg" width="152" height="228" /></a></li>
			<li><a href="#"><img src="images/home/img_tn2.jpg" width="218" height="147" /></a></li>
			<li><a href="#"><img src="images/home/img_tn3.jpg" width="154" height="191" /></a></li>
			<li><a href="#"><img src="images/home/img_tn4.jpg" width="167" height="233" /></a></li>
			<li><a href="#"><img src="images/home/img_tn5.jpg" width="301" height="187" /></a></li>
	
			<li><a href="#"><img src="images/home/img_tn6.jpg" width="167" height="221" /></a></li>
			<li><a href="#"><img src="images/home/img_tn7.jpg" width="251" height="167" /></a></li>
			<li><a href="#"><img src="images/home/img_tn8.jpg" width="182" height="213" /></a></li>
			<li><a href="#"><img src="images/home/img_tn9.jpg" width="249" height="178" /></a></li>
			<li><a href="#"><img src="images/home/img_tn10.jpg" width="159" height="238" /></a></li>
	
			<li><a href="#"><img src="images/home/img_tn1.jpg" width="152" height="228" /></a></li>
			<li><a href="#"><img src="images/home/img_tn2.jpg" width="218" height="147" /></a></li>
			<li><a href="#"><img src="images/home/img_tn3.jpg" width="154" height="191" /></a></li>
			<li><a href="#"><img src="images/home/img_tn4.jpg" width="167" height="233" /></a></li>
			<li><a href="#"><img src="images/home/img_tn5.jpg" width="301" height="187" /></a></li>
	
			<li><a href="#"><img src="images/home/img_tn5.jpg" width="301" height="187" /></a></li>
			<li><a href="#"><img src="images/home/img_tn6.jpg" width="167" height="221" /></a></li>
			<li><a href="#"><img src="images/home/img_tn7.jpg" width="251" height="167" /></a></li>
			<li><a href="#"><img src="images/home/img_tn8.jpg" width="182" height="213" /></a></li>
			<li><a href="#"><img src="images/home/img_tn9.jpg" width="249" height="178" /></a></li>
	
			<li><a href="#"><img src="images/home/img_tn10.jpg" width="159" height="238" /></a></li>
			<li><a href="#"><img src="images/home/img_tn11.jpg" width="233" height="153" /></a></li>
			<li><a href="#"><img src="images/home/img_tn1.jpg" width="152" height="228" /></a></li>
			<li><a href="#"><img src="images/home/img_tn2.jpg" width="218" height="147" /></a></li>
			<li><a href="#"><img src="images/home/img_tn3.jpg" width="154" height="191" /></a></li>
	
			<li><a href="#"><img src="images/home/img_tn4.jpg" width="167" height="233" /></a></li>
			<li><a href="#"><img src="images/home/img_tn5.jpg" width="301" height="187" /></a></li>
			<li><a href="#"><img src="images/home/img_tn6.jpg" width="167" height="221" /></a></li>
			<li><a href="#"><img src="images/home/img_tn7.jpg" width="251" height="167" /></a></li>
			<li><a href="#"><img src="images/home/img_tn8.jpg" width="182" height="213" /></a></li>
		</ul>
	</div>

The description of CSS becomes as follows.
It becomes full screen specifying 100% in height for body and the html element.

	#CSS
	div#container {
		overflow: hidden;
	}
	
	ul.exhibition {
		overflow: hidden;
		list-style: none;
		position: relative;
	}
	
	ul.exhibition li {
		position: absolute;
	}
	
	ul.exhibition li a {
		display: block;
		padding: 10px;
		background: #333333;
	}
	
	ul.exhibition li a:hover {
		background: #3c94af;
	}

	ul.exhibition li.active a {
		background: #3c94af;
	}

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
