/*
 **createdBy wenhui.gao 2016/7/20
 */
define([

],function () {
  return ['$scope',"$q","$timeout","ShopArr",function ($scope,$q,$timeout,ShopArr) {
    $scope.shopArr = ShopArr.query();

    $scope.shopArrFn = function(query, querySelectAs) {
        return findOptions(query);
    };

    function findOptions(query) {
        var deferred = $q.defer();

        $timeout(function() {
            $scope.shopArr.$promise
                .then(deferred.resolve);
        }, 1000);

        return deferred.promise;
    }

    $scope.bundle = undefined;
  //end controller
  }]
})