

define(["angularAMD","config"], function(angularAMD, config) {

    var app = config.app;

    app.provider('routersChart', function ($stateProvider) {
        this.$get = function () {
            var service = {
                setRouter: function () {
                    $stateProvider.state('dashboard.chart',angularAMD.route({
                        url:"/charts",
                        controllerUrl:"js/controller/charts/ChartController.js",
                        templateUrl:"views/"+theme+"/charts/index.html"
                    })).state('dashboard.bar',angularAMD.route({
                        url:"/bar",
                        controllerUrl:"js/controller/charts/BarController.js",
                        templateUrl:"views/"+theme+"/charts/barDemo.html"
                    }))
                }
            }
            return service;
        }

    }).run(function (routersChart) {
        routersChart.setRouter();
    });
});