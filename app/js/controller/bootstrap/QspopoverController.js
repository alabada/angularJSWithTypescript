/*
 **createdBy wenhui.gao 2016/7/24
 */
define([

], function() {
    return ['$scope', "$sce", function($scope, $sce) {
        $scope.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'myPopoverTemplate.html',
            title: 'Title'
        };

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

        $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
        //end controller
    }]
})