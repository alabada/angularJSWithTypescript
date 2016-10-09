
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('GridJsonRepository', ['Restangular', 'AbstractRepository',

        function (restangular, AbstractRepository) {

            function GridJsonRepository() {
                AbstractRepository.call(this, restangular, 'grids');
            }

            AbstractRepository.extend(GridJsonRepository);
            return new GridJsonRepository();
        }
    ]);

});
