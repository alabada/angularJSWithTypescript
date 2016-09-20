/*
 * created by wenhui.gao 2016/05/11
 */

'use strict';


define(["asset/libs/angular-w5c-validator/w5cValidator",
        "js/directive/formlayout/ngmodel.format",
        "js/directive/linkage/qsLinkage",
        "QsUtil"
        ],
   function() {

  angular.module('form.layout', [ "qsBootstrap.datepicker", 'ngmodel.format',"w5c.validator",'qs.linkage'])
  

  /**
   * 定义布局的服务
   */
  .provider('formLayout', function() {

    //配置布局元素的模板
    this.setElementTemplate = function(configTemplate) {
      if (!configTemplate) return;
      formLayout.setElementTemplate(configTemplate);
    }

    this.$get = ['$compile', '$rootScope', "$log", 'qsUtil', function($compile, $rootScope, $log, qsUtil) {

      // 定义布局构造函数
      function FormLayoutFn() {
        /**
         * 定义表单元素的模板
         */
        this.elementTemplate = {
          text: "<div qs-form-layout-text qs-formlayout-id></div>",
          radio: '<div qs-form-layout-radio-checkbox qs-formlayout-id></div>',
          checkbox: '<div qs-form-layout-radio-checkbox qs-formlayout-id></div>',
          select: '<div qs-form-layout-select qs-formlayout-id></div>',
          textarea: '<div qs-form-layout-textarea qs-formlayout-id></div>',
          datepicker: "<div qs-form-layout-datepicker qs-formlayout-id></div>",
          btns: "<div qs-form-layout-btns qs-formlayout-id></div>",
          edit:"<div qs-formlayout-htmledit qs-formlayout-id></div>",
          linkage:"<div qs-form-layout-linkage qs-formlayout-id></div>",
          static:"<div qs-form-layout-static qs-formlayout-id></div>",
          img:"<div qs-form-layout-img qs-formlayout-id></div>",
          ph:"<div qs-form-layout-ph qs-formlayout-id></div>",
          phurl:"<div qs-form-layout-phurl qs-formlayout-id></div>"
        };
      }
    

      FormLayoutFn.prototype = {

        /**
         * 配置布局元素的模板
         * @param configTemplate
         */
        setElementTemplate: function(configTemplate) {
          this.elementTemplate = angular.extend(this.elementTemplate, configTemplate);
        },

        /**
         * 实现布局的函数
         */
        layout: function(eleObj, elementArr, ctrlScope) {
          var thiz = this;
          var elementTemplate = this.elementTemplate;
          var defaultTemplate = this.defaultTemplate;
          var radioTmpl = this.radioTmpl;
          var checkboxTmpl = this.checkboxTmpl;
          ctrlScope.qsformlayoutformEleCount = 0

          if (angular.isObject(eleObj) && angular.isObject(elementArr)) {
            angular.forEach(elementArr, function(eleObjIterm, eleIdx) {
              //由type选择模板
              if(typeof eleObjIterm.type === "undefined"){
                eleObjIterm.type = "text"
              }
              var type = eleObjIterm.type
              var tplType = null
              switch (type) {
                case 'select':
                  tplType = 'select'
                  break
                case 'radio':
                  tplType = 'radio'
                  break
                case 'checkbox':
                  tplType = 'checkbox'
                  break
                case 'textarea':
                  tplType = 'textarea'
                  break
                case "datepicker":
                  tplType = "datepicker"
                  break
                case "linkage":
                  tplType = "linkage"
                  break
                case "btns":
                  tplType = "btns"
                  break
                case "edit":
                  tplType = "edit"
                  break
                case "static":
                  tplType = "static"
                  break
                case "img":
                  tplType = "img"
                  break
                case "ph":
                  tplType = "ph"
                  break
                case "phurl":
                  tplType = "phurl"
                  break
                default:
                  tplType = 'text'
                  break
              }

              //在dom 生成模板 编译出指令
              //由formlayout-id值取指令中的值
              var tpl = elementTemplate[tplType]
              tpl = tpl.replace(/qs-formlayout-id/, 'qs-formlayout-id="' + eleIdx + '"')

              var templateObj = angular.element(tpl);
              templateObj = $compile(templateObj)(ctrlScope);
              eleObj.append(templateObj)
            });
            return eleObj;
          } else {
            $log.error('传入的参数不是对象')
          }
          //外部的form指令
        }
      };
      return new FormLayoutFn()
    }]
  })

  /**
   * 为元素添加属性和指令
   * 依赖: $log", "$compile", "qsUtil"
   */
  .provider('qsformlayoutAddAttr', [function() {
    this.$get = ["$log", "$compile","$q", "qsUtil", function($log, $compile, $q , qsUtil) {
      var AddAttr = function (options) {
        if (typeof options !== "object") {
            console.error("应传入一个对象")
            return 
        }
        this.options          = options
        this.scope            = options.scope
        this.itemDataObj      = this.scope.layoutDataFields[options.dataIdx]
        this._formGroupEle    = options._formGroupEle
        this._labelEle        = options._labelEle
        this._formEle         = options._formEle
        this._repeatcont      = options._repeatcont
        this._formEleCont     = options._formEleCont
        this.overallEleConfig = this.scope.layoutOverallEleConfig
        this.init()
      }
      AddAttr.prototype = {
        init :function () {
          this.setAttr()
          this.complie()
        },
        setAttr : function () {
          var self        = this,
              itemDataObj = self.itemDataObj,
              scope       = self.scope,
              _formEle    = self._formEle
          angular.forEach(itemDataObj, function(fVal, fAttr) {
            switch (fAttr) {
              case "type":
                if( itemDataObj.type === "btns" ){
                  break;
                }
                self.addtype(scope, _formEle, fVal)
                break;
              case "name": 
                _formEle.attr("name", fVal)
                _formEle.attr("ng-model","vali.layoutData."+fVal)
                break;
              case "eleConfig":
                self.setElesAttr(  fVal  )
                break;
              case "valiRule":
                if(typeof itemDataObj.name === "undefined"){
                  console.error("表单:表单的name属性是必需的")
                  break;
                }
                scope.vali.valiRules[itemDataObj.name]  = fVal
                break;
              case "data":
                scope.formEleData[itemDataObj.name] = fVal
                break;
            }
          })
        },
        setElesAttr : function (elesData) {
          // 初始化对象
          var exElesData       = {},
              self             = this ,
              overallEleConfig = self.overallEleConfig,
              _formGroupEle    = self._formGroupEle,
              _labelEle        = self._labelEle,
              _formEleCont     = self._formEleCont,
              _formEle         = self._formEle,
              _repeatcont      = self._repeatcont,
              scope            = self.scope,
              itemDataObj      = self.itemDataObj
          //使用
          exElesData  =qsUtil.extend(true,{},overallEleConfig,elesData)
          if(typeof exElesData.formEle === "undefined"){
            exElesData.formEle ={}
          }
          angular.forEach(exElesData, function(eleAttr, eleName){
            switch(eleName){
              case "formGroup":
                self.addAttrs(scope, _formGroupEle, eleAttr)
                break;
              case "formEleCont":
                self.addAttrs(scope, _formEleCont, eleAttr)
                break;
              case "label":
                if(typeof eleName === "undefined"){
                  _labelEle.remove()
                }else{
                  self.addAttrs(scope, _labelEle, eleAttr)
                }
                break;
              case "formEle":
                if(typeof _formEle === "undefined"){
                  break;
                }
                switch( _formEle.attr("type")  ){
                  case "edit":
                    eleAttr["text-angular"] =  "text-angular"
                    break;
                  case "static":
                    _formEle.append('{{vali.layoutData.'+ _formEle.attr("name") + '}}')
                    break;
                  case "img":
                    _formEle.attr("ng-src", '{{vali.layoutData.' +  _formEle.attr("name")+".imgSrc}}" )
                    _formEle.attr("alt", '{{vali.layoutData.' +  _formEle.attr("name")+".imgAlt}}" )
                    break;
                  case "linkage":
                    _formEle.attr("qs-linkage","")
                    break;
                  case "select":
                    var filter = ""
                    if(typeof eleAttr["oi-select"] ==="undefined"){
                      eleAttr["oi-select"] = ""
                    }
                    if(typeof eleAttr["filter"] !=="undefined"){
                      filter = eleAttr["filter"]
                      delete eleAttr["filter"]
                    }
                    if(typeof eleAttr["oi-options"] ==="undefined"){
                      eleAttr["oi-options"] ="item.text  group by item.category  disable when item.disabled  for  item in formEleData." + 
                                            _formEle.attr("name") +
                                             filter +" track by item.id " 
                      // ng-options写法
                      // label for value in array
                      // select as label for value in array
                      // label group by group for value in array
                      // label disable when disable for value in array
                      // label group by group for value in array track by trackexpr
                      // label disable when disable for value in array track by trackexpr
                    }
                    break;
                }

                self.addAttrs(scope, _formEle, eleAttr)
                break;
              case "items":
                if( itemDataObj.type ==="btns"){
                  var configobj = {
                    "btnDatas": eleAttr,
                    "scope": scope,
                    "btnCont": _formEleCont
                  }
                  self.addBtns(configobj)
                }else{
                  var configObj = {
                    scope:scope,
                    formEle:_formEle,
                    itemCont:_repeatcont,
                    eleData:eleAttr,
                    type:itemDataObj.type,
                    name:itemDataObj.name
                  }
                  self.addRadioItem(configObj)
                }
                break
            }
          });
        },
        //为表单元素添加 type
        addtype : function(scope, formEle, eleType) {
          switch (eleType) {
            case "textarea":
              break;
            case "select":
            case "radio":
            case "checkbox":
            case 'email':
            case 'password':
            case 'number':
            case 'url':
            case "btns":
            case "edit":
            case "linkage":
            case "static":
            case "img":
              formEle.attr("type", eleType)
              break;
            default:
              formEle.attr("type", "text")
          }
        },
        addAttrs : function(scope, ele, configObj) {
          if(typeof ele  === "undefined"){
            return 
          }
          angular.forEach(configObj, function(val, attr) {
            if (attr === "class") {
              ele.addClass(val)
            } else if (attr === "removeClass") {
              ele.removeClass(val)
            } else if (attr === "text") {
              ele.html("" + val + "")
            } else {
              ele.attr(attr, val)
            }
          });
        },
        //对radio 类型 处理
        addRadioItem : function( configObj) {
          var eleData    = configObj.eleData,
              formEle    = configObj.formEle,
              subLabel   = formEle.parent(),
              scope      = configObj.scope,
              type       = configObj.type,
              name       = configObj.name,
              self       = this

          //以下对象为空的初始为一个空对象
          var initArr = ['subLabel','formEle']
          angular.forEach(initArr, function(name, idx){
            if(typeof eleData[name] === "undefined"){
              eleData[name] = {}
            }
          });

          //添加attr
          angular.forEach(eleData, function(eAttrs, eleName){
            switch(eleName){
              case "subLabel":
                eAttrs['ng-repeat'] = "item in formEleData." + name
                subLabel.append('{{item.text}}')
                self.addAttrs(scope, subLabel, eAttrs)
                break;
              case "formEle":
                if(type === "checkbox"){
                  eAttrs['ng-model'] = "vali.layoutData."+ name +""+ "[item.value]"
                }
                eAttrs['value'] = "{{item.value}}"
                self.addAttrs(scope, formEle, eAttrs)
                break;
            }
          });
        },
        //对btn 类型处理
        addBtns : function (configObj) {
          var scope       = configObj.scope,
              btnCont     = configObj.btnCont,
              btnDatas    = configObj.btnDatas,
              self        = this
          angular.forEach(btnDatas, function(btnData, btnIdx){
            var newBtn = angular.element("<button data-btn-idx ="+ btnIdx+"></button> ");
            var space = document.createTextNode(" ") //为按钮添加间隙
            self.addAttrs(scope,newBtn,btnData)          
            btnCont.append( newBtn )
            btnCont.append( space )
          });
        },
        //最后进行编译
        complie :function () {
          //进行编译
          var scope         = this.scope,
              formComileArr = this._formGroupEle.children()
          angular.forEach(formComileArr, function(ele, idx){
            $compile(  angular.element(ele)  )(scope)
          });
          //记录表单数目，更新验证数据
          scope.qsformlayoutformEleCount++
        }
      }
      //返回新的实例
      return function (options) {
        return new AddAttr(options)
      }
    //end $get
    }];
  }])


 


  /**
   * 初始的表单结构的指令,会调用 formmlayout 服务
   * @依赖  $http', '$filter', 'formLayout'
   * @scope 新的scope
   */
  .directive('qsFormLayout', ['qsUtil',function (qsUtil) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutForm.html',
      replace: true,
      // transclude: true,
      scope:{},
      restrict: 'AE',
      controller: function($scope,$element,$attrs) {
        this.getAttrs =function () {
          return $attrs
        }
        this.setAttrs =function (attrsObj) {
          angular.forEach(attrsObj, function(attrVal, attrName){
            if(attrName  === "class"){
              $element.addClass(attrVal)
            }else if (attrName  === "removeClass"){
              $element.removeClass(attrVal)
            }
            else{
              $element.attr(attrName,attrVal)
            }
          });
        }
        //货币格式化
        $scope.formatter = function(modelValue, filter, defaultValue) {
            if (modelValue) {
                var val = filter("currency")(modelValue)
                return val;
            }
            return defaultValue;
        };


        //与父级的scope进行手动的双向绑定
        // if(angular.isUndefined($attrs.vali)){
        //   console.error("vali")
        // }
        $scope.$parent[ $attrs.vali ] = angular.extend({},$scope.$parent[ $attrs.vali ])
        $scope.$parent.$watch( $attrs.vali , function (newVal,oldVal) {
          $scope.vali = angular.extend($scope.vali , newVal);
        },true)

        $scope.$watch("vali",function (newVal) {
          $scope.$parent[ $attrs.vali ] = newVal
        })
      },

      link: function postLink(scope, iElement, iAttrs) {}
    };
  }])
  .directive('qsFormLayoutDetails', ['$http', '$filter', '$log', 'formLayout','qsUtil',"$compile", function($http, $filter, $log, formLayout,qsUtil,$compile) {

    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      require:"^qsFormLayout",
      link: function(scope, elem, attrs,formctrl) {
        var url = formctrl.getAttrs().url
        var processFormFilds = function(data) {
          formLayout.layout(elem, data, scope);
        }

        if (!url) {
          $log.error('请在指令参数url中传入获取数据的 url 的值');
        }

        //初始化vali对象
        scope.vali = angular.extend({}, scope.vali)
        scope.vali.valiRules = {}
        scope.formEleData = angular.extend({}, scope.formEleData)


        // 日期选择
        scope.formEleData.datapiker = {
          opened: false,
          openDatepicker: function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            scope.formEleData.datapiker.opened = true;
          }
        }
        
        // //返回数据的方法
        scope.vali.qsFormLayoutData = function () {
          var layoutData = {}

          //设置日期 json化时 数据为本地型,而非0时区时间
          Date.prototype.toJSON = function () {
           return this.toLocaleString(); 
          }
          //数据json化
          angular.forEach(scope.vali.layoutData, function(val, key){
            layoutData[key] =  JSON.stringify( val )  
          });
          return layoutData
        }
        
        //重置数据的方法
        scope.vali.resetCount = 0 
        scope.vali.reset= function () {
          scope.vali.layoutData = qsUtil.extend(true,{}, scope.vali.originalData  )
          scope.vali.resetCount++
        }
        scope.$watch('vali.initData',function (newVal) {
          if(newVal === true || "true"){
            scope.vali.originalData = qsUtil.extend(true,{}, scope.vali.layoutData )
          }
        })



        //获取数据
        $http.get(url).success(function(successData, status, headers, config) {
          successData = qsUtil.trimJson(successData)
          //全局样式
          scope.layoutOverallEleConfig = successData.overallEleConfig

          //单独对form的属性
          formctrl.setAttrs( successData.formAttrs )

          //生成表单
          scope.layoutDataFields  = successData.formLayout;
          processFormFilds(successData.formLayout);
        }).error(function() {
          console.error("表单: 获取json失败")
        });

      //end linkFn
      }
    }
  }])

  /**
   * 基于 input 框类型的 表单
   * templateUrl :'js/directive/formlayout/qsFormLayoutText.html'
   * 依赖: $compile
   */
  .directive('qsFormLayoutText', ['qsformlayoutAddAttr', function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutText.html',
      replace: true,
      transclude: true,
      restrict: 'A',
      controller: function($scope) {

      },
      link: function postLink(scope, iElement, iAttrs) {

        var _formGroupEle = iElement ,
            _inputEle     = angular.element(iElement[0].querySelector('.qs-formlayout-text')),
            _labelEle     = angular.element(iElement[0].querySelector('.qs-formlayout-label')),
            _formEleCont  = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));

        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle    : _labelEle,
            _formEle     : _inputEle,
            _formEleCont : _formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)
      }
    };
  }])

  /**
   * 静态类型
   */
  .directive('qsFormLayoutStatic', ['qsformlayoutAddAttr', function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutStatic.html',
      replace: true,
      transclude: true,
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {

        var _formGroupEle = iElement ,
            _inputEle     = angular.element(iElement[0].querySelector('.qs-formlayout-static')),
            _labelEle     = angular.element(iElement[0].querySelector('.qs-formlayout-label')),
            _formEleCont  = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));

        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle    : _labelEle,
            _formEle     : _inputEle,
            _formEleCont : _formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)
      }
    };
  }])

  /**
   * 图片类型
   */
  .directive('qsFormLayoutImg', ['qsformlayoutAddAttr', function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutImg.html',
      replace: true,
      transclude: true,
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {

        var _formGroupEle = iElement ,
            _inputEle     = angular.element(iElement[0].querySelector('.qs-formlayout-img')),
            _labelEle     = angular.element(iElement[0].querySelector('.qs-formlayout-label')),
            _formEleCont  = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));

        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle    : _labelEle,
            _formEle     : _inputEle,
            _formEleCont : _formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)
      }
    };
  }])

  /**
   * select类型的表单
   */
  .directive('qsFormLayoutSelect', ['qsformlayoutAddAttr', function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutSelect.html',
      replace: true,
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {
      
        var _formGroupEle = iElement
        var _formEle = angular.element(iElement[0].querySelector('.qs-formlayout-select'));
        var _labelEle = angular.element(iElement[0].querySelector('.qs-formlayout-label'));
        var _formEleCont = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));
        //遍历对象
        //处理表单数组的第一个对象并移除它
        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle    : _labelEle,
            _formEle     : _formEle,
            _formEleCont : _formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)
      }
    };
  }])

  /**
   * 单选与多选框
   */
  .directive('qsFormLayoutRadioCheckbox', ['qsformlayoutAddAttr', function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutRadioCheckbox.html',
      replace: true,
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {

        var _formGroupEle = iElement
        var _repeatcont = angular.element(iElement[0].querySelector('.qs-formlayout-retpeat-cont'));
        var _formEle = angular.element(iElement[0].querySelector('.qs-formlayout-redio-or-checkbox'))
        var _formEleCont = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));
        var _labelEle = angular.element(iElement[0].querySelector('.qs-formlayout-label'));


        var setAttrparams = {
          scope: scope,
          dataIdx: iAttrs.qsFormlayoutId,
          _formGroupEle: _formGroupEle,
          _labelEle    : _labelEle,
          _formEle     : _formEle,
          _formEleCont : _formEleCont,
        }
        qsformlayoutAddAttr(setAttrparams)
      }
    };
  }])

  /**
   * 日期选择器
   */
  .directive('qsFormLayoutDatepicker', ["qsformlayoutAddAttr",function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formLayout/qsFormLayoutDatepicker.html',
      replace: true,
      transclude: true,
      restrict: 'AE',
      link: function postLink(scope, iElement, iAttrs) {
        var _formGroupEle  = iElement  ,
            _formEle       = angular.element(iElement[0].querySelector('.qs-formlayout-datepicker'))  ,
            _labelEle      = angular.element(iElement[0].querySelector('.qs-formlayout-label'))  ,
            _formEleCont   = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));

        var setAttrparams = {
            scope        : scope,
            dataIdx      : iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle    : _labelEle,
            _formEle     : _formEle,
            _formEleCont : _formEleCont
          }
        
        qsformlayoutAddAttr(setAttrparams)
        // _formEle[0].onfocus = function () {
        //   console.log('fasdf');
        //   scope.isOpen  = true
        // }
      }
    };
  }])

  /**
   * 设置默认的日期 为今天
   */
  .directive('qsFormlayoutDatepickerSettoday', ["$timeout","dateParser",function ($timeout,dateParser) {
    return {
      restrict: 'A',
      require:"?ngModel",
      link: function postLink(scope, iElement, iAttrs,ngModel) {
        if( typeof ngModel !== "undefined"){
          var modelName = ngModel.$name
          var today = new Date()
          ngModel.$setViewValue( today )
          //当重置时 ,重新格式化时间
          scope.vali.originalData[modelName] = today
          scope.$watch('vali.resetCount',function (newVal,oldVal) {
            ngModel.$setViewValue( today )
            ngModel.$render()
          })
          iElement[0].onblur = function () {
            $timeout(function () {
              if ( scope.vali.layoutData[modelName] === null){
                scope.vali.layoutData[modelName] = today
                ngModel.$setViewValue( today )
                ngModel.$render()
              }
            }, 0);
          }
        }
      }
    };
  }])

  /**
   *  textArea
   */
  .directive('qsFormLayoutTextarea', ['qsformlayoutAddAttr', function(qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutTextarea.html',
      replace: true,
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {

        var _formGroupEle     = iElement,
            _inputEle         = angular.element(iElement[0].querySelector('.qs-formlayout-textarea')),
            _labelEle         = angular.element(iElement[0].querySelector('.qs-formlayout-label')),
            _formEleCont      = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));


        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle    : _labelEle,
            _formEle     : _inputEle,
            _formEleCont : _formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)

        // endlink
      }
    };
  }])
  
  /**
   * 多级联动选择
   */
  .directive('qsFormLayoutLinkage', [ "$http","$timeout","qsformlayoutAddAttr",function($http,$timeout,qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formLayout/qsFormLayoutLinkage.html',
      replace: true,
      transclude: true,
      restrict: 'AE',
      link: function postLink(scope, iElement, iAttrs,ngModel) {
        var _formGroupEle  = iElement  ,
            _formEle       = angular.element(iElement[0].querySelector('.qs-formlayout-select'))  ,
            _labelEle      = angular.element(iElement[0].querySelector('.qs-formlayout-label'))  ,
            _formEleCont   = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));

        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle: _formGroupEle,
            _labelEle: _labelEle,
            _formEle: _formEle,
            _formEleCont:_formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)
        //end link 
      }
    };
  }])  
  /**
   * 按钮
   */
  .directive('qsFormLayoutBtns', ['qsformlayoutAddAttr',function (qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutBtns.html',
      replace: true,
      transclude: true,
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {
        var _formGroupEle = iElement
        var _formEleCont  = angular.element(iElement[0].querySelector('.qs-formlayout-btn-cont'));

        var setAttrparams = {
          scope: scope,
          dataIdx: iAttrs.qsFormlayoutId,
          _formGroupEle: _formGroupEle,
          _formEleCont: _formEleCont
        }
        qsformlayoutAddAttr(setAttrparams)
      }
    };
  }])

  /**
   * 编辑器
   */
  .directive('qsFormlayoutHtmledit', ["qsformlayoutAddAttr",function (qsformlayoutAddAttr) {
    return {
      templateUrl: 'js/directive/formlayout/qsFormLayoutHtmledit.html',
      replace: true,
      restrict: 'EA',
      link: function postLink(scope, iElement, iAttrs) {
        var _formGroupEle = iElement ,
            _formEle      = angular.element(iElement[0].querySelector('.qs-formlayout-htmledit')),
            _labelEle     = angular.element(iElement[0].querySelector('.qs-formlayout-label')),
            _formEleCont  = angular.element(iElement[0].querySelector('.qs-formlayout-ele-cont'));

        var setAttrparams = {
            scope: scope,
            dataIdx: iAttrs.qsFormlayoutId,
            _formGroupEle : _formGroupEle,
            _labelEle     : _labelEle,
            _formEle      : _formEle,
            _formEleCont  : _formEleCont
          }
        qsformlayoutAddAttr(setAttrparams)
      //end link
      }
    };
  }])


  .directive('qsFormLayoutPh', ["$compile",function ($compile) {
    return {
      template:'<div name="{{name}}" ></div>',
      replace: true,
      restrict: 'AE',
      // scope:{},
      link: function postLink(scope, iElement, iAttrs) {

        var attrsData = scope.layoutDataFields[iAttrs.qsFormlayoutId]
        var template , name
        angular.forEach(attrsData, function (val,attr) {
          switch(attr){
            case "template":
              template = val
              break
            case "name":
              scope.name = val
              break
            default:
              iElement.attr(attr,val)
          }
          // $compile(newEle)(scope); 
        })
        if(!angular.isUndefined(template)){
          var newEle = angular.element(  template   )
          iElement.append( newEle )
          $compile(newEle)(scope);
        }
        //end link 
      }
    };
  }])

  .directive('qsFormLayoutPhurl', [function () {
    return {
      template:'<div ng-include="getContentUrl()" data-name="{{name}}" ></div>',
      replace: true,
      restrict: 'AE',
      scope:{},
      link: function postLink(scope, iElement, iAttrs) {
      
        var attrsData = scope.$parent.layoutDataFields[iAttrs.qsFormlayoutId]
        var templateUrl
        scope.getContentUrl = function() {
          return templateUrl;
        }
        angular.forEach(attrsData, function (val,attr) {
          // console.log(attr,val)
          switch(attr){
            case "type":
              iElement.attr( 'type',val )
              break
            case "name":
              iElement.attr( 'name',val )
              scope.name = name
              break
            case "templateUrl":
              templateUrl = val
              break
          }
        })
        //end link 
      }
    };
  }])
//end define
})