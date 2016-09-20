/*
 **createdBy wenhui.gao 2016/7/25
 */
define([
  "qsformlayout"
],function () {
  return ['$scope',"ngDialog",function ($scope,ngDialog) {
    //json
    $scope.url             = "./config/fbi/demo9/fbiattrs.json"
    $scope.organizationURL = "./config/formlayout-areapicker.json"
    $scope.compsnURL       = "./config/formlayout-areapicker.json"
    //开启 验证
    var vali  = $scope.vali = {}
    vali.valiOptions = {
      blurTrig: true
    };

    // 数据-可用 http服务传入
    $scope.formData = {
        clazzes :[
            {
              "text": "针织",
              "name": "knit"
            },{
              "text": "梭织",
              "name": "woven"
            }, {
              "text": "毛织",
              "name": "Wool"
            }, {
              "text": "毛呢",
              "name": "barret"
            }, {
              "text": "非织",
              "name": "nonWoven"
            }
        ]
    }

    $scope.techBtns = [
       {
        "techKey": "001",
        "techName": "水洗"
      },{
        "techKey": "002",
        "techName": "褶皱"
      },{
        "techKey": "003",
        "techName": "磨毛"
      },{
        "techKey": "004",
        "techName": "胶印"
      }
    ]

    //数据存储
    $scope.editFbi ={
        fbiAttrs:{}
    }



    //弹窗
    //数据
    $scope.popSelData= {
        types:{
          new:{
            name:"新品系列",
            data:[
              {
                key:001,
                name:"热卖专区"
              },{
                key:002,
                name:"纱卡"
              }
            ]
          },
          winner:{
            name:"秋冬系列",
            data:[
              {
                key:001,
                name:"热卖专区2"
              },{
                key:002,
                name:"纱卡2"
              }
            ]
          }
        }
    }
    //弹窗设置
    $scope.shPop = function (data) {
        ngDialog.open({
            template: 'dataSel',
            controller: ['$scope', function ($scope) {
                $scope.data = data
                $scope.rightData = {}
                $scope.selectTypes = []
                $scope.shRight =function (key) {
                  $scope.rightData = $scope.data[key].data
                  console.log($scope.rightData);
                }
                $scope.selType = function (type) {
                  // console.log(type);
                  $scope.selectTypes.push(type)
                }
            }],
            scope: $scope,
            className: 'ngdialog-theme-plain',
            width: 650
        })
    }
  //end controller
  }]
})