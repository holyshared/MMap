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

		var items = [];
		for (var i = 0; i < 5; i++) {
			var data = {
				key: 'key' + i.toString(),
				name: 'item' + i.toString()
			};
			items.push(data);
			container.addItem(data);
		};

		var counter = 0;
		while (container.isValid()) {
			counter++;
			container.next();
		};
		logger.log('methods', (counter == 5) ? 'next method ok' : 'next method ng');
		logger.log('methods', (counter == 5) ? 'isValid method ok' : 'isValid method ng');
		logger.log('methods', (counter == container.count()) ? 'count method ok' : 'count method ng');

		container.rewind();
		logger.log('methods', (container.getCurrent().key == 'key0') ? 'rewind method ok' : 'rewind method ng');

		while (container.isValid()) { container.next(); };
		logger.log('methods', (!container.isValid()) ? 'isValid method ok' : 'isValid method ng');

		var item = container.getItem(3);
		logger.log('methods', (item.key == 'key3' && item.name == 'item3') ? 'getItem method ok' : 'getItem method ng');


		var item1 = { key: 'key1', name: 'item1' }; 
		container.empty();
		container.addItem(item1);
		logger.log('methods', (container.count() == 1) ? 'empty method ok' : 'empty method ng');

		container.setItems(items);
		logger.log('methods', (container.count() == 5) ? 'setItems method ok' : 'setItems method ng');

		var stackItems = container.getItems();
		logger.log('methods', (items === stackItems) ? 'getItems method ok' : 'getItems method ng');

		var item6 = { key: 'key6', name: 'item6' }; 
		container.addItem(item6);

		container.setCurrent(5);
		var item = container.getCurrent(5);
		logger.log('methods', (item == item6) ? 'getCurrent/setCurrent method ok' : 'getCurrent/setCurrent method ng');

		container.rewind();
		var item = container.find('key', 'key1');
		logger.log('methods', (item.key == 'key1') ? 'find method ok' : 'find method ng');

		container.rewind();

		var item3 = { key: 'key3', name: 'item3' }; 
		container.addItem(item3);
		var items = container.findAll('key', 'key3');
		logger.log('methods', (items.length == 2) ? 'findAll method ok' : 'findAll method ng');

	});

}(document.id));