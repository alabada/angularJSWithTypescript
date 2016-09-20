/**
 * Created by zhida.wen on 2016/7/7.
 */
define(["js/directive/tree/qstree1.0",
    "js/service/BrandRepository",
    "js/directive/tablescroll/tableScroll",
    "js/directive/pagination/qsPagination"], function () {

    return ["$scope", "$filter","ngDialog", "BrandRepository", "paginationConfig", function ($scope, $filter, ngDialog, BrandRepository, paginationConfig) {
        $scope.orderNums = "";
        $scope.selectedItemIds = [];

        $scope.popoutDetail = function () {

            ngDialog.open({
                template: 'withInlineController',
                controller: ['$scope', function ($scope) {

                    $scope.brand = BrandRepository.getList();  //品牌数据
                    $scope.selectedGoods = [];//选择的商品
                    $scope.selectedBrandId = 999;

                    $scope.selectAll = false;
                    $scope.sortingOrder = 'id';
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.reverse = false;
                    $scope.filteredItems = [];
                    $scope.pagedItems = [];
                    $scope.totalItems = 0;
                    $scope.items = [];
                    $scope.itemsForShow = [];

                    var itemCount = 0;

                    var searchMatch = function (haystack, needle) {
                        if (!needle) { // 没有条件，返回
                            return true;
                        }
                        if (!haystack) { // 字段为空，过滤掉
                            return false;
                        }
                        return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                    };

                    var setSelectAllValue = function () {
                        $scope.selectAll = true;
                        if ($scope.itemsForShow.length == 0) {
                            $scope.selectAll = false;
                            return;
                        }
                        angular.forEach($scope.itemsForShow, function (item) {
                            if (item.itemSelected == false) {
                                $scope.selectAll = false;
                                return;
                            }
                        });
                    };

                    $scope.$watch('brand', function (newValue) {
                        var treeId = $scope.demo04;
                        if (typeof(treeId) != 'undefined' && typeof treeId.currentNode != 'undefined') {
                            var curNode = treeId.currentNode;
                            $scope.itemsForShow = [];
                            if (typeof(curNode.children)=='undefined' || curNode.children.length==0) { // 叶子节点
                                for (var i=0; i<$scope.items.length; i++) {
                                    if (curNode.id == $scope.items[i].id) {
                                        $scope.itemsForShow.push($scope.items[i]);
                                        break;
                                    }
                                }
                            }else {
                                switch (curNode.id) {
                                    case 1:angular.forEach($scope.items, function (item, inxex) {
                                        $scope.itemsForShow.push(item);
                                    });
                                        break;
                                    default:
                                        angular.forEach($scope.items, function (item, inxex) {
                                            if (curNode.id == item.brandId) {
                                                $scope.itemsForShow.push(item);
                                            }
                                        });
                                        break;
                                }
                            }
                            $scope.searchFunc();
                            setSelectAllValue();
                        }
                    }, true);

                    /**
                     * 递归获取子节点
                     * @param item
                     */
                    var getChild = function (item) {
                        for (var i=0; i<item.children.length; i++) {
                            if (typeof(item.children[i].children)!='undefined' && item.children[i].children.length>0) {
                                getChild(item.children[i]);
                            } else {
                                item.children[i].itemIndex = ++itemCount;
                                item.children[i].itemSelected = false;
                                $scope.items.push(item.children[i]);
                                $scope.itemsForShow.push(item.children[i]);
                            }
                        }
                    }

                    /**
                     * 过滤出数据
                     */
                    $scope.freshFunc = function () {
                        BrandRepository.getAll().then(function (allItems) {
                            if (allItems.length < 0) {
                                return;
                            }
                            for (var i=0; i<allItems.length; i++) {
                                var item = allItems[i];
                                if (typeof(item.children)!='undefined' && item.children.length>0) {
                                    getChild(item);
                                }
                            }

                            $scope.searchFunc();
                        });
                    };
                    $scope.freshFunc();

                    $scope.searchFunc = function () {
                        $scope.filteredItems = $filter('filter')($scope.itemsForShow, function (item) {
                            for (var attr in item) {
                                if (attr == 'id' || attr == 'goodnum' || attr == 'goodname') {
                                    if (searchMatch(item[attr], $scope.query)) {
                                        return true;
                                    }
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
                        $scope.groupToPagesFunc();
                    };

                    $scope.groupToPagesFunc = function () {
                        $scope.pagedItems = [];
                        for (var i = 0; i < $scope.filteredItems.length; i++) {
                            var itemsPerPageLocal = angular.isDefined($scope.itemsPerPage) ? $scope.itemsPerPage : paginationConfig.itemsPerPage;
                            if (i % itemsPerPageLocal === 0) {
                                $scope.pagedItems[Math.floor(i / itemsPerPageLocal)] = [$scope.filteredItems[i]]; // 初始化一个数组
                            } else {
                                $scope.pagedItems[Math.floor(i / itemsPerPageLocal)].push($scope.filteredItems[i]);
                            }
                        }
                    }

                    /*
                     根据字段进行排序
                     */
                    $scope.sortByFunc = function (newSortingOrder) {
                        if ($scope.sortingOrder == newSortingOrder) {
                            $scope.reverse = !$scope.reverse;
                        } else {
                            $scope.sortingOrder = newSortingOrder;
                        }
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

                        if ($scope.selectedGoods.length == $scope.totalItems) {
                            $scope.selectAll = true;
                        } else {
                            $scope.selectAll = false;
                        }
                    };

                    /**
                     * 切换全选与反选操作
                     */
                    $scope.toggleSelectAllFunc = function () {
                        $scope.selectAll = !$scope.selectAll;
                        $scope.selectedGoods = [];
                        if ($scope.selectAll) { // 全部选中
                            angular.forEach($scope.filteredItems, function (item) {
                                item.itemSelected = true;
                                $scope.selectedGoods.push(item);

                            });
                        } else {
                            angular.forEach($scope.filteredItems, function (item) {
                                item.itemSelected = false;
                            });
                        }

                    };

                }

                ],
                scope: $scope,
                className: 'ngdialog-theme-plain',
                width: 650
            })
    }
    }];

});