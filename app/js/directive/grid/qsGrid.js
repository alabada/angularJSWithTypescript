'use strict';

define(["app",
    "js/directive/panel/qsPanel",
    "js/directive/pagination/qsPagination",
    "js/directive/alert/SweetAlert"], function (app) {

    app.directive('qsGridSearch', ['$http', '$compile', function($http, $compile) {
        return {
            templateUrl: 'js/directive/grid/qsGridSearch.html',
            restrict: 'E',
            replace:true,
            scope: {
                url: "=",
            },
            link: function(scope, element, attrs) {
                if (!scope.url) {
                    throw '请在指令参数url中传入获取数据的 url 的值';
                }
                $http.get(scope.url).success(function(successData, status, headers, config) {
                    if (!successData.code) {
                        var elemDivRow = angular.element('<div class="row"></div>');
                        angular.forEach(successData.data, function(dataItem, index) {
                            var elemDiv = angular.element('<div class="col-sm-3"></div>');
                            var label = angular.element('<label class="form-inline"></label>');
                            if (dataItem.type == "text") {
                                label.append(dataItem.labeltext);
                                var elem = angular.element('<input type="search" class="form-control">');
                                angular.forEach(dataItem.attr, function (tVal, tAttr) {
                                    if (tAttr === "directive") {
                                        angular.forEach(tVal, function (dval, direct) {
                                            elem.attr(direct, dval);
                                        });
                                    } else {
                                        elem.attr(tAttr, tVal);
                                    }
                                });
                                label.append(elem);
                            }
                            elemDiv.append(label);
                            elemDivRow.append(elemDiv);
                        });
                        element.append(elemDivRow);
                        $compile(element)(scope);
                    } else {
                        throw '获取数据失败';
                    }
                });
            }
        }
    }]);

    app.directive('qsGridCrud', ['$http', '$compile', function($http, $compile) {
        return {
            templateUrl: 'js/directive/grid/qsGridCrud.html',
            restrict: 'E',
            replace:true,
            scope: {
                url: "=",
            },
            link: function(scope, element, attrs) {
                if (!scope.url) {
                    throw '请在指令参数url中传入获取数据的 url 的值';
                }
                $http.get(scope.url).success(function(successData, status, headers, config) {
                    if (!successData.code) {
                        var elemP = angular.element('<p></p>');
                        angular.forEach(successData.data, function(dataItem, index) {
                            if (dataItem.type == "button") {
                                var elem = angular.element('<button type="button">' + dataItem.labeltext +'</button>');
                                angular.forEach(dataItem.attr, function(tVal, tAttr){
                                    if( tAttr  === "directive" ) {
                                        angular.forEach(tVal, function(dval, direct) {
                                            elem.attr(direct, dval);
                                        });
                                    } else {
                                        elem.attr(tAttr, tVal);
                                    }
                                });
                                elemP.append(elem);
                                elemP.append('&nbsp;');
                            }
                        });
                        element.append(elemP);
                        $compile(element)(scope); // 手动编译应放在循环外，若在循环内，可能导致某些指令例如‘ng-click’，多次被绑定到标签上。
                    } else {
                        throw '获取数据失败';
                    }
                });
            }
        }
    }]);

    app.directive('qsGridPanel', ['$http', '$compile', '$filter', '$templateCache', function($http, $compile, $filter, $templateCache) {
        return {
            templateUrl: 'js/directive/grid/qsGridPanel.html',
            restrict: 'E',
            replace:true,
            scope: {
                interface: '=',
                // menuOptions :"="
            },
            controller: ['$scope', '$element', '$location','SweetAlert', function ($scope, $element, $location, SweetAlert) {

                console.log($scope)

                $scope.interface.selectAll = false;
                $scope.interface.reverse = false;
                $scope.pageGroup = [5, 10, 20];
                $scope.currentPage = 1;

                //右键菜单
                $scope.menuOptions =[
                    ['编辑', function ($itemScope) {
                       $scope.interface.edit( $itemScope.item.id )
                    }],
                    null,
                    ['删除', function ($itemScope) {
                       $scope.interface.del( $itemScope.item )
                    }],
                    null,
                    ['查看', function ($itemScope) {
                       $scope.interface.view( $itemScope.item.id )
                    }]
                ]
                /*
                 根据字段进行排序
                 */
                $scope.sortBy = function(newSortingOrder) {
                    if ($scope.interface.sortingOrder == newSortingOrder) {
                        $scope.interface.reverse = !$scope.interface.reverse;
                    } else {
                        $scope.interface.sortingOrder = newSortingOrder;
                    }
                };

                /*
                 切换全选与反选操作
                 */
                $scope.toggleSelectAllFunc = function () {
                    $scope.interface.selectAll = !$scope.interface.selectAll;
                    $scope.interface.selectedItems = [];
                    if ($scope.interface.selectAll) { // 全部选中
                        angular.forEach($scope.interface.filteredItems, function (item) {
                            item.itemSelected = true;
                            $scope.interface.selectedItems.push(item);
                        });
                    } else {
                        angular.forEach($scope.interface.filteredItems, function (item) {
                            item.itemSelected = false;
                        });
                    }
                };

                /*
                 切换选中与取消选中操作
                 */
                $scope.toggleSelectOneFunc = function (item) {
                    item.itemSelected = !item.itemSelected;
                    if (item.itemSelected) { // 选中
                        $scope.interface.selectedItems.push(item);
                    } else { // 取消选中
                        angular.forEach($scope.interface.selectedItems, function(selectedItem, key) {
                            if(selectedItem.gridIndex == item.gridIndex){
                                $scope.interface.selectedItems.splice(key, 1);
                            }
                        });
                    }
                    if ($scope.interface.selectedItems.length == $scope.interface.totalItems) {
                        $scope.interface.selectAll = true;
                    } else {
                        $scope.interface.selectAll = false;
                    }
                };

                $scope.jumpToPage = function () {
                    $scope.interface.curPage = $scope.currentPage;
                    $scope.interface.pageChanged();
                }
            }],

            /**
             *options可选有：showNumPerpage:false showCheckbox:true order:false operation:true showPagenation:true
             */
            link: function(scope, element, attrs) {

                if (!scope.interface.url) {
                    throw '请在指令参数url中传入获取数据的 url 的值';
                }

                $http.get(scope.interface.url).success(function(successData, status, headers, config) {
                    if (!successData.code) {
                        angular.forEach(successData.data, function(dataItem, index) {
                            if (dataItem.type == "qs-panel") {
                                var colNum = 0;
                                var elemPanel = angular.element('<qs-panel></qs-panel>');
                                if (typeof dataItem.attr != "undefined" && typeof dataItem.attr.heading != "undefined") {
                                    var elemHeading = angular.element('<qs-panel-head></qs-panel-head>');
                                    angular.forEach(dataItem.attr, function(tVal, tAttr) {
                                        if (tAttr == 'colour') {
                                            elemPanel.attr(tAttr, tVal);
                                        } else if (tAttr == 'heading') {
                                            elemHeading.append(tVal)
                                        }
                                    });

                                    if (typeof(dataItem.options) != "undefined" && dataItem.options.showNumPerpage == "true") {
                                        elemHeading.append((' 每页显示行数：<select ng-model="interface.itemsPerPage" ng-options="page for page in pageGroup"></select>'));
                                    }
                                    elemPanel.append(elemHeading);
                                }
                                var elemDiv = angular.element('<div class="scrollArea"></div>');
                                var elemTab = angular.element('<tabel panel-table class="table-striped table-bordered" style="margin-bottom: 0px"></tabel>');
                                var columnShow = dataItem.table.columnNameShow;
                                var columnReal = dataItem.table.columnNameReal;
                                colNum = columnShow.length;

                                // thead
                                var tHead = '<thead><tr>';
                                if (typeof(dataItem.options) == "undefined" || dataItem.options.showCheckbox != "false") {
                                    tHead += '<th><input type="checkbox" ng-checked="interface.selectAll" ng-click="toggleSelectAllFunc()"></th>';
                                    colNum ++;
                                }
                                angular.forEach(columnShow, function(column, index) {
                                    tHead += '<th>' + columnShow[index].name;
                                    if (typeof(dataItem.options) != "undefined" && dataItem.options.order == "true") {
                                        tHead += '<a ng-click="sortBy(\'' + column + '\')"><i class="fa fa-sort"></i></a>';
                                    }
                                    tHead += '</th>';
                                });
                                if (typeof(dataItem.options) == "undefined" || dataItem.options.operation != "false") {
                                    tHead += '<th>操作</th>';
                                    colNum ++;
                                }
                                tHead += '</tr></thead>';
                                elemTab.append(tHead);

                                // tbody
                                var tBody = '<tbody><tr ng-repeat="item in interface.pagedItems[interface.curPage-1]';
                                if (typeof(dataItem.options) != "undefined" && dataItem.options.order == "true") {
                                    tBody += ' | orderBy:interface.sortingOrder:interface.reverse';
                                }
                                tBody += '" context-menu="menuOptions">';
                                if (typeof(dataItem.options) == "undefined" || dataItem.options.showCheckbox != "false") {
                                    tBody += '<td><input type="checkbox" ng-checked="item.itemSelected" ng-click="toggleSelectOneFunc(item)"></td>';
                                }
                                angular.forEach(columnReal, function(column, index) {
                                    if (typeof (columnReal[index].templateId) != "undefined" && columnReal[index].templateId.length > 0) {
                                        tBody += '<td>' + $templateCache.get(columnReal[index].templateId) + '</td>';
                                    } else {
                                        if (column.overflow == "true") {
                                            tBody += '<td><p style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: ' + column.width + '">{{item.' + columnReal[index].name + '}}</p></td>';
                                        } else {
                                            tBody += '<td><p>{{item.' + columnReal[index].name + '}}</p></td>';
                                        }
                                    }
                                });
                                if (typeof(dataItem.options) == "undefined" || dataItem.options.operation != "false") {
                                    tBody += '<td>';
                                    if (typeof(dataItem.table.operation) != "undefined" && dataItem.table.operation.subMenu == "true") {
                                        tBody += '<button class="btn btn-outline btn-default" ng-click="interface.subMenu(item)"><span>+子菜单</span></button>&nbsp;';
                                    }
                                    if (typeof(dataItem.table.operation) != "undefined" && dataItem.table.operation.link == "true") {
                                        tBody += '<button class="btn btn-outline btn-default" ng-click="interface.link(item)"><span class="fa fa-link"></span></button>&nbsp;';
                                    }
                                    if (typeof(dataItem.table.operation) == "undefined" || dataItem.table.operation.edit != "false") {
                                        tBody += '<button class="btn btn-outline btn-default" ng-click="interface.edit(item)"><span class="glyphicon glyphicon-pencil"></span></button>&nbsp;';
                                    }
                                    if (typeof(dataItem.table.operation) == "undefined" || dataItem.table.operation.del != "false") {
                                        tBody += '<button class="btn btn-outline btn-default" ng-click="interface.del(item)"><span class="glyphicon glyphicon-trash"></span></button>&nbsp;';
                                    }
                                    if (typeof(dataItem.table.operation) == "undefined" || dataItem.table.operation.view != "false") {
                                        tBody += '<button class="btn btn-outline btn-default" ng-click="interface.view(item)"><span class="glyphicon glyphicon-eye-open"></span></button>&nbsp;';
                                    }
                                    tBody += '</td>';
                                }
                                tBody += '</tr></tbody>';
                                elemTab.append(tBody);

                                // tfoot
                                var tFoot = '<tfoot>'
                                if (typeof(dataItem.options) == "undefined" || dataItem.options.showPagenation != "false") {
                                    tFoot += '<td colspan="' + colNum + '" class="text-center form-inline"><qs-pagination ';
                                    angular.forEach(dataItem.table.pagination, function (tVal, tAttr) {
                                        tFoot += tAttr + '="' + tVal + '"';
                                    });
                                    tFoot += 'ng-model="interface.curPage" ng-change="interface.pageChanged()" total-items="interface.totalItems" items-per-page="interface.itemsPerPage"';
                                    tFoot += '></qs-pagination>';
                                    tFoot += '<input class="form-control" style="vertical-align: top; margin: 20px 20px; display: inline-block; width: 70px" type="number" ng-model="$parent.$parent.currentPage" placeholder="请输入数字">';
                                    tFoot += '<button class="btn btn-outline btn-default" style="vertical-align: top; margin: 20px 20px; display: inline-block; width: 50px" ng-click="jumpToPage()">GO</button>';
                                    tFoot += '</td>'
                                }
                                tFoot += '</tfoot>';
                                elemTab.append(tFoot);

                                elemDiv.append(elemTab);
                                elemPanel.append(elemDiv);
                                element.append(elemPanel);
                            }
                        });
                        $compile(element)(scope);
                    } else {
                        throw '获取数据失败';
                    }
                });

            }
        }
    }]);

});