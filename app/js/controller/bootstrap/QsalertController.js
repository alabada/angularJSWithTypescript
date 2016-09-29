/**
 * ceated by wenhui.gao 2016/4/26
 */

'use strict';
/*
 createBy wenhui.gao
 */
define([], function () {
    return ["$scope", function ($scope) {
        $scope.alerts = [
            {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
            {type: 'success', msg: 'Well done! You successfully read this important alert message.'}
        ];

        $scope.addAlert = function () {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        //end controller
    }];
});