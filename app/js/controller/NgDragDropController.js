/**
 * Created by luozhanghua on 2016/6/1.
 */
'use strict';

define([
    "js/directive/alert/qsAlert",  "js/directive/alert/SweetAlert","js/directive/thumbnail/qsthumbnail","js/directive/draganddrop/draganddrop"
    ,"js/directive/draganddrop/dragable" ,"js/directive/draganddrop/dropable"
], function () {
    return ["$scope","$q","SweetAlert","$filter", function ($scope,$q,SweetAlert,$filter,$document) {
        $scope.list1 = [{title: '拖拽该按钮到删除按钮上实现删除功能！'}];
        $scope.onDrag = function(target) {
            $scope.isDrag = true;
            var vm = target.target;
            vm = "<button type='button' class='btn btn-default' >删除</button>";
        };

        //删除前的提示
        $scope.deleteDrop = function(index) {
            var deferred = $q.defer();
            SweetAlert.swal({
                title: '确定删除该按钮?',
                text: '注意，删除后不可回退！',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '删除',
                closeOnConfirm: false
            },  function(isConfirm){
                if (isConfirm) {
                    $scope.list1.splice(index, 1);
                    deferred.resolve();
                    SweetAlert.swal('删除成功!');
                } else {
                    deferred.reject();
                }

            });
            return deferred.promise;
        };

        /**
         * 模拟商城
         * @type {*[]}
         */
        $scope.thumbnails = [
            {
                "title" : "商品1",
                "content":"这是内容这是内容这是内容这是内容这是内容1",
                "img":'./views/ngDragDrop/img/2.jpg',
                'alt':'图1'
            },{
                "title" : "商品2",
                "content":"这是内容这是内容这是内容这是内容这是内容2",
                "img":'./views/ngDragDrop/img/3.jpg',
                'alt':'图2'
            },{
                "title" : "商品3",
                "content":"这是内容这是内容这是内容这是内容这是内容3",
                "img":'./views/ngDragDrop/img/4.jpg',
                'alt':'图3'
            }
        ];
        $scope.test = function () {
            return "<div class='ui-widget-header'>商品</div>";
        }
        $scope.endDrag = function (data) {
            //$scope.thumbnails.splice(data, 1);
        };

        $scope.itemsDrop = [];

        $scope.endDrop = function (data) {
            $scope.itemsDrop.push(data);
            $scope.dropClass='';
        }

        $scope.hideMe = function() {
            return $scope.itemsDrop.length > 0;
        }

        
        
        
        
        
        
       /* $scope.helper1 =  function( event ) {
            return $( "<div class='ui-widget-header'>商品</div>" );
        }

        $scope.list4 = [];

        $scope.hideMe = function() {
            return $scope.list4.length > 0;
        }

        $scope.filterIt = function() {
            return $filter('orderBy')($scope.list3, 'title');
        };

        $scope.list2 = [];
        $scope.list3 = [
            { 'title': 'Item 3', 'drag': true },
            { 'title': 'Item 2', 'drag': true },
            { 'title': 'Item 1', 'drag': true },
            { 'title': 'Item 4', 'drag': true }
        ];

        angular.forEach($scope.list3, function(val, key) {
            $scope.list2.push({});
        });*/
    }];
});