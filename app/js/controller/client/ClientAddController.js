/**
 * Created by jiande.gao on 2016/6/15.
 */
define([], function () {

    return ["$scope", "$location", "$http", "GridData", "SweetAlert", "clientRepository", function ($scope, $location, $http, GridData, SweetAlert, clientRepository) {
        $scope.curItem = null;

        $scope.addNewItem = function () {
            if ($scope.curItem == null) {
                SweetAlert.swal('请输入各字段');
                return;
            }
            clientRepository.create($scope.curItem).then(function () {
                SweetAlert.swal('添加数据成功');
            });
        }

        $scope.returnList = function () {
            $location.path('dashboard/client/client-list');
        }
    }];
});