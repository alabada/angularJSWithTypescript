/**
 * Created by zhanghua.luo on 2016/6/14.
 * 放置指令
 */
'use strict';
define(["app"], function (app) {
    app.directive('dropable', ['$rootScope', "dragAndDrop", "$document", function($rootScope, dragAndDrop,$document) {
        return {
            restrict: 'A',
            scope:{
                dropCallback:"&"
            },
            link: function (scope, $element, attrs) {
                console.log($document);
                var $DESTROY = "$destroy"

                var MOUSEDOWN = "mousedown";
                var MOUSEUP = "mouseup";

                var MOUSEENTER = "mouseenter";
                var MOUSELEAVE = "mouseleave";
                var MOUSEMOVE = "mousemove";

                var TOUCHSTART = "touchstart";
                var TOUCHEND = "touchend";
                var TOUCHMOVE = "touchmove";

                var MOUSE_ID = "mouse";

                var TOUCHEND_ANGULAR_EVENT = "touchend";
                function doDrop(identifier, target) {
                    if (attrs.dropCallback) {
                        var result = scope.$eval(attrs.dropCallback);
                        if (angular.isFunction(result)) {
                            result(dragAndDrop.getData(identifier).data);
                        }
                    }
                    //dragAndDrop.getData(identifier).callback();
                    if (scope.dropCallback != null) {
                        var dropCallback = scope.$eval(scope.dropCallback);
                        if (angular.isFunction(dropCallback)) {
                            dropCallback(dragAndDrop.getData(identifier).data);
                        }
                    }
                    dragAndDrop.removeData(identifier);
                }

                var mouseUp = function (evt) {
                    if (!dragAndDrop.hasData(MOUSE_ID)) {
                        return;
                    }
                    evt.preventDefault();
                    scope.$apply(function () {
                        doDrop(MOUSE_ID);
                    });
                };

                var touchEnd = function (s, currentTouch) {
                    var touchEndElement = $document[0].elementFromPoint(currentTouch.pageX, currentTouch.pageY);
                    if ($element[0].compareDocumentPosition(touchEndElement) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                        doDrop(currentTouch.identifier);
                    }
                };


                var doCallBack = function (cb) {
                    return function (evt) {
                        if (dragAndDrop.hasData(MOUSE_ID)) {
                            scope.$apply(function () {
                                var result = scope.$eval(cb);
                                if (angular.isFunction(result)) {
                                    result(evt, dragAndDrop.getData(MOUSE_ID));
                                }
                            });
                        }
                    }
                };


                $rootScope.$on(TOUCHEND_ANGULAR_EVENT, touchEnd);


                //A mouseup occurs on the target element
                $element.bind(MOUSEUP, mouseUp);
                scope.$on($DESTROY, function () {
                    $element.unbind(MOUSEUP, mouseUp);
                });


                //Mouse enter/leave/move an element
                if (attrs.dropMouseEnter) {
                    var mouseEnter = doCallBack(attrs.dropMouseEnter);
                    $element.bind(MOUSEENTER, mouseEnter);
                    scope.$on($DESTROY, function () {
                        $element.unbind(MOUSEENTER, mouseEnter);
                    });
                }

                if (attrs.dropMouseLeave) {
                    var mouseLeave = doCallBack(attrs.dropMouseLeave);
                    $element.bind(MOUSELEAVE, mouseLeave);
                    scope.$on($DESTROY, function () {
                        $element.unbind(MOUSELEAVE, mouseLeave);
                    });
                }

                if (attrs.dropMouseMove) {
                    var mouseMove = doCallBack(attrs.dropMouseMove);
                    $element.bind(MOUSEMOVE, mouseMove);
                    scope.$on($DESTROY, function () {
                        $element.unbind(MOUSEMOVE, mouseMove);
                    });
                }
            }
        }
    }])
})