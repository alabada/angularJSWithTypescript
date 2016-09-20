/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () { 
  return ['$scope',"ShopArrShort",function ($scope,ShopArrShort) {
    $scope.shopArrShort = ShopArrShort.query();
    $scope.bundle = ['T-shirt'];
  //end controller
  }]
})