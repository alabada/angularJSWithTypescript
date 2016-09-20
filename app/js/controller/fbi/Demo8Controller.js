/*
 **createdBy wenhui.gao 2016/7/22
 */
define([

],function () {
  return ['$scope',function ($scope) {
  //初始单选状态
  $scope.goodInfo ={
    negote_price : false
  }

  //货币选择
  
  $scope.unitData={
    currencies:[
      {"id":1, "text":"人民币", "val":"RMB"},
      {"id":2, "text":"欧元", "val":"euro"},
      {"id":3, "text":"美元", "val":"dollar"}
    ],
    lengths:[
      {"id":1, "text":"米", "val":"m"},
      {"id":2, "text":"厘米", "val":"cm"},
      {"id":3, "text":"公分", "val":"dm"}
    ]
  }
  //单位 初始化
  $scope.unit = {
    currency : $scope.unitData.currencies[0],
    length:$scope.unitData.lengths[0]
  }
  //end controller
  }]
})