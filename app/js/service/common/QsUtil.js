/**
 * Created by wenhui.gao on 2016/7/21.
 */
define([], function () {
  /**
   * 一些共用的方法
   */
  angular.module('qsUtil',[])
  .factory('qsUtil', [function() {
      //删除传入的json  string类型的key和value前后的空格
      var trimJson = function (obj) {
        var newKey, newVal
        angular.forEach(obj, function(oldVal, oldKey){
          //trim key
          newKey = oldKey
          if (typeof oldKey === "string" && /(^\s+)|(\s+$)/g.test(oldKey) ) {
            newKey =  oldKey.replace(/(^\s*)|(\s*$)/g, "")
            obj[newKey] = obj[oldKey]
            delete obj[oldKey]
          }
          // trim value
          if( typeof oldVal ==="string" && /(^\s+)|(\s+$)/g.test(oldVal)){
            newVal = oldVal.replace(/(^\s*)|(\s*$)/g, "")
            obj[newKey] = newVal
          }else if ( typeof oldVal === "object" ){
            trimJson(oldVal)
          }
        });
        return obj
      }

      //来自jquery的extend 方法可以深度复制与扩展
      var extend = function() {
        var options, name, src, copy, copyIsArray, clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
          deep = target;

          // Skip the boolean and the target
          target = arguments[ i ] || {};
          i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && ! angular.isFunction(target) ) {
          target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
          target = this;
          i--;
        }

        for ( ; i < length; i++ ) {
          // Only deal with non-null/undefined values
          if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
              src = target[ name ];
              copy = options[ name ];

              // Prevent never-ending loop
              if ( target === copy ) {
                continue;
              }

              // Recurse if we're merging plain objects or arrays
              if ( deep && copy && ( angular.isObject(copy) || (copyIsArray = angular.isArray(copy)) ) ) {
                if ( copyIsArray ) {
                  copyIsArray = false;
                  clone = src && angular.isArray(src) ? src : [];

                } else {
                  clone = src && angular.isObject(src) ? src : {};
                }

                // Never move original objects, clone them
                target[ name ] = extend( deep, clone, copy );

              // Don't bring in undefined values
              } else if ( copy !== undefined ) {
                target[ name ] = copy;
              }
            }
          }
        }

        // Return the modified object
        return target;
      };

      //设置cookie  
      // 名  , 值  , 存储天数
      var setCookie = function(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
          ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
      }

      // 读取cookie 
      var getCookie = function(c_name) {
        var c_start , c_end
        if (document.cookie.length > 0) {
          c_start = document.cookie.indexOf(c_name + "=")
          if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
          }
        }
        return ""
      }

      // 是否为空的判断
      // 事例
      /****
      isEmpty(""), // true
      isEmpty([]), // true
      isEmpty({}), // true
      isEmpty({length: 0, custom_property: []}), // true

      isEmpty("Hello"), // false
      isEmpty([1,2,3]), // false
      isEmpty({test: 1}), // false
      isEmpty({length: 3, custom_property: [1,2,3]}) // false
       ****/
      var isEmpty = function(obj) {
        // null and undefined are "empty"
          if (obj == null) return true;

          // Assume if it has a length property with a non-zero value
          // that that property is correct.
          if (obj.length > 0)    return false;
          if (obj.length === 0)  return true;

          // Otherwise, does it have any properties of its own?
          // Note that this doesn't handle
          // toString and valueOf enumeration bugs in IE < 9
          for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
          }

          return true;
      }
      return {
        trimJson:trimJson,
        extend:extend,
        setCookie:setCookie,
        getCookie:getCookie,
        isEmpty:isEmpty
      };
    }])
});