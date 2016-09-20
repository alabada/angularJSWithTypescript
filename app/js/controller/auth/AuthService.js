/**
 * Created by luozhanghua on 2016/6/29.
 */
/**
 * Created by luozhanghua on 2016/6/14.
 */
'use strict';
define(["app"], function (app) {
    app.factory('AuthenticationService', function () {
        var auth = {
            isLogged: false
        }
        return auth;
    }).factory('UserService', function($http) {
        return {
            logIn: function(UserCode, Password) {
                return $http.get( 'http://127.0.0.1:8081/qishon-iss-web/rest/users/token');
            },
            logOut: function() {

            }
        }
    });
})