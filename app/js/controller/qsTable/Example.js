define([
    "js/directive/table/qsTableDirective",
    "js/directive/table/draggableDirective"
], function () {
    return ['$scope', function ($scope) {

        $scope.interface = {};

        $scope.fresh = function(){
            $scope.data = [
                {name: "Moroni", age: 50, money: -10},
                {name: "Tiancum", age: 43, money: 120},
                {name: "Jacob", age: 27, money: 5.5},
                {name: "Nephi", age: 29, money: -54},
                {name: "Enos", age: 34, money: 110},
                {name: "Tiancum", age: 43, money: 1000},
                {name: "Jacob", age: 27, money: -201},
                {name: "Nephi", age: 29, money: 100},
                {name: "Enos", age: 34, money: -52.5},
                {name: "Tiancum", age: 43, money: 52.1},
                {name: "Jacob", age: 27, money: 110},
                {name: "Nephi", age: 29, money: -55},
                {name: "Enos", age: 34, money: 551},
                {name: "Tiancum", age: 43, money: 1000},
                {name: "Jacob", age: 27, money: -201},
                {name: "Nephi", age: 29, money: 100},
                {name: "Enos", age: 34, money: -52.5},
                {name: "Tiancum", age: 43, money: 52.1},
                {name: "Jacob", age: 27, money: 110},
                {name: "Nephi", age: 29, money: -55},
                {name: "Enos", age: 34, money: 551},
                {name: "Tiancum", age: 43, money: -1410},
                {name: "Jacob", age: 27, money: 410},
                {name: "Nephi", age: 29, money: 100},
                {name: "Enos", age: 34, money: -100}];
            $scope.totalItems = $scope.data.length;
        }

        $scope.fresh();

        $scope.data1 = [
            {
                name: "Moroni",
                eyeColor: "green",
                age: 50,
                balance: "111111.0989",
                company: "启尚科技",
                address: "福建省厦门市湖里区望海路203-205",
                "friends": [{"name":"Grace Hanson","id":0},{"name":"Carlene Whitley","id":1},{"name":"Cassandra Parsons","id":2}],
                favoriteFruit: "food"
            },
            {
                name: "sss",
                eyeColor: "blue",
                age: 33,
                balance: "110901.0989",
                company: "尚科技",
                address: "福建省厦门市湖里区望海路209-205",
                "friends": [{"name":"Marta Crane","id":0},{"name":"Lela Pearson","id":1},{"name":"Casandra Finley","id":2}],
                favoriteFruit: "汉堡king"
            },
            {
                name: "发方法是",
                eyeColor: "blue",
                age: 13,
                balance: "1101.0989",
                company: "科技",
                address: "福建省厦门市湖里区望海路209-05",
                "friends": [{"name":"Celina Hopper","id":0},{"name":"Janet Huffman","id":1},{"name":"Decker Moody","id":2}],
                favoriteFruit: "hhhh"
            }
        ];
        $scope.totalItems1 = $scope.data1.length;

        $scope.report = {
            selectedPerson: null
        };

        $scope.test = function (e) {
            alert('Alert from controller method!');
        };

        $scope.showItem = function (item) {
            alert(JSON.stringify(item));
        };

        $scope.getTotalBalance = function (data) {
            //return if empty or not ready
            if (!data || !data.length) return;

            var totalNumber = 0;
            for (var i = 0; i < data.length; i++) {
                totalNumber = totalNumber + parseFloat(data[i].money);
            }

            return Math.round(totalNumber);

        };

        // this variable will contains all data after loading
        $scope.dataFromUrl = [];

        /*codemirror*/

        $scope.editorOptions = {
            lineNumbers: true,
            readOnly: 'nocursor'
        };

        $scope.editorOptionsJS = {
            lineNumbers: true,
            readOnly: 'nocursor',
            mode: "javascript"
        };

        $scope.interface.reLoadData = function() {
            console.log("data reload");
        }
    }]
})