'use strict';

define(["app"], function (app) {

	var stats = app.directive('stats',function(){
		return {
			templateUrl:'js/module/dashboard/stats/stats.html',
			restrict:'E',
			replace:true,
			scope: {
				'model': '=',
				'comments': '@',
				'number': '@',
				'name': '@',
				'colour': '@',
				'details':'@',
				'type':'@',
				'goto':'@'
			}

		}
	});
	app.service("stats", [stats]);

});