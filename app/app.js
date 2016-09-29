/**
 * Created by zhiheng.li on 2016/4/18.
 */
// bootstrap

define(['common', 'router', './config'], function (angularAMD, registerRoutes, config) {

    var app = config.app;

    /**
     * 路由配置
     */
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);
    //
    return angularAMD.bootstrap(app);


});
