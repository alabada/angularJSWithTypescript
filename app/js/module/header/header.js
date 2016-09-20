'use strict';
define(["app"], function (app) {
	var header = app.directive('header',["$rootScope",'$cookies',function($rootScope,$cookies){
		return {
        templateUrl:'js/module/header/header.html',
        restrict: 'E',
        replace: true,
        link: function postLink(scope, iElement, iAttrs) {

          /*******主题切换**********/
          ///add by wenhui.gao 2016.6.28
          
          var cookieThemeColor
          var THEME_DEFAULT    = "orange"
          scope.themeColors   = [{color:"gray"},{color:"orange"},{color:"brown"}]

          //设置cookie长度
          cookieThemeColor = $cookies.get("themeColor") //获取cookie
          
          //设置切换主题按钮的样式
          if(!angular.isUndefined(cookieThemeColor)){
              cookieThemeColor = cookieThemeColor.replace(/(^"*)|("*$)/g, "")//trim

              $rootScope.themeColor = "css/theme_"+cookieThemeColor+"/qs-theme.css"

              angular.forEach(scope.themeColors, function (colorObj,idx) {
                  if(colorObj.color ===  cookieThemeColor ){
                      colorObj["active"] = true
                  }
              })
          }else{
              $rootScope.themeColor =  "css/theme_"+THEME_DEFAULT+"/qs-theme.css"
              angular.forEach(scope.themeColors, function (colorObj , idx) {
                if(colorObj.color === THEME_DEFAULT){
                  colorObj["active"] = true    
                }
              })
              
          }


          scope.changeTheme = function(color,$index){
            var cookieExpires = new Date()
            cookieExpires.setDate(cookieExpires.getDate() + 30)  //cookie 保留30天

            $cookies.put("themeColor",color,{ expires: cookieExpires.toGMTString()})
            var cssPath = "css/theme_"+color+"/qs-theme.css"
            $rootScope.themeColor = cssPath
            //添加active类
            angular.forEach(scope.themeColors,function (themeCitem ,idx) {
                if( idx === $index ){
                    themeCitem.active = true
                }else{
                    themeCitem.active = false
                }
            })
              
          }
          //移除载入动画
          document.querySelector('#main-style').onload = function() {
            var _preLoad =  angular.element( document.querySelector('#pre-loading')  )
            _preLoad.addClass('fade')
            setTimeout(function () {
              _preLoad.remove()
              document.querySelector('#preload-css').remove()
            }, 155);
          }
          /*******end主题切换**********/
          //end link
        }
    	}
	}]);
	// register
	app.service("header", [header]);
});