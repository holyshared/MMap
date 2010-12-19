
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

* onPreload - (*function*)
* onFailure - (*function*)
* onComplete - (*function*)
* onLoad - (*function*)


Method: <a id='load'>load</a>
------------------------------

### Syntax:

	loader.load(context);

	loader.load('/markers.json', {
		'username': 'mootools',
		'keyword': 'interface'
	});	