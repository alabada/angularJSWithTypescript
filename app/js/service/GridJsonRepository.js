
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('GridJsonRepository', ['Restangular', 'AbstractRepository',

        function (restangular, AbstractRepository) {
            /**
             * call实现GridJsonRepository继承AstractRepository
             * @constructor
             */
            function GridJsonRepository() {
                AbstractRepository.call(this, restangular, 'grids');
                //AbstractRepository.call(this, restangular, 'users');
            }

            AbstractRepository.extend(GridJsonRepository);
            return new GridJsonRepository();
        }
    ]);

});
