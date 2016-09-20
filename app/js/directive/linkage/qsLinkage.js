/*
 **createdBy wenhui.gao 2016/7/20
 */
define([
  "QsUtil"
], function() {
  angular.module('qs.linkage', [])
    /*
     * 三联地区选择服务
     */
    .provider('linkagePrvd', [function() {
      this.$get = ["qsUtil", function(qsUtil) {
        var Linkage = function() {
          this.isInit = false
        }
        Linkage.prototype = {
          constructor: Linkage,
          init: function(options) {
            this._element = options._element;
            this.p_ngModel = options.p_ngModel;
            this.pickerName = this.p_ngModel.slice(this.p_ngModel.lastIndexOf('.') + 1)
            this.scope = options.scope;
            this.DATA = options.DATA
            this.levels = options.levels
            this.indexCode = options.indexCode || 86
            this.isInit = true
            var self = this, //保存this
              levels = this.levels,
              data = this.DATA
              // console.log(data);
              //初始化下拉对象
            angular.forEach(this._element.children(), function(ele, idx) {
              self["_" + levels[idx]] = angular.element(ele)
            })
            self.reset()
            // self.bindChange()
          },
          set:function (setData) {
            var self = this 
            if( self.isInit ){
              self.reset(setData)  
            } else {
              setTimeout(function () {
                self.set(setData)
              }, 300);
            }
          },
          reset: function(setData) {
            levels = this.levels
            for (var i = 0; i < levels.length; i++) {
                this.output(levels[i],false,setData);  
            }
          },
          output: function(type, isChange,setData) {
            var self = this,
              scope = self.scope,
              _select = self["_" + type],
              code = null,
              DATA = self.DATA,
              idx = 0,
              p_ngModel = self.p_ngModel,
              i, firstDistrictKey, districts, region,
              indexCode = self.indexCode,
              levels = self.levels,
              setDatas = setData || null
              setData = {};

            if( !!setDatas ){
              angular.forEach(setDatas,function (obj,objName) {
                if(objName === p_ngModel ){
                  setData = obj              
                }
              })
            }
            var p_ngModelArr = self.p_ngModel.split(".")

            //判断ngmodel 是否存在不存则创建一个
            for (i = 0; i < p_ngModelArr.length; i++) {
              if (i !== 0) {
                p_ngModelArr[i] = p_ngModelArr[i - 1] + "." + p_ngModelArr[i]
              }
              //无该对象时生成一个
              if (angular.isUndefined(scope.$eval(p_ngModelArr[i]))) {
                if (i === 0) {
                  scope[p_ngModelArr[i]] = {}
                } else {
                  var lastname = p_ngModelArr[i].slice(p_ngModelArr[i].lastIndexOf('.') + 1)
                  scope.$eval(p_ngModelArr[i - 1])[lastname] = {}
                }
              }
              region = scope.$eval(p_ngModelArr[i])
            }
        


            /************************************
            //初始化数据
            // 已放弃
            // 放弃原因: model 不能更新
            // var initCode = { province:0,city:0 ,district:0 }
            // angular.forEach(region, function(val, itype){
            //   if( angular.isString(val) ){
            //     var id = null
            //     var code = (
            //         itype === LEVEL1 ? CHINACODE:
            //         itype === LEVEL2 ? initCode.province:
            //         itype === LEVLE3 ?initCode.city :null
            //       )
            //     var data = DATA[ code ] 
            //     angular.forEach(data, function(str, strId){
            //       if(str === val || str.text === val){
            //         region[itype] = {
            //           "id": +strId,
            //           "text":val
            //         }
            //         initCode[itype] = +strId
            //       }
            //     });
            //   }
            // });
            // console.warn( region)
            *******************************************/
            // console.info(setData['province']);
            for (i = 0; i < levels.length; i++) {
              // console.log(setData);
              code = (
                type === levels[0] ? indexCode :
                type === levels[i] ? (setData[ levels[i-1] ] && setData[ levels[i-1] ]['id']) ||
                                    (region && region[levels[i - 1]] && region[levels[i - 1]]['id']) : code
              )
            }
            // districts = angular.isNumber(code) ? DATA[code] : -1;
            if (code === indexCode) {
              if (angular.isUndefined(DATA[indexCode])) {
                console.error('qsLinkage: 你传入的qs-linkage-index-code 是错误的')
                return
              }
            }
            districts = DATA[code]

            /**************
             --- json数据改造 ---- 
             改造前
             "120000": {
                 "120100": "天津市市辖区",
                 "120200": "天津市郊县"
             }
             改造后
             "120000": {
                 "120100": {"id": 120100 ,"text":"天津市市辖区"},
                 "120200": {"id": 120200 ,"text":"天津市郊县"}
             }
             *****************/


            if (!angular.isUndefined(districts)) {
              angular.forEach(districts, function(str, key) {
                if (angular.isString(str)) {
                  var newDistrictObj = {
                    "id": key,
                    "text": str
                  }
                  districts[key] = newDistrictObj
                }
                if (idx === 0) {
                  firstDistrictKey = key
                }
                idx++
              });
            }



            //model
            if (angular.isUndefined(districts)) {
              region[type] = {}
            } else if (angular.isUndefined(region[type]) || !!isChange) {
              region[type] = districts[firstDistrictKey]
            }
            //数据更新
            region[type] = angular.extend({}, region[type])



            //数据
            if (angular.isObject(districts)) {
              if (angular.isUndefined(scope.formEleData)) {
                scope.formEleData = {}
              }
              scope.formEleData[self.pickerName] = qsUtil.extend({}, scope.formEleData[self.pickerName])
              scope.formEleData[self.pickerName][type] = districts
            } else if (angular.isUndefined(districts)) {
              scope.formEleData[self.pickerName][type] = {}
            }
          },
          bindChange: function() {
            var scope = this.scope,
              name = this.p_ngModel,
              self = this,
              levels = this.levels,
              count = {},
              i

            //初始化count -- 用于重置数据
            for (i = 0; i < levels.length; i++) {
              count[levels[i]] = 0
            }

            for (i = 0; i < levels.length; i++) {
              (function(arg) { //有闭包
                var watchName = (arg === 0 ? name : name + '.' + levels[arg - 1])
                  // console.log(watchName);
                scope.$watch(watchName, function(newVal) {
                  if (!!newVal) {
                    if (count[levels[arg]] > 0) {
                      self.output(levels[arg], true)
                    }
                    count[levels[arg]]++
                  }
                });
              })(i)
            }
          }
        };
        return new Linkage();
        //end $get
      }];
    }])

  .directive('qsLinkage', ['linkagePrvd', "$compile", "$log", "$http", 'qsUtil', function(linkagePrvd, $compile, $log, $http, qsUtil) {
    return {
      replace: true,
      template: function(iElement, iAttrs) {
        var ph = [],
          i, //intReg = /^\+?[1-9][0-9]*$/, //判断正整数的正则
          phMsg = iAttrs.qsLinkagePalaceholder,
          subnames, indexCode, template = "",
          hasLabels = false,
          labels = [];
        // level = !angular.isUndefined(level) ? (level > 3 ? 3 : +level) : 3

        // if (isNaN(level) || !intReg.test(level)) {
        //   $log.error("qs-linkage-level 必需为一个正整数")
        //   return
        // }

        // 必填项
        if (angular.isUndefined(iAttrs.qsLinkageSubnames)) {
          $log.error("qs-linkage-subnames 为必填项")
          return
        } else {
          subnames = iAttrs.qsLinkageSubnames.split(";")
        }
        if (angular.isUndefined(iAttrs.qsLinkageIndexCode)) {
          $log.error("qs-linkage-index-code 为必填项 (json的主引导key)")
          return
        } else {
          indexCode = iAttrs.qsLinkageIndexCode
        }
        //是否有label选项 停
        // if(!angular.isUndefined(iAttrs.qsLinkageLabels)){
        //   hasLabels = true 
        //   labels = iAttrs.qsLinkageLabels.split(";")
        // }
        //初始ph为空
        for (i = 0; i < subnames.length; i++) {
          ph[i] = ""
        }

        if (!angular.isUndefined(phMsg)) {
          var tmpArr = iAttrs.qsLinkagePalaceholder.split(";")
          for (i = 0; i < tmpArr.length; i++) {
            ph[i] = tmpArr[i]
          }

        }

        for (i = 0; i < subnames.length; i++) {
          // template += (!hasLabels  ? "<div class=\"oi-select\"  placeholder=\"" + ph[i] + "\"></div>":
          //                       "<div>"+
          //                         "<label class=\"control-label qs-formlayout-label\">"+ labels[i] +"</label>"+
          //                         "<div class=\"qs-formlayout-ele-cont\">"+
          //                           "<div class=\"oi-select\"  placeholder=\"" + ph[i] + "\"></div>"+
          //                         "</div>"+
          //                       "</div>"
          //             )
          template += "<div class=\"oi-select\"  placeholder=\"" + ph[i] + "\"></div>"
        }
        template = "<div class=\"qs-linkage\">" + template + "</div>"


        return template
      },
      restrict: 'AE',
      link: function postLink(scope, iElement, iAttrs) {
        var levels = {},
          type = null,
          url, p_ngModel
        var indexCode = iAttrs.qsLinkageIndexCode
        levels = iAttrs.qsLinkageSubnames.split(";")



        if (iAttrs.ngModel) {
          p_ngModel = iAttrs.ngModel

          //如果name有为子属性 ,如aaa.b 则为   aaa.b
          //如果name 不是子属性 , 如aaa  则为  aaa
          p_ngModelName = (!/\./.test(p_ngModel) ? p_ngModel :
            p_ngModel.slice(p_ngModel.lastIndexOf("\.") + 1)
          )

          angular.forEach(iElement.children(), function(select, idx) {
            var _select = angular.element(select);
            _select.attr("oi-select", "")
            type = levels[idx]
            _select.attr("oi-options", type + " as " + type + ".text for (key," + type + ") in formEleData." + p_ngModelName + "." + type)
            _select.attr("ng-model", p_ngModel + "." + type)
            $compile(select)(scope)
          });

          url = iAttrs.qsLinkageDataurl
          dataObjName = iAttrs.qsLinkageData
          var initLinkage = function(data) {
            linkagePrvd.init({
                _element:iElement,
                scope: scope,
                DATA: data,
                p_ngModel: p_ngModel,
                levels: levels,
                indexCode: indexCode 
              })
          }
          if (!angular.isUndefined(url)) {
            $http.get(url).success(function(successData) {
              initLinkage(successData)
            }).error(function() {
              $log.error("qsLinkage--多级联动 :  json数据获取失败")
            });
          } else if (!angular.isUndefined(dataObjName)) {
            // 以scope数据传入 //放弃
            dataObj = scope.$eval(dataObjName)
            if (angular.isUndefined(dataObj)) {
              $log.error('qsLinkage : 未找到数据对象')
            } else {
              scope.$watch(dataObjName, function(newVal) {
                if (!qsUtil.isEmpty(newVal) ) {
                  initLinkage(newVal)
                }
              })
            }

          } else {
            $log.error('qs-linkage-dataurl / qs-linkage-data 值请至少传入一个')
          }

          //end if
        }
        //end link
      }
    };
  }])
})