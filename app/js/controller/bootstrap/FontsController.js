/// <reference path="../../../../typings/main.d.ts" />
define(["require", "exports", "../../../config"], function (require, exports, config_1) {
    "use strict";
    var FontsController = (function () {
        function FontsController() {
            this.testTS = "test";
            this.getData = function () {
                this.testTS = "data in func";
                console.log(this.testTS);
            };
            //console.log(this.testTS);
            //this.testTS = "hello typescript";
            //console.log(this.testTS);
        }
        FontsController.$inject = ["$scope"];
        return FontsController;
    }());
    config_1.app.controller('FontsController', FontsController);
    return FontsController;
});

//# sourceMappingURL=FontsController.js.map
