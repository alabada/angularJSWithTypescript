define([
    "js/service/oiSelect/servers", //获取数据
  ],function () {
  return ['$scope','$state','$rootScope',function ($scope,$state,$rootScope) {

    //菜单
    var menu = [
        {urlName: 'autofocus',       name: 'Autofocus'},
        {urlName: 'multiple',        name: 'Multiple'},
        {urlName: 'single',          name: 'Single'},
        {urlName: 'grouping',        name: 'Grouping'},
        {urlName: 'filtered',        name: 'Filtered'},
        {urlName: 'lazyloading',     name: 'Lazy loading'},
        {urlName: 'disabled',        name: 'Disabled'},
        {urlName: 'disabledoptions', name: 'Disabled options'},
        {urlName: 'readonly',        name: 'Read only'},
        {urlName: 'cleanmodel',      name: 'Clean model'},
        {urlName: 'multiplelimit',   name: 'Multiple limit'},
        {urlName: 'createitems',     name: 'Create items'},
        {urlName: 'autocomplete',    name: 'Autocomplete'},
        {urlName: 'prompt',          name: 'Prompt'},
        {urlName: 'selectas',        name: 'Select as'},
        {urlName: 'editableoptions', name: 'Editable options'},
        {urlName: 'customization',   name: 'Customization'},
        {urlName: 'validation',      name: 'Validation'},
        {urlName: 'all',             name: 'All'}
    ];

    $scope.demo = {};
    $scope.demo.menu = menu;

    //初始化状态
    $state.go('dashboard.oiSelect.autofocus')
    $scope.demo.name = "autofocus"

    //路由切换
    if($state.is("dashboard.backstage")){
        $scope.isIndex = true
    }
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options){ 
        // event.preventDefault(); 
       var domeName = toState.name
       $scope.demo.name =domeName.slice( domeName.lastIndexOf('.') +1) 
    })


    //end Controller 
  }]
})