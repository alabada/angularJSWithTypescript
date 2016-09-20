'use strict';

define([
  // "../directive/tabs/qsTabs"
  ], function () {

    return ["$scope","$window", function ($scope,$window) {
      $scope.tabs = [
        { title:'标签aaa', content:'标签aaa内容' },
        { title:'标签bbb', content:'标签bbb内容', disabled: true }
      ];
      $scope.title="";

    }];
});