/**
 * Created by zhida.wen on 2016/10/9.
 */

/// <reference path="../../../typings/main.d.ts" />

import {app} from "../../config";
import GridProperty = require("../controller/grid/GridProperty");

class GridCommonService {

    constructor() {
    }

    orderAndDisplay (gridProperty: GridProperty) {

        gridProperty.totalItems = gridProperty.filteredItems.length;

        for (let i = 0; i < gridProperty.filteredItems.length; i++) {
            let itemsPerPageLocal = gridProperty.itemsPerPage;
            if (i % itemsPerPageLocal === 0) {
                gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)] = [gridProperty.filteredItems[i]]; // 初始化一个数组
            } else {
                gridProperty.pagedItems[Math.floor(i / itemsPerPageLocal)].push(gridProperty.filteredItems[i]);
            }
        }
    }

}

export = GridCommonService;