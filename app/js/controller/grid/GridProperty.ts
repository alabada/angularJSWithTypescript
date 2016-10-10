
/**
 * Created by zhida.wen on 2016/10/8.
 */
import PersonDto = require("./PersonDto");

class GridProperty {

    filteredItems: PersonDto[];
    selectedItems: PersonDto[];
    pagedItems: PersonDto[][];
    curPage: number;
    sortingOrder: string;
    itemsPerPage: number;
    totalItems: number;
    url: string;
    selectAll: boolean;

    // service
    sweetAlert:any;

    static $inject:Array<string> = ["SweetAlert"];

    constructor(SweetAlert: any) {
        this.selectedItems = [];
        this.curPage = 1;
        this.sortingOrder = "id";
        this.itemsPerPage = 5;
        this.totalItems = 0;
        this.pagedItems = [];

        this.sweetAlert = SweetAlert;
    }

    pageChanged () {
        console.log(this.curPage);
    }

    del () {
        if (this.selectedItems.length <= 0) {
            this.sweetAlert.swal('请至少选中一个条目');
            return;
        }
        console.log(this.selectedItems);
    }

}

export = GridProperty;