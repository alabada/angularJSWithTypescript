/**
 * Created by jiande.gao on 2016/6/15.
 */

'use strict';

define([], function () {

    return ["$scope", "$location", "$stateParams", "clientRepository", function ($scope, $location, $stateParams, clientRepository) {

        // 加载数据并刷新视图
        $scope.fresh = function () {
            clientRepository.get($stateParams.id).then(function (data) {
                $scope.curItem = data;
            });
        };
        $scope.fresh();

        $scope.returnList = function () {
            $location.path('dashboard/client/client-list');
        }
    }];
});