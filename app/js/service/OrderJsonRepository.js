/**
 * Created by zhida.wen on 2016/7/8.
 */

'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('OrderJsonRepository', ['Restangular', 'AbstractRepository',

        function (restangular, AbstractRepository) {
            /**
             * call实现OrderJsonRepository继承AstractRepository
             * @constructor
             */
            function OrderJsonRepository() {
                AbstractRepository.call(this, restangular, 'orders');
            }

            AbstractRepository.extend(OrderJsonRepository);
            return new OrderJsonRepository();
        }
    ]);

});
