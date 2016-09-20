/**
 * Created by zhiheng.li on 2016/4/18.
 */
// bootstrap
define(['common','router','config'], function(angularAMD,registerRoutes,app) {
    app.config(function (RestangularProvider) {
        //RestangularProvider.setBaseUrl('http://localhost:3001');
        //RestangularProvider.setBaseUrl('http://localhost:8080/qishon-iss-web/rest/');
        // RestangularProvider.setBaseUrl('http://1.1.20.9:3000/api');
         RestangularProvider.setBaseUrl('http://localhost:3000/');
    });
//loading
  app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = true;
      cfpLoadingBarProvider.spinnerTemplate = '<div class="loading-style-8"> <div><span></span></div> <div><span></span></div> <div><span></span></div> <div><span></span></div> </div>';
  }])



/**动态路由
    app.provider('router', function ($stateProvider) {
        var urlCollection;
        this.$get = function ($http,$state) {
            return {
                setUpRoutes: function () {
                    $http.get(urlCollection).success(function (collection) {
                        for (var routeName in collection) {
                            if (!$state.get(routeName)) {
                                console.log("==========================="+routeName)
                                $stateProvider.state(routeName, angularAMD.route(collection[routeName]));
                            }
                        }
                    });
                }
            }
        };
        this.setCollectionUrl = function (url) {
            return urlCollection = url;
        };

    })
        .run(function (router) {
            router.setUpRoutes();
        });
**/


    /**
     * 路由配置
     */

        // config
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);


        // app.config(function Config($httpProvider, jwtInterceptorProvider) {
        //     jwtInterceptorProvider.tokenGetter = [function() {
        //         var token = localStorage.getItem('id_token');
        //         if (token != null) {
        //             return token;
        //         } else {
                    
        //         }
        //     }];
        //     $httpProvider.interceptors.push('jwtInterceptor');
        // }).controller('Controller', function Controller($http) {
        //     $http({
        //         url: '/dashboard/home',
        //         skipAuthorization: true,
        //         method: 'GET'
        //     });
        // });

    return angularAMD.bootstrap(app);
});
