'use strict';

define(["app"], function (app) {
  var sidebarSearch = app.directive('sidebarSearch',function(){

    return {
      templateUrl:'js/module/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });
  // register
  app.service("sidebarSearch", [sidebarSearch]);
});