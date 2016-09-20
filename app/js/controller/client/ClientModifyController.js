/**
 * Created by jiande.gao on 2016/6/15.
 */
define([], function () {

    return ["$scope", "$location", "$stateParams", "clientRepository", "SweetAlert", function ($scope, $location, $stateParams, clientRepository, SweetAlert) {

        // 加载数据并刷新视图
        $scope.fresh = function () {
            clientRepository.get($stateParams.id).then(function (data) {
                $scope.curItem = data;
            });
        };
        $scope.fresh();

        $scope.save = function () {
            $scope.curItem.put().then(function () {
                SweetAlert.swal('保存成功');
            });
        }

        $scope.returnList = function () {
            $location.path('dashboard/client/client-list');
        }

    }];
});