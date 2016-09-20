/**
 * Created by luozhanghua on 2016/6/27.
 * templateUrl:"views/"+theme+"/jwt/jwt.html"
 * describe：JWT安全认证控制器
 */

'use strict';

define([

], function () {
    return ["$scope","jwtHelper",'$location', '$window', '$http',
        function ($scope, jwtHelper, $location, $window,$http) {
            $scope.jsonData = '';
            //获取TOKEN
            $scope.login = function (UserCode, Password) {
                if (UserCode !== undefined && Password !== undefined) {
                    $http({
                        url:'http://127.0.0.1:8081/qishon-iss-web/rest/users/token',
                        method:"GET",
                        data: {
                            'UserCode': UserCode,'Password': Password
                        }
                    }).success(function(data) {
                        localStorage.setItem('id_token',data)
                        $scope.jsonData = localStorage.getItem('id_token');
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            };

            $scope.logout = function () {
                var token = localStorage.getItem('id_token');
                if (token != null) {
                    localStorage.removeItem("id_token");
                    $scope.jsonData = localStorage.getItem('id_token');
                } else {
                    //doSomething
                }
            };
            
            $scope.findUser = function () {
                $http({
                    url:'http://127.0.0.1:8081/qishon-iss-web/rest/users/token',
                    method:"GET",
                }).success(function(data) {
                    $scope.userData = data;
                }).error(function(status, data) {
                    $scope.userData = data;
                });
            };

            $scope.refresh = function (UserCode, Password) {

            };

            $scope.decode = function () {
                var token = localStorage.getItem('id_token');
                if (token != null) {
                    var tokenPayload = jwtHelper.decodeToken(token);
                    $scope.jsonData = tokenPayload;
                    var date = jwtHelper.getTokenExpirationDate(token);
                    var bool = jwtHelper.isTokenExpired(token);
                }
            };

            /*$scope.logout = function logout() {
                if (AuthenticationService.isLogged) {
                    AuthenticationService.isLogged = false;
                    delete $window.sessionStorage.token;
                    $location.path("/");
                }
            };*/

      /*  var expToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJRaXNob24iLCJpYXQiOjE0NjcxODQ0MzI3MjEsImV4cCI6MTQ2NzE4NDQ0MjcyMSwiVXNlckNvZGUiOiJhZG1pbiJ9.46evWC2yN_49Yq99Uf2Kbfo1CjMItVepPXnFDo_QvF0';
        var tokenPayload = jwtHelper.decodeToken(expToken);
        console.log("tokenPayload :"  + tokenPayload);
        var date = jwtHelper.getTokenExpirationDate(expToken);
        console.log("date :"  + date);
        var bool = jwtHelper.isTokenExpired(expToken);
        console.log("bool :"  + bool);*/
    }];
});