
Class: <a id="mmap.overlayview">MMap.OverlayView</a>
-------------------------------------------------------

オーバーレイビュー(<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#OverlayView">google.maps.OverlayView</a>)を継承したクラス。  
このクラスをサブクラス化することで、独自のマーカー、情報ウィンドウを定義できます。

### Implements:

MMap.Events, MMap.Options


Method: <a id="constructor">constructor</a>
-----------------------------------------------

オーバーレイビューのコンストラクタ

### Syntax:

	var myMMap.OverlayView = new MMap.OverlayView(options);

### Arguments:

1. options - (*mixed*) オーバーレイビューのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) オーバーレイビューを表示するMapオブジェクト
* zIndex - (*number*) オーバーレイビューの表示順序
* visible - (*boolean*) オーバーレイビューの表示状態 
* active - (*boolean*) オーバーレイビューのアクティブ状態


Method: <a id="_init">_init</a>
-----------------------------------

オーバーレイビューを初期化する処理を定義します。  
このメソッドをオーバーライドして、独自の初期化処理を実装できます。  
このメソッドはオーバーレイビューのインスタンス生成時に実行されます。

Method: <a id="_setup">_setup</a>
-------------------------------------

オーバーレイビューの構造を定義します。  
引数のオーバーレイビューを格納するコンテナ要素に整形した文書構造を格納します。  
このメソッドはオーバーレイビューをマップに配置する前に実行されます。  
このメソッドをオーバーライドして、独自構造のオーバーレイビューを定義できます。

### Arguments:

1. container - (*element*) オーバーレイビューを格納するコンテナ要素


Method: <a id="_setupListeners">_setupListeners</a>
-------------------------------------------------------

オーバーレイビューのイベントリスナーを初期設定します。  
このメソッドはオーバーレイビューをマップに配置する前に実行されます。  
このメソッドをオーバーライドして、初期時のイベントリスナー指定することができます。


Method: <a id="draw">draw</a>
---------------------------------

オーバーレイビューオブジェクトを描画します。  
このメソッドは抽象的なメソッドですので、サブクラス化して具体的な処理を実装してください。

### Syntax:

	overlayView.draw();



Method: <a id="getVisible">getVisible</a>
---------------------------------------------

オーバーレイビューの表示状態を取得します。

### Syntax:

	overlayView.getVisible();

### Returns:

(*boolean*) 現在の状態


Method: <a id="setVisible">setVisible</a>
---------------------------------------------

オーバーレイビューの表示状態を変更します。

### Syntax:

	overlayView.setVisible(true);

### Arguments:

1. value - (*boolean*) trueを指定すると表示、falseを指定すると非表示になります。  

### Returns:

(*object*) オーバーレイビュー


Method: <a id="isAdded">isAdded</a>
---------------------------------------

オーバーレイビューがマップに配置されているか調べます。

### Syntax:

	if (overlayView.isAdded()) {
		console.log('added');
	}

### Returns:

(*boolean*) マップに配置されている場合はtrue、まだの場合はfalseを返します。


Method: <a id="isVisible">isVisible</a>
-------------------------------------------

オーバーレイビューの表示状態を調べます。

### Syntax:

	if (overlayView.isVisible()) {
		console.log('visible');
	}

### Returns:

(*boolean*) 表示中の場合はtrue、非表示の場合はfalseを返します。



Method: <a id="isActive">isActive</a>
-----------------------------------------

オーバーレイビューの状態を調べます。

### Syntax:

	if (overlayView.isActive()) {
		console.log('active');
	}

### Returns:

(*boolean*) アクティブの場合はtrue、非アクティブの場合はfalseを返します。


Method: <a id="setActive">setActive</a>
-------------------------------------------

オーバーレイビューのアクティブ状態を変更します。  
このメソッドは抽象的なメソッドですので、サブクラス化して具体的な処理を実装してください。

### Syntax:

	overlayView.setActive(true);

### Arguments:

1. value - (*boolean*) trueを指定するとアクティブ状態、falseを指定すると非アクティブになります。  
