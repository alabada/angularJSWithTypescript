/**
 * Author: zhiheng.li
 * CreateTime: 2016/5/23
 * Description:
 */
'use strict';
define(["app"], function (app) {

  app.factory('AbstractRepository', ["$rootScope",

    function ($rootScope) {
      /**
       *
       * @param restangular
       * @param route
       * @constructor
       */
      function AbstractRepository(restangular, route) {
        this.restangular = restangular;
        this.route = route;
      }

      AbstractRepository.prototype = {
        getList: function (params) {
          return this.restangular.all(this.route).getList(params).$object;
        },

        /**
         *  以上getList不能调用then方法
         */
        getAll: function (params) {
          return this.restangular.all(this.route).getList(params);
        },
        /**
         * 按某个字段查询
         * @param param
         * @param str
           * @returns {*}
           */
        //getString: function (name,str) {
        //
        //  return this.restangular.one(this.route).get({name:str});
        //},
        /**
         *根据ID查询
         * @param id
         * @returns {*}
         */
        get: function (id) {
          return this.restangular.one(this.route, id).get();
        },
        //根据id查找entity下所有的列表
        getByOne: function (id,entity,params) {
          return this.restangular.one(this.route, id).one(entity).getList(params);
        },
        //根据条件搜索
        getString: function (object) {
          return this.restangular.one(this.route).get(object);
        },
        //每个对象的子表（例如user对应userView）
        getView: function (id) {
          return this.restangular.one(this.route, id).one(this.route + 'View').get();
        },
        //更新
        update: function (updatedResource) {
          return updatedResource.put().$object;
        },
        //创建
        create: function (newResource) {
          return this.restangular.all(this.route).post(newResource);
        },
        //删除
        remove: function (object) {
          return this.restangular.one(this.route, object.id).remove();
        },
        // 面料系统接口封装
        invoke: function (param) {
        	return this.restangular.all(this.route + $rootScope.token).customPOST(param, '', undefined, {'Content-Type': "application/x-www-form-urlencoded"});
        },
      };

      AbstractRepository.extend = function (repository) {
        repository.prototype = Object.create(AbstractRepository.prototype);
        repository.prototype.constructor = repository;
      };

      return AbstractRepository;
    }
  ]);
});
