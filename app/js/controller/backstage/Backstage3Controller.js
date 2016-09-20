/**
 * Created by zhida.wen on 2016/6/12.
 */
define(["js/directive/panel/qsPanel",
    "js/directive/pagination/qsPagination",
    "js/directive/chart/qsChart"], function () {


    return ["$scope", function ($scope) {

        // line
        $scope.lineData = {
            labels: ["第一周", "第二周", "第三周", "第四周", "第五周", "第六周", "第七周"],
            datasets: [
                {
                    label: '数据集1',
                    lineTension: 0,
                    fill: false,
                    backgroundColor: 'rgba(26,187,251,0.8)',
                    borderColor: 'rgba(26,187,251,0.8)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgba(26,187,251,0.8)',
                    pointHoverBackgroundColor: 'rgba(26,187,251,0.8)',
                    pointHoverBorderColor: 'rgba(26,187,251,0.8)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        $scope.lineOptions =  {

            responsive: true,
            elements: {
                point: {
                    radius: 5
                }
            },

            legend: {
                display: false
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

        // doughnut1
        $scope.doughnut1Data = {
            datasets: [{
                label: "本月销售额",
                data: [
                    0.75,
                    0.25
                ],
                backgroundColor: [
                    "#FE6C6D",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "本月销售额",
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
                label: "本月订单数",
                data: [
                    0.29,
                    0.71
                ],
                backgroundColor: [
                    "#CBD988",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "本月订单数",
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
                label: "本月定制订单",
                data: [
                    0.64,
                    0.36
                ],
                backgroundColor: [
                    "#B3DDF1",
                    "#F0F4F7"
                ]
            }],
            labels: [
                "本月定制订单",
                "其他"
            ]
        };

        $scope.doughnut3Options =  {
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        };

        // bar1
        $scope.barData1 = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            datasets: [
                {
                    label: '营业额',
                    backgroundColor: 'rgba(249,129,103,1)',
                    borderColor: 'rgba(220,220,220,1)',
                    data: [45, 23, 67, 87, 55, 54, 87, 36, 75, 32, 57, 43, 77, 64, 32, 44, 54, 87, 36, 54, 32, 57, 45, 33, 67, 87, 54, 54, 87, 36]
                }
            ]
        };

        $scope.barOptions1 = {
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

        // bar2
        $scope.barData2 = {
            labels: ["", "2", "", "", "", "", "", "", "9", "", "", "", "", "", "", "", "17", "", "", "","", "", "", "", "25", "", "", "", "", ""],
            datasets: [
                {
                    label: '订单增长趋势',
                    backgroundColor: 'rgba(83,178,234,0.5)',
                    borderColor: 'rgba(220,220,220,1)',
                    data: [45, 23, 67, 87, 55, 54, 87, 36, 75, 32, 57, 43, 77, 64, 32, 44, 54, 87, 36, 54, 32, 57, 45, 33, 67, 87, 54, 54, 87, 36]
                }
            ]
        };

        $scope.barOptions2 = {
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

    }];

});