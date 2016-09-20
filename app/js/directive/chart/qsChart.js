'use strict';

define(["app"], function (app) {

    app.directive('qsChart', QsChart)
        .directive('qsChartLine', QsChartLine)
        .directive('qsChartBar', QsChartBar)
        .directive('qsChartRadar', QsChartRadar)
        .directive('qsChartPolararea', QsChartPolararea)
        .directive('qsChartPie', QsChartPie)
        .directive('qsChartDoughnut', QsChartDoughnut)
        .directive('qsChartLegend', QsChartLegend)
        .factory('QsChartFactory', QsChartFactory);

    function QsChart(QsChartFactory) {
        return new QsChartFactory();
    }

    function QsChartLine(QsChartFactory) {
        return new QsChartFactory('line');
    }

    function QsChartBar(QsChartFactory) {
        return new QsChartFactory('bar');
    }

    function QsChartRadar(QsChartFactory) {
        return new QsChartFactory('radar');
    }

    function QsChartPolararea(QsChartFactory) {
        return new QsChartFactory('polararea');
    }

    function QsChartPie(QsChartFactory) {
        return new QsChartFactory('pie');
    }

    function QsChartDoughnut(QsChartFactory) {
        return new QsChartFactory('doughnut');
    }

    function QsChartFactory() {

        return function (chartType) {

            return {
                restrict: 'A',
                scope: {
                    data: '=chartData',
                    options: '=chartOptions',
                    type: '@chartType',
                    legend: '=?chartLegend',
                    chart: '=?chart',
                    click: '&chartClick'
                },
                link: link
            };

            function link($scope, $elem, $attrs) {
                var ctx = $elem[0].getContext('2d');
                var chartObj;
                var showLegend = false;
                var autoLegend = false;
                var exposeChart = false;
                var legendElem = null;
                var chartCreated = false;

                for (var attr in $attrs) {
                    if (attr === 'chartLegend') {
                        showLegend = true;
                    } else if (attr === 'chart') {
                        exposeChart = true;
                    } else if (attr === 'autoLegend') {
                        autoLegend = true;
                    }
                }

                $scope.$on('$destroy', function() {
                    if (chartObj && typeof chartObj.destroy === 'function') {
                        chartObj.destroy();
                    }
                });

                if ($scope.click) {
                    $elem[0].onclick = function(evt) {
                        var out = {
                            chartEvent: event,
                            element: chartObj.getElementAtEvent(evt),
                            elements: chartObj.getElementsAtEvent(evt),
                            dataset: chartObj.getDatasetAtEvent(evt)
                        };

                        $scope.click({event: out});
                    };
                }

                $scope.$watch(
                    'data',
                    function (value) {
                        if (value) {
                            //if (chartObj && typeof chartObj.destroy === 'function') {
                            //    chartObj.destroy();
                            //}

                            var type = chartType || $scope.type;
                            if (!type) {
                                throw '无法创建报表: 请指定报表类型';
                            }
                            type = cleanChartName(type);

                            if (chartCreated == false) {
                                chartCreated = true;
                                chartObj = new Chart(ctx, {
                                    type: type,
                                    data: angular.copy(value), // Copy so no digest loop occurs
                                    options: $scope.options
                                });
                            } else {
                                chartObj.type = type;
                                chartObj.data = angular.copy(value);
                                //chartObj.options = $scope.options;

                                chartObj.update();
                            }

                            if (showLegend) {
                                $scope.legend = chartObj.generateLegend();
                            }

                            if (autoLegend) {
                                if (legendElem) {
                                    legendElem.remove();
                                }
                                angular.element($elem[0]).after(chartObj.generateLegend());
                                legendElem = angular.element($elem[0]).next();
                            }

                            if (exposeChart) {
                                $scope.chart = chartObj;
                            }
                            chartObj.resize();
                        }
                    }, true);
            }

            function cleanChartName(type) {
                var typeLowerCase = type.toLowerCase();
                switch (typeLowerCase) {
                    case 'polararea':
                        return 'polarArea';
                    default:
                        return type;
                }
            }

        };
    }

    function QsChartLegend() {

        return {
            restrict: 'A',
            scope: {
                legend: '=?chartLegend'
            },
            link: link
        };

        function link($scope, $elem) {

            $scope.$watch(
                'legend',
                function (value) {

                    if (value) {
                        $elem.html(value);
                    }

                },
                true
            );
        }
    }
});