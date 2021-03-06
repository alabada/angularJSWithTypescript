/// <reference path="../typings/main.d.ts" />
define(["require", "exports", 'angular'], function (require, exports, angular) {
    "use strict";
    exports.app = angular.module('app', [
        "ui.router",
        "ngResource",
        "angularCSS",
        "qsTree",
        "ng.ueditor",
        "ui.router.title",
        "restangular",
        "ngDragDrop",
        "textAngular",
        "ngDialog",
        "oi.select",
        "ngCookies",
        "ngAnimate",
        "ui.bootstrap",
        'ui.bootstrap.contextMenu',
        "angular-loading-bar",
        "angular-md5"
    ]);
});
