/**
 * Created by jiande.gao on 2016/6/14.
 */
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('clientRepository', ['Restangular', 'AbstractRepository',
        function (restangular, AbstractRepository) {
            /**
             * call实现UserRepository继承AstractRepository
             * @constructor
             */
            function clientRepository() {
                AbstractRepository.call(this, restangular, 'clients');
            }
            AbstractRepository.extend(clientRepository);
            return new clientRepository();
        }
    ]);
});