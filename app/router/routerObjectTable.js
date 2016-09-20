
define(["angularAMD", "config"], function(angularAMD, app) {
    app.provider('routersObjectTable', function($stateProvider) {
        this.$get = function() {
            var service = {
                setRouter: function() {
                    $stateProvider
                    //主页
                    .state('dashboard.objectTable', angularAMD.route({
                        url: "/objectTable",
                        controllerUrl: "js/controller/objectTable/ObjectTableController.js",
                        templateUrl: "views/" + theme + "/objectTable/objectTableDemoIndex.html",
                    }))

                    // basic
                    .state('dashboard.objectTable.basic', angularAMD.route({
                        url: "/objectTable/basic",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/basic.html",
                        css: "css/object-table-style.css"
                    }))

                    // sorting
                    .state('dashboard.objectTable.sorting', angularAMD.route({
                        url: "/objectTable/sorting",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/compound_sorting.html",
                        css: "css/object-table-style.css"
                    }))

                    // pagination
                    .state('dashboard.objectTable.pagination', angularAMD.route({
                        url: "/objectTable/pagination",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/pagination.html",
                        css: "css/object-table-style.css"
                    }))

                    // search
                    .state('dashboard.objectTable.search', angularAMD.route({
                        url: "/objectTable/search",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/separate_search.html",
                        css: "css/object-table-style.css"
                    }))

                    // externalResource
                    .state('dashboard.objectTable.externalResource', angularAMD.route({
                        url: "/objectTable/externalResource",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/external.html",
                        css: "css/object-table-style.css"
                    }))

                    // customHeader
                    .state('dashboard.objectTable.customHeader', angularAMD.route({
                        url: "/objectTable/customHeader",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/custom_headers.html",
                        css: "css/object-table-style.css"
                    }))

                    // customRows
                    .state('dashboard.objectTable.customRows', angularAMD.route({
                        url: "/objectTable/customRows",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/custom_rows.html",
                        css: "css/object-table-style.css"
                    }))

                    // customRowsHeaders
                    .state('dashboard.objectTable.customRowsHeaders', angularAMD.route({
                        url: "/objectTable/customRowsHeaders",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/custom_rows_headers.html",
                        css: "css/object-table-style.css"
                    }))

                    // externalFilters
                    .state('dashboard.objectTable.externalFilters', angularAMD.route({
                        url: "/objectTable/externalFilters",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/additional_filters.html",
                        css: "css/object-table-style.css"
                    }))

                    // editableCells
                    .state('dashboard.objectTable.editableCells', angularAMD.route({
                        url: "/objectTable/editableCells",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/editable_cells.html",
                        css: "css/object-table-style.css"
                    }))

                    // multiplySelection
                    .state('dashboard.objectTable.multiplySelection', angularAMD.route({
                        url: "/objectTable/multiplySelection",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/select_multiply.html",
                        css: "css/object-table-style.css"
                    }))

                    // columnHighlighting
                    .state('dashboard.objectTable.columnHighlighting', angularAMD.route({
                        url: "/objectTable/columnHighlighting",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/column_highlighting.html",
                        css: "css/object-table-style.css"
                    }))

                    // resizableColumns
                    .state('dashboard.objectTable.resizableColumns', angularAMD.route({
                        url: "/objectTable/resizableColumns",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/compound_resize.html",
                        css: "css/object-table-style.css"
                    }))

                    // draggableColumns
                    .state('dashboard.objectTable.draggableColumns', angularAMD.route({
                        url: "/objectTable/draggableColumns",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/draggable_headers.html",
                        css: "css/object-table-style.css"
                    }))

                    // aggregateFunction
                    .state('dashboard.objectTable.aggregateFunction', angularAMD.route({
                        url: "/objectTable/aggregateFunction",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/footer_expression.html",
                        css: "css/object-table-style.css"
                    }))

                    // serverPaging
                    .state('dashboard.objectTable.serverPaging', angularAMD.route({
                        url: "/objectTable/serverPaging",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/server_paging.html",
                        css: "css/object-table-style.css"
                    }))

                    // other
                    .state('dashboard.objectTable.other', angularAMD.route({
                        url: "/objectTable/other",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/other.html",
                        css: "css/object-table-style.css"
                    }))

                    // themes
                    .state('dashboard.objectTable.themes', angularAMD.route({
                        url: "/objectTable/themes",
                        controllerUrl: "js/controller/objectTable/Example.js",
                        templateUrl: "views/" + theme + "/objectTable/themes.html",
                        css: "css/object-table-style.css"
                    }))
                    
                }
            }
            return service;
        }

    }).run(function(routersObjectTable) {
        routersObjectTable.setRouter();
    });
});