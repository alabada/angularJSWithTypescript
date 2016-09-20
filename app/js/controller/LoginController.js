'use strict';

define(["js/directive/formlayout/qsFormlayout", "js/directive/alert/SweetAlert", "js/service/UserRepository"], function () {

    return ["$scope", "$http", "$location", "SweetAlert", "UserRepository", function ($scope, $http, $location, SweetAlert, UserRepository) {
        $scope.url = './config/login.json';
        //自定义的验证
        $scope.customizer = {
            testnumber: function () {
                return $scope.vali.entity.testcustomizer > $scope.vali.entity.testnumber;
            }
        }
        //submit
        $scope.formCtr = {
            submit: function () {
                var user = UserRepository.getString({name: $scope.vali.entity.name}).then(function (data) {
                    $scope.user = data[0];
                    console.log($scope.user);
                    if ($scope.user != undefined) {
                        if ($scope.user.name == $scope.vali.entity.name && $scope.vali.entity.password == $scope.user.password)
                            $location.path('/dashboard/home');
                        else
                            SweetAlert.swal('用户名或者密码错误！');
                    } else {
                        SweetAlert.swal('此用户不存在！');
                    }
                });


            }
        }


    }];
});