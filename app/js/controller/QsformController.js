/*
* created by wenhui.gao 2016/05/11
 */
'use strict';
define([
  "qsformlayout"
  ], function() {
  return ["$scope","$http", function($scope,$http) {
    $scope.url = './config/formlayout.json';

    //用于表单验证的方法
    $scope.demovali= {
     //自定义的验证规则
      valiOptions : {
       "blurTrig": true,
       "showError"  : true,
       "removeError" : true
      },
     //数据初始化
      initData:true,
      layoutData :{
        testEmeil: "aaa@bbb.com",
        testUserName: "AAAAA",
        testPassword: "111111",
        testRepeatPassword: "111111",
        testUrl: "http://p.com",
        testRadio: "N",
        testcheckbox:  { 
          check_one: true
        },
        testStatic:"这是一个静态内容",
        testimg:{
          imgSrc:"http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image",
          imgAlt:"这是一个图片"
        },
        testSelect:{
          "id":3,
          "text": "第三项",
          "value":"item_3"
        },
        testAreaPicker:{
          province:{
            id  : 350000 , //地区编码
            text:"福建省"
          },
          city:{
            id :350200 ,//地区编码
            text : "厦门市"
          },
          district:{
            id :350206 ,//地区编码
            text : "湖里区"
          }
        }
      }

      //添加自定义方法

    }

    //最终数据存储于 $scope.vali.layoutData[formEleName] 下
    $scope.customizer = {
      testnumber: function () {
        return $scope.demovali.layoutData.testcustomizer > $scope.demovali.layoutData.testnumber;
      }
    }

    //submit 
    $scope.formCtr={
      submit :function () {
        alert("验证成功!!!");
        var submitJson = $scope.demovali.qsFormLayoutData()
        console.log( submitJson )
      }
    }


    //显示scope,调试用
    $scope.shscope = function () {
      console.log($scope)
    }
    //end
  }];
});