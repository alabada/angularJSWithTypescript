/**
 * Created by zhida.wen on 2016/9/29.
 */
/// <reference path="../../../../typings/main.d.ts" />

import {app} from "../../../config"
import FontsController = require("./FontsController");

interface IFontsScope  extends ng.IScope
{
    testTS: string;
    getData: void;
    Ctrl: FontsController;
}

export = IFontsScope;