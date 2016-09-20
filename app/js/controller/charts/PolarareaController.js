/**
 * Created by zhida.wen on 2016/6/1.
 */

'use strict';

define(["js/directive/chart/qsChart",
    "js/service/RandomService"], function () {

    return ["$scope", "Randoms", function ($scope, Randoms) {

        $scope.data = {
            datasets: [{
                label: "数据集1",
                data: [
                    300,
                    250,
                    50
                ],
                backgroundColor: [
                    "#F7464A",
                    "#46BFBD",
                    "#FDB45C"
                ]
            }],
            labels: [
                "红色",
                "绿色",
                "黄色"
            ]
        };

        $scope.options =  {
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            },

            legendCallback: function(chart) {
                var text = [];
                for (var i = 0; i < chart.data.datasets.length; i++) {
                    var dataset = chart.data.datasets[i];
                    text.push('<ul class="qs-chart-legend">');
                    for (var j = 0; j < dataset.data.length; j++) {
                        text.push('<li><span style="background-color:' + dataset.backgroundColor[j] + '"></span>');
                        text.push(chart.data.labels[j]);
                        text.push('</li>');
                    }
                    text.push('</ul>');
                }

                return text.join("");
            }
        };

        $scope.randomizeData = function() {
            $.each($scope.data.datasets, function(i, piece) {
                $.each(piece.data, function(j, value) {
                    $scope.data.datasets[i].data[j] = Randoms.scalingFactor();
                    $scope.data.datasets[i].backgroundColor[j] = Randoms.randomColor();
                });
            });
        };

        $scope.addData = function() {
            if ($scope.data.datasets.length > 0) {
                $scope.data.labels.push('数据集' + ($scope.data.labels.length + 1));

                $.each($scope.data.datasets, function(i, dataset) {
                    dataset.backgroundColor.push(Randoms.randomColor());
                    dataset.data.push(Randoms.scalingFactor());
                });
            }
        };

        $scope.removeData = function () {
            $scope.data.labels.pop(); // remove the label first

            $.each($scope.data.datasets, function(i, dataset) {
                dataset.backgroundColor.pop();
                dataset.data.pop();
            });
        };

    }];
});