/**
 * Author: zhiheng.li
 * CreateTime: 2016/4/18
 * Description:
 */
'use strict';
define(["app"], function (app) {
    // class
    var UserRepository = (function () {
        // constructors
        function UserRepository() {
            // users
            this.users = new Array();
            this.users.push({ name: "san.zhang", address: "xiamen" });
            this.users.push({ name: "si.li", address: "fuzhou" });
            this.users.push({ name: "wu.wang", address: "zhangzhou" });
        }
        // methods
        UserRepository.prototype.getUserByName = function (name) {
            // result
            var result = null;
            for (var key in this.users) {
                if (this.users[key].name == name) {
                    result = this.users[key];
                }
            }
            // return
            return result;
        };
        // return
        return UserRepository;
    })();
// register
    app.service("UserRepository", [UserRepository]);
});