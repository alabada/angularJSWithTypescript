define(["require", "exports"], function (require, exports) {
    "use strict";
    var GridProperty = (function () {
        function GridProperty(SweetAlert) {
            this.selectedItems = [];
            this.curPage = 1;
            this.sortingOrder = "id";
            this.itemsPerPage = 5;
            this.totalItems = 0;
            this.pagedItems = [];
            this.sweetAlert = SweetAlert;
        }
        GridProperty.prototype.pageChanged = function () {
            console.log(this.curPage);
        };
        GridProperty.prototype.del = function () {
            if (this.selectedItems.length <= 0) {
                this.sweetAlert.swal('请至少选中一个条目');
                return;
            }
            console.log(this.selectedItems);
        };
        GridProperty.$inject = ["SweetAlert"];
        return GridProperty;
    }());
    return GridProperty;
});

//# sourceMappingURL=GridProperty.js.map
