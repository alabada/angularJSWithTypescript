define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by zhida.wen on 2016/10/8.
     */
    var GridProperty = (function () {
        function GridProperty() {
            this.curPage = 1;
            this.sortingOrder = "id";
            this.itemsPerPage = 5;
            this.totalItems = 0;
            this.pagedItems = [];
        }
        GridProperty.prototype.pageChanged = function () {
            console.log(this.curPage);
        };
        return GridProperty;
    }());
    return GridProperty;
});

//# sourceMappingURL=GridProperty.js.map
