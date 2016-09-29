/**
 * Created by Jonathan on 2016/7/7.
 */
define(["angularAMD","config"], function(angularAMD, config) {

    var app = config.app;

    app.provider('routersUpload', function ($stateProvider) {
        this.$get = function () {
            var service = {
                setRouter: function () {
                    $stateProvider.state('dashboard.multipleUpload',angularAMD.route({
                        url:"/multipleUpload",
                        controllerUrl:"js/controller/ng-file-upload/MultipleUploadController.js",
                        templateUrl:"views/"+theme+"/ng-file-upload/multipleUpload.html",
                        css:"js/controller/ng-file-upload/common.css",
                        resolve: {
                            $title: function() { return "文件上传"; }
                        }
                    })).state('dashboard.dropUpload',angularAMD.route({
                        url:"/dropUpload",
                        controllerUrl:"js/controller/ng-file-upload/DropUploadController.js",
                        templateUrl:"views/"+theme+"/ng-file-upload/dropUpload.html",
                        css:"js/controller/ng-file-upload/common.css",
                        resolve: {
                            $title: function() { return "拖拽上传"; }
                        }
                    }));
                }
            }
            return service;
        }

    }) .run(function (routersUpload) {
        routersUpload.setRouter();
    });
});