
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('InterfaceService', ['Restangular', 'AbstractRepository',

        function (restangular, AbstractRepository) {
    	
            function InterfaceService() {
                AbstractRepository.call(this, restangular, 'rest/api/main/');
            }

            AbstractRepository.extend(InterfaceService);
            return new InterfaceService();
        }
    ]);

});
