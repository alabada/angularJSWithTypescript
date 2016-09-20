/**
 * Created by zhiheng.li on 2016/4/18.
 */
define(["app"], function (app) {
app.factory('Menu', ['$resource', function ($resource){
        return $resource('config/:menuId.json', {}, {
            query: {method:'GET', params:{menuId:'menu'}, isArray:true}
        });
    }
]);
});