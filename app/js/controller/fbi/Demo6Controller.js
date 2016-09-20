/**
 * Created by zhida.wen on 2016/7/7.
 */
'use strict';

define([
    "js/directive/panel/qsPanel",
    "js/directive/pagination/qsPagination",
    "js/service/GridJsonRepository"], function () {

    return ['$scope', '$filter', "GridJsonRepository", function ($scope, $filter, GridJsonRepository) {

        // 各种条件过滤出来的条目
        $scope.filteredItems = [];
        // 存放被选中的条目。controller中可以直接使用。
        $scope.selectedItems = [];
        // 二维数组，存放每一页码中对应的条目。
        $scope.pagedItems = [];
        // 指定页面打开显示的页码
        $scope.curPage = 1;
        // 指定默认按什么字段进行排序
        $scope.sortingOrder = 'id';
        // 设置默认当前页显示条目数量
        $scope.itemsPerPage = 5;
        // 总的条目数，用于计算分页
        $scope.totalItems = 0;

        $scope.items = [];

        /*
         在所有的可用数据中搜索匹配条件的数据
         */
        var searchMatch = function (haystack, needle) {
            if (!needle) { // 没有条件，视为满足条件
                return true;
            }
            if (!haystack) { // 字段为空，过滤掉
                return false;
            }
            return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        }

        /*
         按页分组
         */
        var groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                var itemsPerPageLocal = angular.isDefined($scope.itemsPerPage) ? $scope.itemsPerPage : 5;
                if (i % itemsPerPageLocal === 0) {
                    $scope.pagedItems[Math.floor(i / itemsPerPageLocal)] = [ $scope.filteredItems[i] ]; // 初始化一个数组
                } else {
                    $scope.pagedItems[Math.floor(i / itemsPerPageLocal)].push($scope.filteredItems[i]);
                }
            }
        }

        /*
         对数据进行排序与显示
         */
        var orderAndDisplay = function () {
            $scope.totalItems = $scope.filteredItems.length;

            // 对找出的数据做排序
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }
            // 按页分组
            groupToPages();
        }

        /*
         过滤数据并显示
         */
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                for(var attr in item) { // 为每一条数据每个属性执行匹配查询
                    if (attr == 'id' || attr == 'name') {
                        if (searchMatch(item[attr], $scope.queryString)) {
                            return true;
                        }
                    }
                }
                return false;
            });

            orderAndDisplay();
        };


        // 加载数据并刷新视图
        $scope.fresh = function () {
            GridJsonRepository.getAll().then(function(items) {
                $scope.items = items;
                angular.forEach($scope.items, function (item, index) {
                    item.gridIndex = index;
                    item.itemSelected = false;
                });
                $scope.search();
            });
        };
        $scope.fresh();
    }];
});