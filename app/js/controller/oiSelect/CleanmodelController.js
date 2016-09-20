/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () {
  return ['$scope',"ShopArr",function ($scope,ShopArr) {
    $scope.shopArr = ShopArr.query();

    $scope.bundle = {
        "id": 5,
        "name": "shirt",
        "category": "clothes"
    };
  //end controller
  }]
})