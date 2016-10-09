/**
 * Created by zhida.wen on 2016/10/8.
 */

/// <reference path="../../../typings/main.d.ts" />

import {app} from "../../config";
import AbstractGridController = require("./grid/AbstractGridController");
import "../service/GridJsonRepository.js";

class GridController extends AbstractGridController {

    static $inject = ["GridJsonRepository"];

    constructor(GridJsonRepository: any) {
        super(GridJsonRepository);
        this.gridProperty.url = '../../../data/gridPanel.json';
    }

}

app.controller('GridController', GridController);
export = GridController;