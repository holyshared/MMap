
Class: <a id='mmap.marker.image'>MMap.Marker.Image</a>
-------------------------------------------------------------------

スタイル付けが可能な画像を表示するシンプルなマーカー

### Extends:

MMap.BaseMarker


Method: <a id='constructor'>constructor</a>
-----------------------------------------------

画像マーカーのコンストラクタ

### Syntax:

	var myMarker = new MMap.Marker.Image(options);

### Arguments:

1. options - (*mixed*) マーカーのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) オーバーレイビューを表示するMapオブジェクト
* className - (*string*) マーカーに適用するスタイル(CSSのクラス名)
* title - (*string*) マーカーのタイトルに設定する内容
* image - (*string*) マーカーに表示する画像のURL
* url - (*string*) マーカーに設定するURL
* position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) マーカーの座標位置
* zIndex - (*number*) マーカーの表示順序
* visible - (*boolean*) マーカーの表示状態 
* active - (*boolean*) マーカーのアクティブ状態



Method: <a id='getTitle'>getTitle</a>
-----------------------------------------

マーカーに設定しているタイトルを取得します。

### Syntax:

	var title = marker.getTitle();

### Returns:

(*string*) マーカーに設定しているタイトル


Method: <a id='getImage'>getImage</a>
-----------------------------------------

マーカーに表示されている画像のURLを取得します。

### Syntax:

	var image = marker.getImage();

### Returns:

(*string*) マーカーに表示されている画像のURL



Method: <a id='getURL'>getURL</a>
-------------------------------------

マーカーに設定されているURLを取得します。

### Syntax:

	var url = marker.getURL();

### Returns:

(*string*) マーカーに設定されているURL



Method: <a id='setTitle'>setTitle</a>
-----------------------------------------

 マーカーにタイトルを設定します。

### Syntax:

	marker.setTitle('Marker title');

### Arguments:

1. title - (*string*) マーカーに設定するタイトル

### Returns:

(*object*) marker object



Method: <a id='setImage'>setImage</a>
-----------------------------------------

マーカーに表示する画像を設定します。

### Syntax:

	marker.setImage('/images/cafe_marker.png');

### Arguments:

1. image - (*string|element*) マーカーに表示する画像

### Returns:

(*object*) marker object


Method: <a id='setURL'>setURL</a>
-------------------------------------

マーカーにURLを設定します。
マーカークリック時に設定したURLに遷移します。

### Syntax:

	marker.setURL('http://mootools.net')

### Arguments:

1. url - (*string*) マーカーに設定するURL

### Returns:

(*object*) marker object
