/**
 * ceateBy wenhui.gao 2016/05/06
 */

'use strict';

define([
], function() {
  return ["$scope", function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };

    $scope.checkResults = [];

    $scope.$watchCollection('checkModel', function() {
      $scope.checkResults = [];
      angular.forEach($scope.checkModel, function(value, key) {
        if (value) {
          $scope.checkResults.push(key);
        }
      });
    });
    //end ctrller
  }]
});