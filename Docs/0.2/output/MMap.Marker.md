
Class: <a id='mmap.marker'>MMap.Marker</a>
---------------------------------------------

HTMLコンテンツを表示させるマーカー。  
マーカーに対して、HTMLコンテンツを表示させることができます。  
情報ウィンドウを使用するまでもない場合、こちらを使用することをお勧めします。

### Extends:

MMap.BaseMarker


Method: <a id='constructor'>constructor</a>
-----------------------------------------------

マーカーのコンストラクタ

### Syntax:

	var myMMap.Marker = new MMap.Marker(options);

### Arguments:

1. options - (*mixed*) マーカーのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) オーバーレイビューを表示するMapオブジェクト
* className - (*string*) マーカーに適用するスタイル(CSSのクラス名)
* title - (*string*) マーカーのタイトルに設定する内容
* content - (*string|element*) マーカーに表示する内容
* position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) マーカーの座標位置
* zIndex - (*number*) マーカーの表示順序
* visible - (*boolean*) マーカーの表示状態 
* active - (*boolean*) マーカーのアクティブ状態


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
