/**
 * Created by zhida.wen on 2016/6/1.
 */
/**
 * Created by zhida.wen on 2016/6/1.
 */
'use strict';

define(["js/directive/chart/qsChart"], function () {

    return ["$scope", function ($scope) {

        $scope.data = {
            labels: ['吃饭', '喝水', '睡觉', '设计', '写代码', '骑车', '跑步'],
            datasets: [
                {
                    label: '数据集1',
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
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        /*
        基本配置：
            1、配置点的半径。
         */
        $scope.options =  {
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

    }];
});