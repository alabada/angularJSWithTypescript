/**
 * Created by zhida.wen on 2016/6/8.
 */
define(["app"], function (app) {
    app.factory('GridCommon', ["$filter", function ($filter) {
        return {
            /*
             在所有的可用数据中搜索匹配条件的数据
             */
            searchMatch: function (haystack, needle) {
                if (!needle) { // 没有条件，视为满足条件
                    return true;
                }
                if (!haystack) { // 字段为空，过滤掉
                    return false;
                }
                return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            },

            /*
             按页分组
             */
            groupToPages: function (interface) {
                interface.pagedItems = [];

                for (var i = 0; i < interface.filteredItems.length; i++) {
                    var itemsPerPageLocal = angular.isDefined(interface.itemsPerPage) ? interface.itemsPerPage : 5;
                    if (i % itemsPerPageLocal === 0) {
                        interface.pagedItems[Math.floor(i / itemsPerPageLocal)] = [ interface.filteredItems[i] ]; // 初始化一个数组
                    } else {
                        interface.pagedItems[Math.floor(i / itemsPerPageLocal)].push(interface.filteredItems[i]);
                    }
                }
            },

            /*
             对数据进行排序与显示
             */
            orderAndDisplay:function (interface) {
                interface.totalItems = interface.filteredItems.length;

                // 对找出的数据做排序
                if (interface.sortingOrder !== '') {
                    interface.filteredItems = $filter('orderBy')(interface.filteredItems, interface.sortingOrder, interface.reverse);
                }
                // 按页分组
                this.groupToPages(interface);
            },

        };
    }]);
});