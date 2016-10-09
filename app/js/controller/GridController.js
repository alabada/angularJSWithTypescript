/**
 * Created by zhida.wen on 2016/10/8.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../config", "./grid/AbstractGridController", "../service/GridJsonRepository.js"], function (require, exports, config_1, AbstractGridController) {
    "use strict";
    var GridController = (function (_super) {
        __extends(GridController, _super);
        function GridController(GridJsonRepository) {
            _super.call(this, GridJsonRepository);
            this.gridProperty.url = '../../../data/gridPanel.json';
        }
        GridController.$inject = ["GridJsonRepository"];
        return GridController;
    }(AbstractGridController));
    config_1.app.controller('GridController', GridController);
    return GridController;
});

//# sourceMappingURL=GridController.js.map
