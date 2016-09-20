/**
 * Created by wenhui.gao on 2016/7/8.
 */
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('demo2goodRepository', ['Restangular', 'AbstractRepository',
        function (restangular, AbstractRepository) {
            /**
             * call实现UserRepository继承AstractRepository
             * @constructor
             */
            function demo2goodRepository() {
                AbstractRepository.call(this, restangular, 'demo2goods');
            }
            AbstractRepository.extend(demo2goodRepository);
            return new demo2goodRepository();
        }
    ]);
});