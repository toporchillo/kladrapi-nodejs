"use strict";

var ApiQuery = require("./index").ApiQuery;

var ret = ApiQuery('51dfe5d42fb2b43e3300006e', '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
	{ContentName: 'Рязань', ContentType: 'city', WithParent: 0, Limit: 1},
	function(err, ret) {
		console.log(err, ret);
	}
)
