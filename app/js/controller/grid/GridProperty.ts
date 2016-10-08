import PersonDto = require("./PersonDto");
/**
 * Created by zhida.wen on 2016/10/8.
 */

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

    constructor() {
        this.curPage = 1;
        this.sortingOrder = "id";
        this.itemsPerPage = 5;
        this.totalItems = 0;
        this.pagedItems = [];
    }

    pageChanged () {
        console.log(this.curPage);
    }

}

export = GridProperty;