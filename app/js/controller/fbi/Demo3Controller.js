/**
 * Created by zhida.wen on 2016/7/7.
 */
define(["js/service/OrderJsonRepository",
    "js/directive/grid/qsGrid",
    "js/directive/panel/qsPanel",
    "js/service/GridCommonService"], function () {

    return ["$scope", "$filter", "ngDialog", "GridCommon", "OrderJsonRepository", function ($scope, $filter, ngDialog, GridCommon, OrderJsonRepository) {
        $scope.orderNums = "";
        $scope.selectedItemIds = [];

        var init = function () {
            OrderJsonRepository.get(1).then(function (data) {
                $scope.orderNums = data.orderNum;
            });
        }
        init();

        $scope.popoutDetail = function () {

            ngDialog.open({
                template: 'withInlineController',
                controller: ['$scope', "$interval", function ($scope, $interval) {
                    $scope.interface = {};
                    // 过滤出来的条目
                    $scope.interface.filteredItems = [];
                    // 存放被选中的条目。controller中可以直接使用。
                    $scope.interface.selectedItems = [];
                    // 设置默认当前页显示条目数量
                    $scope.interface.itemsPerPage = 100;
                    // 总的条目数，用于计算分页
                    $scope.interface.totalItems = 0;
                    $scope.interface.curPage = 1;

                    // grid对应配置json
                    $scope.interface.url = 'config/fbi/orderPanel.json';

                    $scope.items = [];

                    $scope.$on('$destroy', function() {
                        $scope.interface.seleceAll = false;
                    });

                    //$interval(function () {
                    //    console.log($scope.interface.seleceAll);
                    //}, 1000);

                    $scope.selectItems = function () {
                        if ($scope.interface.selectedItems.length > 0) {
                            $scope.$parent.orderNums = "";
                            $scope.$parent.selectedItemIds = [];
                            angular.forEach($scope.interface.selectedItems, function (item, index) {
                                $scope.$parent.selectedItemIds.push(item.id);
                                $scope.$parent.orderNums += item.orderNum;
                                if (index < $scope.interface.selectedItems.length-1) {
                                    $scope.$parent.orderNums += ",";
                                }
                            });
                            if ($scope.interface.selectAll) {
                                $scope.$parent.orderNums = "all";
                            }
                        }
                        this.closeThisDialog();
                    }

                    /*
                     过滤数据并显示
                     */
                    $scope.search = function () {
                        $scope.interface.filteredItems = $filter('filter')($scope.items, function (item) {
                            for(var attr in item) {
                                if (attr == 'orderNum' || attr == 'shop' || attr == 'purchaser' || attr == 'orderDate') {
                                    if (GridCommon.searchMatch(item[attr], "")) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        });

                        GridCommon.orderAndDisplay($scope.interface);

                        //$scope.interface.selectAll = false;
                        if ($scope.$parent.selectedItemIds.length == $scope.interface.totalItems) {
                            $scope.interface.selectAll = true;
                        }
                    };

                    $scope.searchByPurchaser = function () {
                        $scope.interface.filteredItems = $filter('filter')($scope.items, function (item) {
                            if (GridCommon.searchMatch(item['purchaser'], $scope.purchaser)) {
                                return true;
                            }
                            return false;
                        });

                        GridCommon.orderAndDisplay($scope.interface);
                    };

                    // 加载数据并刷新视图
                    $scope.fresh = function () {
                        OrderJsonRepository.getAll().then(function(items) {
                            $scope.items = items;
                            angular.forEach($scope.items, function (item, index) {
                                item.gridIndex = index;
                                item.itemSelected = false;
                                for (var i=0; i<$scope.$parent.selectedItemIds.length; i++) {
                                    if ($scope.$parent.selectedItemIds[i] == item.id) {
                                        item.itemSelected = true;
                                        $scope.interface.selectedItems.push(item);
                                        break;
                                    }
                                }
                            });
                            $scope.search();
                        });
                    };
                    $scope.fresh();

                }],
                scope: $scope,
                className: 'ngdialog-theme-plain',
                width: 650
            });
        };

    }];
});