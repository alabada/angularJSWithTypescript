define([], function () {

    return ["$scope", "$location", "$stateParams", "GridJsonRepository", "SweetAlert", function ($scope, $location, $stateParams, GridJsonRepository, SweetAlert) {

        // 加载数据并刷新视图
        $scope.fresh = function () {
            GridJsonRepository.get($stateParams.id).then(function (data) {
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
            $location.path('dashboard/grid');
        }

    }];
});