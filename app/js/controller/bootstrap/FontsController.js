/// <reference path="../../../../typings/main.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "app/config", "./AbstractFontsController"], function (require, exports, config_1, AbstractFontsController) {
    "use strict";
    var FontsController = (function (_super) {
        __extends(FontsController, _super);
        function FontsController() {
            _super.call(this);
            this.testTS = "test";
            this.getData = function () {
                this.testTS = "data in func";
                console.log(this.testTS);
                var a = 123;
            };
            // 测试重写
            this.print = function () {
                console.log("it is be overrided");
                alert("it is be overrided");
            };
            console.log(this.testTS);
            console.log(this.testAbstract);
        }
        return FontsController;
    }(AbstractFontsController));
    config_1.app.controller('FontsController', FontsController);
    return FontsController;
});

//# sourceMappingURL=FontsController.js.map
