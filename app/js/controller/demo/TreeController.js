/**
 * Author: zhiheng.li
 * CreateTime: 2016/6/13
 * Description:
 */
describe("A suite of basic functions", function() {
    it("reverse word",function(){
        expect($scope.getNodeLabel).toBeNull();
    });
});

'use strict';
define(["../../directive/tree/qstree1.0.js",
    "js/service/BrandRepository",
    "js/service/GoodsRepository",
    "js/directive/pagination/qsPagination.js"], function () {


    // controller
    return ["$scope", "$filter", "BrandRepository", "GoodsRepository", "paginationConfig",function ($scope, $filter, BrandRepository, GoodsRepository, paginationConfig) {


        $scope.brand = BrandRepository.getList();  //品牌数据
        console.log($scope.brand);
        $scope.selectedGoods = [];//选择的商品
        $scope.selectedBrandId = 999;

        // 左侧条目
        $scope.selectAllLeft = false;
        $scope.sortingOrderLeft = 'id';
        $scope.currentPageLeft = 1;
        $scope.itemsPerPageLeft = 5;
        $scope.reverseLeft = false;
        $scope.filteredLeftItems = [];
        $scope.pagedLeftItems = [];
        $scope.totalLeftItems = 0;
        $scope.leftItems = [];

        //选择的节点
        $scope.selectedNodes= [];
        //选择的节点名称
        $scope.selectedNodesLabel= [];
        /**
         * 在所有的可用数据中搜索匹配条件的数据
         * @param haystack
         * @param needle
         * @returns {boolean}
         */
        var searchMatch = function (haystack, needle) {
            if (!needle) { // 没有条件，返回
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        var getSelectAllValue = function () {
            $scope.selectAllLeft = true;
            angular.forEach($scope.leftItems[$scope.selectedBrandId], function (item) {
                if (item.itemSelected == false) {
                    $scope.selectAllLeft = false;
                }
            });
        }

        $scope.$watch('brand', function (newValue, oldValue) {
            if (newValue.length > 0) {
                angular.forEach(newValue[0].children, function (item) {
                    if (item.selected === "selected") {
                        $scope.selectedBrandId = item.id;
                        getSelectAllValue();
                        $scope.leftSearchFunc();
                    }
                });
            }
        }, true);


        /**
         * 过滤出左边数据
         */
        $scope.freshLeftFunc = function () {
            GoodsRepository.getAll().then(function (allItems) {
                angular.forEach(allItems, function (item, index) {
                    item.itemIndex = index;
                    item.itemSelected = false;

                    if (typeof($scope.leftItems[item.brandId]) === 'undefined') {
                        $scope.leftItems[item.brandId] = [item];
                    } else {
                        $scope.leftItems[item.brandId].push(item);
                    }

                    $scope.selectedBrandId = $scope.selectedBrandId > item.brandId ? item.brandId : $scope.selectedBrandId;
                });

                $scope.leftSearchFunc();
            });
        };
        $scope.freshLeftFunc();

        /*
         显示过滤出来的条目
         */
        $scope.leftSearchFunc = function () {
            if (typeof($scope.leftItems[$scope.selectedBrandId]) === 'undefined') {
                return;
            }
            $scope.filteredLeftItems = $filter('filter')($scope.leftItems[$scope.selectedBrandId], function (item) {
                for (var attr in item) { // 为每一条数据每个属性执行匹配查询
                    if (searchMatch(item[attr], $scope.query)) {
                        return true;
                    }
                }
                return false;
            });

            $scope.totalLeftItems = $scope.filteredLeftItems.length;
            // 对找出的数据做排序
            if ($scope.sortingOrderLeft !== '') {
                $scope.filteredLeftItems = $filter('orderBy')($scope.filteredLeftItems, $scope.sortingOrderLeft, $scope.reverseLeft);
            }
            $scope.currentPageLeft = 1;
            // 按页分组
            $scope.groupToLeftPagesFunc();
        };

        $scope.groupToLeftPagesFunc = function () {
            $scope.pagedLeftItems = [];
            for (var i = 0; i < $scope.filteredLeftItems.length; i++) {
                var itemsPerPageLocal = angular.isDefined($scope.itemsPerPageLeft) ? $scope.itemsPerPageLeft : paginationConfig.itemsPerPageLeft;
                if (i % itemsPerPageLocal === 0) {
                    $scope.pagedLeftItems[Math.floor(i / itemsPerPageLocal)] = [$scope.filteredLeftItems[i]]; // 初始化一个数组
                } else {
                    $scope.pagedLeftItems[Math.floor(i / itemsPerPageLocal)].push($scope.filteredLeftItems[i]);
                }
            }
        }

        /*
         根据字段进行排序
         */
        $scope.leftSortByFunc = function (newSortingOrder) {
            if ($scope.sortingOrderLeft == newSortingOrder) {
                $scope.reverseLeft = !$scope.reverseLeft;
            } else {
                $scope.sortingOrderLeft = newSortingOrder;
            }
        };

        // 右侧

        $scope.selectAllRight = false;
        $scope.sortingOrderRight = 'id';
        $scope.itemsPerPageRight = 5;
        $scope.currentPageRight = 1;
        $scope.reverseRight = false;
        $scope.filteredRightItems = [];
        $scope.pagedRightItems = [];
        $scope.totalRightItems = 0;
        $scope.rightItems = [{}];

        /*
         显示过滤出来的条目
         */
        $scope.rightSearchFunc = function () {
            $scope.filteredRightItems = $filter('filter')($scope.rightItems, function (item) {
                for (var attr in item) { // 为每一条数据每个属性执行匹配查询
                    if (searchMatch(item[attr], $scope.query)) {
                        return true;
                    }
                }
                return false;
            });

            $scope.totalRightItems = $scope.filteredRightItems.length;
            // 对找出的数据做排序
            if ($scope.sortingOrderRight !== '') {
                $scope.filteredRightItems = $filter('orderBy')($scope.filteredRightItems, $scope.sortingOrderRight, $scope.reverseRight);
            }
            $scope.currentPageRight = 1;
            // 按页分组
            $scope.groupToRightPagesFunc();
        };

        $scope.groupToRightPagesFunc = function () {
            $scope.pagedRightItems = [];
            for (var i = 0; i < $scope.filteredRightItems.length; i++) {
                var itemsPerPageLocal = angular.isDefined($scope.itemsPerPageRight) ? $scope.itemsPerPageRight : paginationConfig.itemsPerPageLeft;
                if (i % itemsPerPageLocal === 0) {
                    $scope.pagedRightItems[Math.floor(i / itemsPerPageLocal)] = [$scope.filteredRightItems[i]]; // 初始化一个数组
                } else {
                    $scope.pagedRightItems[Math.floor(i / itemsPerPageLocal)].push($scope.filteredRightItems[i]);
                }
            }
        }

        /*
         根据字段进行排序
         */
        $scope.rightSortByFunc = function (newSortingOrder) {
            if ($scope.sortingOrderRight == newSortingOrder) {
                $scope.reverseRight = !$scope.reverseRight;
            } else {
                $scope.sortingOrderRight = newSortingOrder;
            }
        };

        /**
         * 取消右边的所有选中条目
         */
        $scope.cancelSelectAllFunc = function () {
            if ($scope.selectedGoods.length == 0) {
                return;
            }
            $scope.selectAllRight = false;
            $scope.selectAllLeft = false;

            angular.forEach($scope.selectedGoods, function (item) {
                item.itemSelected = false;
            });

            $scope.selectedGoods = [];

            $scope.rightItems = $scope.selectedGoods;
            $scope.rightSearchFunc();
        };


        /**
         * 切换选中与取消选中操作
         * @param item
         */
        $scope.toggleSelectOneFunc = function (item) {
            item.itemSelected = !item.itemSelected;

            if (item.itemSelected) { // 选中
                $scope.selectedGoods.push(item);
            } else { // 取消选中
                angular.forEach($scope.selectedGoods, function(selectedItem, key) {
                    if(selectedItem.itemIndex == item.itemIndex){
                        $scope.selectedGoods.splice(key, 1);
                    }
                });
            }

            if ($scope.selectAllLeft == true && $scope.filteredLeftItems.length > $scope.selectedGoods.length) {
                $scope.selectAllLeft = false;
            }

            if ($scope.selectedGoods.length > 0) {
                $scope.selectAllRight = true;
            } else {
                $scope.selectAllRight = false;
            }

            $scope.rightItems = $scope.selectedGoods;
            $scope.rightSearchFunc();
        };

        /**
         * 切换全选与反选操作
         */
        $scope.toggleSelectAllFunc = function () {
            $scope.selectAllLeft = !$scope.selectAllLeft;

            if ($scope.selectAllLeft) { // 全部选中
                angular.forEach($scope.filteredLeftItems, function (item) {
                    if (item.itemSelected == false) {
                        item.itemSelected = true;
                        $scope.selectedGoods.push(item);
                    }
                });
            }else {
                var flag = false;
                for (var i=0; i<$scope.selectedGoods.length; i++) {
                    for (var j=0; j<$scope.filteredLeftItems.length; j++) {
                        if($scope.selectedGoods[i].itemIndex == $scope.filteredLeftItems[j].itemIndex) {
                            $scope.selectedGoods[i].itemSelected = false;
                            $scope.selectedGoods.splice(i, 1);
                            flag = true;
                        }
                    }
                    if (flag == true) {
                        flag = false;
                        i--;
                    }
                }
            }

            if ($scope.selectedGoods.length > 0) {
                $scope.selectAllRight = true;
            } else {
                $scope.selectAllRight = false;
            }
            $scope.rightItems = $scope.selectedGoods;
            $scope.rightSearchFunc();

        };

        $scope.getNodeLabel =function(){
            $scope.selectedNodesLabel=[];
            //获取label数据
            for (var i = 0; i < $scope.selectedNodes.length; i++) {
                $scope.selectedNodesLabel.push($scope.selectedNodes[i].roleName);
            }
        }



    }];
});
