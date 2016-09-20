define([], function () {

    return ["$scope", "$location", "$http", "GridData", "SweetAlert", "GridJsonRepository", function ($scope, $location, $http, GridData, SweetAlert, GridJsonRepository) {
        $scope.curItem = null;

        $scope.addNewItem = function () {
            if ($scope.curItem == null) {
                SweetAlert.swal('请输入各字段');
                return;
            }
            GridJsonRepository.create($scope.curItem).then(function () {
                SweetAlert.swal('添加数据成功');
            });
        }

        $scope.returnList = function () {
            $location.path('dashboard/grid');
        }
    }];
});