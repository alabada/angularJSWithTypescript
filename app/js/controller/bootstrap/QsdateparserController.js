/*
 **createdBy wenhui.gao 2016/7/24
 */
define([

],function () {
  return ['$scope',"uibDateParser",function ($scope, uibDateParser) {
    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
  //end controller
  }]
})