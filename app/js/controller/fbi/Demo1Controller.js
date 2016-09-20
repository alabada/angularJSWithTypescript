/**
 * Created by wenhui.gao on 2016/7/7.
 */
define(["js/directive/tree/qstree1.0"], function () {

    return ["$scope", function ($scope) {
        $scope.datademo1 = [{
            "id":1,
            "roleName": "品牌",
            "roleId": "role1",
            "children": [
                {
                    "id":2,
                    "roleName": "拉萨贝尔",
                    "roleId": "role11",
                    "children": [
                        {
                            "id":5,
                            "roleName": "欧耐力Ochitly",
                            "roleId": "role12",
                            "children": []
                        },
                        {
                            "id":6,
                            "roleName": "其他",
                            "roleId": "role2",
                            "children": []
                    }]
                },
                {
                    "id":3,
                    "roleName": "欧耐力Ochitly",
                    "roleId": "role12",
                    "children": [{
                        "id":7,
                        "roleName": "欧耐力Ochitly",
                        "roleId": "role12",
                        "children": []
                    },
                        {
                            "id":8,
                            "roleName": "其他",
                            "roleId": "role2",
                            "children": []
                        }]
                },
                {
                    "id":4,
                    "roleName": "其他",
                    "roleId": "role2",
                    "children": []
                },
                {
                    "id":4,
                    "roleName": "其他",
                    "roleId": "role2",
                    "children": []
                },
                {
                    "id":4,
                    "roleName": "其他",
                    "roleId": "role2",
                    "children": []
                },
                {
                    "id":4,
                    "roleName": "其他",
                    "roleId": "role2",
                    "children": []
                },{
                    "id":4,
                    "roleName": "其他",
                    "roleId": "role2",
                    "children": []
                }
            ]
        }];

    }];
});