define([], function() {
    var bridge = {
        nativeUrl:{
            //登录
            login:"fky://account/login",
            // 商品详情页 参数：productId,sellerId
            productDetail:"fky://product/productionDetail", 
            // 店铺主页 参数：shopId
            shopHome:"fky://shop/shopItem",
            // 全局搜索 参数：type,categoryId,keyword
            globalSearch:"fky://search/searchResult"
        }
    };
    function deviceInfo() {
        var agent = navigator.userAgent
        if(agent.indexOf("FKYIOS") != -1) {
            return 'ios'
        } else if(agent.indexOf("FKYANDROID") != -1) {
            return 'android'
        } else {
            return 'web'
        }
    };
    // 判断data是否为空，
    function isEmptyObject(obj) {
        for(var key in obj) {
            return false;
        }
        return true;
    };
    function callNative(cmd, data) {
        if(cmd.length <= 0) {
            console.log('方法错误')
            return;
        }
        if(isEmptyObject(data)) {
            data = {}
        }
        if(deviceInfo() == 'ios') {
            window.webkit.messageHandlers.FKYNative.postMessage({ method: cmd, data: data, part: 'home', time: Date.parse(new Date()) })
        } else if(deviceInfo() == 'android') {
            var str = JSON.stringify({ method: cmd, data: data, part: 'home', time: Date.parse(new Date()) });
            window.FKYNative.postMessage(str)
        }else{
            console.log(cmd)
        }
    };
    bridge.cartNum = function (num) {
        callNative('cartNum', { count:num})
    };
    bridge.isWeb = function (){
        if (deviceInfo() == 'web') {
            return true;
        }else{
            return false;
        }
    }
    bridge.toSearch = function () {
        callNative('toSearch')
    };
    bridge.synLocaltion = function (privonceName, code, isCommon) {
        callNative('synLocaltion',{ privonceName:privonceName , code:code, isCommon:isCommon })
    };

    //关于跳转的说明：
        // app支持http & https & fky协议的跳转
        // 其中http & https 协议需要支持是否使用原生导航问题
    function toNavWebVC(link,title,isStick){
    	isStick = isStick ? isStick : "1";
        var schemaStart = link.indexOf("fky://");
        if(schemaStart == 0){
            //跳转原生界面
           callNative('toWebVC', { webUrl: '', schema: link ,isStick:isStick})
        }else {
            if (title.length > 0) {
                //跳转带有导航条的容器
                callNative('toWebVC', { webUrl: link, schema: '',isNav: '1',title:title,isStick:isStick})
            }else{
                //跳转不带有导航条的容器
                callNative('toWebVC', { webUrl: link, schema: '',isNav: '0',title:"",isStick:isStick})
            }
        }
    };
    bridge.toNavWebVC = function (link,title) {
        toNavWebVC(link,title);
    }; 
    bridge.toWebVC = function (url,isStick) {
        toNavWebVC(url,"",isStick)
        // callNative('toWebVC', { url: url, schema: '',isNav: '0',title:''})
    };
    bridge.toNativePage = function (schema,isStick) {
        toNavWebVC(schema,"",isStick)
        // callNative('toWebVC', { url: '', schema: schema })
    };
    // 商品详情页
    bridge.toShopDetail = function (sellerId,productId) {
        callNative('toShopDetail', { sellerId: sellerId, productId: productId })
    };
    // 自营搜索
    bridge.toSelfSearch = function (privonceName, code, isCommon) {
        callNative('toSelfSearch',{ privonceName:privonceName , code:code, isCommon:isCommon })
    };
    // 跳转店铺馆
    bridge.toSellerList = function () {
        callNative('toSellerList')
    };
    // 跳转店铺主页
    bridge.toSellerPage = function (sellerId) {
        callNative('toSellerPage', { sellerId: sellerId })
    };
    bridge.back = function () {
        callNative('pop')
    };
    return bridge;
});


