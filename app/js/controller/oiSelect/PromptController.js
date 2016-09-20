/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () {
  return ['$scope',"ShopObj",function ($scope,ShopObj) {
    $scope.shopObj = ShopObj.get();

    $scope.shopObj.$promise.then(function(data) {
        $scope.bundle = data[5];
    });
  //end controller
  }]
})