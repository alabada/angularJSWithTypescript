/**
 * Created by zhida.wen on 2016/6/12.
 */
define(["js/directive/panel/qsPanel",
    "js/directive/pagination/qsPagination",
    "js/directive/chart/qsChart"], function () {


    return ["$scope", function ($scope) {

        // bar
        $scope.barData = {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
            datasets: [
                {
                    label: '营业额',
                    backgroundColor: 'rgba(83,178,234,0.5)',
                    borderColor: 'rgba(220,220,220,1)',
                    data: [600, 350, 988, 1222, 1600, 1543, 1234, 1000]
                }
            ]
        };

        $scope.barOptions = {
            elements: {
                rectangle: {
                    borderWidth: 0,
                    borderColor: 'rgb(0, 255, 0)',
                    borderSkipped: 'bottom'
                }
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 0.9
                }]
            },
            // 重写自定义弹出提示框里的文本
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var result = [];
                        result.push('\u00A5' + data.datasets[0].data[tooltipItem.index]);
                        return result;
                    }
                }
            }
        };

        // doughnut1
        $scope.doughnut1Data = {
            datasets: [{
                label: "京东店铺",
                data: [
                    0.28,
                    0.72
                ],
                backgroundColor: [
                    "#FE6C6D",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "京东店铺",
                "其他"
            ]
        };

        $scope.doughnut1Options =  {
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        };

        // doughnut2
        $scope.doughnut2Data = {
            datasets: [{
                label: "淘宝店铺",
                data: [
                    0.54,
                    0.46
                ],
                backgroundColor: [
                    "#CBD988",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "淘宝店铺",
                "其他"
            ]
        };

        $scope.doughnut2Options =  {
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        };

        // doughnut3
        $scope.doughnut3Data = {
            datasets: [{
                label: "导购屏",
                data: [
                    0.12,
                    0.88
                ],
                backgroundColor: [
                    "#B3DDF1",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "导购屏",
                "其他"
            ]
        };

        $scope.doughnut3Options =  {
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        };

        // doughnut4
        $scope.doughnut4Data = {
            datasets: [{
                label: "网上商城",
                data: [
                    0.06,
                    0.94
                ],
                backgroundColor: [
                    "#645079",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "网上商城",
                "其他"
            ]
        };

        $scope.doughnut4Options =  {
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        };

        // pie
        $scope.pieData = {
            datasets: [{
                label: "订单占比",
                data: [
                    50,
                    100,
                    50
                ],
                backgroundColor: [
                    "#46BFBD",
                    "#F7464A",
                    "#FDB45C"
                ]
            }],
            labels: [
                "淘宝",
                "京东",
                "实体店"
            ]
        };

        $scope.pieOptions =  {
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

        // line
        $scope.lineData = {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            datasets: [
                {
                    label: '数据集1',
                    backgroundColor: 'rgba(255,119,119,0.8)',
                    borderColor: 'rgba(255,119,119,0.8)',
                    pointBackgroundColor: 'rgba(220,220,220,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    data: [0, 5.5, 0.5, 0, 0, 0, 0]
                },
                {
                    label: '数据集2',
                    backgroundColor: 'rgba(254,194,113,0.8)',
                    borderColor: 'rgba(254,194,113,0.8)',
                    pointBackgroundColor: 'rgba(151,187,205,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(151,187,205,1)',
                    data: [0, 2, 3.8, 0.5, 1, 10, 0]
                },
                {
                    label: '数据集3',
                    backgroundColor: 'rgba(76,207,197,0.8)',
                    borderColor: 'rgba(76,207,197,0.8)',
                    pointBackgroundColor: 'rgba(151,187,205,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(151,187,205,1)',
                    data: [0, 0, 1.8, 2.3, 9, 5, 0]
                }
            ]
        };

        $scope.lineOptions =  {

            responsive: true,
            elements: {
                point: {
                    radius: 0
                }
            },

            legend: {
                display: false
            },

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