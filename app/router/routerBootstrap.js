/**
 * Created by luozhanghua on 2016/7/20 0020.
 */
define(["angularAMD","config"], function(angularAMD, config) {

    var app = config.app;

    app.provider('routersBootstrap', function ($stateProvider) {
        this.$get = function () {
            var service = {
                setRouter: function () {
                    $stateProvider.state('dashboard.bootstrap',angularAMD.route({
                        url:"/bootstrap",
                        controllerUrl:"js/controller/bootstrap/BootstrapController.js",
                        templateUrl:"views/"+theme+"/bootstrap/index.html",
                        resolve: {
                            $title: function() { return "Bootstrap"; }
                        }
                    })).state('dashboard.fonts',angularAMD.route({
                        url:"/fonts",
                        controllerUrl: "js/controller/bootstrap/FontsController.js",
                        controllerAs: "vm",
                        templateUrl:"views/"+theme+"/bootstrap/fonts/fontsDemo.html",
                        resolve: {
                            $title: function() { return "字体库"; }
                        }
                    })).state('dashboard.qsList',angularAMD.route({
                        url:"/qsList",
                        controllerUrl:"js/controller/bootstrap/QsListController.js",
                        templateUrl:"views/"+theme+"/bootstrap/list/qsListDemo.html"
                    })).state('dashboard.qsProgressbar',angularAMD.route({
                        url:"/qsProgressbar",
                        controllerUrl:"js/controller/bootstrap/QsProgressbarController.js",
                        templateUrl:"views/"+theme+"/bootstrap/progressbar/qsProgressbarDemo.html"

                    })).state('dashboard.qsPanel',angularAMD.route({
                        url:"/qsPanel",
                        controllerUrl:"js/controller/bootstrap/QsPanelController.js",
                        controllerAs: "vm",
                        templateUrl:"views/"+theme+"/bootstrap/panel/qsPanelDemo.html"
                    }))

                        .state('dashboard.qsInput',angularAMD.route({
                        url:"/qsInput",
                        controllerUrl:"js/controller/bootstrap/QsInputController.js",
                        templateUrl:"views/"+theme+"/bootstrap/input/qsInputDemo.html"
                    })).state('dashboard.qsPagination',angularAMD.route({
                        url:"/qsPagination",
                        controllerUrl:"js/controller/bootstrap/QsPaginationController.js",
                        templateUrl:"views/"+theme+"/bootstrap/pagination/qsPaginationDemo.html"
                    })).state('dashboard.qsCarousel',angularAMD.route({
                        url:"/qsCarousel",
                        controllerUrl:"js/controller/bootstrap/QsCarouselController.js",
                        templateUrl:"views/"+theme+"/bootstrap/carousel/qsCarouselDemo.html"
                    })).state('dashboard.qsRating',angularAMD.route({
                        url:"/qsRating",
                        controllerUrl:"js/controller/bootstrap/QsRatingController.js",
                        templateUrl:"views/"+theme+"/bootstrap/rating/qsRatingDemo.html"
                    })).state('dashboard.dropdown',angularAMD.route({
                        url:"/qsdropdown",
                        controllerUrl:"js/controller/bootstrap/QsdropdownController.js",
                        templateUrl:"views/"+theme+"/bootstrap/dropdown/qsdropdownDemo.html"
                    })).state('dashboard.qsLabel',angularAMD.route({
                        url:"/qsLabel",
                        controllerUrl:"js/controller/bootstrap/QsLabelController.js",
                        templateUrl:"views/"+theme+"/bootstrap/label/qsLabelDemo.html"
                    })).state('dashboard.badge',angularAMD.route({
                        url:"/qsbadge",
                        controllerUrl:"js/controller/bootstrap/QsbadgeController.js",
                        templateUrl:"views/"+theme+"/bootstrap/badge/qsbadgeDemo.html"
                    })).state('dashboard.alert',angularAMD.route({
                        url:"/qsalert",
                        controllerUrl:"js/controller/bootstrap/QsalertController.js",
                        templateUrl:"views/"+theme+"/bootstrap/alert/qsalertDemo.html"
                    })).state('dashboard.tabs',angularAMD.route({
                        url:"/qstabs",
                        controllerUrl:"js/controller/bootstrap/QstabsController.js",
                        templateUrl:"views/"+theme+"/bootstrap/tabs/qstabsDemo.html"
                    })).state('dashboard.navbar',angularAMD.route({
                        url:"/qsnavbar",
                        controllerUrl:"js/controller/bootstrap/QsNavbarController.js",
                        templateUrl:"views/"+theme+"/bootstrap/navbar/qsNavbarDemo.html"
                    })).state('dashboard.thumbnail',angularAMD.route({
                        url:"/qsthumbnail",
                        controllerUrl:"js/controller/bootstrap/QsthumbnailController.js",
                        templateUrl:"views/"+theme+"/bootstrap/thumbnail/qsthumbnailDemo.html"
                    })).state('dashboard.datepicker',angularAMD.route({
                        url:"/qsdatepicker",
                        controllerUrl:"js/controller/bootstrap/QsdatepickerController.js",
                        templateUrl:"views/"+theme+"/bootstrap/datepicker/qsdatepickerDemo.html"
                    })).state('dashboard.tooltip',angularAMD.route({
                        url:"/qstooltip",
                        controllerUrl:"js/controller/bootstrap/QstooltipController.js",
                        templateUrl:"views/"+theme+"/bootstrap/tooltip/qstooltipDemo.html"
                    })).state('dashboard.buttons',angularAMD.route({
                        url:"/qsbuttons",
                        controllerUrl:"js/controller/bootstrap/QsbuttonsController.js",
                        templateUrl:"views/"+theme+"/bootstrap/buttons/qsbuttonsDemo.html"
                    })).state('dashboard.modal',angularAMD.route({
                        url:"/qsmodal",
                        controllerUrl:"js/controller/bootstrap/QsmodalController.js",
                        templateUrl:"views/"+theme+"/bootstrap/modal/qsmodalDemo.html"
                    }))

                    //新增
                    .state('dashboard.accordion',angularAMD.route({
                        url:"/qsaccordion",
                        controllerUrl:"js/controller/bootstrap/QsaccordionController.js",
                        templateUrl:"views/"+theme+"/bootstrap/accordion/qsaccordionDemo.html"
                    })).state('dashboard.collapse',angularAMD.route({
                        url:"/qscollapse",
                        controllerUrl:"js/controller/bootstrap/QscollapseController.js",
                        templateUrl:"views/"+theme+"/bootstrap/collapse/qscollapseDemo.html"
                    })).state('dashboard.pager',angularAMD.route({
                        url:"/qspager",
                        controllerUrl:"js/controller/bootstrap/QspagerController.js",
                        templateUrl:"views/"+theme+"/bootstrap/pager/qspagerDemo.html"
                    })).state('dashboard.dateparser',angularAMD.route({
                        url:"/qsdateparser",
                        controllerUrl:"js/controller/bootstrap/QsdateparserController.js",
                        templateUrl:"views/"+theme+"/bootstrap/dateparser/qsdateparserDemo.html"
                    })).state('dashboard.datepickerPopup',angularAMD.route({
                        url:"/qsdatepickerPopup",
                        controllerUrl:"js/controller/bootstrap/QsdatepickerPopupController.js",
                        templateUrl:"views/"+theme+"/bootstrap/datepickerPopup/qsdatepickerPopupDemo.html"
                    })).state('dashboard.popover',angularAMD.route({
                        url:"/qspopover",
                        controllerUrl:"js/controller/bootstrap/QspopoverController.js",
                        templateUrl:"views/"+theme+"/bootstrap/popover/qspopoverPopupDemo.html"
                    })).state('dashboard.position',angularAMD.route({
                        url:"/qsposition",
                        controllerUrl:"js/controller/bootstrap/QspositionController.js",
                        templateUrl:"views/"+theme+"/bootstrap/position/qspositionPopupDemo.html"
                    })).state('dashboard.timepicker',angularAMD.route({
                        url:"/qstimepicker",
                        controllerUrl:"js/controller/bootstrap/QstimepickerController.js",
                        templateUrl:"views/"+theme+"/bootstrap/timepicker/qstimepicker.html"
                    })).state('dashboard.typeahead',angularAMD.route({
                        url:"/qstypeahead",
                        controllerUrl:"js/controller/bootstrap/QstypeaheadController.js",
                        templateUrl:"views/"+theme+"/bootstrap/typeahead/qstypeahead.html"
                    }))


                //end setRouter
                }
            }
            return service;
        }
    }) .run(function (routersBootstrap) {
        routersBootstrap.setRouter();
    });
});