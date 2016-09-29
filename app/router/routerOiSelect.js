/**
 * Created by wenhui.gao on 2016/7/20.
 */
define(["angularAMD", "config"], function(angularAMD, config) {

    var app = config.app;

    app.provider('routersOiSelect', function($stateProvider) {
        this.$get = function() {
            var service = {
                setRouter: function() {
                    // oiSelect demo
                    $stateProvider
                    //主页
                    .state('dashboard.oiSelect', angularAMD.route({
                        url: "/oiselect",
                        controllerUrl: "js/controller/oiSelect/OiSelectController.js",
                        templateUrl: "views/" + theme + "/oiSelect/oiSelectDemoIndex.html",
                        css:["//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/tomorrow.min.css"]
                    }))

                    //autofocus
                    .state('dashboard.oiSelect.autofocus', angularAMD.route({
                        url: "/oiselect/autofucus",
                        controllerUrl: "js/controller/oiSelect/AutofocusController.js",
                        templateUrl: "views/" + theme + "/oiSelect/autofocus.html"
                    }))

                    //multiple
                    .state('dashboard.oiSelect.multiple', angularAMD.route({
                        url: "/oiselect/single",
                        controllerUrl: "js/controller/oiSelect/MultipleController.js",
                        templateUrl: "views/" + theme + "/oiSelect/multiple.html"
                    }))


                    //single
                    .state('dashboard.oiSelect.single', angularAMD.route({
                        url: "/oiselect/single",
                        controllerUrl: "js/controller/oiSelect/SingleController.js",
                        templateUrl: "views/" + theme + "/oiSelect/single.html"
                    }))

                    //grouping
                    .state('dashboard.oiSelect.grouping', angularAMD.route({
                        url: "/oiselect/grouping",
                        controllerUrl: "js/controller/oiSelect/GoupingController.js",
                        templateUrl: "views/" + theme + "/oiSelect/grouping.html"
                    }))


                    //filtered
                    .state('dashboard.oiSelect.filtered', angularAMD.route({
                        url: "/oiselect/filtered",
                        controllerUrl: "js/controller/oiSelect/FilteredController.js",
                        templateUrl: "views/" + theme + "/oiSelect/filtered.html"
                    }))


                    //lazyloading
                    .state('dashboard.oiSelect.lazyloading', angularAMD.route({
                        url: "/oiselect/lazyloading",
                        controllerUrl: "js/controller/oiSelect/LazyloadingController.js",
                        templateUrl: "views/" + theme + "/oiSelect/lazyloading.html"
                    }))


                    //disabled
                    .state('dashboard.oiSelect.disabled', angularAMD.route({
                        url: "/oiselect/disabled",
                        controllerUrl: "js/controller/oiSelect/DisabledController.js",
                        templateUrl: "views/" + theme + "/oiSelect/disabled.html"
                    }))


                    //disabledoptions
                    .state('dashboard.oiSelect.disabledoptions', angularAMD.route({
                        url: "/oiselect/disabledoptions",
                        controllerUrl: "js/controller/oiSelect/DisabledoptionsController.js",
                        templateUrl: "views/" + theme + "/oiSelect/disabledoptions.html"
                    }))


                    //readonly
                    .state('dashboard.oiSelect.readonly', angularAMD.route({
                        url: "/oiselect/readonly",
                        controllerUrl: "js/controller/oiSelect/ReadonlyController.js",
                        templateUrl: "views/" + theme + "/oiSelect/readonly.html"
                    }))


                    //cleanmodel
                    .state('dashboard.oiSelect.cleanmodel', angularAMD.route({
                        url: "/oiselect/cleanmodel",
                        controllerUrl: "js/controller/oiSelect/CleanmodelController.js",
                        templateUrl: "views/" + theme + "/oiSelect/cleanmodel.html"
                    }))


                    //multiplelimit
                    .state('dashboard.oiSelect.multiplelimit', angularAMD.route({
                        url: "/oiselect/multiplelimit",
                        controllerUrl: "js/controller/oiSelect/MultiplelimitController.js",
                        templateUrl: "views/" + theme + "/oiSelect/multiplelimit.html"
                    }))


                    //createitems
                    .state('dashboard.oiSelect.createitems', angularAMD.route({
                        url: "/oiselect/createitems",
                        controllerUrl: "js/controller/oiSelect/Createitems.js",
                        templateUrl: "views/" + theme + "/oiSelect/createitems.html"
                    }))


                    //autocomplete
                    .state('dashboard.oiSelect.autocomplete', angularAMD.route({
                        url: "/oiselect/autocomplete",
                        controllerUrl: "js/controller/oiSelect/AutocompleteController.js",
                        templateUrl: "views/" + theme + "/oiSelect/autocomplete.html"
                    }))


                    //prompt
                    .state('dashboard.oiSelect.prompt', angularAMD.route({
                        url: "/oiselect/prompt",
                        controllerUrl: "js/controller/oiSelect/PromptController.js",
                        templateUrl: "views/" + theme + "/oiSelect/prompt.html"
                    }))


                    //selectas
                    .state('dashboard.oiSelect.selectas', angularAMD.route({
                        url: "/oiselect/selectas",
                        controllerUrl: "js/controller/oiSelect/SelectasController.js",
                        templateUrl: "views/" + theme + "/oiSelect/selectas.html"
                    }))   


                    //editableoptions
                    .state('dashboard.oiSelect.editableoptions', angularAMD.route({
                        url: "/oiselect/editableoptions",
                        controllerUrl: "js/controller/oiSelect/EditableoptionsController.js",
                        templateUrl: "views/" + theme + "/oiSelect/editableoptions.html"
                    }))   

                    //customization
                    .state('dashboard.oiSelect.customization', angularAMD.route({
                        url: "/oiselect/customization",
                        controllerUrl: "js/controller/oiSelect/CustomizationController.js",
                        templateUrl: "views/" + theme + "/oiSelect/customization.html"
                    }))   

                   //validation
                    .state('dashboard.oiSelect.validation', angularAMD.route({
                        url: "/oiselect/validation",
                        controllerUrl: "js/controller/oiSelect/ValidationController.js",
                        templateUrl: "views/" + theme + "/oiSelect/validation.html"
                    }))  
                    

                  //all
                    .state('dashboard.oiSelect.all', angularAMD.route({
                        url: "/oiselect/all",
                        controllerUrl: "js/controller/oiSelect/AllController.js",
                        templateUrl: "views/" + theme + "/oiSelect/all.html"
                    }))
                    
                }
            }
            return service;
        }

    }).run(function(routersOiSelect) {
        routersOiSelect.setRouter();
    });;
});