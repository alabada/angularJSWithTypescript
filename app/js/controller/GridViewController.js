
'use strict';

define([], function () {

    return ["$scope", "$location", "$stateParams", "GridJsonRepository", function ($scope, $location, $stateParams, GridJsonRepository) {

        // 加载数据并刷新视图
        $scope.fresh = function () {
            GridJsonRepository.get($stateParams.id).then(function (data) {
                $scope.curItem = data;
            });
        };
        $scope.fresh();

        $scope.returnList = function () {
            $location.path('dashboard/grid');
        }
    }];
});