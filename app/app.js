/**
 * Created by zhiheng.li on 2016/4/18.
 */
// bootstrap

define(['common', 'router', 'config'], function (angularAMD, registerRoutes, config) {

    var app = config.app;

    app.config(function (RestangularProvider) {
        //RestangularProvider.setBaseUrl('http://localhost:3001');
        //RestangularProvider.setBaseUrl('http://localhost:8080/qishon-iss-web/rest/');
        // RestangularProvider.setBaseUrl('http://1.1.20.9:3000/api');
        RestangularProvider.setBaseUrl('http://localhost:3000/');
    });

    /**
     * 路由配置
     */
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);
    //
    return angularAMD.bootstrap(app);


});
