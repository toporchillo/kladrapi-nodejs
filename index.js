"use strict";
var http = require("http");

/**
* HTTP request to API
* @param {String} API token
* @param {String} API key
* @param {Object} query : {
*   ParentType: <region|district|city>,
*   ParentId: <parent code>,
*   ContentType: <region|district|city|street|building>,
*   ContentName: <substring>,
*   WithParent: <1 - include parent objects>
*   Limit: <limit to found objects>
* }
* @param {Function} callback
**/
exports.ApiQuery = function ApiQuery(token, key, query, cb) {
	if (!token) {
		return cb(new Error('Токен не может быть пустым', 'emptyToken'));
	}
	if (!key) {
		return cb(new Error('Ключ не может быть пустым', 'emptyKey'));
	}
	if (!query) {
		return cb(new Error('Зпрос не может быть пустым', 'emptyQuery'));
	}
	
	var qparams = { ContentType: 'contentType', ContentName: 'query', WithParent: 'withParent', Limit: 'limit' };
	var queryVals = [];
	if (query.ParentType && query.ParentId) {
		queryVals.push(query.ParentType + 'Id' + '=' + query.ParentId);
	}
	for(var index in qparams) {
		if (query[index] !== undefined) {
			queryVals.push(qparams[index] + '=' + encodeURIComponent(query[index]));
		}
	}
	var options = {
	  host: 'kladr-api.ru',
	  port: 80,
	  path: '/api.php?' + queryVals.join('&') + '&token=' + token + '&key=' + key,
	  method: 'GET'
	};

	var req = http.request(options, function(res) {
		var data = '';
		
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			data+= chunk;
		});
		
		res.on('end', function() {
			var match = data.match(/Error: (.*)/);
			if (match !== null) {
				return cb(new Error(match[0], 'APIError'));
			}		
			try {
				var ret = JSON.parse(data);
			}
			catch (err) {
				return cb(new Error('Сервис вернул неверный ответ, ожидался JSON', 'APIError'));
			}
			cb(null, ret);
		})
	});

	req.on('error', function(err) {
		cb(err);
	});
	
	req.write('data\n');
	req.write('data\n');
	req.end();	
}
