/**
 * Created by zhida.wen on 2016/10/8.
 */
define(["require", "exports", "./GridProperty", "../../directive/grid/qsGrid"], function (require, exports, GridProperty) {
    "use strict";
    var AbstractGridController = (function () {
        function AbstractGridController() {
            this.items = [
                { "id": "1", "name": "name 1", "age": "11", "email": "a@q.com", "dept": "15750", "telephone": "123232" }
            ];
            this.gridSearchJsonUrl = '../../../data/gridSearch.json';
            this.gridCrudJsonUrl = '../../../data/gridCrud.json';
            /*
             过滤数据并显示
             */
            this.search = function () {
                //GridCommon.orderAndDisplay(this.gridProperty);
            };
            // 加载数据并刷新视图
            this.init = function () {
                this.gridProperty.filteredItems = this.items;
                this.gridProperty.totalItems = this.gridProperty.filteredItems.length;
                this.gridProperty.currentPage = 1;
                for (var i = 0; i < this.gridProperty.filteredItems.length; i++) {
                    var itemsPerPageLocal = angular.isDefined(this.gridProperty.itemsPerPage) ? this.gridProperty.itemsPerPage : 10;
                    if (i % itemsPerPageLocal === 0) {
                        this.gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)] = [this.gridProperty.filteredItems[i]]; // 初始化一个数组
                    }
                    else {
                        this.gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)].push(this.gridProperty.filteredItems[i]);
                    }
                }
                //GridJsonRepository.getAll().then(function(items) {
                //    this.items = items;
                //    angular.forEach(this.items, function (item, index) {
                //        item.gridIndex = index;
                //        item.itemSelected = false;
                //    });
                //    this.search();
                //});
            };
            this.gridProperty = new GridProperty();
            this.gridProperty.url = '../../../data/gridPanel.json';
            this.init();
        }
        AbstractGridController.$inject = ["$filter"];
        return AbstractGridController;
    }());
    return AbstractGridController;
});

//# sourceMappingURL=AbstractGridController.js.map
