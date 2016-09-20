/**
 * Created by zhida.wen on 2016/6/16.
 */
'use strict';
define(["app","js/service/QsCacheFactory.js"], function (app) {
    app.service('MyCacheService', ['QsCacheFactory', "$http", "$timeout",

        function (QsCacheFactory, $http, $timeout) {

            // 创建一个缓存
            this.cache = QsCacheFactory('myCache', {
                capacity: 3
            });

            var getJsonData = function (url) {
                var promise = new Promise(function (resolve, reject) {

                    if (true) {
                        $http.get(url).success(function(successData, status, headers, config) {
                            if (!successData.code) {
                                resolve(successData.data);
                            } else {
                                throw '获取数据失败';
                            }
                        });
                    } else {
                        reject('falure');
                    }
                });

                return promise;
            };

            this.getSlowData = function () {
                var promise = new Promise(function (resolve, reject) {

                    if (true) {
                        $timeout(function() {
                            getJsonData('./data/gridCrud.json').then(function (data) {
                                resolve(data);
                            });
                        }, 1000);
                    } else {
                        reject('falure');
                    }
                });

                return promise;
            };
        }
    ]);

});