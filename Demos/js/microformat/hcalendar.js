/**
 * Additaional geo property
 * @see
 * @author Noritaka Horio<holy.shared.design@gmail.com>
 */
HCalendar = Microformat.define('vevent', {
	'one': ['class', 'description', 'dtend', 'dtstamp', 'dtstart', 'duration',
  	'location', 'status', 'summary', 'uid', 'last-modified', {
		'url' : 'url',
    	'geo' : function(node) {
      		var m;
			if ((node.nodeName.toLowerCase() == 'abbr') && (m = node.title.match(/^([\-\d\.]+);([\-\d\.]+)$/))) {
				return { latitude : m[1], longitude : m[2] };
			}
			return this._extractData(node, { one : ['latitude', 'longitude'] });
		}
	  }
	],
	'many': ['category']
});