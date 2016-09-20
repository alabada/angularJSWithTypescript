/*
 **createdBy wenhui.gao 2016/7/21
 */
define([
  "js/directive/linkage/qsLinkage"
],function () {
  return ['$scope','linkagePrvd',function ($scope,linkagePrvd) {
  //数据 初始化

  // $scope.linkageTest1 = {
  //   province:{"id":350000,"text":"福建省"},
  //   city:{"id":350200,"text":"厦门市"}
  // }
  linkagePrvd.set({
    linkageTest1 : {
        province:{"id":350000,"text":"福建省"},
        city:{"id":350200,"text":"厦门市"}
      }
  })

  // 事例二
  $scope.linkageData  = {}
  $scope.linkageDataNew =  {
    11:{
        110:{
            id:"110",
            text:"上装",
            other:"哈哈" //自定义内容
        },
        111:{
            id:"111",
            text:"下装",
            other:"稀稀" //自定义内容
        },
        "aaa":{
            id:"aaa",
            "text":"字串类型测试",
            "bbb":"其它内容测试" //自定义内容
        }
    },
    110:{
        1100:{
            id:"1100",
            text:"t恤",
            deic:"这个是和恤" //自定义内容
        },
        1101:{
            id:"1101",
            text:"小棉袄"//自定义内容
        },
        1102:{
            id:"1102",
            text:"衬衫"
        }
    },
    111:{
        1110:{
            id:"1100",
            text:"热裤",
            deic:"这个是和恤"
        },
        1111:{
            id:"1111",
            text:"7分裤"
        },
        1112:{
            id:"1112",
            text:"短裙"
        }
    },
    aaa:{
        bbb:{
            id:"bbb",
            text:"bbb test"
        },
        ccc:{
            id:"ccc",
            text:"ccc test"
        },
        ddd:{
            id:"ddd",
            text:"ddd test"
        }
    }
  }
  $scope.setData = function () {
      $scope.linkageData  = $scope.linkageDataNew
  }
  //end controller
  }]
})