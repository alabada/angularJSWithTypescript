'use strict';

define(["app"], function (app) {

    app.controller('QsTableResizeCtrl', ['$scope', function ($scope) {

        var resizePressed = false,
            resizePressedEnd = false,
            start, startX, startWidth;

        $scope.resizeStart = function (e) {
            var target = e.target ? e.target : e.srcElement;
            if (target.classList.contains("resize")) {
                start = target.parentNode;
                resizePressed = true;
                startX = e.pageX;
                startWidth = target.parentNode.offsetWidth;
                document.addEventListener('mousemove', drag);
                e.stopPropagation();
                e.preventDefault();
            }
        };

        function drag(e) {
            if (resizePressed) {
                start.width = startWidth + (e.pageX - startX);
            }
        };

        $scope.resizeEnd = function (e) {
            if (resizePressed) {
                document.removeEventListener('mousemove', drag);
                e.stopPropagation();
                e.preventDefault();
                resizePressed = false;
                resizePressedEnd = true;
            }
        };

        $scope.getResizePressEnd = function() {
            return resizePressedEnd;
        }

        $scope.setResizePressEnd = function(booleanValue) {
            resizePressedEnd = booleanValue;
        }

    }]);
});