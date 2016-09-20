/**
 * Created by luozhanghua on 2016/6/14.
 */
'use strict';
define(["app"], function (app) {
    app.factory('dragAndDrop', function () {

        var Service = function () {
            this.counter = 0;
            this.datas = {};
        };


        Service.prototype.setData = function (id, data, success, width, height) {
            this.datas[id] = {data: data, width: width, height: height, callback: success};
        };

        Service.prototype.getData = function (id) {
            return this.datas[id];
        };

        Service.prototype.removeData = function (id) {
            if (this.datas[id]) {
                delete this.datas[id];
            }
        };

        Service.prototype.hasData = function (id) {
            return this.datas[id] != null;
        };

        return new Service();

    })
})