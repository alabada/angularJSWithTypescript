'use strict';

define(["app",
    "js/directive/table/QsTableCtrl",
    "js/directive/table/QsTableFilters"], function (app) {

    app.directive('qsTable', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'js/directive/table/common.html',
            controller: 'QsTableCtrl',
            controllerAs: 'ctrl',
            transclude: true,
            scope: {
                interface: '=',
                data: '=',
                itemsPerPage: '=?',
                totalItems: '=?',
                resize: '=?',
                paging: '=?',
                fromUrl: '@',
                //search:"@?",
                //headers:"@",
                //fields:"@",
                sortingType: '@?sorting',
                editable: '&?',
                select: '@?',
                selectedModel: '=?',
                dragColumns: '=?',
                //events
                onEdit: '&?',
                onDrag: '&?',
            },
            compile: function (tElement, tAttributes) {

                //collect filters
                var rowFilter = '',
                    pagingFilter = '';

                // 是否有增加额外过滤器
                if (!!tAttributes.addFilter) {
                    rowFilter += tAttributes.addFilter;
                }

                // 是否添加了排序过滤器
                if (tAttributes.sorting !== 'false') {
                    rowFilter += '| orderBy:sortingArray';
                }

                // 设置了全局可拖动，添加 'allow-drag' 属性到header
                if (tAttributes.dragColumns) {
                    tElement.find('th').attr('allow-drag', '');
                    var theads = tElement.find('th');
                    angular.forEach(theads, function (thead) {
                        if (thead.hasAttribute('ng-if')) {
                            thead.removeAttribute('allow-drag');
                        }
                    });
                }

                // 查找功能的添加
                if (tAttributes.search === 'separate') {
                    tAttributes.fields.split(',').forEach(function (item, index) {
                        rowFilter += '| filter:{\'' + item.trim() + '\':columnSearch[\'' + item.trim() + '\']}';
                    });
                } else if (typeof(tAttributes.search) !== 'undefined' && tAttributes.search === 'true') { // 全局查找，默认没有查找功能
                    rowFilter += '| filter:globalSearch';
                }

                // pagingFilter = rowFilter;
                pagingFilter += ' | offset: currentPage:itemsPerPage |limitTo: itemsPerPage';

                tElement[0].querySelector('#rowTr').setAttribute('ng-repeat', 'item in $parent.$filtered = (data' + rowFilter + ')' + pagingFilter);

                //add paging
                tElement.find('paging').attr('count', '$filtered.length');

                return function preLink(scope, element, attrs, ctrl, transclude) { <!-- 嵌入链接函数 用来克隆元素和操作DOM -->
                    ctrl._init();
                    transclude(scope, function (clone, innerScope) {
                        scope.$owner = innerScope.$parent;
                        for (var key in clone) {
                            if (clone.hasOwnProperty(key)) {
                                switch (clone[key].tagName) {
                                    case 'THEAD':
                                        scope.findHead = true;
                                        ctrl._addHeaderPattern(clone[key]);
                                        break;
                                    case 'TBODY':
                                        scope.findBody = true;
                                        ctrl._addRowPattern(clone[key], rowFilter, pagingFilter);
                                        break;
                                    case 'TFOOT':
                                        ctrl._addFooterPattern(clone[key]);
                                        break;
                                }
                            }
                        }
                    });
                };
            },
        }
    });

});