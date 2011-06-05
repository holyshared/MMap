
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

* format - (*string*) コンテキストの書式。初期値はarrayです。 
* onPreload - (*function*) マーカーを読み込む前に発生します。
* onFailure - (*function*) マーカーの読み込みに失敗した場合に発生します。
* onComplete - (*function*)　マーカーの情報を取得した後に発生します。
* onLoad - (*function*)　マーカーを読み込んだ後に発生します。


Method: <a id='load'>load</a>
------------------------------

### Syntax:

#### Example of syntax (Part1)

	var context = [
		{
			title: 'Marker1', 
			content: 'Marker1',
			position: {
				latitude: 35.6666870,
				longitude: 139.731859
			}
		},
		{
			title: 'Marker2',
			content: 'Marker2',
			position: {
				latitude: 35.6666870,
				longitude: 139.733859
			}
		}
	];
	var loader = new MMap.MarkerLoader({
		markers: context
	});
	loader.load();

or

	var context = [
		{
			title: 'Marker1',
			content: 'Marker1',
			position: {
				latitude: 35.6666870,
				longitude: 139.731859
			}
		},
		{
			title: 'Marker2',
			content: 'Marker2',
			position: {
				latitude: 35.6666870,
				longitude: 139.733859
			}
		}
	];
	loader.load(context);


#### Example of syntax (Part2)

	//When you hand over the options of Request
	//http://mootools.net/docs/core/Request/Request
	var loader = new MMap.MarkerLoader({
		method: 'get',
		format: 'json',
		url: 'http://example.com/json'
	});
	loader.load();

or

	var loader = new MMap.MarkerLoader();
	var context = {
		method: 'get',
		format: 'json',
		url: 'http://example.com/json'
	};
	loader.load(context);
