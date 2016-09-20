define([
  "asset/libs/angular-w5c-validator/w5cValidator"
  ],function () {
    return ['$scope',function ($scope) {
      //数据
    var vali = $scope.vali = {
      layoutData: { // 数据存储位置 可在此初始化数据 
        testemail:"123123123@qishon.com"
      }
    };


    //每个表单的配置，如果不设置，默认和全局配置相同
    vali.validateOptions = {
      blurTrig: true
    };


    //添加验证规则
    //可使用的验证规则有
    //下表为验证的触条件与默认的错误提示说明
    /***********************
      条件            说明              默认的错误提示
      required        必填项            该选项不能为空
      maxlength       输入值最大长度    该选项输入值长度不能大于{maxlength}
      minlength       输入值最小长度    该选项输入值长度不能小于{minlength}
      email           邮箱              输入邮件的格式不正确
      repeat          重复              两次输入不一致
      pattern         正则表达式        该选项输入格式不正确
      number          数字              必须输入数字
      w5cuniquecheck  验证唯一性        该输入值已经存在，请重新输入
      url             url地址           输入URL格式不正确
      max             最大值            该选项输入值不能大于{max}
      min             最小值            该选项输入值不能小于{min}
      customizer      自定义验证        自定义验证不通过
      ************************************/

    vali.valiRules = {
      testemail: { //对应 name
        required: "输入的邮箱地址不能为空", //验证规则
        email: "输入邮箱地址格式不正确"
      },
      testusername: {
        required: "输入的用户名不能为空",
        pattern: "用户名必须输入字母、数字、下划线,以字母开头",
        w5cuniquecheck: "输入用户名已经存在，请重新输入"
      },
      password: {
        required: "密码不能为空",
        minlength: "密码长度不能小于{minlength}",
        maxlength: "密码长度不能大于{maxlength}"
      },
      repeatPassword: {
        required: "重复密码不能为空",
        repeat: "两次密码输入不一致"
      },
      number: {
        required: "数字不能为空"
      },
      customizer: {
        customizer: "自定义验证数字必须大于上面的数字"
      }
    }

    //自定验证规则
    vali.customizer = function() {
      return vali.layoutData.customizer > vali.layoutData.number;
    };

    //下拉框数据
    vali.types = [{
      value: 1,
      text: "选择框"
    }, {
      value: 2,
      text: "输入框"
    }];


    //获取数据
    vali.savelayoutData = function($event) {
      console.log( vali.layoutData )
      alert("Save Successfully!!!");
    };
    //end controller
    }]
})