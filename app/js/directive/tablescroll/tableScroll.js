/**
 * Created by zhida.wen on 2016/7/14.
 */
'use strict';

define(["app"], function (app) {

    app.directive('tableScroll', function() {
        return {
            restrict: 'AE',
            link: function postLink(scope, iElement, iAttrs) {
                var scrollTop;
                var th = iElement[0].querySelector('thead');
                iElement.bind("scroll",function (e) {
                    scrollTop = iElement[0].scrollTop;
                    th.style.transform = "translateY("+scrollTop+"px)";
                });
            }
        };
    });

})