/// <reference path="../../../../typings/main.d.ts" />

import {app} from "../../../config"
import IFontsScope = require("./IFontsScope");

class FontsController {

    testTS: String = "test";

    static $inject = ["$scope"];
    constructor() {
        //console.log(this.testTS);
        //this.testTS = "hello typescript";
        //console.log(this.testTS);
    }

    getData: () => void = function () : void{
        this.testTS = "data in func";
        console.log(this.testTS);
    }

}

app.controller('FontsController', FontsController);
export = FontsController;