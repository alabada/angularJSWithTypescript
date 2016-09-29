/// <reference path="../typings/main.d.ts" />


/// <amd-dependency path="main">

require.config({
    // alias libraries paths.  Must set 'angular'
    paths: {
        /*----------bower path------------*/
        'angular':                 'bower_components/angular/angular.min', //1.5.8
        "ngCookies":               "bower_components/angular-cookies/angular-cookies.min",//1.5.8
        "angular-resource":        "bower_components/angular-resource/angular-resource.min",//1.5.8
        "ngAnimate"  :             "bower_components/angular-animate/angular-animate.min",
        "ui-bootstrap":            "bower_components/angular-bootstrap/ui-bootstrap-tpls.min", //2.1版本
        'angular-ui-router':       'bower_components/angular-ui-router/release/angular-ui-router.min',
        'angularAMD':              'bower_components/angularAMD/angularAMD.min',
        'ngload':                  'bower_components/angularAMD/ngload.min',
        "angularCSS":              "bower_components/angular-css/angular-css.min",
        "restangular":             "bower_components/restangular/dist/restangular.min",
        "lodash":                  "bower_components/lodash/dist/lodash.min",
        "angular-md5":             "bower_components/angular-md5/angular-md5.min",
        "angular-ng-dialog":       "bower_components/ng-dialog/js/ngDialog.min",
        "oiSelect":                "bower_components/oi.select/dist/select-tpls.min",
        "angular-ui-router-title": "bower_components/angular-ui-router-title/angular-ui-router-title",
        "angular-locale-zh-cn":    "bower_components/angular-i18n/angular-locale_zh-cn",
        "uiBootstrapContextMenu":  "bower_components/angular-bootstrap-contextmenu/contextMenu",
        "angular-loading-bar":     "bower_components/angular-loading-bar/build/loading-bar.min",
        "sweetalert" :             "bower_components/sweetalert/dist/sweetalert.min",
        "ngDragDrop" :             "bower_components/angular-dragdrop/angular-dragdrop",
        "jquery" :                 "bower_components/jquery/dist/jquery.min" ,
        "jquery-ui":               "bower_components/jquery-ui/jquery-ui.min",
        //textAngular
        'rangy-core':              'bower_components/rangy/rangy-core.min',
        'rangy-selectionsave':     'bower_components/rangy/rangy-selectionsaverestore.min',
        'textAngular-sanitize':    'bower_components/textAngular/dist/textAngular-sanitize.min',
        'textAngularSetup':        'bower_components/textAngular/dist/textAngularSetup',
        'textAngular':             'bower_components/textAngular/dist/textAngular',
        
        /*----------end bower path------------*/

        /*----------- asset ----------*/        
        "qsTree"         :"asset/libs/qs-tree/qstree1.1",
        "ueditor-all"    : "asset/libs/ueditor/ueditor.all",
        "ueditor-config" : "asset/libs/ueditor/ueditor.config",
        "angular-ueditor": "asset/libs/ueditor/angular-ueditor",
        /*-----------end asset ----------*/        

        //自定义缩写
        "qsformlayout":"js/directive/formlayout/qsformlayout",
        "QsUtil"      :"js/service/common/QsUtil",

    },
    //waitSeconds: 0,
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        angular: {
            exports: "angular"
        },
        /**exports 可以把某个非requirejs方式的代码中的某一个全局变量暴露出去，当作该模块以引用
        主要解决ngDialog引入后无法加载module的bug
         require.js:900 TypeError: Cannot read property 'module' of undefined
        **/
        'angular-ui-router'      : ['angular'],
        'angularAMD'             : ['angular'],
        'ngload'                 : ['angularAMD'],
        "angularCSS"             : ["angular"],
        "ngCookies"              : ["angular"],
        "qsTree"                 : ["angular"],
        "angular-resource"       : ["angular"],
        
        "ngAnimate"              : ["angular"],
        "ui-bootstrap"           : ["angular",'ngAnimate'],
        
        "angular-ueditor"        : ["angular"],
        "lodash"                 : ["angular"],
        "restangular"            : ["angular"],
        "angular-ui-router-title": ["angular"],
        "angular-locale-zh-cn"   : ["angular"],
        'jquery-ui'              : ['jquery'],
        "ngDragDrop"             : ["angular","jquery-ui"],
        
        //textAngular
        'rangy-selectionsave'    : ['rangy-core'],
        'textAngular-sanitize'   : ['angular'],
        'textAngularSetup'       : ['angular'],
        'textAngular'            : ['angular', 'textAngular-sanitize', 'textAngularSetup'],
        
        "angular-ng-dialog"      : ["angular"],
        "oiSelect"               : ["angular"],
        "uiBootstrapContextMenu" : ["angular"],
        "angular-loading-bar"    : ["angular"],
        "angular-md5"            : ["angular"],
    },

    // kick start application
    deps: ['app']

});