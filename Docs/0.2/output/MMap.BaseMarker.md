
Class: <a id='mmap.basemarker'>MMap.BaseMarker</a>
-----------------------------------------------------

このクラスはマーカーの下位クラスで抽象的なクラスです。  
このクラスを継承して独自のマーカーを定義できます。

### Extends:

MMap.OverlayView


Method: <a id='constructor'>constructor</a>
-----------------------------------------------

マーカーのコンストラクタ。

### Syntax:

	var myMMap.BaseMarker = new MMap.BaseMarker(options);

### Arguments:

1. options - (*mixed*) マーカーのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) マーカーを表示するMapオブジェクト
* className - (*string*) マーカーに適用するスタイル(CSSのクラス名)
* position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) マーカーの座標位置
* zIndex - (*number*) マーカーの表示順序
* visible - (*boolean*) マーカーの表示状態 
* active - (*boolean*) マーカーのアクティブ状態



Method: <a id='_update'>_update</a>
---------------------------------------

マーカーの表示内容を更新します。  
このメソッドは抽象的なメソッドで、drawメソッド、refreshメソッド内でコールされます。  
このメソッドをオーバーライドして独自の更新処理を定義できます。


Method: <a id='setDefaultZIndex'>setDefaultZIndex</a>
---------------------------------------------------------

マーカーの表示順序を初期設定します。  
<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#MarkerOptions">MarkerOptions</a>の説明の通り、低い緯度のマーカーが高い緯度のマーカーより前に表示されます。

### Syntax:

	marker.setDefaultZIndex();


Method: <a id='draw'>draw</a>
---------------------------------

マーカーを描画します。

### Syntax:

	marker.draw();


Method: <a id='refresh'>refresh</a>
---------------------------------------

マーカーの表示内容を更新します。  
マーカーの表示位置も更新したい場合は、変わりにdrawメソッドを使用してください。

### Syntax:

	marker.refresh();



Method: <a id='getZIndex'>getZIndex</a>
-------------------------------------------

マーカーの表示順序を取得します。

### Syntax:

	var zIndex = marker.getZIndex();

### Returns:

(*number*) マーカーの表示順序



Method: <a id='getPosition'>getPosition</a>
-----------------------------------------------

マーカーの座標を取得します。

### Syntax:

	var position = marker.getPosition();

### Returns:

(<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) 座標オブジェクト



Method: <a id='setZIndex'>setZIndex</a>
-------------------------------------------

マーカーの表示順序を指定します。

### Syntax:

	marker.setZIndex(100);

### Arguments:

1. index - (*number*) マーカーの表示順序

### Returns:

(*object*) Marker object



Method: <a id='setPosition'>setPosition</a>
-----------------------------------------------

マーカーを配置する座標を設定します。

### Syntax:

	var position = new google.maps.LatLng(35.6666870, 139.731859);
	marker.setPosition(position);

### Arguments:

1. position - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLng">*LatLng*</a>) マーカーを配置する座標

### Returns:

(*object*) Marker object


Method: <a id='setActive'>setActive</a>
-------------------------------------------

マーカーのアクティブ状態を変更します。  

### Syntax:

	marker.setActive(true);

### Arguments:

1. value - (*boolean*) trueを指定するとアクティブ状態、falseを指定すると非アクティブになります。  
