/*
    createBy wenhui.gao 2016/7/25
 */
'use strict';
define([
  ], function () {
  return ["$scope","$sce", function ($scope,$sce) {
    $scope.dynamicTooltip = 'Hello, World!';
      $scope.dynamicTooltipText = 'dynamic';
      $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
      $scope.placement = {
        options: [
          'top',
          'top-left',
          'top-right',
          'bottom',
          'bottom-left',
          'bottom-right',
          'left',
          'left-top',
          'left-bottom',
          'right',
          'right-top',
          'right-bottom'
        ],
        selected: 'top'
      };
  }];
});