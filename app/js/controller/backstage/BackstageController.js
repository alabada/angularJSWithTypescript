/**
 * Created by zhida.wen on 2016/6/12.
 */
define(["js/directive/panel/qsPanel",
    "js/directive/pagination/qsPagination",
    "js/directive/chart/qsChart"], function () {


    return ["$scope", function ($scope) {

        // bar
        $scope.barData = {
            labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            datasets: [
                {
                    label: '营业额',
                    backgroundColor: 'rgba(254,108,109,0.5)',
                    borderColor: 'rgba(220,220,220,1)',
                    data: [65432, 59878, 80098, 81346, 56865, 55835, 40785, 56325, 23145, 46890, 34651, 98907]
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
                    barPercentage: 1,
                    categoryPercentage: 1
                }]
            },
            legendCallback: function(chart) {
                var text = [];
                text.push('<ul class="qs-chart-legend">');

                text.push('<li>全年总营业额<br>&yen;702,514');
                text.push('</li>');

                text.push('<li>月均营业额<br>&yen;62,783');
                text.push('</li>');

                text.push('<li>销售占比<br>5%<i style="color:red" class="fa fa-caret-up"></i>');
                text.push('</li>');

                text.push('<li>销售增长率<br>8%<i style="color:red" class="fa fa-caret-down"></i>');
                text.push('</li>');

                text.push('</ul>');

                return text.join("");
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


        //快捷方式
        $scope.Shortcuts =[
            {
                ico:"plus-circle",
                text:"订制订单"
            },
            {
                ico:"plus-circle",
                text:"数据导入"
            },
            {
                ico:"plus-circle",
                text:"量体数据"
            },
            {
                ico:"plus-circle",
                text:"商品分类"
            }
        ]
        //工作提醒
        $scope.wordReminds = [
            {
                title:"库存提醒",
                numb:"10",
                desc:"订单过多，目前有10个库存告急"
            },{
                title:"未批订单",
                numb:"23",
                desc:"亲，目前订单仍有23单需要审批哦"
            },{
                title:"今日营业额",
                numb:"\u00A51,350",
                desc:"厦门各分店及移动端今日销量为\u00A51350，昨天的销量为￥1120"
            },{
                title:"转化率",
                numb:"12%",
                desc:"营业额相比昨日，转化率提高了3%"
            }
        ]
        //活动提醒
        $scope.activities =[
            {
                name:"系统通知",
                detail:"通知本系统将于近期更新到1.8.1版本，该版本将新增会员信息查询功能。",
                organizer:"系统管理员",
                publishTime:"5/20/2016",
            },{
                name:"店铺通知",
                detail:"通知厦门湖里分店商品JKHD045405缺货，请及时补充货源。",
                organizer:"厦门湖里分店店长",
                publishTime:"5/20/2016",
            }
        ]
        //最新订单
        $scope.lastOrder = [
            {
                msg:"经典黑条纹舒适透气春季男士西服经典黑条纹舒适透气春季男士西服经典黑条纹舒适透气春季男士西服",
                time:"11:30 AM",
                address:"厦门瑞景分店"
            },{
                msg:"经典黑条纹舒适透气春季男士西服",
                time:"11:30 AM",
                address:"厦门瑞景分店"
            },{
                msg:"经典黑条纹舒适透气春季男士西服",
                time:"11:30 AM",
                address:"厦门瑞景分店"
            },{
                msg:"经典黑条纹舒适透气春季男士西服",
                time:"11:30 AM",
                address:"厦门瑞景分店"
            },{
                msg:"经典黑条纹舒适透气春季男士西服",
                time:"11:30 AM",
                address:"厦门瑞景分店"
            },{
                msg:"经典黑条纹舒适透气春季男士西服",
                time:"11:30 AM",
                address:"厦门瑞景分店"
            },
        ]

    }];

});