/**
 * Created by wenhui.gao on 2016/7/7.
 */
define([

  //用于显示商品列表
  "js/directive/panel/qsPanel.js", 
  "js/directive/pagination/qsPagination.js",
  "js/service/GridDataService.js",
  "js/service/GridCommonService.js",
  "js/directive/grid/qsGrid.js",
  "js/directive/alert/SweetAlert.js",
  "js/service/fbi/Demo2goodRepository.js",
  //用于显示表单
  "qsformlayout",
  ], function () {
     return ['$scope', '$filter', '$location', "GridData", "GridCommon", "SweetAlert", "demo2goodRepository", function ($scope, $filter, $location, GridData, GridCommon, SweetAlert, demo2goodRepository){
      //json 地址
      $scope.editFormUrl = "./config/fbi/demo2/demo2editForm.json"
      $scope.showDetailFormLayout = "./config/fbi/demo2/showDetailFormLayout.json"

      $scope.interface = {
        // grid对应配置json
        url : './config/fbi/demo2/demo2Panel.json',
        // 各种条件过滤出来的条目
        filteredItems : [],
        // 存放被选中的条目。controller中可以直接使用。
        selectedItems : [],
        // 二维数组，存放每一页码中对应的条目。
        pagedItems : [],
        // 指定页面打开显示的页码
        curPage : 1,
        // 指定默认按什么字段进行排序
        sortingOrder : 'id',
        // 设置默认当前页显示条目数量
        itemsPerPage : 5,
        // 总的条目数，用于计算分页
        totalItems : 0,
        edit : function(id) {
            $location.path('dashboard/gridModify/' + id);
            GridData.setCurPage($scope.interface.curPage);
        },

        view : function(id) {
            $location.path('dashboard/gridView/' + id);
            GridData.setCurPage($scope.interface.curPage);
        },

        del : function (item) {
            SweetAlert.swal({
                title: '确认删除?',
                text: '删除后将无法撤销',
                type: 'error',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认删除',
                closeOnConfirm: false
            },  function(isConfirm) {
                if (isConfirm) {
                    demo2goodRepository.remove(item).then(function () {
                        SweetAlert.swal('删除成功！');
                        $scope.fresh();
                    });
                }
            });
            GridData.setCurPage($scope.interface.curPage);
        },
        refresh : function () {
            $scope.fresh();
        }
      }
      

      $scope.search = function(searchType) {

        $scope.interface.filteredItems = $filter('filter')($scope.items, function(item) {
          if (GridCommon.searchMatch(item[searchType], $scope["query"+ $filter('uppercase')(searchType)] )) {
            return true;
          }
          return false;
        });  
        GridCommon.orderAndDisplay($scope.interface);
      };

      // 加载数据并刷新视图
      $scope.fresh = function () {
          // demo2goodRepository 由 services demo2goodRepository提供
          demo2goodRepository.getAll().then(function (items) {
              $scope.items = items;
              angular.forEach($scope.items, function (item, index) {
                  item.gridIndex = index;
                  item.itemSelected = false;
              });
              $scope.search();
              $scope.interface.curPage = GridData.getCurPage();
          });
      };
      $scope.fresh();
      $scope.viewRowFuc = function () {
          if ($scope.interface.selectedItems.length <= 0) {
              SweetAlert.swal('请至少选中一个条目');
          } else if ($scope.interface.selectedItems.length > 1) {
              SweetAlert.swal('只能选中一个条目');
          } else {
              GridData.setCurPage($scope.interface.curPage);
              $location.path('dashboard/gridView/' + $scope.interface.selectedItems[0].id);
          }
      }


      // 项部的重置方法
      $scope.resetTopCtrl = function () {
        $scope.queryCATE = ""
        $scope.querySEASON = ""
        $scope.queryPRICE = ""
        $scope.queryGOODNAME = ""
        $scope.queryCODE = ""
        $scope.fresh();
      }

      /*右侧表单显示*/ 
      $scope.rightDetalVali = {layoutData:{}}
      $scope.$watch("interface.selectedItems[0]", function (newSelectItem ,oldSelectItem) {
        if(!angular.isUndefined(newSelectItem)){
          if(oldSelectItem === newSelectItem){
            return
          }else{
            angular.forEach(newSelectItem, function (attrValue,attrName) {
              if(!angular.isFunction(attrValue)){
                $scope.rightDetalVali.layoutData[attrName] = attrValue
              }
            })
          }
        }else{
          $scope.rightDetalVali = {layoutData:{}}
        }
      })
      /*end右侧表单显示*/


      //搜索折叠
      $scope.isCollapsed = false;
      $scope.CollapseText = "折叠"
      $scope.$watch("isCollapsed",function (newVal,oldVal) {
        if(newVal === oldVal){return}
        if(!newVal){
          $scope.CollapseText = "折叠"  
        }else{
          $scope.CollapseText = "展开"  
        }
        
      })


      /*调式用*/
      $scope.shScope =function () {
        console.log($scope);
      }
    //end controller
    }];
});