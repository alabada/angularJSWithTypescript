'use strict';

define(["app",
    "js/directive/table/QsTableResizeCtrl"], function (app) {

    app.controller('QsTableSortingCtrl', ['$scope', function ($scope) {

        $scope.sort = {
            fields: [], // 用于存储可读取排序标题的数组
            reverse: [] // 存储每个字段反转的数组
        };

        $scope.sortingArray = [];

        $scope.sortBy = function (field) {
            if ($scope.getResizePressEnd()) {
                $scope.setResizePressEnd(false);
                return;
            }

            if ($scope.data.length) {
                var sortedHeader = $scope.headers[$scope.fields.indexOf(field)];
                if ($scope.sortingType == 'compound') { // 复合式排序

                    if ($scope.sort.fields.indexOf(sortedHeader) == -1) {
                        $scope.sort.fields.push(sortedHeader);
                        $scope.sortingArray.push(field);
                        $scope.sort.reverse.push(false);
                    } else {
                        $scope.changeReversing(field, $scope.sort.fields.indexOf(sortedHeader));
                    }

                } else if ($scope.sortingType == 'simple') { // 简单排序
                    $scope.sort.fields = [sortedHeader];
                    $scope.changeReversing(field);
                }
            }

        };

        $scope.changeReversing = function (sortProperty, indexOfHeader) {
            if ($scope.sortingType == 'compound') {
                $scope.sort.reverse[indexOfHeader] = !$scope.sort.reverse[indexOfHeader];
                $scope.sortingArray[indexOfHeader] = $scope.sort.reverse[indexOfHeader] ? "-" + sortProperty : sortProperty;
            } else if ($scope.sortingType == 'simple') {
                $scope.sort.reverse[0] = !$scope.sort.reverse[0];
                $scope.sortingArray = $scope.sort.reverse[0] ? [sortProperty] : ["-" + sortProperty];
            }
        };

        // 设置排序图标高亮
        $scope.headerIsSortedClass = function (field) {
            if (!$scope.sortingArray.length) {
                return;
            }

            if ($scope.sortingType == 'simple') {
                if (field == $scope.sort.fields[0] || "-" + field == $scope.sort.fields[0]) {
                    return $scope.sort.reverse[0] ? 'table-sort-down' : 'table-sort-up';
                }
            } else if ($scope.sortingType == 'compound') {
                var rowIndex = $scope.sort.fields.indexOf(field);
                if (rowIndex != -1) {
                    return $scope.sort.reverse[rowIndex] ? 'table-sort-down' : 'table-sort-up';
                }
            }
        };

        // 取消排序
        $scope.removeSorting = function () {
            var index = $scope.sort.fields.indexOf(this.sortField);
            if (index > -1) {
                $scope.sort.fields.splice(index, 1);
                $scope.sort.reverse.splice(index, 1);
                $scope.sortingArray.splice(index, 1);
            }
            index = null;
        };

    }]);
});