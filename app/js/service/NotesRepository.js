/**
 * Author: zhiheng.li
 * CreateTime: 2016/5/23
 * Description:
 */
'use strict';
define(["app","js/service/common/AbstractRepository"], function (app) {
  app.factory('NoteRepository', ['Restangular', 'AbstractRepository',

    function (restangular, AbstractRepository) {
      /**
       * callʵ��NoteRepository�̳�AstractRepository
       * @constructor
       */
      function NoteRepository() {
        AbstractRepository.call(this, restangular, 'notes');
      }

      AbstractRepository.extend(NoteRepository);
      return new NoteRepository();
    }
  ]);

});
