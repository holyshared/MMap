
Class: <a id='mmap.marker.html.html'>MMap.Marker.HTML</a>
---------------------------------------------

HTMLコンテンツを表示させるマーカー。  
マーカーに対して、HTMLコンテンツを表示させることができます。  
情報ウィンドウを使用するまでもない場合、こちらを使用することをお勧めします。

### Extends:

MMap.Marker.Core


Method: <a id='constructor'>constructor</a>
-----------------------------------------------

マーカーのコンストラクタ

### Syntax:

	var marker = new MMap.Marker.HTML(options);

### Arguments:

1. options - (*mixed*) マーカーのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) マーカーを表示するMapオブジェクト
* className - (*string*) マーカーに適用するスタイル(CSSのクラス名)
* title - (*string*) マーカーのタイトルに設定する内容
* content - (*string|element*) マーカーに表示する内容
* position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) マーカーの座標位置
* zIndex - (*number*) マーカーの表示順序
* visible - (*boolean*) マーカーの表示状態 
* active - (*boolean*) マーカーのアクティブ状態
* onClick - (*function*) マーカーをクリックした時に発生します。
* onDblClick - (*function*) マーカーをダブルクリックした時に発生します。
* onMouseOver - (*function*) マーカーのマウスオーバー時に発生します。
* onMouseOut - (*function*) マーカーのマウスアウト時に発生します。
* onMouseUp - (*function*) マーカーのマウスアップ時に発生します。
* onMouseDown - (*function*) マーカーのマウスダウン時に発生します。
* onTitleChanged - (*function*) マーカーのタイトルが変わった時に発生します。
* onContentChanged - (*function*) マーカーの内容が変わった時に発生します。
* onVisibleChanged - (*function*) マーカーの表示状態が変わった場合に発生します。
* onZIndexChanged - (*function*) マーカーの表示順序が変わった場合に発生します。
* onPositionChanged - (*function*) マーカーの表示座標が変わった場合に発生します。
* onActive - (*function*) マーカーの表示座標が変わった場合に発生します。



Method: <a id='getTitle'>getTitle</a>
-----------------------------------------

マーカーのタイトルを取得します。

### Syntax:

	var title = marker.getTitle();

### Returns:

(*string*) マーカーのタイトルに設定されている内容


Method: <a id='getContent'>getContent</a>
---------------------------------------------

マーカーの内容を取得します。

### Syntax:

	var content = marker.getContent();

### Returns:

(*string*) マーカーに設定されている内容


Method: <a id='setTitle'>setTitle</a>
-----------------------------------------

マーカーのタイトルに指定した内容を設定します。

### Syntax:

	var title = 'marker title';
	marker.setTitle(title);

### Arguments:

1. title - (*string*) マーカーのタイトルに設定する内容

### Returns:

(*object*) marker object


Method: <a id='setContent'>setContent</a>
---------------------------------------------

マーカーに指定した内容を表示させます。

### Syntax:

	var content = 'marker content';
	marker.setContent(content);

### Arguments:

1. content - (*string|element*) マーカーに表示させる内容

### Returns:

(*object*) marker object
