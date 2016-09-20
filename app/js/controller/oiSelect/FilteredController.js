/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () {
  return ['$scope',"ShopArr","ShopArrShort",function ($scope,ShopArr,ShopArrShort) {
    $scope.shopArr = ShopArr.query();
    $scope.shopArrShort = ShopArrShort.query();

    $scope.bundle1 = ["slippers", "pants"];

    $scope.bundle2 = [{
        "id": 5,
        "name": "shirt",
        "category": "clothes"
    }];

    $scope.bundle3 = [];
  //end controller
  }]
})