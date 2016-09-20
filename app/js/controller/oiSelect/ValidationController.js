/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () {
  return ['$scope',"ShopArr",function ($scope,ShopArr) {
    $scope.shopArr = ShopArr.query();

    $scope.shopArr.$promise.then(function(data) {
        $scope.bundle2 = [data[5]];
    });

    $scope.addItem = function(query) {
        if (/\D/.test(query)) {
            return;
        }

        return {name: query};
    };
  //end controller
  }]
})