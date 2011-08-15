
Class: <a id='mmap.position'>MMap.Position</a>
-----------------------------------------------------

特定のオブジェクトに座標位置を変更できる機能を組み込みます。
組み込むオブジェクトはdrawメソッドを実装している必要があります。

Method: <a id='constructor'>constructor</a>
-----------------------------------------------

MMap.Positionのコンストラクタ。

### Syntax:

	var MyClass = new Class({

		Extends: [MMap.OverlayView],

		Implements: [MMap.Position]

	});

### Options:

* position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) オブジェクトの座標位置

Method: <a id='getPosition'>getPosition</a>
-----------------------------------------------

オブジェクトの座標を取得します。

### Syntax:

	var position = overlayView.getPosition();

### Returns:

(<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) 座標オブジェクト


Method: <a id='setPosition'>setPosition</a>
-----------------------------------------------

オブジェクトを配置する座標を設定します。

### Syntax:

	var position = new google.maps.LatLng(35.6666870, 139.731859);
	overlayView.setPosition(position);

### Arguments:

1. position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) オブジェクトを配置する座標

### Returns:

(*object*) Object that builds in MMap.Position
