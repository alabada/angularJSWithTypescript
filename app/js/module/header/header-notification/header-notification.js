'use strict';

define(["app"], function (app) {
	var headerNotification = app.directive('headerNotification',function(){
		return {
        templateUrl:'js/module/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});
	// register
	app.service("headerNotification", [headerNotification]);
});

