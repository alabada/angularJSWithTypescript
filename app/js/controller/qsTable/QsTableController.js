define([], function () {
    return ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

        //菜单
        var menu = [
            {urlName: 'basic', name: 'Basic'},
            {urlName: 'sorting', name: 'Sorting'},
            {urlName: 'pagination', name: 'Pagination'},
            {urlName: 'search', name: 'Search'},
            {urlName: 'externalResource', name: 'externalResource'},
            {urlName: 'customHeader', name: 'CustomHeader'},
            {urlName: 'customRows', name: 'CustomRows'},
            {urlName: 'customRowsHeaders', name: 'CustomRowsHeaders'},
            {urlName: 'externalFilters', name: 'externalFilters'},
            {urlName: 'editableCells', name: 'editableCells'},
            {urlName: 'multiplySelection', name: 'multiplySelection'},
            {urlName: 'columnHighlighting', name: 'columnHighlighting'},
            {urlName: 'resizableColumns', name: 'resizableColumns'},
            {urlName: 'draggableColumns', name: 'draggableColumns'},
            {urlName: 'aggregateFunction', name: 'aggregateFunction'},
            {urlName: 'extend', name: 'extend'},
            {urlName: 'other', name: 'other'},
            {urlName: 'themes', name: 'themes'}
        ];

        $scope.demo = {};
        $scope.demo.menu = menu;

        //初始化状态
        $state.go('dashboard.qsTable.customHeader');
        $scope.demo.name = "customHeader";

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                // event.preventDefault();
                var domeName = toState.name
                $scope.demo.name = domeName.slice(domeName.lastIndexOf('.') + 1)
            })


        //end Controller
    }]
})