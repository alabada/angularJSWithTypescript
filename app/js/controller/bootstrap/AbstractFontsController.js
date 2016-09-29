/**
 * Created by zhida.wen on 2016/9/29.
 */
/// <reference path="../../../../typings/main.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    var AbstractFontsController = (function () {
        function AbstractFontsController() {
            this.testAbstract = "testAbstract";
            this.print = function () {
                console.log("it is in AbstractFontsController");
            };
        }
        return AbstractFontsController;
    }());
    return AbstractFontsController;
});

//# sourceMappingURL=AbstractFontsController.js.map
