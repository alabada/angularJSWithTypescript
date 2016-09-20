/**
 * Created by zhida.wen on 2016/6/1.
 */
'use strict';

define(["js/directive/chart/qsChart",
    "js/service/RandomService"], function () {

    return ["$scope", "$interval", "Randoms", function ($scope, $interval, Randoms) {

        var MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

        $scope.data = {
            labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
            datasets: [
                {
                    label: '数据集1',
                    fill: false,
                    backgroundColor: 'rgba(220,220,220,0.2)',
                    borderColor: 'rgba(220,220,220,1)',
                    pointBackgroundColor: 'rgba(220,220,220,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: '数据集2',
                    backgroundColor: 'rgba(151,187,205,0.2)',
                    borderColor: 'rgba(151,187,205,1)',
                    pointBackgroundColor: 'rgba(151,187,205,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        /*
        基本配置：
            1、数据点半径
         */
        $scope.options =  {

            responsive: true,
            elements: {
                point: {
                    radius: 5
                }
            },

            legend: {
                display: false
            },

            legendCallback: function(chart) {
                var text = [];
                text.push('<ul class="qs-chart-legend">');
                for (var i = 0; i < chart.data.datasets.length; i++) {
                    text.push('<li><span style="background-color:' + chart.data.datasets[i].borderColor + '"></span>');
                    if (chart.data.datasets[i].label) {
                        text.push(chart.data.datasets[i].label);
                    }
                    text.push('</li>');
                }
                text.push('</ul>');

                return text.join("");
            },

            // Need to override these to give a nice default
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var result = [];
                        var datasetIndex;
                        for (datasetIndex = 0; datasetIndex < data.datasets.length; datasetIndex++) {
                            result.push(data.datasets[datasetIndex].label + ': ' + data.datasets[datasetIndex].data[tooltipItem.index]);
                        }
                        return result;
                    }
                }
            }
        };

        $scope.randomizeData = function() {
            $.each($scope.data.datasets, function(i, dataset) {
                dataset.data = dataset.data.map(function() {
                    return Randoms.scalingFactor();
                });
            });
        };

        $scope.changeDataObject = function() {
            $scope.data = {
                labels: ["七月", "八月", "九月", "十月", "十一月", "十二月"],
                datasets: [{
                    label: "数据集 1",
                    data: [Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor()],
                    fill: false
                }, {
                    label: "数据集 2",
                    data: [Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor(), Randoms.scalingFactor()],
                    fill: false
                }]
            };
            $.each($scope.data.datasets, function(i, dataset) {
                dataset.borderColor = Randoms.randomColor(0.4);
                dataset.backgroundColor = Randoms.randomColor(0.5);
                dataset.pointBorderColor = Randoms.randomColor(0.7);
                dataset.pointBackgroundColor = Randoms.randomColor(0.5);
                dataset.pointBorderWidth = 1;
            });
        };

        $scope.addDataset = function() {
            var newDataset = {
                label: '数据集 ' + ($scope.data.datasets.length + 1),
                borderColor: Randoms.randomColor(0.4),
                backgroundColor: Randoms.randomColor(0.5),
                pointBorderColor: Randoms.randomColor(0.7),
                pointBackgroundColor: Randoms.randomColor(0.5),
                pointBorderWidth: 1,
                data: []
            };
            for (var index = 0; index < $scope.data.labels.length; ++index) {
                newDataset.data.push(Randoms.scalingFactor());
            }
            $scope.data.datasets.push(newDataset);
        };

        $scope.removeDataset = function () {
            $scope.data.datasets.splice(0, 1);
        };

        $scope.addData = function() {
            if ($scope.data.datasets.length > 0) {
                var month = MONTHS[$scope.data.labels.length % MONTHS.length];
                $scope.data.labels.push(month);
                $.each($scope.data.datasets, function(i, dataset) {
                    dataset.data.push(Randoms.scalingFactor());
                });
            }
        };

        $scope.removeData = function() {
            $scope.data.labels.splice(-1, 1); // remove the label first
            $scope.data.datasets.forEach(function(dataset) {
                dataset.data.pop();
            });
        }

        $scope.tickdata = {
            labels: [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
                "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
                "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
                "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
                "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
                "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"
            ],
            datasets: [
                {
                    label: '数据集1',
                    backgroundColor: 'rgba(220,220,220,0.2)',
                    borderColor: 'rgba(220,220,220,1)',
                    pointBackgroundColor: 'rgba(220,220,220,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    data: []
                }
            ]
        };

        $interval(function () {
            getLiveChartData();
        }, 100);

        function getLiveChartData () {
            var sym = -1;

            angular.forEach($scope.tickdata.datasets, function (dataset) {

                sym = Math.random()<0.5 ? -1 : 1;
                if (dataset.data.length == 0) {
                    dataset.data.push(3000);
                }
                else if (dataset.data.length  < $scope.tickdata.labels.length) {
                    dataset.data.push(dataset.data[dataset.data.length-1] + sym * Randoms.scalingFactor());
                } else {
                    dataset.data.splice(0, 1);
                    dataset.data.push(dataset.data[dataset.data.length-1] + sym * Randoms.scalingFactor());
                }
            })
        }

    }];
});