/**
 * Created by zhida.wen on 2016/6/15.
 */
define(["js/service/MyCacheService"], function () {

    return ["$scope", "MyCacheService", function ($scope, MyCacheService) {
        $scope.jsonData = '';

        // 清空本地数据
       $scope.reset = function () {
           $scope.jsonData = '';
       };

        // 不带缓存获取数据
        $scope.getdata = function () {
            MyCacheService.getSlowData().then(function (data) {
                $scope.jsonData = data;
                $scope.$apply()
            });
        };

        // 带缓存获取数据
        $scope.getCachedata = function () {
            var cacheKey = 'jsonCrud';
            var cached = MyCacheService.cache.get(cacheKey);

            if (cached) { // 打中缓存
                $scope.jsonData = cached;
            } else {
                MyCacheService.getSlowData().then(function (data) {
                    MyCacheService.cache.put(cacheKey, data); // 不加生命周期的缓存
                    $scope.jsonData = data;
                    $scope.$apply()
                });
            }
        };

        // 根据缓存key移除具体的缓存
        $scope.removeCacheByKey = function () {
            var cacheKey = 'jsonCrud';
            MyCacheService.cache.remove(cacheKey);
        }

        // 给缓存增加生命周期
        $scope.getExpiredCachedata = function () {
            var cacheKey = 'jsonCrud1';
            var cached = MyCacheService.cache.get(cacheKey);

            if (cached) { // 打中缓存
                $scope.jsonData = cached;
            } else {
                MyCacheService.getSlowData().then(function (data) {
                    MyCacheService.cache.put(cacheKey, data, 6000); // 带生命周期的缓存
                    $scope.jsonData = data;
                    $scope.$apply()
                });
            }
        };

        // 移除所有缓存数据
        $scope.removeAllCache = function () {
            MyCacheService.cache.removeAll();
        }

        // 销毁当前缓存
        $scope.destroyCache = function () {
            MyCacheService.cache.destroy();
        }

    }];
});