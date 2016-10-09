/**
 * Created by zhida.wen on 2016/10/9.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var GridCommonService = (function () {
        function GridCommonService() {
        }
        GridCommonService.prototype.orderAndDisplay = function (gridProperty) {
            gridProperty.totalItems = gridProperty.filteredItems.length;
            for (var i = 0; i < gridProperty.filteredItems.length; i++) {
                var itemsPerPageLocal = gridProperty.itemsPerPage;
                if (i % itemsPerPageLocal === 0) {
                    gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)] = [gridProperty.filteredItems[i]]; // 初始化一个数组
                }
                else {
                    gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)].push(gridProperty.filteredItems[i]);
                }
            }
        };
        return GridCommonService;
    }());
    return GridCommonService;
});

//# sourceMappingURL=GridCommonService.js.map
