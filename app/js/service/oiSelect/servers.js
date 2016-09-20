define(["app"], function (app) {
    app.factory('ShopArr', function ($resource) {
        return $resource( 'data/oiSelect/shopArr.json', {}, {
                query: {method: 'GET', cache: true, isArray: true}
            }
        );
    })
    .factory('ShopArrShort', function ($resource) {
        return $resource('data/oiSelect/shopArrShort.json', {}, {
                query: {method: 'GET', cache: true, isArray: true}
            }
        );
    })

    .factory('ShopObj', function ($resource) {
        return $resource('data/oiSelect/shopObj.json', {}, {
                get:   {method: 'GET', cache: true}
            }
        );
    })

    .factory('ShopObjShort', function ($resource) {
        return $resource('data/oiSelect/shopObjShort.json', {}, {
                get:   {method: 'GET', cache: true}
            }
        );
    })
});