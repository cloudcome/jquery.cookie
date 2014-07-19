/*!
 * jquery.cookie.js
 * @author ydr.me
 * @version  1.1
 * 2014年7月1日11:40:10
 */


/**
 * v1.0
 * 2013年10月23日10:22:40
 * 构造
 *
 * v1.1
 * 2014年7月1日11:40:10
 * 重新设置，OOP，更友好的API
 * SPM 模块化
 */





/**
 * 1. 配置参数
 * $.cookie.defaults = {...};
 * $.cookie(settings);
 *
 *
 * 2. 设置cookie
 * $.cookie(settings).set('key', 'value');
 * $.cookie(settings).set({
 *    'key1': 'val1',
 *    'key2': 'val2'
 * });
 *
 *
 * 3. 获取cookie
 * $.cookie(settings).get();
 * $.cookie(settings).get('key');
 * $.cookie(settings).get(['key1', 'key2']);
 *
 *
 * 4. 清除cookie
 * $.cookie(settings).remove();
 * $.cookie(settings).remove('key');
 * $.cookie(settings).remove(['key1', 'key2']);
 *
 */



module.exports = function($) {
    var defaults = {
            // 是否以严格模式读取和设置cookie，默认true
            // 严格模式下，将在读之后、写之前都会进行<code>encodeURIComponent</code>、<code>decodeURIComponent</code>操作
            isStrict: !0,
            // 在无域名的时候，必须设置为空才能在本地写入
            domain: location.hostname || '',
            // 默认cookie有效期1个小时（单位秒）
            expires: 3600,
            // 默认cookie存储路径
            path: '/',
            // 是否加密cookie
            secure: !1
        },
        udf,
        win = window,
        doc = win.document,
        encode = encodeURIComponent,
        decode = decodeURIComponent,
        each = $.each,
        isArray = $.isArray;

    $.cookie = function(settings) {
        return new Cookie($.extend({}, defaults, settings))._parse();
    };
    $.cookie.defaults = defaults;

    function Cookie(options) {
        this.options = options;
    }

    Cookie.prototype = {
        /**
         * 解析cookie为键值对
         * @return this
         * @version 1.0
         * 2014年7月1日14:32:48
         */
        _parse: function() {
            var cookieArr = doc.cookie.split(';'),
                that = this,
                options = that.options,
                ret = {};

            each(cookieArr, function(index, part) {
                var pos = part.indexOf('='),
                    key = part.slice(0, pos).trim(),
                    val = part.slice(pos + 1).trim();
                if (options.isStrict) val = decode(val);
                ret[key] = val;
            });

            that._result = ret;
            // 记录改变的键值对，用于字符串化
            that._change = {};
            // 记录删除的键值对，用于字符串化
            that._remove = {};

            return that;
        },




        /**
         * 字符串化
         * @param  {Number} type 类型值
         * 1=change
         * 2=remove
         * 3=clear
         * @return {[type]}      [description]
         */
        _stringif: function(type) {
            var map, that = this,
                options = that.options,
                isRemove = !0;
            switch (type) {
                case 1:
                    map = that._change;
                    isRemove = !1;
                    break;
                case 2:
                    map = that._remove;
                    break;
                case 3:
                    map = {};
                    each(that._result, function(key) {
                        map[key] = '';
                    });
                    break;
            }

            if (map) {
                each(map, function(key, val) {
                    if (options.isStrict) val = encode(val);
                    var a = [key + '=' + val],
                        d = new Date();

                    d.setTime(d.getTime() + isRemove ? -1 : options.expires * 1000);
                    a.push('expires=' + d.toGMTString());
                    if (options.path) a.push('path=' + options.path);
                    if (options.domain) a.push('domain=' + options.domain);
                    if (options.secure) a.push('secure=secure');

                    doc.cookie = a.join(';') + ';';
                });
            }

            return that;
        },






        /**
         * 获取所有、1个或多个cookie
         * @param  {String/Array} key cookie键
         * @return {String/Object} cookie值
         * @version 1.0
         * 2014年7月1日12:05:57
         */
        get: function(key) {
            if (key === udf) return this._result;

            var isMulitiple = isArray(key),
                keys = isMulitiple ? key : [key],
                ret = {},
                that = this;

            each(keys, function(index, key) {
                ret[key] = that._result[key];
            });

            return isMulitiple ? ret : ret[key];
        },





        /**
         * 设置1个或多个cookie
         * @param {String/Object} key 1个cookie键或cookie键值对
         * @param {String} val cookie值
         * @return this
         * @version 1.0
         * 2014年7月1日12:07:36
         */
        set: function(key, val) {
            var map = {},
                hasChange, i, that = this;

            if (val === udf) map = key;
            else map[key] = val;

            for (i in map) {
                map[i] = '' + map[i];
                if (map[i] !== that._result[i]) {
                    that._result[i] = map[i];
                    that._change[i] = map[i];
                    hasChange = !0;
                }
            }

            if (hasChange) that._stringif(1);

            return that;
        },


        /**
         * 移除1个或多个或所有cookie
         * @param  {String/Array} key 1个或多个键
         * @return this
         * @version 1.0
         * 2014年7月1日14:27:41
         */
        remove: function(key) {
            if (key === udf) return that._stringif(3);

            var isMulitiple = isArray(key),
                keys = isMulitiple ? key : [key],
                ret = {},
                that = this;

            each(keys, function(index, key) {
                ret[key] = '';
            });

            that._remove = ret;
            return that._stringif(2);
        }
    };
};
