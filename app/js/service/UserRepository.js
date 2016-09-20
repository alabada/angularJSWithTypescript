/**
 * Author: zhiheng.li
 * CreateTime: 2016/6/1
 * Description:
 */
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
    app.factory('UserRepository', ['Restangular', 'AbstractRepository',
        function (restangular, AbstractRepository) {
            /**
             * call实现UserRepository继承AstractRepository
             * @constructor
             */
            function UserRepository() {
                AbstractRepository.call(this, restangular, 'user');
            }
            AbstractRepository.extend(UserRepository);
            /**
             * 按姓名查询
             * @type {{getString: UserRepository.getString}}
             */

            return new UserRepository();
        }
    ]);
});