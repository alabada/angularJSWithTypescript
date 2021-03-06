/*
 **createdBy wenhui.gao 2016/7/19
 */
define([

],function () {
  return ['$scope','$q',"$timeout","ShopArr",function ($scope,$q,$timeout,ShopArr) {
    $scope.shopArr = ShopArr.query();

    $scope.shopArrFn = function(query, querySelectAs) {
        return findOptions(query);
    };

    function findOptions(query) {
        var deferred = $q.defer();

        $timeout(function() {
            $scope.shopArr.$promise
                .then(function(data) {
                    if (query) {
                        deferred.resolve(data)
                    } else {
                        deferred.resolve([])
                    }
                });
        }, 500);

        return deferred.promise;
    }

    $scope.bundle = {
        "id": 9,
        "name": "jeans",
        "category": "clothes"
    };
  //end controller
  }]
})