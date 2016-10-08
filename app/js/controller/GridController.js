var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./grid/AbstractGridController", "../../config"], function (require, exports, AbstractGridController, config_1) {
    "use strict";
    var GridController = (function (_super) {
        __extends(GridController, _super);
        function GridController() {
            _super.call(this);
        }
        return GridController;
    }(AbstractGridController));
    config_1.app.controller('GridController', GridController);
    return GridController;
});

//# sourceMappingURL=GridController.js.map
