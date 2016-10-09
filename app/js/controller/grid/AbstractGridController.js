/**
 * Created by zhida.wen on 2016/10/8.
 */
define(["require", "exports", "./GridProperty", "./PersonDto", "../../service/GridCommonService", "../../directive/grid/qsGrid"], function (require, exports, GridProperty, PersonDto, GridCommonService) {
    "use strict";
    var AbstractGridController = (function () {
        //static $inject = ["$filter"];
        function AbstractGridController(GridJsonRepository) {
            this.items = [];
            this.gridSearchJsonUrl = '../../../data/gridSearch.json';
            this.gridCrudJsonUrl = '../../../data/gridCrud.json';
            /*
             过滤数据并显示
             */
            this.search = function () {
                this.gridProperty.filteredItems = this.items;
                this.gridCommonService.orderAndDisplay(this.gridProperty);
            };
            // 加载数据并刷新视图
            this.init = function (GridJsonRepository) {
                var vm = this;
                GridJsonRepository.getAll().then(function (items) {
                    angular.forEach(items, function (item, index) {
                        var person = new PersonDto();
                        person.id = item.id;
                        person.name = item.name;
                        person.age = item.age;
                        person.email = item.email;
                        person.dept = item.dept;
                        person.telephone = item.telephone;
                        person.gridIndex = index;
                        person.itemSelected = false;
                        vm.items.push(person);
                    });
                    vm.search();
                });
            };
            this.gridProperty = new GridProperty();
            this.gridCommonService = new GridCommonService();
            this.init(GridJsonRepository);
        }
        return AbstractGridController;
    }());
    return AbstractGridController;
});

//# sourceMappingURL=AbstractGridController.js.map
