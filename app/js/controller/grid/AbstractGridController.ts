/**
 * Created by zhida.wen on 2016/10/8.
 */

/// <reference path="../../../../typings/main.d.ts" />


import {app} from "../../../config";
import GridProperty = require("./GridProperty");
import PersonDto = require("./PersonDto");
import "../../directive/grid/qsGrid";

class AbstractGridController {

    gridProperty: GridProperty;
    queryString: string;

    $filter: ng.IFilterService;

    items: PersonDto[] = [
        {"id":"1","name":"name 1","age":"11", "email":"a@q.com", "dept":"15750", "telephone": "123232"}
    ];


    gridSearchJsonUrl: string = '../../../data/gridSearch.json';
    gridCrudJsonUrl: string = '../../../data/gridCrud.json';

    static $inject = ["$filter"];
    constructor() {
        this.gridProperty = new GridProperty();
        this.gridProperty.url = '../../../data/gridPanel.json';
        this.init();

    }

    /*
     过滤数据并显示
     */
    search = function () {

        //GridCommon.orderAndDisplay(this.gridProperty);
    };

    // 加载数据并刷新视图
    init = function () {

        this.gridProperty.filteredItems = this.items;
        this.gridProperty.totalItems = this.gridProperty.filteredItems.length;
        this.gridProperty.currentPage = 1;

        for (let i = 0; i < this.gridProperty.filteredItems.length; i++) {
            let itemsPerPageLocal = angular.isDefined(this.gridProperty.itemsPerPage) ? this.gridProperty.itemsPerPage : 10;
            if (i % itemsPerPageLocal === 0) {
                this.gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)] = [this.gridProperty.filteredItems[i]]; // 初始化一个数组
            } else {
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
}

export = AbstractGridController;