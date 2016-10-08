/**
 * Created by zhida.wen on 2016/10/8.
 */
/// <reference path="../../../../typings/main.d.ts" />

import {app} from "../../../config";
import "../../directive/panel/qsPanel";
import "../../directive/pagination/qsPagination";
import Person = require("./dto/Person");


class QsPanelController {

    sortingOrder: string = 'id';
    currentPage: number = 1;
    itemsPerPage: number = 5;
    reverse: boolean = false;
    filteredItems: Person[] = [];
    pagedItems: Person[][] = [];
    totalItems: number  = 0;
    items: Person[] = [
        {"id":"1","name":"name 1","description":"description 1"},
        {"id":"2","name":"name 2","description":"description 2"}
    ];

    pageGroup: number[] = [5, 10, 20];
    selected: number = 5;

    constructor() {
        this.init();
    }

    init = function () {

        this.filteredItems = this.items;
        this.totalItems = this.filteredItems.length;
        this.currentPage = 1;

        for (let i = 0; i < this.filteredItems.length; i++) {
            let itemsPerPageLocal = angular.isDefined(this.itemsPerPage) ? this.itemsPerPage : 10;
            if (i % itemsPerPageLocal === 0) {
                this.pagedItems[Math.floor(i / itemsPerPageLocal)] = [this.filteredItems[i]]; // 初始化一个数组
            } else {
                this.pagedItems[Math.floor(i / itemsPerPageLocal)].push(this.filteredItems[i]);
            }
        }

    }

}

app.controller('QsPanelController', QsPanelController);
export = QsPanelController;