
/**
 * Created by Jonathan on 2016/7/7.
 */
define(["angular"], function(angular) {
    var app = angular.module('app', 
      [
        "ui.router",
        "ngResource",
        "angularCSS", //新版本door3改为angularCss
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
    return app;
});
