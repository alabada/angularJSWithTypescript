/**
 * Created by Jonathan on 2016/7/7.
 */
define(["angularAMD","config"], function(angularAMD, app) {
    app.provider('routersCustom', function ($stateProvider) {
        this.$get = function () {
            var service = {
                setRouter: function () {
                    $stateProvider.state('dashboard.grid',angularAMD.route({
                        url:"/grid",
                        controllerUrl:"js/controller/GridController.js",
                        templateUrl:"views/"+theme+"/grid/gridDemo.html",
                        css:"css/grid/scrollable-table.css"
                    })).state('dashboard.gridModify',angularAMD.route({
                        url:"/gridModify/{id}",
                        controllerUrl:"js/controller/GridModifyController.js",
                        templateUrl:"views/"+theme+"/grid/gridModify.html"
                    })).state('dashboard.gridView',angularAMD.route({
                        url:"/gridView/{id}",
                        controllerUrl:"js/controller/GridViewController.js",
                        templateUrl:"views/"+theme+"/grid/gridView.html"
                    })).state('dashboard.gridAdd',angularAMD.route({
                        url:"/gridAdd",
                        controllerUrl:"js/controller/GridAddController.js",
                        templateUrl:"views/"+theme+"/grid/gridAdd.html"
                    }))
                    //多级下拉
                    .state('dashboard.linkage',angularAMD.route({
                        url:"/linkage",
                        controllerUrl:"js/controller/LinkageController.js",
                        templateUrl:"views/"+theme+"/linkage/linkage.html"
                    }))
                    // 图片查看
                    .state('dashboard.imgView',angularAMD.route({
                        url:"/imgView",
                        controllerUrl:"js/controller/ImgViewController.js",
                        templateUrl:"views/"+theme+"/imgView/imgView.html"
                    }))
                }
            }
            return service;
        }

    }) .run(function (routersCustom) {
        routersCustom.setRouter();
    });
});