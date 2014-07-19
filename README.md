# jquery.cookie [![spm version](http://spmjs.io/badge/jquery.cookie)](http://spmjs.io/package/jquery.cookie)
AUTHOR WEBSITE: [http://ydr.me/](http://ydr.me/)

Simple to operate cookie.

__IT IS [A spm package](http://spmjs.io/package/jquery.cookie).__




#USAGE
```
var $ = require('jquery');
require('jquery.cookie')($);

// 1. 配置参数
$.cookie.defaults = {...};
$.cookie(settings);


// 2. 设置cookie
$.cookie(settings).set('key', 'value');
$.cookie(settings).set({
   'key1': 'val1',
   'key2': 'val2'
});


// 3. 获取cookie
$.cookie(settings).get();
$.cookie(settings).get('key');
$.cookie(settings).get(['key1', 'key2']);


// 4. 清除cookie
$.cookie(settings).remove();
$.cookie(settings).remove('key');
$.cookie(settings).remove(['key1', 'key2']);
```



#OPTIONS
```
defaults = {
    // 是否以严格模式读取和设置cookie，默认true
    // 严格模式下，将在读之后、写之前都会进行 encodeURIComponent、decodeURIComponent操作
    isStrict: !0,
    // 在无域名的时候，必须设置为空才能在本地写入
    domain: location.hostname || '',
    // 默认cookie有效期1个小时（单位秒）
    expires: 3600,
    // 默认cookie存储路径
    path: '/',
    // 是否加密cookie
    secure: !1
}
```


#SET OPTIONS
```
$.cookie.defaults;
```


