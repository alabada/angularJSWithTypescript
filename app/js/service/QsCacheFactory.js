/**
 * Created by zhida.wen on 2016/6/15.
 */
define(["app"], function (app) {
    app.factory('QsCacheFactory', function() {

        /**
         * 构造函数：构造出一个缓存容器
         * @param cacheId
         * @param options
         * @constructor
         */
        var QsCache = function(cacheId, options) {
            this._cacheId = cacheId;
            this._cache = {};
            this._head = null;
            this._tail = null;
            this._options = angular.extend({
                capacity: false
            }, options || {});
        };

        /**
         * get ：根据cacheKey获取缓存
         * @param cacheKey
         * @returns {*}
         */
        QsCache.prototype.get = function(cacheKey) {
            if (!this._cache.hasOwnProperty(cacheKey)) { // 检查是否已经缓存该值
                return undefined;
            }

            var entry = this._cache[cacheKey];

            if (entry.expiration) { // 若缓存过期移除并返回undefined
                var now = new Date();
                if (now.getTime() > entry.expiration.getTime()) {
                    this.remove(cacheKey);
                    return undefined;
                }
            }

            moveToHead.call(this, entry);
            return entry.value;
        };

        /**
         * put : 保存缓存值
         * @param cacheKey
         * @param value
         * @param ttl : time to live 生存时间
         * @param tags : 标签
         */
        QsCache.prototype.put = function(cacheKey, value, ttl, tags) {
            if (!angular.isArray(tags)) {
                tags = angular.isString(tags) ? [tags] : [];
            }

            var entry = {
                key: cacheKey,
                value: value,
                expiration: false,
                tags: tags
            };

            ttl = parseInt(ttl, 10);

            if (isFinite(ttl) && ttl > 0) { // 生存时间为大于0的有限数字
                entry.expiration = new Date(new Date().getTime() + ttl);
            }

            moveToHead.call(this, entry);
            this._cache[cacheKey] = entry;

            var size = Object.keys(this._cache).length;
            if (this._options.capacity > 0 && size > this._options.capacity) { // 缓存数量超出
                clearExpired.call(this);

                if (Object.keys(this._cache).length > this._options.capacity) { // 缓存都还没过期，把最后一个移除
                    purgeTail.call(this);
                }
            }
        };

        /**
         * 把该缓存移动到第一位
         * @param entry
         */
        var moveToHead = function(entry) {
            if (this._head) { // 缓存中已经包含有元素，往头结点插入该元素
                entry.next = this._head;
                this._head.previous = entry;
            } else {
                entry.next = null;
            }

            entry.previous = null; // 前置节点设为空
            this._head = entry;

            if (!this._tail) { // 若插入的是第一个元素，需要更新尾结点
                this._tail = entry;
            }
        };

        /**
         * 移除尾部缓存
         */
        var purgeTail = function() {
            if (this._head === this._tail) { //
                return;
            }

            var tail = this._tail;
            var previous = tail.previous;
            previous.next = null;
            this._tail = previous;
            delete this._cache[tail.key];
        };

        /**
         * 移除过期缓存
         */
        var clearExpired = function() {
            var now = new Date();
            var _this = this;
            angular.forEach(this._cache, function(entry, cacheKey) {
                if (entry.expiration) {
                    if (now.getTime() > entry.expiration.getTime()) {
                        _this.remove(cacheKey);
                    }
                }
            });
        };

        /**
         * remove : 根据cacheKey移除缓存
         * @param cacheKey
         */
        QsCache.prototype.remove = function(cacheKey) {
            if (this._cache.hasOwnProperty(cacheKey)) {
                var entry = this._cache[cacheKey];

                // 得到其前后节点
                var previous = entry.previous;
                var next = entry.next;

                if (previous) {
                    previous.next = next;
                }

                if (next) {
                    next.previous = previous;
                }

                if (this._tail === entry) {
                    this._tail = previous;
                }

                delete this._cache[cacheKey];
            }
        };

        /**
         * 清空缓存
         */
        QsCache.prototype.removeAll = function() {
            this._cache = {};
            this._head = null;
            this._tail = null;
        };

        /**
         * 删除匹配标签的缓存
         * @param tag
         */
        QsCache.prototype.removeMatchingTag = function(tag) {
            // TODO: Use a faster lookup, perhaps a map?
            var _this = this;
            angular.forEach(this._cache, function(entry, cacheKey) {
                if (-1 !== entry.tags.indexOf(tag)) {
                    _this.remove(cacheKey);
                }
            });
        };

        /**
         * 销毁指定的id的整个缓存
         */
        QsCache.prototype.destroy = function() {
            this.removeAll();
            delete caches[this._cacheId];
            //console.log(caches);
        };

        // 初始化缓存组
        var caches = {};

        var factory = function(cacheId, options) {
            if (caches.hasOwnProperty(cacheId)) {
                throw "你所指定的cacheId名称'" + cacheId + "' 已经被注册过了。"
            }
            var cache = new QsCache(cacheId, options); // 初始化出一个缓存容器出来
            caches[cacheId] = cache;
            return cache;
        };

        /**
         * 获取缓存容器
         * @param cacheId
         * @returns {*}
         */
        factory.get = function(cacheId) {
            return caches[cacheId];
        };

        factory.QsCache = QsCache;

        return factory;

    });
});