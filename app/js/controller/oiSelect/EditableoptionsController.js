/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () {
  return ['$scope', '$q', '$timeout', 'ShopArrShort',function ($scope, $q, $timeout, ShopArrShort) {
    $scope.ShopArrShort = ShopArrShort.query();
    $scope.ShopArrShort1 = ShopArrShort.query();

    $scope.bundle = ["boots", "shoes"];
    $scope.bundle2 = "shoes";
  //end controller
  }]
})