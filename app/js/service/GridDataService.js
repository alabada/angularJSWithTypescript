define(["app"], function (app) {
    app.factory('GridData', [function () {
        return {
            curPage: 1,

            setCurPage: function (page) {
                this.curPage = page;
            },

            getCurPage: function () {
                return this.curPage;
            },
        };
    }]);
});