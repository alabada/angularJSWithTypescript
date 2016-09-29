/**
 * Created by zhida.wen on 2016/9/29.
 */
/// <reference path="../../../../typings/main.d.ts" />


import {app} from "../../../config";

abstract class AbstractFontsController {

    public testAbstract: String = "testAbstract";

    public print: () => void = function () : void {
        console.log("it is in AbstractFontsController");
    }

}

export = AbstractFontsController;