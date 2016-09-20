'use strict';

define(["app"], function (app) {

    app.directive('qsList',function() {
        return {
            templateUrl:function(Elem, attrs) {
                if (attrs.type == 'ul') {
                    return 'js/directive/list/qsListUl.html';
                } else {
                    return 'js/directive/list/qsListOther.html';
                }
            },
            restrict:'E',
            replace:true,
            transclude:true,
            scope: {
            },
            link: function(scope, element, attrs) {
                var elemChild = element.children();
                for (var i=0; i<elemChild.length; i++) {
                    angular.element(elemChild[i]).addClass('list-group-item');
                    var situation = elemChild[i].getAttribute('situation');
                    if (situation != null) {
                        angular.element(elemChild[i]).addClass('list-group-item-' + situation);
                    }
                }
            }
        }
    });

});