
Class: <a id='mmap.markerloader'>MMap.MarkerLoader</a>
------------------------------------------------------

複数のマーカーをコンテキストから読み込みます。

### Implements:

MMap.Events, MMap.Options


Method: <a id='constructor'>constructor</a>
--------------------------------------------

マーカーローダーのコンストラクタ

### Syntax:

	var myMarkerLoader = new MMap.MarkerLoader(options);

### Arguments:

1. options - (*mixed*) マーカーローダーのオプション

### Options:

* onPreload - (*function*) マーカーを読み込む前に発生します。
* onFailure - (*function*) マーカーの読み込みに失敗した場合に発生します。
* onComplete - (*function*)　マーカーの情報を取得した後に発生します。
* onLoad - (*function*)　マーカーを読み込んだ後に発生します。


Method: <a id='load'>load</a>
------------------------------

### Syntax:

	loader.load(context);

	loader.load('/markers.json', {
		'username': 'mootools',
		'keyword': 'interface'
	});	