/**
 * Author: zhiheng.li
 * CreateTime: 2016/6/13
 * Description:
 */
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('GoodsRepository', ['Restangular', 'AbstractRepository',
        function (restangular, AbstractRepository) {
            /**
             * call实现GoodsRepository继承AstractRepository
             * @constructor
             */
            function GoodsRepository() {
                AbstractRepository.call(this, restangular, 'goods');
            }
            AbstractRepository.extend(GoodsRepository);
            return new GoodsRepository();
        }
    ]);
});