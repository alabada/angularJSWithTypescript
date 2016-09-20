/**
 * Author: zhiheng.li
 * CreateTime: 2016/6/2
 * Description:
 */
'use strict';
define(["js/directive/formlayout/qsFormlayout","js/directive/alert/SweetAlert","js/service/UserRepository"], function () {

    return ["$scope","$stateParams","$location","UserRepository","SweetAlert", function ($scope, $stateParams, $location, UserRepository,SweetAlert) {
        $scope.url = 'config/user/add.json';
        $scope.urlDetail='config/user/detail.json'
        $scope.detail = 0;
        $scope.fresh = function () {
            UserRepository.get($stateParams.id).then(function (data) {
                console.log(data);
                $scope.vali.layoutData = data;
            });
        };
        $scope.fresh();
        $scope.formCtr={
            submit :function () {
                console.log($scope.vali.layoutData);
                $scope.vali.layoutData.put().then(function () {
                    SweetAlert.swal('保存成功');
                    $location.path('dashboard/user/user-list');
                });
            }
        }
       
    }];
});