/**
 * Created by zhida.wen on 2016/10/8.
 */
/// <reference path="../../../../typings/main.d.ts" />
define(["require", "exports", "../../../config", "../../directive/panel/qsPanel", "../../directive/pagination/qsPagination"], function (require, exports, config_1) {
    "use strict";
    var QsPanelController = (function () {
        function QsPanelController() {
            this.sortingOrder = 'id';
            this.currentPage = 1;
            this.itemsPerPage = 5;
            this.reverse = false;
            this.filteredItems = [];
            this.pagedItems = [];
            this.totalItems = 0;
            this.items = [
                { "id": "1", "name": "name 1", "description": "description 1" },
                { "id": "2", "name": "name 2", "description": "description 2" }
            ];
            this.pageGroup = [5, 10, 20];
            this.selected = 5;
            this.init = function () {
                this.filteredItems = this.items;
                this.totalItems = this.filteredItems.length;
                this.currentPage = 1;
                for (var i = 0; i < this.filteredItems.length; i++) {
                    var itemsPerPageLocal = angular.isDefined(this.itemsPerPage) ? this.itemsPerPage : 10;
                    if (i % itemsPerPageLocal === 0) {
                        this.pagedItems[Math.floor(i / itemsPerPageLocal)] = [this.filteredItems[i]]; // 初始化一个数组
                    }
                    else {
                        this.pagedItems[Math.floor(i / itemsPerPageLocal)].push(this.filteredItems[i]);
                    }
                }
            };
            this.init();
        }
        return QsPanelController;
    }());
    config_1.app.controller('QsPanelController', QsPanelController);
    return QsPanelController;
});

//# sourceMappingURL=QsPanelController.js.map
