'use strict';
define([
  "js/directive/thumbnail/qsthumbnail"
  ], function () {
    return ["$scope", function ($scope) {
      $scope.thumbnails = [
        {
          "title" : "缩略图1",
          "content":"这是内容这是内容这是内容这是内容这是内容1",
          "img":'http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image',
          'alt':'图1'
        },{
          "title" : "缩略图2",
          "content":"这是内容这是内容这是内容这是内容这是内容2",
          "img":'http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image',
          'alt':'图2'
        },{
          "title" : "缩略图3",
          "content":"这是内容这是内容这是内容这是内容这是内容3",
          "img":'http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image',
          'alt':'图3'
        },{
          "title" : "缩略图4",
          "content":"这是内容这是内容这是内容这是内容这是内容4",
          "img":'http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image',
          'alt':'图4'
        }
      ]
    }];
});