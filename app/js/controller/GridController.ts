/**
 * Created by zhida.wen on 2016/10/8.
 */

import {app} from "../../config";
import AbstractGridController = require("./grid/AbstractGridController");
import "../service/GridJsonRepository";
import "../directive/alert/SweetAlert";

class GridController extends AbstractGridController {

    inputString: string = "test";

    sweetAlert:any;

    static $inject:Array<string> = ["GridJsonRepository", "SweetAlert"];

    constructor(GridJsonRepository: any, SweetAlert: any) {
        super(GridJsonRepository, SweetAlert);
        this.sweetAlert = SweetAlert;
        this.gridProperty.url = '../../../data/gridPanel.json';
    }

    delRowFunc:() => void = function () {
        console.log(this.inputString);
        if (this.gridProperty.selectedItems.length <= 0) {
            this.sweetAlert.swal('请至少选中一个条目');
            return;
        }
    }

}

app.controller('GridController', GridController);
export = GridController;