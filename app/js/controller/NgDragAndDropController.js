/**
 * Created by luozhanghua on 2016/6/1.
 */
'use strict';

define([
     "js/directive/draganddrop/angular-sortable-view"
], function () {
    return ["$scope", function ($scope) {
        /**
         * 模拟商城
         * @type {*[]}
         */
        
        $scope.thumbnails = [
            {
                "title" : "图片1",
                "content":"内容1",
                "img":'img/slides/slide1.jpg',
                'alt':'图1'
            },{
                "title" : "图片2",
                "content":"内容2",
                "img":'img/slides/slide2.jpg',
                'alt':'图2'
            },{
                "title" : "图片3",
                "content":"内容3",
                "img":'img/slides/slide3.jpg',
                'alt':'图3'
            }, {
                "title": "图片4",
                "content": "内容4",
                "img": 'img/slides/slide4.jpg',
                'alt': '图4'
            }
        ];
    }];
});