/*
 **createdBy wenhui.gao 2016/7/19
 */
define([],function () {
  return ['$scope','ShopArr',function ($scope,ShopArr) {

    $scope.shopArr = ShopArr.query();
    $scope.bundle = null;

  //end controller
  }]
})