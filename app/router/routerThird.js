/**
 * Created by luozhanghua on 2016/7/20 0020.
 */
define(["angularAMD","config",'router/routerOiSelect','router/routerObjectTable'], function(angularAMD, app) {
    app.provider('routersThird', function ($stateProvider) {
        this.$get = [ 'routersOiSelect', 'routersObjectTable', function (routersOiSelect, routersObjectTable) {
            var service = {
                setRouter: function () {
                    $stateProvider.state('dashboard.sweetalert',angularAMD.route({
                        url:"/sweetalert",
                        controllerUrl:"js/controller/SweetalertController.js",
                        templateUrl:"views/"+theme+"/sweetalert/sweetalert.html",
                        css:"asset/css/sweetalert.css"
                    })).state('dashboard.ngDragDrop2',angularAMD.route({
                        url:"/ngDragDrop2",
                        controllerUrl:"js/controller/NgDragAndDropController.js",
                        templateUrl:"views/"+theme+"/ngDragDrop/drag-and-drop.html",
                    })).state('dashboard.cache',angularAMD.route({
                        url:"/cache",
                        controllerUrl:"js/controller/cache/CacheController.js",
                        templateUrl:"views/"+theme+"/cache/cacheDemo.html"
                    })).state('dashboard.auth',angularAMD.route({
                        url:"/auth",
                        controllerUrl:"js/controller/auth/AuthController.js",
                        templateUrl:"views/"+theme+"/auth/auth.html"
                    })).state('dashboard.ueditor',angularAMD.route({
                        url:"/ueditor",
                        controllerUrl:"js/controller/demo/UeditorController.js",
                        templateUrl:"views/"+theme+"/demo/ueditorDemo.html"
                    })).state('dashboard.textAngular',angularAMD.route({
                        url:"/textAngular",
                        controllerUrl:"js/controller/demo/TextController.js",
                        templateUrl:"views/"+theme+"/demo/textAngular.html",
                        css:["/bower_components/textAngular/dist/textAngular.css"] /*textangular样式*/
                    })).state('dashboard.notes',angularAMD.route({
                        url:"/notes",
                        controllerUrl:"js/controller/notes/MainController.js",
                        templateUrl:"views/"+theme+"/demo/main.html"
                    })).state('dashboard.notes.list',angularAMD.route({
                        url:"/list",
                        controllerUrl:"js/controller/notes/NotesController.js",
                        templateUrl:"views/"+theme+"/demo/notesList.html",
                        resolve: {
                            $title: function() { return "NOTES"; }
                        }
                    })).state('dashboard.notes.add',angularAMD.route({
                        url:"/add",
                        controllerUrl:"js/controller/notes/AddController.js",
                        templateUrl:"views/"+theme+"/demo/notesEdit.html"
                    })).state('dashboard.notes.edit',angularAMD.route({
                        url:"/edit/{id}",
                        controllerUrl:"js/controller/notes/EditController.js",
                        templateUrl:"views/"+theme+"/demo/notesEdit.html",
                    })).state('dashboard.notes.item',angularAMD.route({
                        url:"/item/{id}",
                        controllerUrl:"js/controller/notes/ItemController.js",
                        templateUrl:"views/"+theme+"/demo/notesItem.html"
                    })).state('dashboard.dialog',angularAMD.route({
                        url:"/dialog",
                        controllerUrl:"js/controller/demo/DialogController.js",
                        templateUrl:"views/"+theme+"/dialog/index.html",
                        css:["bower_components/ng-dialog/css/ngDialog.css",
                            "bower_components/ng-dialog/css/ngDialog-custom-width.css",
                            "bower_components/ng-dialog/css/ngDialog-theme-default.css",
                            "bower_components/ng-dialog/css/ngDialog-theme-plain.css"],
                        resolve: {
                            $title: function() { return "NgDialog"; }
                        }
                    })).state('dashboard.w5c',angularAMD.route({
                        url:"/qsform/w5c",
                        controllerUrl:"js/controller/w5c/W5cDemoController.js",
                        templateUrl:"views/"+theme+"/w5c/qsW5cdemo.html"
                    }))
                }
            };
            return service;
        }]
    }) .run(function (routersThird) {
        routersThird.setRouter();
    });
});