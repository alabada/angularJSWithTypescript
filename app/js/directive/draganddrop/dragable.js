/**
 * Created by zhanghua.luo on 2016/6/14.
 * 拖拽指令
 */
'use strict';
define(["app"], function (app) {
    app.directive('draggable', ["$rootScope","dragAndDrop", '$document', function($rootScope, dragAndDrop, $document) {
        return {
            restrict: 'A',
            scope:{
                dragData : '=',
                dragItem :'&',
                clone : '='
            },
            link: function (scope, element) {
                /**
                 * bindEvent:绑定事件方法
                 * onMouseDown：当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件
                 * onMouseMove：鼠标移动时的方法
                 * onMouseUp：鼠标松开时的方法
                 * success：拖拽完成后的回调函数
                 * startPosition:拖拽的element的起始位置
                 * init:初始化方法
                 * getMousePos:获取鼠标位置方法
                 * transformEl：移动的元素，根据dragItem进行判断
                 * isDeleteElem:用于判断是否移除元素
                 */
                var bindEvent, onMouseDown, onMouseMove, onMouseUp ,success, init, getMousePos;
                var startX = 0, startY = 0, x = 0, y = 0,startPosition, transformEl, isElement, elem;
                var $DESTROY = "$destroy", MOUSEDOWN = "mousedown", MOUSEUP = "mouseup",
                    MOUSEENTER = "mouseenter", MOUSELEAVE = "mouseleave", MOUSEMOVE = "mousemove", MOUSE_ID = "mouse" ,MOUSEOVER="mouseover";
                
                init = function (event) {
                    var dragItem = scope.$eval(scope.dragItem);
                    var clone = scope.clone;
                    isElement = false;
                    startPosition = element.offset();
                    x = event.pageX;
                    y = event.pageY;
                    if (typeof (dragItem) != "undefined") {
                        transformEl = angular.element("<div style='position: absolute;'>" + dragItem() + "</div>");
                        elem = angular.element(".dragItem");
                        elem.append(transformEl);
                        elem.addClass("hidden");
                    } else if(clone) {
                        transformEl = element.clone();
                        transformEl.addClass("clone");
                        transformEl.css({
                            position: 'absolute'
                        });
                        transformEl.addClass(element.attr("class"));
                        elem = angular.element(".dragItem");
                        elem.append(transformEl);
                        elem.addClass("hidden");
                    } else {
                        transformEl = element.clone();
                        transformEl.addClass("clone");
                        transformEl.css({
                            position: 'absolute'
                        });
                        transformEl.addClass(element.attr("class"));
                        elem = angular.element(".dragItem");
                        elem.append(transformEl);
                        elem.addClass("hidden");
                        isElement = true;
                    }
                };

                scope.setPosition = function(x, y) {
                    return transformEl.css({
                        top: x + 2,
                        left: y + 2
                    });
                };

                onMouseDown = function (event) {
                    init(event);
                    event.preventDefault();
                    if (scope.dragData) {
                        dragAndDrop.setData(MOUSE_ID, scope.dragData, success, element[0].offsetWidth, element[0].offsetHeight);
                    }
                    bindEvent();
                };

                onMouseMove = function (event) {
                    if (isElement) {
                        element.addClass("hidden");
                    }
                    elem.removeClass("hidden");
                    transformEl.addClass({
                        position: 'absolute',
                        cursor:'hand'
                    });
                    scope.setPosition(event.clientY,event.clientX);
                };

                success = function () {
                    if (scope.dropCallback != null) {
                        var dropCallback = scope.$eval(scope.dropCallback);
                        if (angular.isFunction(dropCallback)) {
                            dropCallback(dragAndDrop.getData(id));
                        }
                    }
                };

                bindEvent = function () {
                    $document.on(MOUSEMOVE, onMouseMove);
                    $document.on(MOUSEUP, onMouseUp);
                };

                onMouseUp = function () {
                    $document.off(MOUSEMOVE, onMouseMove);
                    $document.off(MOUSEUP, onMouseUp);
                    dragAndDrop.removeData(MOUSE_ID);
                    element.removeClass("hidden");
                    transformEl.remove();
                };

                element.on('mousedown', onMouseDown);

                scope.$on($DESTROY, function () {
                    element.unbind(MOUSEDOWN, onMouseDown);
                    dragAndDrop.removeData(MOUSE_ID);
                });

                //返回起始位置
                scope.returnToStartPosition = function() {
                    return scope.setPosition(startPosition.top, startPosition.left);
                };

               //获取鼠标位置
                function getMousePos(elem, evt) {
                    /*var rect = elem.getBoundingClientRect();
                    return {
                        x: (evt.clientX - (rect.left)) * (elem.width / rect.width),
                        y: (evt.clientY - (rect.top)) * (elem.height / rect.height)
                    }*/
                }
            }
        }
    }])
})