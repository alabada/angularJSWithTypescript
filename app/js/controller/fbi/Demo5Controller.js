/**
 * Created by zhida.wen on 2016/7/7.
 */
define(["js/directive/tree/qstree1.0",
    "js/directive/panel/qsPanel",
    "js/service/BrandRepository",
    "js/service/GoodsRepository",
    "js/directive/alert/SweetAlert",
    "js/directive/pagination/qsPagination"], function () {

    return ["$scope", "$filter","ngDialog","SweetAlert", "BrandRepository", "GoodsRepository", "paginationConfig", function ($scope, $filter, ngDialog, SweetAlert, BrandRepository, GoodsRepository, paginationConfig) {

        $scope.popoutDetail = function () {

            ngDialog.open({
                template: 'firstDialogId',
                controller: ['$scope', function ($scope) {

                    $scope.selectedGoods = [];//选择的商品
                    $scope.selectedBrandId = 2;

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

                    var searchMatch = function (haystack, needle) {
                        if (!needle) { // 没有条件，返回
                            return true;
                        }
                        if (!haystack) { // 字段为空，过滤掉
                            return false;
                        }
                        return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                    };

                    /**
                     * 过滤出左边数据
                     */
                    $scope.freshLeftFunc = function () {
                        $scope.leftItems = [];
                        GoodsRepository.getAll().then(function (allItems) {
                            angular.forEach(allItems, function (item, index) {
                                item.itemIndex = index;
                                item.itemSelected = false;

                                if (typeof($scope.leftItems[item.brandId]) === 'undefined') {
                                    $scope.leftItems[item.brandId] = [item];
                                } else {
                                    $scope.leftItems[item.brandId].push(item);
                                }

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
                            for (var attr in item) {
                                if (searchMatch(item[attr], "")) {
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
                            for (var attr in item) {
                                if (searchMatch(item[attr], "")) {
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
                        $scope.selectedGoods = [];
                        if ($scope.selectAllLeft) { // 全部选中
                            angular.forEach($scope.filteredLeftItems, function (item) {
                                item.itemSelected = true;
                                $scope.selectedGoods.push(item);
                            });
                        } else {
                            angular.forEach($scope.filteredLeftItems, function (item) {
                                item.itemSelected = false;
                            });
                        }

                        if ($scope.selectedGoods.length > 0) {
                            $scope.selectAllRight = true;
                        } else {
                            $scope.selectAllRight = false;
                        }
                        $scope.rightItems = $scope.selectedGoods;
                        $scope.rightSearchFunc();
                    };

                    $scope.popoutAddWindow = function () {
                        ngDialog.open({
                            template: 'secondDialogId',
                            controller: ["$scope", function ($scope) {

                                $scope.addGoods = function () {
                                    this.closeThisDialog();
                                    var newItem = new Object();
                                    newItem.id = $scope.leftItems[2].length + $scope.leftItems[3].length + $scope.leftItems[4].length + 1;
                                    newItem.brandId = 2;
                                    newItem.goodnum = $scope.goodsNum;
                                    newItem.goodname = $scope.goodsName;

                                    GoodsRepository.create(newItem).then(function () {
                                        SweetAlert.swal('添加数据成功');
                                        $scope.freshLeftFunc();
                                    });
                                }

                            }],
                            scope: $scope
                        });
                    }

                }],
                scope: $scope,
                className: 'ngdialog-theme-plain',
                width: 1000
            })
        }

    }];


});