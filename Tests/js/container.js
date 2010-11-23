(function($){

	window.addEvent('domready', function(){
		var logger = new Logger();
		var container = new MMap.Container();

		var item1 = { key: 'key1', name: 'item1' }; 
		container.addItem(item1);
		logger.log('methods', (container.hasItem(item1) == true) ? 'add method1 ok' : 'add method1 ng');

		var item2 = { key: 'key2', name: 'item2' }; 
		container.addItem(item2);
		logger.log('methods', (container.hasItem(0) == true) ? 'has method ok' : 'has method ng');

		container.removeItem(item1);
		container.removeItem(item2);
		logger.log('methods', (container.getItems().length <= 0) ? 'remove method ok' : 'remove method ng');

		for (var i = 0; i < 5; i++) {
			container.addItem({
				key: 'key' + i.toString(),
				name: 'item' + i.toString()
			});
		};

		var counter = 0;
		while (container.isValid()) {
			counter++;
			container.next();
		};
		logger.log('methods', (counter == 5) ? 'next method ok' : 'next method ng');

		container.rewind();
		logger.log('methods', (container.getCurrent().key == 'key0') ? 'rewind method ok' : 'rewind method ng');

		while (container.isValid()) { container.next(); };
		logger.log('methods', (!container.isValid()) ? 'isValid method ok' : 'isValid method ng');

	});

}(document.id));