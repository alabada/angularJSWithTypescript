/**
 * Created by Jonathan on 2016/7/7.
 */
define(["angularAMD","config"], function(angularAMD, app) {
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
                    })).state('dashboard.doughnut',angularAMD.route({
                        url:"/doughnut",
                        controllerUrl:"js/controller/charts/DoughnutController.js",
                        templateUrl:"views/"+theme+"/charts/doughnutDemo.html"
                    })).state('dashboard.pie',angularAMD.route({
                        url:"/pie",
                        controllerUrl:"js/controller/charts/PieController.js",
                        templateUrl:"views/"+theme+"/charts/pieDemo.html"
                    })).state('dashboard.radar',angularAMD.route({
                        url:"/radar",
                        controllerUrl:"js/controller/charts/RadarController.js",
                        templateUrl:"views/"+theme+"/charts/radarDemo.html"
                    })).state('dashboard.polararea',angularAMD.route({
                        url:"/polararea",
                        controllerUrl:"js/controller/charts/PolarareaController.js",
                        templateUrl:"views/"+theme+"/charts/polarareaDemo.html"
                    })).state('dashboard.line',angularAMD.route({
                        url:"/line",
                        controllerUrl:"js/controller/charts/LineController.js",
                        templateUrl:"views/"+theme+"/charts/lineDemo.html"
                    }));
                }
            }
            return service;
        }

    }) .run(function (routersChart) {
        routersChart.setRouter();
    });
});