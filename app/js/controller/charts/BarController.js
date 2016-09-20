'use strict';

define(["js/directive/chart/qsChart"], function () {

    return ["$scope", function ($scope) {

        $scope.data = {
            labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
            datasets: [
                {
                    label: '数据集1',
                    backgroundColor: 'rgba(220,220,220,0.5)',
                    borderColor: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: '数据集2',
                    backgroundColor: 'rgba(151,187,205,0.5)',
                    borderColor: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        /*
        基本配置：
            1、对矩形框可配置边界宽度、边界颜色、是否忽略边界(可选top、bottom、left、right)
            2、配置是否显示样例图标
            3、配置进度条宽度占用比例{barPercentage:在两个bar之间留出空隙；categoryPercentage:在bar组的两侧留出空隙}
         */
        $scope.options =  {

            elements: {
                rectangle: {
                    borderWidth: 2,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },

            legend: {
                display: false
            },

            scales: {
                xAxes: [{
                    barPercentage: 0.95,
                    categoryPercentage: 0.9
                }]
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