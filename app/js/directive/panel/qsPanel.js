'use strict';

define(["app"], function (app) {

    app.directive('qsPanel', function() {
        return {
            templateUrl:'js/directive/panel/qsPanel.html',
            restrict:'E',
            transclude: true,
            replace:true,
            scope: {
                'colour': '@'
            }
        }
    });

    app.directive('qsPanelHead',function(){
        return {
            templateUrl:'js/directive/panel/qsPanelHead.html',
            restrict:'E',
            transclude: true,
            replace:true,
            scope: {
            }
        }
    });

    app.directive('qsPanelBody',function(){
        return {
            templateUrl:'js/directive/panel/qsPanelBody.html',
            restrict:'E',
            transclude: true,
            replace:true,
            scope: {
            }
        }
    });

    app.directive('qsPanelFooter',function(){
        return {
            templateUrl:'js/directive/panel/qsPanelFooter.html',
            restrict:'E',
            transclude: true,
            replace:true,
            scope: {
            }
        }
    });

    app.directive('panelTable',function() {
        return {
            templateUrl:'js/directive/panel/qsPanelTable.html',
            restrict:'A',
            transclude: true,
            replace:true,
            scope: {
            }
        }
    });

    app.directive('qsPanelList',function() {
        return {
            templateUrl:'js/directive/panel/qsPanelList.html',
            restrict:'E',
            transclude: true,
            replace:true,
            scope: {
            },
            link: function(scope, element, attrs) {
                var elemChild = element.children();
                for (var i=0; i<elemChild.length; i++) {
                    if (angular.uppercase(elemChild[i].tagName) == 'LI') {
                        angular.element(elemChild[i]).addClass('list-group-item');
                    }
                }
            }
        }
    });
});