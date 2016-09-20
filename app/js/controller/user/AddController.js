/**
 * Author: zhiheng.li
 * CreateTime: 2016/6/2
 * Description:
 */
'use strict';
define(["js/directive/formlayout/qsFormlayout","js/directive/alert/SweetAlert","js/service/UserRepository"], function () {

    return ["$scope","$http","$location","SweetAlert","UserRepository", function ($scope,$http,$location,SweetAlert,UserRepository) {

        $scope.url = 'config/user/add.json';
        //submit
        $scope.formCtr={
            submit :function () {
                console.log($scope.vali);
                UserRepository.create($scope.vali.layoutData).then(function () {
                    $location.path('/dashboard/user/user-list');
                });
            }
        }
    }];
});