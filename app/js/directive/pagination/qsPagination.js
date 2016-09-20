'use strict';

define(["app"], function (app) {

    app.controller('QsPaginationController', ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {
        var self = this,
            ngModelCtrl = { $setViewValue: angular.noop }, // 初始化为空的ModelCtrl
            setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

        /*
            执行初始化操作
         */
        this.init = function(ngModelCtrl_, config) {
            ngModelCtrl = ngModelCtrl_;
            this.config = config;

            ngModelCtrl.$render = function() { // 自定义渲染
                self.render();
            };

            if ($attrs.itemsPerPage) {
                $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
                    self.itemsPerPage = parseInt(value, 10);
                    $scope.totalPages = self.calculateTotalPages();
                });
            } else {
                this.itemsPerPage = config.itemsPerPage;
            }
        };

        /*
            计算总共的页码数
         */
        this.calculateTotalPages = function() {
            var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
            return Math.max(totalPages || 0, 1);
        };

        // 计算当前页码
        this.render = function() {
            $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
        };

        // 跳转到所选择页面
        $scope.selectPage = function(page) {
            if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {
                ngModelCtrl.$setViewValue(page); // 更新视图
                ngModelCtrl.$render();
            }
        };

        /*
            获取分页上左右翻页相关的一些文本
         */
        $scope.getText = function( key ) {
            return $scope[key + 'Text'] || self.config[key + 'Text'];
        };

        /*
            判断是否是第一页
         */
        $scope.noPrevious = function() {
            return $scope.page === 1;
        };

        /*
            判断是否是最后一页
         */
        $scope.noNext = function() {
            return $scope.page === $scope.totalPages;
        };

        /*
            计算总页码数
         */
        $scope.$watch('totalItems', function() {
            $scope.totalPages = self.calculateTotalPages();
        });

        /*
            实现跳转页面
         */
        $scope.$watch('totalPages', function(value) {
            setNumPages($scope.$parent, value);

            if ( $scope.page > value ) {
                $scope.selectPage(value);
            } else {
                ngModelCtrl.$render();
            }
        });
    }]);

    app.constant('paginationConfig', {
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        rotate: true
    });

    /*
        分页指令
     */
    app.directive('qsPagination', ['$parse', 'paginationConfig', function($parse, paginationConfig) {
        return {
            restrict: 'EA',
            scope: {
                totalItems: '=',
                firstText: '@',
                previousText: '@',
                nextText: '@',
                lastText: '@'
            },
            require: ['qsPagination', '?ngModel'],
            controller: 'QsPaginationController',
            templateUrl: 'js/directive/pagination/qsPagination.html',
            replace: true,
            link: function(scope, element, attrs, ctrls) {

                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                if (!ngModelCtrl) { // ng-model指令中所定义的controller
                    return;
                }

                // 设置一些参数
                var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
                    rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
                scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
                scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

                paginationCtrl.init(ngModelCtrl, paginationConfig);

                if (attrs.maxSize) {
                    scope.$parent.$watch($parse(attrs.maxSize), function(value) {
                        maxSize = parseInt(value, 10);
                        paginationCtrl.render();
                    });
                }

                /*
                    创建页面对象
                 */
                function makePage(number, text, isActive) {
                    return {
                        number: number,
                        text: text,
                        active: isActive
                    };
                }

                // 获得所有的可视页码
                function getPages(currentPage, totalPages) {
                    var pages = [];

                    // 页码限制
                    var startPage = 1, endPage = totalPages; // 总页码
                    var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

                    // 最大页码显示限制的情况
                    if ( isMaxSized ) {
                        if (rotate) { // 是否支持数字旋转

                            // 当前被选中的页面保持显示所有页面的中间 maxSize为当前页面可视最大页码数
                            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
                            endPage   = startPage + maxSize - 1;

                            // 超出限制的情况，做调整 当页可视页码数大于总页码的情况。
                            if (endPage > totalPages) {
                                endPage   = totalPages;
                                startPage = endPage - maxSize + 1;
                            }
                        } else { // 可视页码随当前的选中页码变动
                            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;
                            endPage = Math.min(startPage + maxSize - 1, totalPages);
                        }
                    }

                    // 给可视页码中的所有页码增加属性
                    for (var number = startPage; number <= endPage; number++) {
                        var page = makePage(number, number, number === currentPage);
                        pages.push(page);
                    }

                    // 增加提示页码。
                    if (isMaxSized && ! rotate) {
                        if (startPage > 1) {
                            var previousPageSet = makePage(startPage - 1, '...', false);
                            pages.unshift(previousPageSet);
                        }

                        if ( endPage < totalPages ) {
                            var nextPageSet = makePage(endPage + 1, '...', false);
                            pages.push(nextPageSet);
                        }
                    }

                    return pages;
                }

                var originalRender = paginationCtrl.render;
                paginationCtrl.render = function() {
                    originalRender();
                    if (scope.page > 0 && scope.page <= scope.totalPages) {
                        scope.pages = getPages(scope.page, scope.totalPages);
                    }
                };
            }
        };
    }]);

    /*
        配置默认的属性值
     */
    app.constant('pagerConfig', {
        itemsPerPage: 10,
        previousText: '« Previous',
        nextText: 'Next »',
        align: true
    });

    /*
        翻页指令
     */
    app.directive('qsPager', ['pagerConfig', function(pagerConfig) {
        return {
            restrict: 'EA',
            scope: {
                totalItems: '=',
                previousText: '@',
                nextText: '@'
            },
            require: ['qsPager', '?ngModel'],
            controller: 'QsPaginationController',
            templateUrl: 'js/directive/pagination/qsPager.html',
            replace: true,
            link: function(scope, element, attrs, ctrls) {
                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                if (!ngModelCtrl) {
                    return; // 如果没有ngModel的controller则返回
                }

                scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
                paginationCtrl.init(ngModelCtrl, pagerConfig);
            }
        };
    }]);

});