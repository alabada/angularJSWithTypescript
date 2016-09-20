'use strict';

define(["app",
    "js/directive/objectTable/objectTablePagingCtrl"], function (app) {

	app.directive('paging', function () {
        return {
            restrict: 'E',
            replace:true,
            templateUrl: 'js/directive/objectTable/paging.html',
            controller:'pagingTableCtrl',
            require:"^objectTable",
            scope:{
                count:"=",
                display:"="
            },
            link:function(scope, element, attrs, objectTableCtrl){
                scope.objectTableCtrl = objectTableCtrl;
                scope.objectTableCtrl.pageCtrl = scope;
            }
        };
	});
});