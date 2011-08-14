
Class: <a id='mmap.draggable'>MMap.Draggable</a>
-----------------------------------------------------

特定のオブジェクトにドラッグ機能を組み込みます。
組み込むオブジェクトはtoElementメソッドとsetPositionメソッドを実装している必要があります。

Method: <a id='constructor'>constructor</a>
-----------------------------------------------

MMap.Draggableのコンストラクタ。

### Syntax:

	var MyClass = new Class({

		Extends: [MMap.OverlayView],

		Implements: [MMap.Draggable]

	});

### Options:

* onDragStart - (*function*) オブジェクトのドラッグが開始された時に発生します。
* onDragEnd - (*function*) オブジェクトのドラッグが終了された時に発生します。
* onDrag - (*function*) オブジェクトをドラッグしている間このイベントが発生します。

Method: <a id='setDraggable'>setDraggable</a>
-----------------------------------------------

ドラッグ機能の有効／無効を切り替えます。

### Syntax:

	var object = object.setDraggable(true);

### Arguments:

1. value - (*boolean*) オブジェクトをドラッグ可能にする場合はtrueを指定します。

### Returns:

(*object*) draggable object


Method: <a id='isDraggable'>isDraggable</a>
-----------------------------------------------

オブジェクトがドラッグ可能か調べます。

### Syntax:

	var draggable = object.isDraggable();

### Returns:

(*boolean*) ドラッグ可能な場合trueを返します。


Method: <a id='isDragging'>isDragging</a>
-----------------------------------------------

オブジェクトのドラッグ状態を返します。

### Syntax:

	var dragging = object.isDragging();

### Returns:

(*boolean*) ドラッグ中trueを返します。
