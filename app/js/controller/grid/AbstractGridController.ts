/**
 * Created by zhida.wen on 2016/10/8.
 */

/// <reference path="../../../../typings/main.d.ts" />


import {app} from "../../../config";
import GridProperty = require("./GridProperty");
import PersonDto = require("./PersonDto");
import "../../directive/grid/qsGrid";
import GridCommonService = require("../../service/GridCommonService");

abstract class AbstractGridController {

    gridProperty: GridProperty;

    gridCommonService: GridCommonService;
    gridJsonRepository: any;

    items: PersonDto[] = [];

    gridSearchJsonUrl: string = '../../../data/gridSearch.json';
    gridCrudJsonUrl: string = '../../../data/gridCrud.json';

    constructor(GridJsonRepository: any, SweetAlert: any) {
        this.gridProperty = new GridProperty(SweetAlert);
        this.gridCommonService = new GridCommonService();
        this.gridJsonRepository = GridJsonRepository;
        this.init();
    }

    /*
     过滤数据并显示
     */
    search = function () {
        this.gridProperty.filteredItems = this.items;
        this.gridCommonService.orderAndDisplay(this.gridProperty);
    };

    // 加载数据并刷新视图
    init: () => void = function() {
        let vm =this;
        this.gridJsonRepository.getAll().then(function(items) {
            angular.forEach(items, function (item, index) {
                let person = new PersonDto();
                person.id = item.id;
                person.name = item.name;
                person.age = item.age;
                person.email = item.email;
                person.dept = item.dept;
                person.telephone = item.telephone;

                person.gridIndex = index;
                person.itemSelected = false;

                vm.items.push(person);
            })
            vm.search();
        });
    };
}

export = AbstractGridController;