/**
 * Created by Jonathan on 2016/7/7.
 */
define(["angularAMD","config"], function(angularAMD, config) {

    var app = config.app;

    app.provider('routersExample', function ($stateProvider) {
        this.$get = function () {
            var service = {
                setRouter: function () {
                    $stateProvider.state('dashboard.demo',angularAMD.route({
                        url:"/demo",
                        controllerUrl:"js/controller/demo/DemoController.js",
                        templateUrl:"views/"+theme+"/demo/index.html"
                    })).state('dashboard.backstage',angularAMD.route({
                        url:"/backstage",
                        controllerUrl:"js/controller/backstage/BackstageController.js",
                        templateUrl:"views/"+theme+"/backstage/backstage.html",
                        resolve: {
                            $title: function() { return "首页"; }
                        }
                    })).state('dashboard.backstage2',angularAMD.route({
                        url:"/backstage2",
                        controllerUrl:"js/controller/backstage/Backstage2Controller.js",
                        templateUrl:"views/"+theme+"/backstage/backstage2.html"
                    })).state('dashboard.backstage3',angularAMD.route({
                        url:"/backstage3",
                        controllerUrl:"js/controller/backstage/Backstage3Controller.js",
                        templateUrl:"views/"+theme+"/backstage/backstage3.html"
                    })).state('dashboard.user',angularAMD.route({
                        url:"/user",
                        templateUrl:"views/"+theme+"/demo/user/main.html",
                    })).state('dashboard.user.list',angularAMD.route({
                        url:"/user-list",
                        controllerUrl:"js/controller/user/UserController.js",
                        templateUrl:"views/"+theme+"/demo/user/users.html",
                        css:"css/grid/scrollable-table.css",
                        resolve: {
                            $title: function() { return "USERS"; }
                        }
                    })).state('dashboard.user.add',angularAMD.route({
                        url:"/user-add",
                        controllerUrl:"js/controller/user/AddController.js",
                        templateUrl:"views/"+theme+"/demo/user/edit.html",
                        css:[ "asset/libs/textAngular/textAngular.css",
                            "asset/libs/oi-select/select.css",
                            "css/qsFormLayout.css"],
                        resolve: {
                            $title: function() { return "添加"; }
                        }
                    })).state('dashboard.user.edit',angularAMD.route({
                        url:"/user-edit/{id}",
                        controllerUrl:"js/controller/user/EditController.js",
                        templateUrl:"views/"+theme+"/demo/user/edit.html",
                        css:[ "asset/libs/textAngular/textAngular.css",
                            "asset/libs/oi-select/select.css",
                            "css/qsFormLayout.css"]
                    })).state('dashboard.user.item',angularAMD.route({
                        url:"/user-item/{id}",
                        controllerUrl:"js/controller/user/ItemController.js",
                        templateUrl:"views/"+theme+"/demo/user/item.html",
                        css:[ "asset/libs/textAngular/textAngular.css",
                            "asset/libs/oi-select/select.css",
                            "css/qsFormLayout.css"]
                    })).state('dashboard.tree',angularAMD.route({
                        url:"/tree",
                        controllerUrl:"js/controller/demo/TreeController.js",
                        templateUrl:"views/"+theme+"/demo/treeDemo.html",
                        resolve: {
                            $title: function() { return "TREE"; }
                        },
                        css:"css/qstree.css"
                    })).state('dashboard.client',angularAMD.route({
                        abstract: true,
                        url:"/client",
                        templateUrl:"views/"+theme+"/demo/client/main.html"
                    })).state('dashboard.client.list',angularAMD.route({
                        url:"/client-list",
                        templateUrl:"views/"+theme+"/demo/client/client.html",
                        controllerUrl:"js/controller/client/ClientController.js"
                    })).state('dashboard.client.add',angularAMD.route({
                        url:"/client-add",
                        templateUrl:"views/"+theme+"/demo/client/clientAdd.html",
                        controllerUrl:"js/controller/client/ClientAddController.js"
                    })).state('dashboard.client.modify',angularAMD.route({
                        url:"/client-modify/{id}",
                        templateUrl:"views/"+theme+"/demo/client/clientModify.html",
                        controllerUrl:"js/controller/client/ClientModifyController.js"
                    })).state('dashboard.client.view',angularAMD.route({
                        url:"/client-view/{id}",
                        templateUrl:"views/"+theme+"/demo/client/clientView.html",
                        controllerUrl:"js/controller/client/ClientViewController.js"
                    }));
                }
            }
            return service;
        }

    }) .run(function (routersExample) {
        routersExample.setRouter();
    });
});