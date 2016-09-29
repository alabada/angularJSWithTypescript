/// <reference path="../../../../typings/main.d.ts" />


import {app} from "../../../config";
import AbstractFontsController = require("./AbstractFontsController");

class FontsController extends AbstractFontsController {

    testTS: String = "test";

    static $inject = ["$scope"];
    constructor() {
        super();
        console.log(this.testTS);
        console.log(this.testAbstract);
    }

    getData: () => void = function () : void{
        this.testTS = "data in func";
        console.log(this.testTS);
    }

    // 测试重写
    public print: () => void = function () : void {
        console.log("it is be overrided");
        alert("it is be overrided");
    }

}

app.controller('FontsController', FontsController);
export = FontsController;