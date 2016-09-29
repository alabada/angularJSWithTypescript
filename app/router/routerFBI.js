/**
 * Created by Jonathan on 2016/7/7.
 */
define(["angularAMD","config"], function(angularAMD, config) {

    var app = config.app;

    app.provider('routersFbi', function ($stateProvider) {
        this.$get = function () {
            var service = {
                setRouter: function () {
                    $stateProvider
                        .state('dashboard.fbi',angularAMD.route({
                            url:"/fbi",
                            controllerUrl:"js/controller/fbi/MainController.js",
                            templateUrl:"views/"+theme+"/fbi/index.html",
                            resolve: {
                                $title: function() { return "面料系统DEMO"; }
                            }
                        })).state('dashboard.fbi.demo1',angularAMD.route({
                        url:"/fbi-demo1",
                        controllerUrl:"js/controller/fbi/Demo1Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo1.html",
                        resolve: {
                            $title: function() { return "面料系统DEMO1"; }
                        }
                    })).state('dashboard.fbi.demo2',angularAMD.route({
                        url:"/fbi-demo2",
                        controllerUrl:"js/controller/fbi/Demo2Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo2.html",
                        resolve: {
                            $title: function() { return "面料系统DEMO2"; }
                        }
                    })).state('dashboard.fbi.demo3',angularAMD.route({
                        url:"/fbi-demo3",
                        controllerUrl:"js/controller/fbi/Demo3Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo3.html",
                        css:["bower_components/ng-dialog/css/ngDialog.css","bower_components/ng-dialog/css/ngDialog-custom-width.css",
                            "bower_components/ng-dialog/css/ngDialog-theme-default.css","bower_components/ng-dialog/css/ngDialog-theme-plain.css"],
                        resolve: {
                            $title: function() { return "面料系统DEMO3"; }
                        }
                    })).state('dashboard.fbi.demo4',angularAMD.route({
                        url:"/fbi-demo4",
                        controllerUrl:"js/controller/fbi/Demo4Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo4.html",
                        css:["bower_components/ng-dialog/css/ngDialog.css","bower_components/ng-dialog/css/ngDialog-custom-width.css",
                            "bower_components/ng-dialog/css/ngDialog-theme-default.css","bower_components/ng-dialog/css/ngDialog-theme-plain.css",
                            "css/grid/scrollable-table.css"],
                        resolve: {
                            $title: function() { return "面料系统DEMO4"; }
                        }
                    })).state('dashboard.fbi.demo5',angularAMD.route({
                        url:"/fbi-demo5",
                        controllerUrl:"js/controller/fbi/Demo5Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo5.html",
                        css:["bower_components/ng-dialog/css/ngDialog.css","bower_components/ng-dialog/css/ngDialog-custom-width.css",
                            "bower_components/ng-dialog/css/ngDialog-theme-default.css","bower_components/ng-dialog/css/ngDialog-theme-plain.css"],
                        resolve: {
                            $title: function() { return "面料系统DEMO5"; }
                        }
                    })).state('dashboard.fbi.demo6',angularAMD.route({
                        url:"/fbi-demo6",
                        controllerUrl:"js/controller/fbi/Demo6Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo6.html",
                        resolve: {
                            $title: function() { return "面料系统DEMO6"; }
                        }
                    })).state('dashboard.fbi.demo7',angularAMD.route({
                        url:"/fbi-demo7",
                        controllerUrl:"js/controller/fbi/Demo7Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo7.html",
                        resolve: {
                            $title: function() { return "面料系统DEMO7"; }
                        }
                    })).state('dashboard.fbi.demo8',angularAMD.route({
                        url:"/fbi-demo8",
                        controllerUrl:"js/controller/fbi/Demo8Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo8.html",
                        resolve: {
                            $title: function() { return "面料系统DEMO8"; }
                        }
                    })).state('dashboard.fbi.demo9',angularAMD.route({
                        url:"/fbi-demo9",
                        controllerUrl:"js/controller/fbi/Demo9Controller.js",
                        templateUrl:"views/"+theme+"/fbi/demo9.html",
                        css:["bower_components/ng-dialog/css/ngDialog.css","bower_components/ng-dialog/css/ngDialog-custom-width.css"
                            ,"bower_components/ng-dialog/css/ngDialog-theme-default.css","bower_components/ng-dialog/css/ngDialog-theme-plain.css"],
                        resolve: {
                            $title: function() { return "面料系统DEMO9"; }
                        }
                    }));
                }
            }
            return service;
        }

    }) .run(function (routersFbi) {
        routersFbi.setRouter();
    });;

//       var registerRoutersFBI = function($stateProvider,$urlRouterProvider){
//
//
//        }
});