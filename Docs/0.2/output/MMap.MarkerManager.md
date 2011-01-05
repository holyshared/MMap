
Class: <a id='mmap.markermanager'>MMap.MarkerManager</a>
--------------------------------------------------------

複数のマーカーを管理します。  
指定した範囲のマーカーの表示、アクティブ化が可能です。

### Implements:

MMap.Events, MMap.Options



### Extends:

MMap.MVCObject




Method: <a id='constructor'>constructor</a>
--------------------------------------------

マーカーマネージャのコンストラクタ

### Syntax:

	var myMarkerManager = new MMap.MarkerManager(options);

### Arguments:

1. options - (*mixed*) マーカーマネージャのオプション

### Options:

* map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*) Mapオブジェクト
* markers - (*array*) 管理するマーカー


Method: <a id='setMap'>setMap</a>
----------------------------------

指定したマップに管理しているマーカーをすべて配置します。

### Syntax:

	manager.setMap(map);

### Arguments:

1. map - (*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*)　マップオブジェクト


Method: <a id='getMap'>getMap</a>
----------------------------------

指定されているマップオブジェクトを返します。

### Syntax:

	manager.getMap();

### Returns:

(*<a href="http://code.google.com/intl/en/apis/maps/documentation/javascript/reference.html#Map">Map</a>*)　マップオブジェクト



Method: <a id='addMarker'>addMarker</a>
----------------------------------------

指定したマーカーを追加します。

### Syntax:

	manager.addMarker(marker);

### Arguments:

1. marker - (*marker*) 追加するマーカー


Method: <a id='addMarkers'>addMarkers</a>
------------------------------------------

指定した複数のマーカーを追加します。

### Syntax:

	var markers = [marker1, marker2];
	manager.addMarkers(markers);

### Arguments:

1. markers - (*array*) 追加するマーカー


Method: <a id='removeMarker'>removeMarker</a>
----------------------------------------------

指定されたマーカーを削除します。

### Syntax:

	manager.removeMarker(marker);

### Arguments:

1. marker - (*marker*) 削除するマーカーオブジェクト


Method: <a id='removeMarkers'>removeMarkers</a>
------------------------------------------------

指定された複数のマーカーを削除します。

### Syntax:

	manager.removeMarkers(marker1, marker2);

	var markers = [marker1, marker2];
	manager.removeMarkers(markers);

### Arguments:

1. markers - (*mixed*) 削除するマーカー



Method: <a id='getContainer'>getContainer</a>
----------------------------------------------

マーカーを格納してるコンテナを取得します。

### Syntax:

	var container = manager.getContainer();

### Returns:

(*container*) コンテナオブジェクト


Method: <a id='getMarkers'>getMarkers</a>
------------------------------------------

管理しているマーカーを取得します。

### Syntax:

	var markers = manager.getMarkers();

### Returns:

(*array*) 管理しているマーカー



Method: <a id='setMarkers'>setMarkers</a>
------------------------------------------

管理するマーカーを設定します。

### Syntax:

	manager.setMarkers(markers);

### Arguments:

1. markers - (*array*) 管理するマーカー




Method: <a id='getState'>getState</a>
--------------------------------------

所持しているマーカーの状態を取得します。

### Syntax:

	manager.getState();

### Returns:

(*object*) マーカーの状態



Method: <a id='hasMarker'>hasMarker</a>
----------------------------------------

マーカーを所持しているかチェックします。

### Syntax:

	var	result = manager.hasMarker(marker);

### Arguments:

1. marker - (*marker*) マーカーオブジェクト

### Returns:

(*boolean*) マーカーを所持している場合はtrueを返します。



Method: <a id='active'>active</a>
----------------------------------

指定されたマーカーをアクティブにします。

### Arguments:

1. marker - (*marker*) マーカーオブジェクト

### Syntax:

	//The marker object is specified.
	var marker = new MMap.Marker(options);
	manager.active(marker);

Method: <a id='activeAll'>activeAll</a>
----------------------------------

すべてのマーカーをアクティブにします。

### Syntax:

	//All markers are made active.
	manager.activeAll();


Method: <a id='activeByBounds'>activeByBounds</a>
----------------------------------

指定された範囲内のマーカーをアクティブにします。

### Arguments:

1. bounds - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLngBounds">*LatLngBounds*</a>) 領域オブジェクト

### Syntax:

	//The rectangular area object is specified.
	var bounds = new google.maps.LatLngBounds(options);
	manager.activeByBounds(bounds);


Method: <a id='visible'>visible</a>
------------------------------------

指定されたマーカーを表示状態にします。

### Arguments:

1. marker - (*marker*) マーカーオブジェクト

### Syntax:

	//The marker object is specified.
	var marker = new MMap.Marker(options);
	manager.visible(marker);


Method: <a id='visibleAll'>visibleAll</a>
------------------------------------

すべてのマーカーを表示状態にします。

### Syntax:

	//All markers are displayed.
	manager.visibleAll();


Method: <a id='visibleByBounds'>visibleByBounds</a>
------------------------------------

指定された範囲のマーカーを表示状態にします。

### Arguments:

1. bounds - (<a href="http://code.google.com/intl/eu/apis/maps/documentation/javascript/reference.html#LatLngBounds">*LatLngBounds*</a>) 領域オブジェクト

### Syntax:

	//The rectangular area object is specified.
	var bounds = new google.maps.LatLngBounds(options);
	manager.visibleByBounds(bounds);
