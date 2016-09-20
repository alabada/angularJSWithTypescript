'use strict';

define(["js/directive/panel/qsPanel",
        "js/directive/pagination/qsPagination"], function () {

    return ['$scope', '$filter', 'paginationConfig', function ($scope, $filter, paginationConfig) {

        // init
        $scope.sortingOrder = 'id';
        $scope.currentPage = 2;
        $scope.itemsPerPage = 5;
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.pagedItems = [];
        $scope.totalItems = 0;
        $scope.items = [
            {"id":"1","name":"name 1","description":"description 1","field3":"field3 1","field4":"field4 1","field5":"field5 1"},
            {"id":"2","name":"name 2","description":"description 2","field3":"field3 2","field4":"field4 2","field5":"field5 2"},
            {"id":"3","name":"name 3","description":"description 3","field3":"field3 3","field4":"field4 3","field5":"field5 3"},
            {"id":"4","name":"name 4","description":"description 4","field3":"field3 4","field4":"field4 4","field5":"field5 4"},
            {"id":"5","name":"name 5","description":"description 5","field3":"field3 5","field4":"field4 5","field5":"field5 5"},
            {"id":"6","name":"name 6","description":"description 6","field3":"field3 6","field4":"field4 6","field5":"field5 6"},
            {"id":"7","name":"name 7","description":"description 7","field3":"field3 7","field4":"field4 7","field5":"field5 7"},
            {"id":"8","name":"name 8","description":"description 8","field3":"field3 8","field4":"field4 8","field5":"field5 8"},
            {"id":"9","name":"name 9","description":"description 9","field3":"field3 9","field4":"field4 9","field5":"field5 9"},
            {"id":"10","name":"name 10","description":"description 10","field3":"field3 10","field4":"field4 10","field5":"field5 10"},
            {"id":"11","name":"name 11","description":"description 11","field3":"field3 11","field4":"field4 11","field5":"field5 11"},
            {"id":"12","name":"name 12","description":"description 12","field3":"field3 12","field4":"field4 12","field5":"field5 12"},
            {"id":"13","name":"name 13","description":"description 13","field3":"field3 13","field4":"field4 13","field5":"field5 13"},
            {"id":"14","name":"name 14","description":"description 14","field3":"field3 14","field4":"field4 14","field5":"field5 14"},
            {"id":"15","name":"name 15","description":"description 15","field3":"field3 15","field4":"field4 15","field5":"field5 15"},
            {"id":"16","name":"name 16","description":"description 16","field3":"field3 16","field4":"field4 16","field5":"field5 16"},
            {"id":"17","name":"name 17","description":"description 17","field3":"field3 17","field4":"field4 17","field5":"field5 17"},
            {"id":"18","name":"name 18","description":"description 18","field3":"field3 18","field4":"field4 18","field5":"field5 18"},
            {"id":"19","name":"name 19","description":"description 19","field3":"field3 19","field4":"field4 19","field5":"field5 19"},
            {"id":"20","name":"name 20","description":"description 20","field3":"field3 20","field4":"field4 20","field5":"field5 20"}
        ];

        $scope.pageGroup = [5, 10, 20];
        $scope.selected = 5;

        /*
            在所有的可用数据中搜索匹配条件的数据
         */
        var searchMatch = function (haystack, needle) {
            if (!needle) { // 没有条件，返回
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        /*
            显示过滤出来的条目
         */
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                for(var attr in item) { // 为每一条数据每个属性执行匹配查询
                    if (searchMatch(item[attr], $scope.query)) {
                        return true;
                    }
                }
                return false;
            });

            $scope.totalItems = $scope.filteredItems.length;

            // 对找出的数据做排序
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }
            $scope.currentPage = 1;
            // 按页分组
            $scope.groupToPages();
        };

        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                var itemsPerPageLocal = angular.isDefined($scope.itemsPerPage) ? $scope.itemsPerPage : paginationConfig.itemsPerPage;
                if (i % itemsPerPageLocal === 0) {
                    $scope.pagedItems[Math.floor(i / itemsPerPageLocal)] = [ $scope.filteredItems[i] ]; // 初始化一个数组
                } else {
                    $scope.pagedItems[Math.floor(i / itemsPerPageLocal)].push($scope.filteredItems[i]);
                }
            }
        };

        // 刷新视图
        $scope.search();

        /*
            根据字段进行排序
         */
        $scope.sortBy = function(newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortingOrder = newSortingOrder;
            }
        };

        $scope.addItem = function () {
            var object = {"id":"99","name":"name 99","description":"description 99","field3":"field3 99","field4":"field4 99","field5":"field5 99"};
            $scope.items.push(object);
            $scope.search();
        }

        $scope.subItem = function () {
            //$scope.items.pop();
            //$scope.items.shift();
            $scope.items.splice(0, 1);
            $scope.search();
        }
    }];
});