/*
 * created by wenhui.gao 2016/05/06
 */
'use strict';

define(["app"], function(app) {

  app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function() {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });


  //返回控制器
  return ["$scope", "$uibModal", "$log", function($scope, $uibModal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function(size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    // end controller
  }];
});