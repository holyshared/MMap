
Class: <a id='mmap.window'>MMap.Window</a>
------------------------------------------

HTMLコンテンツを表示するウィンドウ

### Extends:

MMap.OverlayView




Method: <a id='constructor'>constructor</a>
--------------------------------------------

ウィンドウのコンストラクタ

### Syntax:

	var myWindow = new MMap.Window(options);

### Arguments:

1. options - (*mixed*) ウィンドウのオプション

### Options:

* className - (*string*) ウィンドウに適用するスタイル(CSSのクラス名)
* title - (*string*) ウィンドウのタイトルに設定する内容
* content - (*string|element*) ウィンドウに表示する内容
* position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) ウィンドウの座標位置
* zIndex - (*number*) ウィンドウの表示順序
* visible - (*boolean*) ウィンドウの表示状態 
* active - (*boolean*) ウィンドウのアクティブ状態
* onOpen - (*function*) ウィンドウを開いた時に発生します。
* onClose - (*function*) ウィンドウを閉じた時に発生します。
* onVisibleChanged - (*function*) ウィンドウの表示状態が変わった場合に発生します。
* onZIndexChanged - (*function*) ウィンドウの表示順序が変わった場合に発生します。
* onPositionChanged - (*function*) ウィンドウの表示座標が変わった場合に発生します。
* onTitleChanged - (*function*) ウィンドウのタイトルが変わった場合に発生します。
* onContentChanged - (*function*) ウィンドウの内容が変わった場合に発生します。



Method: <a id='draw'>draw</a>
------------------------------

ウィンドウを再描画します。

### Syntax:

	window.draw();


Method: <a id='refresh'>refresh</a>
------------------------------------

ウィンドウを表示を更新します。

### Syntax:

	window.refresh();


Method: <a id='open'>open</a>
------------------------------

ウィンドウを開きます。

### Syntax:

	window.open(map, marker);

### Arguments:

1. map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) ウィンドウを表示する地図
2. anchor - (*marker*) マーカーオブジェクト


Method: <a id='close'>close</a>
--------------------------------

ウィンドウを閉じます。

### Syntax:

	window.close();


Method: <a id='isOpen'>isOpen</a>
----------------------------------

ウィンドウのオープン状態を取得します。

### Syntax:

	window.isOpen();

### Returns:

(*boolean*) trueの場合、ウィンドウを開いています。



Method: <a id='getZIndex'>getZIndex</a>
----------------------------------------

ウィンドウの表示順を取得します。

### Syntax:

	var index = window.getZIndex();

### Returns:

(*number*) 表示順



Method: <a id='setZIndex'>setZIndex</a>
----------------------------------------

ウィンドウの表示順を設定します。

### Syntax:

	window.setZIndex(100);

### Arguments:

1. index - (*number*) 表示順

### Returns:

(*window*) ウィンドウオブジェクト



Method: <a id='getPosition'>getPosition</a>
--------------------------------------------

ウィンドウを表示している座標を取得します。

### Syntax:

	var latlng = window.getPosition();

### Returns:

(*<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">LatLng</a>*) 座標



Method: <a id='setPosition'>setPosition</a>
--------------------------------------------

ウィンドウを表示する座標を設定します。

### Syntax:

	window.setPosition(latlng);

### Arguments:

1. position - (*<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">LatLng</a>*) 表示する座標

### Returns:

(*window*) ウィンドウオブジェクト



Method: <a id='getTitle'>getTitle</a>
--------------------------------------

ウィンドウに表示するタイトルを取得します。

### Syntax:

	window.getTitle();

### Returns:

(*string*) タイトル



Method: <a id='setTitle'>setTitle</a>
--------------------------------------

ウィンドウに表示するタイトルを指定します。

### Syntax:

	window.setTitle('Title');

### Arguments:

1. title - (*string*) ウィンドウのタイトル 

### Returns:

(*window*) ウィンドウオブジェクト



Method: <a id='getContent'>getContent</a>
------------------------------------------

指定されているコンテンツを取得します。

### Syntax:

	var content = window.getContent();

### Returns:

(*string*) コンテンツ



Method: <a id='setContent'>setContent</a>
------------------------------------------

ウィンドウに指定したコンテンツを表示させます。

### Syntax:

	window.setContent('Content');

### Arguments:

1. content - (*string|element*) ウィンドウに表示するコンテンツ

### Returns:

(*window*) ウィンドウオブジェクト


Method: <a id='setActive'>setActive</a>
----------------------------------------

ウィンドウをアクティブ化します。

### Syntax:

	window.setActive(true);

### Arguments:

1. value - (*boolean*) trueを指定するとウインドウをアクティブ化します。

### Returns:

(*window*) ウィンドウオブジェクト



