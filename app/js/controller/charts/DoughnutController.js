
'use strict';

define(["js/directive/chart/qsChart"], function () {

    return ["$scope", function ($scope) {

        $scope.data = {
            datasets: [{
                label: "数据集1",
                data: [
                    300,
                    50,
                    100,
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

    }];
});