import AbstractGridController = require("./grid/AbstractGridController");
/**
 * Created by zhida.wen on 2016/10/8.
 */

/// <reference path="../../../typings/main.d.ts" />

import {app} from "../../config";

class GridController extends AbstractGridController {

    constructor() {
        super();
    }

}
app.controller('GridController', GridController);
export = GridController;