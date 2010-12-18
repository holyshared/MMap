Class: <a id='mmap.markerloader'>MMap.MarkerLoader</a>
------------------------------------------------------



### Implements:

MMap.Events, MMap.Options




Method: <a id='constructor'>constructor</a>
--------------------------------------------


### Syntax:

	var myMMap.MarkerLoader = new MMap.MarkerLoader(options);

### Arguments:

1. options - (**)


Method: <a id='load'>load</a>
------------------------------


### Syntax:




Method: <a id='build'>build</a>
--------------------------------


### Syntax:



### Arguments:

1. context - (**)

### Returns:




Class: <a id='mmap.markerloader.parser'>MMap.MarkerLoader.Parser</a>
--------------------------------------------------------------------



### Implements:

Events




Method: <a id='parse'>parse</a>
--------------------------------


### Syntax:



### Arguments:

1. markers - (**)

### Returns:




Class: <a id='mmap.markerloader.context'>MMap.MarkerLoader.Context</a>
----------------------------------------------------------------------



### Extends:

MMap.MarkerLoader.Parser




Method: <a id='load'>load</a>
------------------------------


### Syntax:



### Arguments:

1. context - (**)

Class: <a id='mmap.markerloader.json'>MMap.MarkerLoader.JSON</a>
----------------------------------------------------------------



### Extends:

MMap.MarkerLoader.Parser




Method: <a id='_onRequest'>_onRequest</a>
------------------------------------------


### Syntax:




Method: <a id='_onFailure'>_onFailure</a>
------------------------------------------


### Syntax:



### Arguments:

1. xhr - (**)


Method: <a id='_onSuccess'>_onSuccess</a>
------------------------------------------


### Syntax:



### Arguments:

1. json - (**)
2. text - (**)


Method: <a id='getRequest'>getRequest</a>
------------------------------------------


### Syntax:



### Arguments:

1. json - (**)

### Returns:





Method: <a id='load'>load</a>
------------------------------


### Syntax:



