/**
* createdBy wenhui.gao 2016/4/28
*/
'use strict';
define([
  "app"
],function (app) {
  app.directive('qsThumbnail', [function () {
    return {
      templateUrl: 'js/directive/thumbnail/qs-thumbnail.html',
      replace: true,
      transclude: true,
      restrict: 'EA',
      scope: {
        imgsrc : "@",
        imgalt:"@"
      },
      controller: function($scope) {
        $scope.captionShow = true
      },
      link: function postLink(scope, iElement, iAttrs) {
        var captiontext = iElement.text().replace(/(^\s*)|(\s*$)/, "");
        if( captiontext === "" ){
          scope.captionShow = false
        }
      }
    };
  }])
})