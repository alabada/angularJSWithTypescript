'use strict';

define(["app",
    "js/directive/table/QsTableUtilService",
    "js/directive/table/QsTableResizeCtrl",
    "js/directive/table/QsTableSortingCtrl",
    "js/directive/alert/SweetAlert"], function (app) {

    app.controller('QsTableCtrl', ['$scope', '$timeout', '$element', '$attrs', '$http', '$compile', '$controller', 'QsTableUtilService', 'SweetAlert',
        function ($scope, $timeout, $element, $attrs, $http, $compile, $controller, Util, SweetAlert) {

            $controller('QsTableSortingCtrl', {$scope: $scope});
            $controller('QsTableResizeCtrl', {$scope: $scope});
            var ctrl = this;
            var flag = true;

            // 初始化一些基本参数
            this._init = function () {
                $scope.headers = [];
                $scope.fields = [];
                $scope.itemsPerPage = $scope.itemsPerPage || 5;
                $scope.paging = angular.isDefined($scope.paging) ? $scope.paging : true;
                $scope.sortingType = $scope.sortingType || 'simple';
                $scope.currentPage = 1;
                $scope.customHeader = false;
                $scope.pageGroup = ["10", "20", "50"];

                // 查找
                if ($attrs.search == 'separate') {
                    $scope.search = 'separate';
                    $scope.columnSearch = [];
                    /* ## after changing search model - clear currentPage ##*/
                } else {
                    /* 'separate' or 'true' or 'false '*/
                    $scope.search = typeof($attrs.search) !== 'undefined' && $attrs.search === 'true';
                }

                // 获取header数组
                $scope.headers = Util.getArrayFromParams($attrs.headers, 'headers');

                // 获取属性数组
                $scope.fields = Util.getArrayFromParams($attrs.fields, 'fields');

                // 通过远程路径名获取数据
                if (!!$attrs.fromUrl) {
                    this._loadExternalData($attrs.fromUrl);
                }

                // 字段编辑
                if (!!$scope.onEdit) {
                    this.onEdit = $scope.onEdit;
                }
                // 初始化存放被选中条目的模型(是否支持多选)
                $scope.selectedModel = $scope.select === 'multiply' ? [] : {};

            };

            this.onEdit = $scope.onEdit;

            // 加载远程数据
            this._loadExternalData = function (url) {
                $scope.dataIsLoading = true;
                $http.get(url).then(function (response) {
                    $scope.data = response.data;
                    $scope.dataIsLoading = false;
                });
            };

            /* drag n drop [START]*/

            // 因拖拽改变列顺序
            this.changeColumnsOrder = function (newIndex, oldIndex) {
                var newHeaderIndex = newIndex;
                var oldHeaderIndex = oldIndex;
                var newFieldIndex = newIndex;
                var oldFieldIndex = oldIndex;
                if ($scope.select === 'multiply') {
                    if (!$scope.findHead && !$scope.findBody) {
                        newHeaderIndex -= 1;
                        oldHeaderIndex -= 1;
                        newFieldIndex -= 1;
                        oldFieldIndex -= 1;
                    } else if ($scope.findHead && !$scope.findBody) {
                        //newHeaderIndex -= 1;
                        //oldHeaderIndex -= 1;
                        newFieldIndex -= 1;
                        oldFieldIndex -= 1;
                    } else if (!$scope.findHead && $scope.findBody) {
                        newHeaderIndex -= 1;
                        oldHeaderIndex -= 1;
                        //newFieldIndex -= 1;
                        //oldFieldIndex -= 1;
                    } else if ($scope.findHead && $scope.findBody) {
                        //newHeaderIndex -= 1;
                        //oldHeaderIndex -= 1;
                        //newFieldIndex -= 1;
                        //oldFieldIndex -= 1;
                    }
                }

                $scope.$apply(function () {
                    $scope.fields.swap(newFieldIndex, oldFieldIndex);
                    var headersBackup = $scope.headers.slice();
                    $scope.headers.swap(newHeaderIndex, oldHeaderIndex);
                    if (!!$scope.onDrag && typeof $scope.onDrag === 'function') {
                        $scope.onDrag({$oldOrder: headersBackup, $newOrder: $scope.headers});
                    }
                    headersBackup = null;
                    if (!!$scope.columnSearch) {
                        $scope.columnSearch.swap(newHeaderIndex, oldHeaderIndex);
                    }
                    if (!!ctrl.bodyTemplate) {
                        var tds = angular.element(ctrl.bodyTemplate).children(),
                            html = '',
                            tr = document.createElement('tr'),
                            tbody = document.createElement('tbody'),
                            attributes = $element.find('tbody').find('tr')[0].attributes;


                        [].forEach.call(attributes, function (attr, index) {
                            tr.setAttribute(attr.name, attr.value);
                        });

                        if ($scope.select === 'multiply' && true === flag) {
                            flag = false;
                            var td = document.createElement('td');
                            var input = document.createElement('input');
                            input.setAttribute("type", "checkbox");
                            input.setAttribute("ng-checked", "isSelected(item)");

                            angular.element(td).append(input);
                            tr.appendChild(td);
                            Array.prototype.swap.apply(tds, [newFieldIndex - 1, oldFieldIndex - 1]);
                        } else {
                            Array.prototype.swap.apply(tds, [newFieldIndex, oldFieldIndex]);
                        }


                        for (var i = 0, length = tds.length; i < length; i++) {
                            tr.appendChild(tds[i]);
                        }

                        tbody.appendChild(tr);

                        $element.find('tbody').replaceWith(tbody);
                        ctrl.bodyTemplate = tbody.innerHTML;
                        $compile($element.find('tbody'))($scope);
                    }
                    if ($scope.customHeader) {
                        var ths = $element.find('th'),
                            tr = document.createElement('tr'),
                            thead = document.createElement('thead');

                        Array.prototype.swap.apply(ths, [newHeaderIndex, oldHeaderIndex]);

                        for (var i = 0, length = ths.length; i < length; i++) {
                            tr.appendChild(ths[i]);
                        };

                        thead.appendChild(tr);
                        $element.find('thead').replaceWith(thead);
                    }

                    $scope.jumpToPage(1);
                });
            };

            /* drag n drop [END]*/

            /* table add [START]*/

            /**
             * 自定义header添加
             * @param node
             * @private
             */
            this._addHeaderPattern = function (node) {
                $scope.customHeader = true;
                // add Index to drag
                Array.prototype.forEach.call(node.querySelectorAll('[allow-drag]'), function (th, index) {
                    th.setAttribute('index', index);
                });
                node.removeAttribute('ng-non-bindable');
                $element.find('table').prepend(node);

                if ($scope.select === 'multiply') {
                    if (typeof $element.find('thead').children()[0] != 'undefined') {
                        angular.element($element.find('thead').children()[0]).prepend("<th><input type='checkbox' ng-checked='isAllSelected()' ng-click='toggleSelectAllFunc()'/></th>");
                    }
                    if (typeof $element.find('thead').children()[1] != 'undefined') {
                        angular.element($element.find('thead').children()[1]).prepend("<th></th>");
                    }
                    $compile($element.find('table'))($scope);
                }
            };

            /**
             * 自定义footer添加
             * @param node
             * @private
             */
            this._addFooterPattern = function (node) {
                $element.find('table').prepend(node);
            };

            /**
             * 自定义行添加
             * @param node
             * @param rowFilter
             * @param paggingFilter
             * @private
             */
            this._addRowPattern = function (node, rowFilter, paggingFilter) {
                this._checkEditableContent(node);

                this._addRepeatToRow(node, rowFilter, paggingFilter);
                node.removeAttribute('ng-non-bindable');
                //编译 TBODY
                $element.find('table').append(node.outerHTML);
                this.bodyTemplate = node.innerHTML;

                if ($scope.select === 'multiply') {
                    $element.find('tbody tr').prepend("<td><input type='checkbox' ng-checked='isSelected(item)'/></td>")
                }

                $compile($element.find('tbody'))($scope);

            };

            this._checkEditableContent = function (node) {
                var innerModel, findModelRegex = /\{\{:*:*(.*?)\}\}/g;
                Array.prototype.forEach.call(node.querySelectorAll('[editable]'), function (td) {
                    innerModel = td.innerHTML.replace(findModelRegex, '$1');
                    td.innerHTML = '<div contentEditable ng-model=\'' + innerModel + '\'>{{' + innerModel + '}}</div>';
                });
            };

            this._addRepeatToRow = function (node, rowFilter, paggingFilter) {
                var tr = angular.element(node).find('tr');

                tr.attr('ng-repeat', 'item in $filtered = (data' + rowFilter + ')' + paggingFilter);
                if (!tr.attr('ng-click')) {
                    tr.attr('ng-click', 'setSelected(item)');
                }

                tr.attr('ng-class', '{\'selected-row\':isSelected(item)}');
            };

            /* table add [end]*/

            /* select [START]*/

            /**
             * 保存被选中条目
             * @param item
             */
            $scope.setSelected = function (item) {
                if ($scope.select === 'multiply') { // 支持多选
                    if (!ctrl._containsInSelectArray(item)) {
                        $scope.selectedModel.push(item);
                    } else {
                        $scope.selectedModel.splice($scope.selectedModel.indexOf(item), 1);
                    }
                } else { // 单选
                    $scope.selectedModel = item;
                }
            };

            /**
             * 检查是否已被选中
             * @param obj
             * @returns {boolean}
             * @private
             */
            this._containsInSelectArray = function (obj) {
                if ($scope.selectedModel.length) {
                    return $scope.selectedModel.filter(function (listItem) {
                            if (typeof listItem !== 'undefined' && typeof obj !== 'undefined') {
                                return listItem.$$hashKey == obj.$$hashKey;
                            }
                        }).length > 0;
                }
            };

            $scope.isSelected = function (item) {
                if (!!$scope.selectedModel) {
                    if ($scope.select === 'multiply') {
                        return ctrl._containsInSelectArray(item);
                    } else {
                        return item.$$hashKey == $scope.selectedModel.$$hashKey;
                    }
                }
                return false;
            };

            $scope.isAllSelected = function () {
                return $scope.selectedModel.length === $scope.data.length;
            };

            $scope.toggleSelectAllFunc = function () {
                if ($scope.isAllSelected()) {
                    $scope.selectedModel = [];
                } else {
                    $scope.selectedModel = $scope.data;
                }
            }

            /* select [END]*/

            /* paging [START]*/

            $scope.curPage = 1;
            $scope.jumpToPage = function (curPage) {
                if (typeof curPage == "undefined") {
                    SweetAlert.swal('请输入合适页码!');
                    return;
                }
                $scope.currentPage = curPage;
            }

            // 监听页码变化
            $scope.pageChanged = function () {
                //console.log($scope.currentPage)
                console.log($scope.$filtered)
            }

            // 监听每页显示数量变化
            $scope.itemsPerPageChanged = function () {
                $scope.interface.reLoadData();
            }

            // 监听被过滤后数据的数量
            $scope.$watch(
                '$filtered.length',
                function (newValue, oldValue) {
                    if (newValue != oldValue && typeof newValue != 'undefined' && typeof oldValue != 'undefined') {
                        $scope.totalItems = newValue;
                    }
                }, true);

            /* paging [END]*/


        }])
});