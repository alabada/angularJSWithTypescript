/**
 * Author: zhiheng.li
 * CreateTime: 2016/6/13
 * Description:品牌Service
 */
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('BrandRepository', ['Restangular', 'AbstractRepository',
        function (restangular, AbstractRepository) {
            /**
             * call实现BrandRepository继承AstractRepository
             * @constructor
             */
            function BrandRepository() {
                AbstractRepository.call(this, restangular, 'brand');
            }
            AbstractRepository.extend(BrandRepository);
            return new BrandRepository();
        }
    ]);
});