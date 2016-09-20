/*
 **createdBy wenhui.gao 2016/7/26
 */
define([

], function() {
    return ['$scope', function($scope) {
        $scope.oneAtATime = true;

        $scope.groups = [{
            title: '动态头部-1',
            content: '动态内容 - 1'
        }, {
            title: '动态头部 - 2',
            content: '动态内容 - 2'
        }];

        $scope.items = ['元素 1', '元素 2', '元素 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('元素 ' + newItemNo);
        };

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
        //end controller
    }]
})