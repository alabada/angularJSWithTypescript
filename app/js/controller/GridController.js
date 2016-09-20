'use strict';

define([
    "js/service/GridDataService",
    "js/service/GridCommonService",
    "js/directive/grid/qsGrid",
    "js/directive/alert/SweetAlert",
    "js/service/GridJsonRepository"], function () {

    return ['$scope', '$filter', '$location', "GridData", "GridCommon", "SweetAlert", "GridJsonRepository", function ($scope, $filter, $location, GridData, GridCommon, SweetAlert, GridJsonRepository) {

        $scope.interface = {};
        // 各种条件过滤出来的条目
        $scope.interface.filteredItems = [];
        // 存放被选中的条目。controller中可以直接使用。
        $scope.interface.selectedItems = [];
        // 二维数组，存放每一页码中对应的条目。
        $scope.interface.pagedItems = [];
        // 指定页面打开显示的页码
        $scope.interface.curPage = 1;
        // 指定默认按什么字段进行排序
        $scope.interface.sortingOrder = 'id';
        // 设置默认当前页显示条目数量
        $scope.interface.itemsPerPage = 5;
        // 总的条目数，用于计算分页
        $scope.interface.totalItems = 0;
        // grid对应配置json
        $scope.interface.url = './data/gridPanel.json';

        $scope.items = [];
        $scope.gridSearchJsonUrl = './data/gridSearch.json';
        $scope.gridCrudJsonUrl = './data/gridCrud.json';

        /*
             过滤数据并显示
         */
        $scope.search = function () {
            $scope.interface.filteredItems = $filter('filter')($scope.items, function (item) {
                for(var attr in item) { // 为每一条数据每个属性执行匹配查询
                    if (attr == 'id' || attr == 'name' || attr == 'age' || attr == 'email' || attr == 'dept' || attr == 'telephone') {
                        if (GridCommon.searchMatch(item[attr], $scope.queryString)) {
                            return true;
                        }
                    }
                }
                return false;
            });

            GridCommon.orderAndDisplay($scope.interface);
        };

        $scope.searchByID = function () {
            $scope.interface.filteredItems = $filter('filter')($scope.items, function (item) {
                if (GridCommon.searchMatch(item['id'], $scope.queryID)) {
                    return true;
                }
                return false;
            });

            GridCommon.orderAndDisplay($scope.interface);
        };

        $scope.searchByName = function () {
            $scope.interface.filteredItems = $filter('filter')($scope.items, function (item) {
                if (GridCommon.searchMatch(item['name'], $scope.queryName)) {
                    return true;
                }
                return false;
            });

            GridCommon.orderAndDisplay($scope.interface);
        };

        $scope.searchByTelephone = function () {
            $scope.interface.filteredItems = $filter('filter')($scope.items, function (item) {
                if (GridCommon.searchMatch(item['telephone'], $scope.queryTelephone)) {
                    return true;
                }
                return false;
            });

            GridCommon.orderAndDisplay($scope.interface);
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
                $scope.interface.curPage = GridData.getCurPage();
            });
        };
        $scope.fresh();

        /*
            新增
         */
        $scope.addRowFunc = function () {
            GridData.setCurPage($scope.interface.curPage);
            $location.path('dashboard/gridAdd');
        }

        /*
            删除
         */
        $scope.delRowFunc = function () {
            if ($scope.interface.selectedItems.length <= 0) {
                SweetAlert.swal('请至少选中一个条目');
                return;
            }
            SweetAlert.swal({
                title: '确认删除?',
                text: '删除后将无法撤销',
                type: 'error',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认删除',
                closeOnConfirm: false
            },  function(isConfirm) {
                if (isConfirm) {
                    var delItemsLen = $scope.interface.selectedItems.length;
                    var delCount = 0;
                    angular.forEach($scope.interface.selectedItems, function(selectedItem) {
                        GridJsonRepository.remove(selectedItem).then(function () {
                            delCount ++;
                            if (delCount == delItemsLen) {
                                SweetAlert.swal('删除成功！');
                                $scope.interface.selectedItems = [];
                                $scope.fresh();
                            }
                        });

                    });
                }
            });
        }

        /*
            修改
         */
        $scope.modifyRowFunc = function () {
            if ($scope.interface.selectedItems.length <= 0) {
                SweetAlert.swal('请至少选中一个条目');
            } else if ($scope.interface.selectedItems.length > 1) {
                SweetAlert.swal('只能选中一个条目');
            } else {
                GridData.setCurPage($scope.interface.curPage);
                $location.path('dashboard/gridModify/' + $scope.interface.selectedItems[0].id);
            }
        }

        /*
            查看
         */
        $scope.viewRowFunc = function () {
            if ($scope.interface.selectedItems.length <= 0) {
                SweetAlert.swal('请至少选中一个条目');
            } else if ($scope.interface.selectedItems.length > 1) {
                SweetAlert.swal('只能选中一个条目');
            } else {
                GridData.setCurPage($scope.interface.curPage);
                $location.path('dashboard/gridView/' + $scope.interface.selectedItems[0].id);
            }
        }

        $scope.interface.edit = function(item) {
            $location.path('dashboard/gridModify/' + item.id);
            GridData.setCurPage($scope.interface.curPage);
        }

        $scope.interface.view = function(item) {
            $location.path('dashboard/gridView/' + item.id);
            GridData.setCurPage($scope.interface.curPage);
        }

        $scope.interface.del = function (item) {
            SweetAlert.swal({
                title: '确认删除?',
                text: '删除后将无法撤销',
                type: 'error',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认删除',
                closeOnConfirm: false
            },  function(isConfirm) {
                if (isConfirm) {
                    GridJsonRepository.remove(item).then(function () {
                        SweetAlert.swal('删除成功！');
                        $scope.fresh();
                    });
                }
            });
            GridData.setCurPage($scope.interface.curPage);
        }

        $scope.interface.refresh = function () {
            $scope.fresh();
        }

        $scope.interface.pageChanged = function () {
            console.log($scope.interface.curPage);
        }

    }];
});