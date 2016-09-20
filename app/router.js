/**
 * Created by Jonathan on 2016/7/7.
 */

define(["angular","angularAMD" ,"router/routerFBI" , "router/routerBootstrap",
            "router/routerCustom", "router/routerThird", "router/routerChart","router/routerUpload", "router/routerExample", "router/routerQsTable"],
    function(angular, angularAMD, routersFbiProvider ,routerBootstrapProvider, routerCustomProvider, routerThirdProvider,
             routerChartProvider, routerUploadProvider ,routerExampleProvider) {
        var registerRoutes = function($stateProvider, $urlRouterProvider, routerQsTableProvider) {

            //routerProvider.setCollectionUrl('data/routeCollection.json');
            $urlRouterProvider.otherwise("/dashboard/home");
            //Fbi路由
            routersFbiProvider;
            //Bootstrap组件路由
            routerBootstrapProvider;
            //自定义组件路由
            routerCustomProvider;
            //第三方组件路由
            routerThirdProvider;
            //报表路由
            routerChartProvider;
            //文件上传路由
            routerUploadProvider;
            //组件示例路由
            routerExampleProvider;
            // 改装table路由
            routerQsTableProvider;
            //主页路由
            $stateProvider.state('dashboard',angularAMD.route({
                    abstract: true,
                    url:'/dashboard',
                    templateUrl:"views/"+theme+"/bootstrap/dashboard/main.html",
                    controllerUrl: "js/controller/MainController.js",
                })).state('dashboard.home',angularAMD.route({
                    url:"/home",
                    controllerUrl: "js/controller/HomeController.js",
                    templateUrl:"views/"+theme+"/home/home.html",
                    resolve: {
                        $title: function() { return "仪表盘"; }
                    }
                })).state('login',angularAMD.route({
                    url:"/pages",
                    controllerUrl:"js/controller/LoginController.js",
                    templateUrl:"views/"+theme+"/login/login.html",
                    resolve: {
                        $title: function() { return "登录"; }
                    }
                }));
        };
        return registerRoutes;
});