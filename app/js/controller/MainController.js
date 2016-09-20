'use strict';
define([
    "js/module/header/header",
    "js/module/header/header-notification/header-notification",
    "js/module/sidebar/sidebar",
    "js/module/sidebar/sidebar-search/sidebar-search",
    "js/service/menuService",
    // "js/directive/tabs/qsTabs", // 
    // "js/directive/tabs/qsTab" //未找到
], function () {

    return ["$scope", "$http", "$location","Menu", "$state","$rootScope", function ($scope, $http, $location, Menu, $state,$rootScope) {
        


        $scope.qs_data = Menu.query();
        $scope.tabs = [{label: "仪表盘", href: "dashboard.home"}];
        $scope.tabTitle = "仪表盘";//初始化 $scope.tabTitle
        $scope.tabs = [];//初始化 $scope.tabs
        var str = "";
        var tree;
        $scope.str = str;
        $scope.qs_tree = tree = {};
        $scope.qs_tree_handler = function (branch) {
            if ($scope.tabs.length == 0) {
                $scope.tabs.push({label: "仪表盘", href: "dashboard.home"});
                $state.go($scope.tabs[0].href);
            }
            str = "";//再次初始化为空值
            if ($scope.tabs != []) {
                for (var i = 0; i < $scope.tabs.length; i++) {
                    if (str.indexOf($scope.tabs[i].href) < 0) {
                        str += $scope.tabs[i].href + ",";
                    }
                }
            }
            if (str.indexOf(branch.href) < 0) {//如果str里未找到链接则添加数组
                $scope.tabs.push({label: branch.label + "", href: branch.href});
            }
            if (branch.href != "") {
                $scope.tabTitle = branch.label;
            }
        };
       //切换tab
       $scope.qs_on = function (tabTitle) {
           $scope.tabTitle = tabTitle;
       }
       //关闭tab
       $scope.qs_off = function (num) {
           if ($scope.tabs.length > 1 && $scope.tabs[num].href != "dashboard.home") {
               $scope.tabs = del(num + 1, $scope.tabs);
           }
           $scope.tabTitle = "仪表盘";
           $state.go('dashboard.home');
           str = "";
           tree.select_first_branch();
       }
       //按坐标删除元素
       function del(index, dataArray) {
           var len = dataArray.length;
           for (var i = 0; i < len; i = i + 1) {
               if (i == (index - 1)) {
                   for (var j = i + 1; j < len; j = j + 1) {
                       //当前索引值后的数据都向前移
                       dataArray[j - 1] = dataArray[j];
                   }
       
                   //移完之后,自身长度减1
                   dataArray.length--;
               }
           }
           return dataArray;
       }


        //dashboard.backstage 首页 样式 切换 
        if($state.is("dashboard.backstage")){
            $scope.isIndex = true
        }
        $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams, options){ 
            // event.preventDefault(); 
            // transitionTo() promise will be rejected with 
            // a 'transition prevented' error
            // console.log(arguments);
            if(toState.name  === "dashboard.backstage" ){
                $scope.isIndex = true
            }else{
                $scope.isIndex = false
            }
        })

        //标签页跳转
        $scope.tabGo=function(url){
            $state.go(url);
        }
        //end controller
    }];
});