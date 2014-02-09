<<<<<<< HEAD
Node.js API "КЛАДР в облаке"
============================

Node.js модуль для поиска по базе адресов КЛАДР через сервис [kladr-api.ru] [1].

Описание API
------------

Функция доступа к сервису

**ApiQuery(token, key, query, cb)** - выполняет запрос к сервису, возвращая данные в виде объекта Json

Аргументы
* *token* - Токен доступа к сервису
* *key* - Ключ доступа к сервису
* *query* - Объект запроса, который может содержать следующие поля:
	ParentType - тип родительского объекта для ограничения области поиска (region|district|city)
	ParentId - КЛАДР-идентификатор родительского объекта для ограничения области поиска
	ContentType - тип искомого объекта (region|district|city|street|building)
	ContentName - название искомого объекта или часть названия
	WithParent - получить объекты вместе с родителями (если true у объекта заполняется свойство Parent)
	Limit - ограничение количества возвращаемых объектов
* *cb* - Коллбэк-функция

Установка
---------

`````
npm install kladrapi
`````

Пример
------

Получение списка всех населённый пунктов, название которых начинается на "Ряз"

`````js
var ApiQuery = require("kladrapi").ApiQuery;

var ret = ApiQuery('51dfe5d42fb2b43e3300006e', '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
	{ContentName: 'Ряз', ContentType: 'city', WithParent: 0},
	function(err, ret) {
		console.log(err, ret);
	}
)
`````

[1]: http://kladr-api.ru/        "КЛАДР API"
=======
kladrapi-nodejs
===============

Node.js модуль для поиска по базе адресов КЛАДР через сервис kladr-api.ru
>>>>>>> e9188c0ba8f0441c72a30b6d99ec62201de8a34e
