define(["angularAMD", "config"], function(angularAMD, app) {
    app.provider('routersQsTable', function($stateProvider) {
        this.$get = function() {
            var service = {
                setRouter: function() {
                    $stateProvider
                    //主页
                    .state('dashboard.qsTable', angularAMD.route({
                        url: "/qsTable",
                        controllerUrl: "js/controller/qsTable/QsTableController.js",
                        templateUrl: "views/" + theme + "/qsTable/qsTableDemoIndex.html"
                    }))

                    // basic
                    .state('dashboard.qsTable.basic', angularAMD.route({
                        url: "/qsTable/basic",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/basic.html",
                    }))

                    // sorting
                    .state('dashboard.qsTable.sorting', angularAMD.route({
                        url: "/qsTable/sorting",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/compound_sorting.html",
                    }))

                    // pagination
                    .state('dashboard.qsTable.pagination', angularAMD.route({
                        url: "/qsTable/pagination",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/pagination.html",
                    }))

                    // search
                    .state('dashboard.qsTable.search', angularAMD.route({
                        url: "/qsTable/search",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/separate_search.html",
                    }))

                    // externalResource
                    .state('dashboard.qsTable.externalResource', angularAMD.route({
                        url: "/qsTable/externalResource",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/external.html",
                    }))

                    // customHeader
                    .state('dashboard.qsTable.customHeader', angularAMD.route({
                        url: "/qsTable/customHeader",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/custom_headers.html",
                    }))

                    // customRows
                    .state('dashboard.qsTable.customRows', angularAMD.route({
                        url: "/qsTable/customRows",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/custom_rows.html",
                    }))

                    // customRowsHeaders
                    .state('dashboard.qsTable.customRowsHeaders', angularAMD.route({
                        url: "/qsTable/customRowsHeaders",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/custom_rows_headers.html",
                    }))

                    // externalFilters
                    .state('dashboard.qsTable.externalFilters', angularAMD.route({
                        url: "/qsTable/externalFilters",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/additional_filters.html",
                    }))

                    // editableCells
                    .state('dashboard.qsTable.editableCells', angularAMD.route({
                        url: "/qsTable/editableCells",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/editable_cells.html",
                    }))

                    // multiplySelection
                    .state('dashboard.qsTable.multiplySelection', angularAMD.route({
                        url: "/qsTable/multiplySelection",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/select_multiply.html",
                    }))

                    // columnHighlighting
                    .state('dashboard.qsTable.columnHighlighting', angularAMD.route({
                        url: "/qsTable/columnHighlighting",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/column_highlighting.html",
                    }))

                    // resizableColumns
                    .state('dashboard.qsTable.resizableColumns', angularAMD.route({
                        url: "/qsTable/resizableColumns",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/compound_resize.html",
                    }))

                    // draggableColumns
                    .state('dashboard.qsTable.draggableColumns', angularAMD.route({
                        url: "/qsTable/draggableColumns",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/draggable_headers.html",
                    }))

                    // aggregateFunction
                    .state('dashboard.qsTable.aggregateFunction', angularAMD.route({
                        url: "/qsTable/aggregateFunction",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/footer_expression.html",
                    }))

                    // serverPaging
                    .state('dashboard.qsTable.extend', angularAMD.route({
                        url: "/qsTable/extend",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/extend.html",
                    }))

                    // other
                    .state('dashboard.qsTable.other', angularAMD.route({
                        url: "/qsTable/other",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/other.html",
                    }))

                    // themes
                    .state('dashboard.qsTable.themes', angularAMD.route({
                        url: "/qsTable/themes",
                        controllerUrl: "js/controller/qsTable/Example.js",
                        templateUrl: "views/" + theme + "/qsTable/themes.html",
                    }))
                    
                }
            }
            return service;
        }

    }).run(function(routersQsTable) {
        routersQsTable.setRouter();
    });
});