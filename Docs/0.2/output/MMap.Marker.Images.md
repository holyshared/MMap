
Class: <a id='mmap.marker.images'>MMap.Marker.Images</a>
------------------------------------------------------------------

画像をスライドさせて表示するマーカー。

### Extends:

MMap.Marker.Core



Method: <a id='constructor'>constructor</a>
--------------------------------------------

### Syntax:

	var myMarker = new MMap.Marker.Images(options);

### Arguments:

1. options - (*mixed*) マーカーのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) マーカーを表示するMapオブジェクト
* className - (*string*) マーカーに適用するスタイル(CSSのクラス名)
* images - (*array*) <a href='#images'>マーカーに表示する画像情報</a>
* defaultIndex - (*number*) 初期時に表示する画像の番号
* interval - (*number*) 画像をスライドさせる感覚
* duration - (*number*) アニメーションの持続時間
* autoplay - (*boolean*) trueを設定した場合、自動で画像をスライドします。デフォルトはtrueです。
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
* onVisibleChanged - (*function*) マーカーの表示状態が変わった場合に発生します。
* onZIndexChanged - (*function*) マーカーの表示順序が変わった場合に発生します。
* onPositionChanged - (*function*) マーカーの表示座標が変わった場合に発生します。
* onActive - (*function*) マーカーの表示座標が変わった場合に発生します。


### <a id='images'>images</a></h3>

下記の情報を持つオブジェクトの配列

* title - (*number*) 画像のタイトル
* image - (*boolean*) 画像のURL
* url - (*boolean*) URL


Method: <a id='setCurrent'>setCurrent</a>
------------------------------------------

指定した画像を現在の画像に設定します。

### Syntax:

	marker.setCurrent(1);

### Arguments:

1. index - (*number*) 画像の番号


Method: <a id='getImages'>getImages</a>
----------------------------------------

画像に設定されている画像情報を取得します。

### Syntax:

	var images = marker.getImages();

### Returns:

(*array*) 画像に設定されている画像情報



Method: <a id='setImages'>setImages</a>
----------------------------------------

マーカーに画像を設定します。

### Syntax:

	marker.setImages(images);

### Arguments:

1. images - (*array*) 設定する画像

### Returns:

(*object*) marker object



Method: <a id='addImage'>addImage</a>
--------------------------------------

画像をマーカーに追加します。

### Syntax:

	marker.addImage(image);

### Arguments:

1. image - (*object*) 追加する画像の情報

### Returns:

(*object*) marker object



Method: <a id='addImages'>addImages</a>
----------------------------------------

画像を複数マーカーに追加します。

### Syntax:

	var images = [{  
		title: 'demo3',  
		image: '../Demos/images/demo/img03.jpg',  
		url: 'http://sharedhat.com'  
	}, {  
		title: 'demo4',  
		image: '../Demos/images/demo/img04.jpg',  
		url: 'http://sharedhat.com'  
	}];  
	marker.addImages(images);

### Arguments:

1. images - (*array*) 追加する画像


Method: <a id='removeImage'>removeImage</a>
--------------------------------------------

マーカーから画像を削除します。

### Syntax:

	marker.removeImage(image); 


### Arguments:

1. image - (*object*) マーカーから削除する画像


Method: <a id='removeImages'>removeImages</a>
----------------------------------------------

マーカーから複数の画像を削除します。

### Syntax:

	//When you enumerate the marker  
	marker.removeImages(image1, image2);  
	
	//When specifying it by the array  
	var images = [image1, image2];  
	marker.removeImages(images);


### Arguments:

1. images - (*mixed*) マーカーから削除する画像



Method: <a id='isStart'>isStart</a>
------------------------------------

マーカーの画像のスライド状態を返します。

### Syntax:

	if (marker.isStart()) {  
		console.log('It is executing it.');  
	}

### Returns:

(*boolean*) スライドの開始状態



Method: <a id='start'>start</a>
--------------------------------

画像のスライドを開始します。

### Syntax:

	marker.start();


Method: <a id='stop'>stop</a>
------------------------------

画像のスライドを停止します。

### Syntax:

	marker.stop();

