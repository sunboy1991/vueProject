/**
 * Created by knowthis on 16/8/24.
 */

	var host= require('./host.js')
	var fkybridge= require('./fkybridge.js')
	var tool= require('./tool.js')
	console.log()
    var h = {
        appID: host.socketApi,
        imgUrl: host.img,
        host: host.api,
        userInfo: '', // 用户信息
        publicData: {
            token: tool.getLocalStorage('token'),
            versionNum: 3700,
            os: 'h5',
            station: tool.getLocalStorage('city_id'),
            stationName: tool.getLocalStorage('stationName'),
            version: 'v1.2'
        },
        gotop: function () {
            var self = this;
            if ($('.ui_gototop')) {
                $('.ui_gototop').on('click', function () {
                    var funScroll = function () {
                        var top = $('.container').scrollTop();
                        top -= 50;
                        if (top <= 0) {
                            top = 0;
                        } else {
                            requestAnimFrame(funScroll);
                        }
                        $('.container').scrollTop(top);
                    }
                    funScroll();
                });
            }
        },
        floatIcon: function () {
            var self = this;
            if ($('.to_menue_home')) {
                $(".to_menue_home").on('click', function () {
                    if (window.native && window.native.nativeIndex) {
                        window.native.nativeIndex();
                    } else {
                        window.location.href = "/../index.html";
                    }
                });
            }
            if ($('.to_menue_search')) {
                $(".to_menue_search").on('click', function () {
                    if (window.native && window.native.nativeSearch) {
                        window.native.nativeSearch();
                    } else {
                        window.location.href = "/search.html";
                    }
                });
            }

            if ($('.ui_usercenter')) {
                $('.ui_usercenter').on('click', function () {
                    if (window.native && window.native.userCenter) {
                        window.native.userCenter()
                    } else {
                        window.location.href = '/user_center.html';
                    }
                });
            }
            if ($('.ui_shopcar')) {
                $('.ui_shopcar').on('click', function () {
                    if (window.native && window.native.shopCart) {
                        window.native.shopCart();
                    } else {
                        window.location.href = '/shopcar.html';
                    }
                });
            }
            if ($('.ui_home')) {
                $('.ui_home').on('click', function () {
                    if (window.native && window.native.backToMain) {
                        window.native.backToMain();
                    } else {
                        window.location.href = '/index.html';
                    }
                });
            }
            if ($('.shop_car')) {
                $('.shop_car').on('click', function () {
                    if (window.native && window.native.shopCart) {
                        window.native.shopCart();
                    } else {
                        window.location.href = '/shopcar.html';
                    }
                });
            }
            // 主页, 搜索
        },
        WXshadow: function () {
            if (this.inWechat()) {
                $('.btn_share').on('click', function () {
                    $('.ui_shadow').show();
                });
                $('.ui_shadow').on('click', function () {
                    $(this).hide();
                });
            }
        },
        setBaseRem: function () {

            var width = 0;
            width = window.innerWidth > 640 ? 640 : window.innerWidth;
            var html = document.getElementsByTagName('html')[0].style.fontSize = width / 10 + 'px';
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        isAndroid: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        inWechat: function () {
            return /micromessenger/i.test(navigator.userAgent);
        },
        /**
         * 检测用户是否登陆
         * @returns {number}
         */
        checkLogin: function () {
            var self = this;
            return self.getLocalStorage('token') ? !0 : !1;
        },
        /**
         *  开始加载
         * @param msg
         */
        startLoading: function (msg) {
            var self = this;

            var $dom, body;
            $dom = $(".loading");
            body = $("body");
            if (!msg) {
                msg = "加载中...."
            }
            console.log(msg);

            var source = '<div class="loading active">加载中....</div>';
            var render = template.compile(source);
            var html = render({
                main: msg
            });
            console.log(html)
            body.append(html);

        },
        /**
         * 结束加载
         */
        endLoding: function () {
            $("body").find(".loading").remove();
        },
        /**
         * 消息提示
         * @param msg
         * @param type
         */
        msgShow: function (msg) {
            var $dom, body;
            $dom = $(".message");
            body = $("body");

            var source = '<div class="message active">{{ main }}</div>';
            var render = template.compile(source);
            var html = render({
                main: msg
            });
            if ($dom.get().length > 0) {
                $dom.remove();
            }
            body.append(html);
            var msgMain = body.find(".message");
            // if (!msgMain.hasClass('active')) {
            //     msgMain.addClass("active");
            // }


        },
        /**
         * 消息提示 延迟消失
         *
         * @param msg
         * @param time 单位为秒
         */
        msgShowDelay: function (msg, time) {

            this.msgShow(msg);
            setTimeout(function () {
                $("body").find(".message").removeClass("active");

            }, time * 1000);

        },
        /**
         * 关闭消息
         */
        msgStop: function () {
            var body = $("body");
            var msgMain = body.find(".message");
            if (msgMain.hasClass('active')) {
                msgMain.removeClass("active");
            }
        },
        /**
         *  字符串的限制长度
         * @param str
         * @param num
         * @returns {*}
         */
        strLimit: function (str, num) {
            if (str && str.length > num) {
                return str.slice(0, num) + '...'
            } else {
                return str
            }
        },
        /**
         * 设置sessionStorage数据
         * 格式
         * {key:'',value:''}
         *
         * @param data
         */
        setLocal: function (data) {
            if (typeof (data.value) == 'object') {
                window.sessionStorage.setItem(data.key, JSON.stringify(data.value));
            } else if (typeof (data.value) == 'string') {
                window.sessionStorage.setItem(data.key, data.value);
            }
        },
        /**
         * 设置sessionStorage数据
         * @param key
         * @returns {string}
         */
        getLocal: function (key) {
            var val = window.sessionStorage.getItem(key) || "";
            if (val.search(/:/i) > 0) {
                val = JSON.parse(val);
            }
            return val;
        },
        setUserInfo: function () {
            var self = this;
            this.userInfo = {
                userId: self.getCookie('userId'),
                userName: self.getCookie('userName')
            }
        },
        setLocalStorage: function (key, value) {
            if (window.localStorage) {
                window.localStorage.setItem(key, value);
            }
        },
        getLocalStorage: function (key) {
            if (window.localStorage) {
                return window.localStorage.getItem(key);
            }
        },

        /**
         * 1像素问题
         */
        borderChange: function () {
            if (/iP(hone|od|ad)/.test(navigator.userAgent)) { //  就是放到html根节点上的   ios8现在普及率高了，可以省略
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
                    version = parseInt(
                        v[1], 10);
                if (version >= 8) {
                    document.documentElement.classList.add('hairlines');
                }
            }
            ;
        },
        /**
         * 获取城市ID
         */
        getLoctionCityId: function () {
            var self = this;
            if (self.getLocalStorage('city_id')) {
                self.publicData.station = self.getLocalStorage('city_id');
            }
            if (self.getLocalStorage('stationName')) {
                self.publicData.stationName = self.getLocalStorage('stationName');
            }
        },
        /**
         * 获取城市定位
         */
        getLoctionCity: function () {
            var self = this;
            if (!self.getLocalStorage('city_id')) {
                self.setLocalStorage('stationName', encodeURI('默认'));
            }
            // var self = this;
            // var showPosition= function (position) {
            //     console.log('授权成功，开始定位');
            //     var lng = position.coords.longitude;
            //     var lat = position.coords.latitude;
            //     // 调用百度地图api显示
            //     $.getJSON('http://api.map.baidu.com/geocoder/v2/?ak=1Kse6Fz8xngXKmQXGbuPYH7q&callback=?&location='+lat+','+lng+'&output=json&pois=1', function(res){
            //         console.log('定位成功');
            //         $("#city_name").text(res.result.addressComponent.city);
            //         self.setLocalStorage('city_name',res.result.addressComponent.city);
            //         self.setLocalStorage('city_id','000000');
            //     });
            // }
            // var showErr = function (){
            //     console.log('定位失败，默认分站');
            //     if(!self.getLocalStorage('city_id')){
            //         console.log('第一次定位失败，默认分站');
            //         $("#city_name").text('默认');
            //         self.setLocalStorage('city_name','默认');
            //         self.setLocalStorage('city_id','000000');
            //     }else{
            //         $("#city_name").text(self.getLocalStorage('city_name'));
            //     }
            // }
            // if (navigator.geolocation) {
            //     if(!self.getLocalStorage('city_id')){
            //         console.log('第一次定位分站，开始定位');
            //         navigator.geolocation.getCurrentPosition(showPosition, showErr);
            //     }else{
            //         console.log('获取分站信息');
            //         $("#city_name").text(self.getLocalStorage('city_name'));
            //     }
            // }else{
            //     showErr();
            // }
        },
        /**
         * 下拉刷新
         * data:self
         */
        upData: function (ohterSelf) {
            console.log(ohterSelf.$box + "+=====");
            ohterSelf.$box.scroll(function () {
                var $this = ohterSelf.$box,
                    viewH = $this.height(), //可见高度
                    contentH = $this.get(0).scrollHeight, //内容高度
                    scrollTop = $this.scrollTop(); //滚动高度

                if (ohterSelf.pageAnimate) {
                    ohterSelf.pageAnimate(ohterSelf);
                }
                if (contentH - viewH - scrollTop <= 21) {
                    ohterSelf.$tipDiv.show();
                }
//              console.log(contentH - viewH - scrollTop + 'px...');
                if (contentH - viewH - scrollTop <= 1 && ohterSelf.isTrue) { //到达底部100px时,加载新内容
                    console.log('开始加载数据');
                    ohterSelf.isTrue = false;
                    ohterSelf.pullDownAction();
                }
            });
        },
        /**
         * 跳转页面
         * url:页面名称 例如index.html
         * data:参数 {key:value} 相当于 ?key=value
         * @param url
         * @param data
         */
        gotoPage: function (url, data) {
            var path = window.location.pathname,
                that = this,
                parameter = '?',
                hostName = window.location.origin;
            if (url) {
                if (!that.checkObjectNull(data)) {
                    Object.keys(data).forEach(function (item, i) {
                        if (i == 0) {
                            parameter += item + '=' + data[item];
                        } else {
                            parameter += "&" + item + '=' + data[item];
                        }
                    });
                }
                var pathArr = path.split("/"),
                    pathArrNew = pathArr.splice(0, pathArr.length - 1);
                path = "";
                pathArrNew.forEach(function (item) {
                    if (item) {
                        path += "/" + item;
                    }

                });
                path += "/" + url + parameter;
                // if (url == 'video.html' && host.type == 'release') {
                //     hostName = 'http://yzm.xi.gov.cn'
                // }
                window.location.href = (hostName + path);
            }


        },

        /**
         * 检测对象是否为空
         * 如果对象为空 true ,反之 相反
         * @param obj
         * @returns {boolean}
         */
        checkObjectNull: function (obj) {
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;

        },
        /**
         * 获取url参数
         * 使用方式：getLocationParam.key 这里的key是你参数名
         * @returns {{}}
         */
        getLocationParam: function () {
            var url = window.location.search;
            var params = url.toString().slice(1).split("&");
            var returnObject = {};
            for (var i = 0; i != params.length; i++) {
                var index = params[i].indexOf("=");
                returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
            }
            return returnObject;
        },
        /**
         * 获取url地址#号后面的参数
         */
        getLocationState: function () {
            var url = window.location.hash;
            var arr = [];
            var returnObject = url.substring(1).split("=");
            arr[returnObject[0]] = returnObject[1];
            return arr;
        },
        /**
         * 格式化 参数
         * @param url
         * @returns {{}}
         */
        getParam: function (url) {
            url = decodeURIComponent(url);
            var params = url ? url.toString().split("&") : [];
            var returnObject = {};

            for (var i = 0; i != params.length; i++) {
                var canshu = params[i].split("=");
                returnObject[canshu[0]] = canshu[1];
            }
            return returnObject;
        },
        /**
         * 格式化 参数
         * @param url
         * @returns {{}}
         */
        getURIParams: function (url) {
            url = decodeURIComponent(url);
            var paramsBegin = url.indexOf("?");
            var params = url ? url.toString().substring(paramsBegin + 1, url.length).split("&") : [];
            var returnObject = {};

            for (var i = 0; i != params.length; i++) {
                var canshu = params[i].split("=");
                returnObject[canshu[0]] = canshu[1];
            }
            return returnObject;
        },
        jumpNativeFromUrl: function (url, h5url) {
            var self = this;
            if (window.native) {
                const parm = self.getURIParams(url);
                // 商详页
                if (url.indexOf("/product.html") > 0) {
                    const productDetail = {
                        'productId': '',
                        'enterpriseId': ''
                    };
                    productDetail.productId = parm['productId'];
                    productDetail.enterpriseId = parm['enterpriseId'];
                    // 跳转到App内部页面
                    const jsonString = JSON.stringify(productDetail);
                    window.native.productDetail(jsonString);
                }
                // 店铺主页
                if (url.indexOf("/shop.html") > 0) {
                    const enterpriseId = parm['enterpriseId'];
                    window.native.shopItem(enterpriseId);
                }
                // 搜索列表页
                if (url.indexOf("/result_product.html") > 0) {
                    const searchJson = {
                        'keyword': '',
                        'categoryId': ''
                    };
                    searchJson.keyword = parm['keyword'];
                    searchJson.categoryId = parm['product2ndLMCode'];
                    window.native.searchResult(JSON.stringify(searchJson));
                }
                // 搜索页
                if (url.indexOf("/search.html") > 0) {
                    window.native.nativeSearch();
                }
                // 主页
                if (url.indexOf("m.yaoex.com/index.html") > 0) {
                    window.native.nativeIndex();
                }
                // 本地购物车
                if (url.indexOf("/shopcar.html") > 0) {
                    window.native.shopCart();
                }
                // 本地个人中心
                if (url.indexOf("/user_center.html") > 0) {
                    window.native.userCenter();
                }
            } else {
                window.location.href = h5url;
            }
        },
        _cookie: {
            config: {
                raw: '',
                json: '',
                defaults: ''
            },
            encode: function (s) {
                var self = this;
                return self.config.raw ? s : encodeURIComponent(s);
            },
            decode: function (s) {
                var self = this;
                return self.config.raw ? s : decodeURIComponent(s);
            },
            stringifyCookieValue: function (value) {
                var self = this;
                return self.encode(self.config.json ? JSON.stringify(value) : String(value));
            },
            parseCookieValue: function (s) {
                var self = this;
                if (s.indexOf('"') === 0) {
                    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }
                try {
                    s = decodeURIComponent(s.replace(/\+/g, ' '));
                } catch (e) {
                    return;
                }
                try {
                    return self.config.json ? JSON.parse(s) : s;
                } catch (e) {
                }
            },
            read: function (s, converter) {
                var self = this;
                var value = self.config.raw ? s : self.parseCookieValue(s);
                return $.isFunction(converter) ? converter(value) : value;
            },
            cookie: function (key, value, options) {
                var self = this;
                // Write
                if (value !== undefined && !$.isFunction(value)) {
                    options = $.extend({}, self.config.defaults, options);
                    if (typeof options.expires === 'number') {
                        var days = options.expires,
                            t = options.expires = new Date();
                        t.setDate(t.getDate() + days);
                    }
                    return (document.cookie = [
                        self.encode(key), '=', self.stringifyCookieValue(value),
                        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                        options.path ? '; path=' + options.path : '',
                        options.domain ? '; domain=' + options.domain : '',
                        options.secure ? '; secure' : ''
                    ].join(''));
                }
                // Read
                var result = key ? undefined : {};
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                for (var i = 0, l = cookies.length; i < l; i++) {
                    var parts = cookies[i].split('=');
                    var name = self.decode(parts.shift());
                    var cookie = parts.join('=');

                    if (key && key === name) {
                        result = self.read(cookie, value);
                        break;
                    }
                    if (!key && (cookie = self.read(cookie)) !== undefined) {
                        result[name] = cookie;
                    }
                }
                return result;
            },
            removeCookie: function (name) {
                var that = this;
                var exp = new Date();
                exp.setTime(exp.getTime() - 1000);
                var cval = that.cookie(name);
                if (cval != null) {
                    document.cookie = name + "=; expire=" + exp.toGMTString() + "; path=/;domain=.111.com.cn";
                    // document.cookie= name + "="+cval+";path='/'"+";domain='.111.com.cn'"+";expires="+exp.toGMTString();
                }
            },
        },
        /**
         * 获取cookie
         * @param name
         * @returns {*}
         */
        getCookie: function (name) {
            var self = this;
            return self._cookie.cookie(name)
        },
        /**
         * 设置cookie
         * 格式 {key:'',value:''}
         * @param data
         */
        setCookie: function (data) {
            var self = this;
            self._cookie.cookie(data.key, data.value, {
                expires: 1, // 有效期为 30 天
                path: "/", // 整个站点有效
                domain: '', // 有效域名
                secure: false // 加密数据传输
            })
        },
        /**
         * 格式化手机号
         * @param phone
         * @returns {*|XML|void|string}
         */
        formatPhone: function (phone) {
            return phone && phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        },
        /**
         * 获取登陆token
         */
        getToken: function () {
            var self = this;
            if (self.getLocalStorage('token')) {
                self.publicData.token = self.getLocalStorage('token');
            }
        },
        /**
         * 请求回调
         * @param callback
         * @param response
         */
        doCallback: function (callback, response) {

            if (!callback) return;
            var callbackFunc = callback.func,
                callbackContext = callback.context;
            callbackFunc && typeof (callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
        },
        /**
         * 公共请求
         * @param url
         * @param data
         * @param callback
         */
        commonAjax: function (url, data, callback, otherSelf, obj, isCheckLogin) {
            var self = this;
            var _defaults = {
                    gettype: false,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data)
                },
                options = {},
                obj = obj || {};
            for (var key in _defaults) {
                options[key] = obj[key] || _defaults[key]
            }
            $.ajax({
                // url: window.debug != true ? (host.api +  url) : ('./data/' + url + '.json'),
                url: options.gettype ? (url.indexOf('http') == -1 ? host.api + url : url) + '?' + data : (url.indexOf('http') == -1 ? host.api + url : url),
                headers: self.publicData,
                contentType: options.contentType,
                dataType: "json",
                data: options.gettype ? '' : options.data,
                type: options.gettype ? "get" : 'post',
                success: function (response) {
                    otherSelf.AjaxTrue = true;
                    otherSelf.response = response;

                    if (response.statusCode == -2) {
                        if (!isCheckLogin) {
                            window.localStorage.removeItem('access_token');
                            self.msgShowDelay('请先登录！', 3);
                            var redirecturl = encodeURIComponent(location.href);
                            setTimeout(function () {
                                window.location.href = "/login.html?redirecturl=" + redirecturl;
                            }, 3050)
                        }
                    } else {
                        //self.msgShowDelay(response.message, 3)
                        self.doCallback(callback, response);
                    }
                    ;
                },
                error: function () {
                    otherSelf.AjaxTrue = true;
                    self.msgShowDelay('网络异常,请稍后重试', 3)
                }
            })
        },
        ajax: function (opts) {
            var self = this;
            var _success = opts.success;
            var _error = opts.error;
            var _complete = opts.complete;
            opts.url = opts.url.indexOf('http') == -1 ? host.api + opts.url : opts.url;
            opts.headers = self.publicData;
            opts.type = opts.type ? 'post' : 'get';
            opts.timeout = 30000;
            opts.dataType = "json";
            opts.success = function (response) {
                self.response = response;
                if (response == 'null' || response == null) {
                    _success(response);
                    if (_complete) _complete();
                } else {
                    if (response.statusCode == -2) {
                        if (!opts.bind) {
                            window.localStorage.removeItem('access_token');
                            self.msgShowDelay('请先登录！', 3);
                            var redirecturl = encodeURIComponent(location.href);
                            setTimeout(function () {
                                window.location.href = "/login.html?redirecturl=" + redirecturl;
                            }, 3050)
                        }
                    } else if (response.statusCode == -3) {
                        if (!opts.toast) {
                            self.msgShowDelay(response.message, 2);
                        }
                    } else {
                        if (_success && !opts.check) {
                            _success(response.data)
                        } else {
                            _success(response);
                        }
                        ;
                    }
                    ;
                    if (_complete) _complete(response);
                }
            };
            opts.error = function () {
                self.AjaxTrue = true;
                self.msgShowDelay('网络异常,请稍后重试', 3)
                if (_complete) _complete();
            }
            return $.ajax(opts);
        },
        /**
         * tab切换
         */
        tab: function () {
            var $nav = $('.tab_nav').find('a'),
                $hotitem = $('#hot_items'),
                $allitem = $('#all_items'),
                $sortbar = $('#sortbar');

            //$nav.off('click');
            $nav.on('click', function (e) {
                e.preventDefault();
                $nav.removeClass('tab_nav_active');
                $(this).addClass('tab_nav_active');
                $('.tab_content div').removeClass('show');

                var hash = this.dataset.href;
                hash === 'hot_items' ?
                    ($hotitem.addClass('show')) :
                    ($allitem.addClass('show'));
            });
        },
        /**
         * 加入渠道
         */
        addChannel: function () {
            var self = this;
            self.AjaxTrue = true;
            $('body').on('click', '.btn_add_channel', function (e) {
                var that = this;
                if (self.AjaxTrue) {
                    self.layer1 = layer.open({
                        title: '提示',
                        content: '确定加入渠道？',
                        btn: ['确认', '取消'],
                        yes: function () {
                            self.AjaxTrue = false;
                            var product = $(that).data('product');
                            h.addChannelAjax(product, {
                                'func': function (data) {
                                    if (self.response.statusCode == 0 || self.response.statusCode == 3) {
                                        $(that).addClass('btn_product_off').text('渠道待审核').removeClass('btn_product_public').removeClass('btn_add_channel');
                                        layer.close(self.layer1);
                                    }
                                }
                            }, self);
                        }
                    });

                }

                e.stopImmediatePropagation();
                e.preventDefault();
                return false;
            });

        },
        //资质认证
        qualification: (function () {
            var self = this;
            $('body').on('click', '.btn_check_qualification', function (e) {
                var that = this;
                self.layer1 = layer.open({
                    title: '提示',
                    content: '请去电脑端完善资质'
                });

            });
        })(),
        /**
         * 点点菜单
         */
        dotToggle: function () {
            var $btnToggle = $('.navbar_toggle'),
                $navbarMenue = $('.navbar_menue');
            $btnToggle.on('click', function (e) {
                if ($navbarMenue.hasClass('navbar_menue_active')) {
                    $navbarMenue.removeClass('navbar_menue_active');
                } else {
                    $navbarMenue.addClass('navbar_menue_active');
                }
            });
            $('body').on('click', function (e) {
                if (e.target.className === 'navbar_toggle') return;
                $navbarMenue.removeClass('navbar_menue_active');
            });
        },

        /**
         * 立即下载
         */
        download: function () {
            var self = this;
            var now = (new Date()).getTime();
            if (now < self.getLocalStorage('timestamp')) return;
            $('#download').css('display', 'table');
            $('#btn_close_download').on('click', function (e) {
                $('#download').remove();
                var date = new Date();
                date.setDate(date.getDate() + 1);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                var timestamp = date.getTime();
                self.setLocalStorage('timestamp', timestamp);
            });
        },
        /**
         * 加入进货单计数
         */
        productCount: {
            _productConfig: {
                stock: 0,
                min: 0,
                unit: "个",
                productCodeCompany: '',
                spuCode: '',
                productId: '',
                productPrice: '',
                manufactures: '',
                selfDispose: false,
            },
            _product: {
                "spuCode": "131705",
                "productCodeCompany": "25500702",
                "productId": "110331",
                "productCount": 1,
                "productName": "急支糖浆",
                "supplyId": "15925",
                "productPrice": 15.5,
                "promotionId": '',
                "promotionCollectionId": '',
                "specification": "",
                "manufactures": ""

            },
            fnCount: function (min, stock, ele, reduce, add, self) {
                var val = +ele.val();
                var valPattern = /^[1-9]+[0-9]*$/;
                if (valPattern.test(val)) {
                    console.log('ok');
                } else {
                    ele.val("")
                    console.log('error');
                }
                self.fnReduce(min, stock, ele, reduce, add, self);
                self.fnAdd(min, stock, ele, reduce, add, self);

            },
            fnReduce: function (min, stock, ele, reduce, add, self) {
                if(+ele.val() > 9999999){
                    ele.val('9999999');
                    var unit = ele.parents('.product_buy').find('.js_min').html();
                    self.msg('最多只能买9999999'+unit.substring(unit.length-1,unit.length)+'哦！');
                }
                else if (+ele.val() > +min) {
                    reduce.addClass('btn_reduce_number_ok');
                    $('.btn_reduce_number_ok').off('click');
                    $('.btn_reduce_number_ok').on('click', function () {
                        ele.val() > min && ele.val(ele.val() - min);
                        ele.val() <= min && reduce.removeClass('btn_reduce_number_ok');
                        ele.val() < stock && add.addClass('btn_add_number_ok');

                        //add ajax
                        //self.commonAjax( '', ele.val(), callback,otherSelf);

                        return;
                    })
                } else {
                    reduce.removeClass('btn_reduce_number_ok');
                }
            },
            fnAdd: function (min, stock, ele, reduce, add, self) {
//                if (+ele.val() + min > stock) {
//                    add.removeClass('btn_add_number_ok');
//                } else {
//                    add.addClass('btn_add_number_ok');
                $('.btn_add_number_ok').off('click');
                $('.btn_add_number_ok').on('click', function () {
                    ele.val(+ele.val() + min);
//                        ele.val() < stock && ele.val(+ele.val() + min);
//                        ele.val() >= stock && add.removeClass('btn_add_number_ok');
//                        ele.val() > min && reduce.addClass('btn_reduce_number_ok');
                    self.fnReduce(min, stock, ele, reduce, add, self);

                    /*//add ajax
                     exports.addShopCartAjax( self._product, {
                     'func':function (data) {
                     debugger;
                     }
                     },self);*/

                    return;
                })
//                }
            },
            valPrint: function (min, stock, ele, reduce, self) {
                var content = "";
//                if (ele.val() > stock) {
//                    content = "库存不足，这次少买点吧！";
//                    ele.val(stock / min * min);
//                    self.msg(content);
//                    return true;
//                } else 
                if (ele.val() % min != 0) {
                    content = "最小拆零包装为" + min + "件";
                    ele.val("");
                    self.msg(content);
                    reduce.removeClass('btn_reduce_number_ok');
                    return true;
                }
                return false;
            },
            msg: function (content) {
                layer.open({
                    content: content,
                    skin: 'msg',
                    time: 3
                });
            },
            listInit: function (self, ele) {

                var stock = self._productConfig.stock = ele.data('stock');
                var min = self._productConfig.min = ele.data('min');

                self._product = $.extend(self._product, ele.data('product'));

                $('.product_number').val(min);
                if (self._product.supplyId == '8353') {
                    if (stock > 500) {
                        $('.product_buy').find('.js_stock').html('有货');
                    } else {
                        $('.product_buy').find('.js_stock').html('库存紧张');
                    }
                } else {
                    (stock > 500 && $('.product_buy').find('.js_stock').html('>500')) || $('.product_buy').find('.js_stock').html(stock);
                }
                $('.product_buy').find('.js_min').html(min + ele.attr('data-unit'));
                self.fnCount(+self._productConfig.min, +self._productConfig.stock, $('.product_number'), $('.btn_reduce_number'), $('.btn_add_number'), self);

            },
            bindUI: function () {
                var self = this;
                // 相互引用之后 Android 自带webview中加载不出页面
                //self.$productBuy = $('.product_buy');
                //self.$btnAddList = $('.btn_add_list');
                //self.$btnReduce = $('.btn_reduce_number');
                //self.$btnAdd = $('.btn_add_number');
                //
                //self.$productNumber = $('.product_number');
                //
                //self.$jsAddList = $('.js_add_list');
                //self.$mask = $('.mask');
            },
            bindEvent: function () {
                var self = this;
                $('.product_number').on('input', function () {
                    self.fnCount(+self._productConfig.min, +self._productConfig.stock, $('.product_number'), $('.btn_reduce_number'), $('.btn_add_number'), self);
                });
                if (!self._productConfig.selfDispose) { //如果店铺主页是满减促销，店铺主页自行处理加入购物车逻辑
                    $('.js_add_list').off('click');
                    $('.js_add_list').on('click', function () {
                        h.startLoading();
                        self.valPrint(+self._productConfig.min, +self._productConfig.stock, $('.product_number'), $('.btn_reduce_number'), self) || ($('.product_buy').hide() && $('.mask').hide());

                        self._product.productCount = $('.product_number')[0].value;
                        console.log(self._product)
                        h.addShopCartAjax(self._product, {
                            'func': function (data) {
                                h.endLoding();

                                data && fkybridge.cartNum(data.productCount);
                                if (self.response.statusCode == -3) {
                                    h.msgShowDelay(self.response.message, 3);
                                } else {
                                    h.msgShowDelay(data.result, 1);
                                    //购物车
                                    h.getsShopcarNum();
                                }
                            }
                        }, self);
                    });
                }
                $('.btn_add_list').off('click');
                $('.btn_add_list').on('click', function (event) {

                    if (!$(this).parents('.seckill_box').hasClass('disable') && !$(this).hasClass('disable')) {
//                      event.preventDefault();
                        self.listInit(self, $(this));
                        $('.product_buy').show();
                        $('.mask').show();
                        return false;
                    }
                });

                $('.mask').on('click', function () {
                    $('.product_buy').hide();
                    $(this).hide();
                })
            },
            init: function () {
                var self = this;
                self.bindUI();
                self.bindEvent();
            },
            shopInit: function () {
                var self = this;
                self._productConfig.selfDispose = true;
                self.bindUI();
                self.bindEvent();
            }

        },
         deviceInfo: function () {
            var self = this;
            var agent = navigator.userAgent
            if (agent.indexOf("FKYIOS") != -1) {
                return 'ios'
            } else if (agent.indexOf("FKYANDROID") != -1) {
                return 'android'
            } else {
                return 'web'
            }
        },       
        //引导下载判断
        bootDownload:function(){
        	 var self = this;
        	 console.log('我执行了')
            $('.close_img').on('click',function(){
            	self.setLocal({key:'first',value:'1'})
            	$('.Boot_download').hide();
            })
            if(self.deviceInfo()=='web'&&self.getLocal('first')!='1'){
            	$('.Boot_download').show();
            }        	
        },
        //对象转get参数
        obj2getStr: function (data) {
            this.searchStr = '';
            for (var key in data) {
                this.searchStr += key + '=' + data[key] + '&';
            }
            return this.searchStr;
        },
        //函数节流
        throttle: function (method, context, time) {
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.call(context);
            }, time || 500);
        },
        /**
         * 添加种类促销数组
         * @param data
         * @returns {*}
         */
        toPromotionData: function (common, data) {
            for (var i = 0; data.shopProducts && i < data.shopProducts.length; i++) {
                data.shopProducts[i].productPromotionTypeList = common.getPromotionTypeList(data.shopProducts[i].promotionList, data.shopProducts[i].productPromotion)
                data.shopProducts[i].mPromotionCollectionId = common.getPromotionCollectionIdList(data.shopProducts[i].promotionList);
                if (data.shopProducts[i].productPromotion) {
                    data.shopProducts[i].mPromotionId = data.shopProducts[i].productPromotion.promotionId;
                } else {
                    data.shopProducts[i].mPromotionId = null;
                }
            }
            for (var i = 0; data.promotions && i < data.promotions.length; i++) {
                data.promotions[i].productPromotionTypeList = common.getPromotionTypeList(data.promotions[i].promotionList, data.promotions[i].productPromotion)
                data.promotions[i].mPromotionCollectionId = common.getPromotionCollectionIdList(data.promotions[i].promotionList);
                if (data.promotions[i].productPromotion) {
                    data.promotions[i].mPromotionId = data.promotions[i].productPromotion.promotionId;
                } else {
                    data.promotions[i].mPromotionId = null;
                }
            }
            return data;
        },
        /**
         * 添加种类促销  优先级 满减->买赠->特价
         * @param data
         * @returns {*}
         */
        toData: function (data) {
            for (var i = 0; data.shopProducts && i < data.shopProducts.length; i++) {
                data.shopProducts[i].productPromotionType = common.getPromotionType(data.shopProducts[i].promotionList, data.shopProducts[i].productPromotion)
                data.shopProducts[i].mPromotionCollectionId = common.getPromotionCollectionIdList(data.shopProducts[i].promotionList);
                if (data.shopProducts[i].productPromotion) {
                    data.shopProducts[i].mPromotionId = data.shopProducts[i].productPromotion.promotionId;
                } else {
                    data.shopProducts[i].mPromotionId = null;
                }
            }
            for (var i = 0; data.promotions && i < data.promotions.length; i++) {
                data.promotions[i].productPromotionType = common.getPromotionType(data.promotions[i].promotionList, data.promotions[i].productPromotion)
                data.promotions[i].mPromotionCollectionId = common.getPromotionCollectionIdList(data.promotions[i].promotionList);
                if (data.promotions[i].productPromotion) {
                    data.promotions[i].mPromotionId = data.promotions[i].productPromotion.promotionId;
                } else {
                    data.promotions[i].mPromotionId = null;
                }
            }
            return data;
        },
        /**
         * 主页楼层商品  添加种类促销  优先级 满减->买赠->特价
         * @param floors
         * @returns {*}
         */
        toMainData: function (common, floors) {
            for (var i = 0; floors && i < floors.length; i++) {
                var floorProducts = floors[i].floorProduts;
                for (var j = 0; floorProducts && j < floorProducts.length; j++) {
                    floorProducts[j].productPromotionType = common.getPromotionType(floorProducts[j].promotionList, floorProducts[j].productPromotion);
                }
            }
            return floors;
        },
        getPromotionType: function (promotionList, productPromotion) {
            var promotionTag = 0;
            for (var i = 0; promotionList && i < promotionList.length; i++) {
                if (promotionList[i].promotionType == 1 || promotionList[i].promotionType == 2 || promotionList[i].promotionType == 3) {
                    promotionTag = 1;
                    break;
                } else if (promotionList[i].promotionType == 5 || promotionList[i].promotionType == 6 || promotionList[i].promotionType == 7 || promotionList[i].promotionType == 8) {
                    promotionTag = 2;
                }
            }
            if (promotionTag == 0 && productPromotion) {
                promotionTag = 3;
            }
            return promotionTag;
        },
        getPromotionTypeList: function (productPromotionInfos, productPromotion) {
            var typeArray = [];
            var index = 0;
            var mjBol = false;
            var mzBol = false;
            for (var i = 0; productPromotionInfos && i < productPromotionInfos.length; i++) {
                if (productPromotionInfos[i].promotionType == 2 || productPromotionInfos[i].promotionType == 3) {
                    if (!mjBol) {
                        typeArray[index++] = 1; //满减
                        mjBol = true;
                    }
                } else if (productPromotionInfos[i].promotionType == 5 || productPromotionInfos[i].promotionType == 6 || productPromotionInfos[i].promotionType == 7 || productPromotionInfos[i].promotionType == 8) {
                    if (!mzBol) {
                        typeArray[index++] = 2; //满赠
                        mzBol = true;
                    }
                }
            }
            if (productPromotion) {
                typeArray[index++] = 3; //促销
            }

            return typeArray.sort();
        },
        getPromotionCollectionIdList: function (promotionList) {
            var idArray = '';
            for (var index in promotionList) {
                idArray = idArray + promotionList[index].promotionId + ",";
            }
            if (idArray.length > 0) {
                idArray = idArray.substring(0, idArray.lastIndexOf(","));
            }
            return idArray;
        },
        /**
         * 请求接口
         * @param data
         * @param callback
         * @returns {*}
         * 调用 方法
         */
        //登陆接口
        userLoginAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('passport/api/user/userLogin', data, callback, otherSelf)
        },
        //注册接口
        registerAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('passport/api/user/register', data, callback, otherSelf)
        },
        //首页分站
        mainProvinceAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/mainH5Province', data, callback, otherSelf)
        },
        //app首页分站
        listIndexSite: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/mobileIndex/listIndexSite', data, callback, otherSelf)
        },
        //首页轮播图
        listIndexAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/h5Index/listIndex', data, callback, otherSelf)
        },
        //首页查询药城头条
        listHeadlinesAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/h5Index/listHeadlines ', data, callback, otherSelf)
        },
        //首页广告分类及店铺推荐
        listAd: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/h5Index/listIndex', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //首页热门商品推荐
        listRecommendProduct: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/home/listRecommendProduct', data, callback, otherSelf)
        },
        //首页查询楼层商品
        listIndexFloorAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/h5Index/listIndexFloor', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //获取分类
        getAssortListAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('druggmp/api/home/getAssortList', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //一键分布
        oneKKeyPublish: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/h5Index/report', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            });
        },
        //购物车数量
        getsShopcarNum: function (isCheckLogin) {
            ///order/api/order/getUserTipInfo  order/api/cart/cartAccount
            if (!window.localStorage.getItem("token")) return false;
            var self = this;
            var $count = $('.shop_car').find('.shop_count');
            var $shopCount = $('.ui_meetingfloat').find('.shop_count');
            if (self.publicData.token) {
                return this.commonAjax('order/api/cart/cartAccount', '', {
                    func: function (data) {
                        var count = parseInt(data.count);
                        count = count > 99 ? '99+' : count;
                        if (count == 0) {
                            $count.hide();
                            $shopCount.hide();
                        } else {
                            $count.text(count).show();
                            $shopCount.text(count).show();
                        }
                    }
                }, this, {
                    "gettype": true
                }, isCheckLogin);
            } else {
                $count.hide();
                $shopCount.hide();
            }

        },
        //店铺馆
        listRecommendShopAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/shop/listRecommendShop', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //试点店铺首页
        shopTryAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/experiment/queryDrugByPageForAll', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })
        },
        //试点店铺首页banner
        shopBannerAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/self/listAd', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //店铺主页
        shopIndexAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/shop/shopIndex', data, callback, otherSelf, {
                "gettype": true
            });
        },
        //店铺主页特价商品
        shopPromotionsAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/promotion/getSpecialPrice', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            });
        },
        //加入渠道
        addChannelAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/applyChannelapi', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            });
        },
        //商品详情页
        getProductDetailAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/product/getProductDetail', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //搜索联想
        searchAssociationAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/search/searchAssociation', data, callback, otherSelf, {
                "gettype": true
            })
        },
        //店铺搜索结果
        searchStoreListAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/search/searchStoreList', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })
        },
        //商品搜索结果
        searchProductListAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/search/searchProductList', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })
        },
        //获取进货单商品列表
        getShopCartListAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/getShopCartList', data, callback, otherSelf, {
                'gettype': true
            })
        },
        //跟新商品
        updateShopCartAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/updateShopCart', data, callback, otherSelf)
        },
        //跟新商品(新接口)
        calculationFreightShoppingCart: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/calculationFreightShoppingCart', data, callback, otherSelf)
        },
        //加入进货单
        addShopCartAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/addShopCart', data, callback, otherSelf )
        },
        //删除进货单商品
        deleteShopCartAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/deleteShopCarts', data, callback, otherSelf)
        },
        //获取进货单商品个数
        cartAccountAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/cartAccount', data, callback, otherSelf)
        },
        //获取收货地址列表
        getDeliveryAddressAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('usermanage/api/enterpriseInfo/getReceiverAddressList', data, callback, otherSelf, {
                gettype: true
            })
        },
        //设置默认地址
        setFisrtAddressAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('usermanage/api/enterpriseInfo/updDefReceiverAddress', data, callback, otherSelf, {})
        },
        //新增地址
        addInfoAddressAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('usermanage/api/enterpriseInfo/saveReceiverAddress', data, callback, otherSelf, {})
        },
        //修改地址
        modeInfoAddressAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('usermanage/api/enterpriseInfo/updateReceiverAddress', data, callback, otherSelf, {})
        },
        //删除地址
        deletAddressAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('usermanage/api/enterpriseInfo/deleteReceiverAddress', data, callback, otherSelf, {})
        },
        //提交订单
        submitShopCartAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/submitShopCart', data, callback, otherSelf)
//            return self.commonAjax('order/api/cart/submitShopCart', data, callback, otherSelf)
        },
        //资质交换判断
        pagerJudgeAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('usermanage/api/enterpriseInfo/checkErpInfoBySupplyIds', data, callback, otherSelf, {
                gettype: true
            })
        },
        //发票查询
        pagerInvoiceAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/getBillInfoByCustId', data, callback, otherSelf, {
                gettype: true
            })
        },

        //发票修改
        pagerModeAjax: function (data, callback, otherSelf) {
            var self = this;

            return self.commonAjax('usermanage/api/invoice/saveInvoiceInfo', data, callback, otherSelf, {

                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })

        },
        //订单支付
        payAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/orderPay/pay', data, callback, otherSelf, {
                gettype: true
            })
        },
        //获取订单列表
        listOrderAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/listOrder', data, callback, otherSelf)
        },
        //订单详情
        getOrderDetailAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/getOrderDetail', data, callback, otherSelf, {
                gettype: true
            })
        },
        //取消订单
        cancelOrderAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/cancelOrder', data, callback, otherSelf, {
                gettype: true
            })
        },
        //延期收货
        delayDeliveryAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/delayDelivery', data, callback, otherSelf, {
                gettype: true
            })
        },
        //确认收货
        confirmOrderAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/confirmOrder', data, callback, otherSelf)
        },
        //确认收货清单
        confirmOrderDetailAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/orderDeliveryDetail/confirmOrderDetail', data, callback, otherSelf, {
                gettype: true
            })
        },
        //发起拒收/补货
        refusedReplenishOrderAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/orderDeliveryDetail/refusedReplenishOrder', data, callback, otherSelf)
        },
        //物流信息
        deliveryInfoAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/deliveryInfo', data, callback, otherSelf, {
                gettype: true
            })
        },
        //取消订单原因
        cancelOrderInfoAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/cancelOrderInfo', data, callback, otherSelf, {
                gettype: true
            })
        },
        //异常订单列表
        exceptionOrderAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/exceptionOrder', data, callback, otherSelf)
        },
        //补货确认收货
        refusedExceptionReplenishOrderAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/orderDeliveryDetail/refusedExceptionReplenishOrder', data, callback, otherSelf, {
                gettype: true
            })
        },
        //个人中心
        getUserTipInfoAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/getUserTipInfo', data, callback, otherSelf, {
                'gettype': true
            })
        },
        //店铺主页中获取购买信息
        queryFullReductionInfoAjax: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/cart/queryFullReductionInfo', data, callback, otherSelf, {
                gettype: true
            });
        },
        //订货会首页--焦点图
        purchadH5Index: function (opts) {
            var self = this;
            return self.ajax($.extend({
                url: 'mall/api/mOrderMeeting/slideshowPics'
            }, opts))
        },
        //订货会首页&内页--精选厂家
        queryFactoryList: function (opts) {
            var self = this;
            return self.ajax($.extend({
                url: 'mall/api/mOrderMeeting/queryPromotionFactory'
            }, opts))
        },
        //订货会首页--专场列表
        mainMeetingList: function (opts) {
            var self = this;
            return self.ajax($.extend({
                url: 'mall/api/mOrderMeeting/mainMeetingListSection'
            }, opts))
        },
        //订货会--列表页面倒计时
        queryOrderMeetingInfo: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/queryOrderMeetingInfo', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            });
        },
        //订货会--秒杀专场
        querySecKillDrugForFloor: function (opts) {
            var self = this;
            return self.ajax($.extend({
                url: 'mall/api/mOrderMeeting/querySecKillDrugForFloor'
            }, opts))
        },
        //订货会--爆款列表
        queryPromotionFloor: function (opts) {
            var self = this;
            return self.ajax($.extend({
                url: 'mall/api/mOrderMeeting/queryPromotionFloor'
            }, opts))
        },
        //订货会--获取订购排行榜时间
        queryOrderTime: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/queryOrdermeetingInfo', data, callback, otherSelf, {
                gettype: true
            });
        },
        //订货会--满减专场
        fullReductionList: function (opts) {
            var self = this;
            return self.ajax($.extend({
                url: 'mall/api/mOrderMeeting/queryDrugByPageForAll'
            }, opts))
        },
        //订货会--排行榜
        listBuyerTopten: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/orderMeeting/listBuyerTop10'
            }, opts))
        },
        //订货会--排行榜数据
        findOrderMeetingInfo: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/orderMeeting/findOrderMeetingInfo'
            }, opts))
        },
        //订货会--根据卖家企业id和买家名称模糊查询所有的买家id及买家名称
        getEnterpriseInfoBySellerCode: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'usermanage/api/enterpriseInfo/getEnterpriseInfoBySellerCode'
            }, opts))
        },
        //订货会--根据卖家企业id查询卖家填写的手机号码
        queryEnterpriseTell: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'usermanage/api/enterpriseInfo/queryEnterpriseTell'
            }, opts))
        },
        //根据输入的买家ERP编码校验是否正确，只有statusCode=0 并且data=1 表示ERP编码正确
        chekERPcode: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'mall/api/checkCode'
            }, opts))
        },
        checkOrderPageInfo: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/order/checkOrderPageInfo', data, callback, otherSelf)
        },
        //订货会--搜索页面
        orderMeetingSearch: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/searchOM', data, callback, otherSelf)
        },
        //订货会--精选厂家商品列表
        orderMeetingSiftList: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/queryDrugByPageForAll', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })
        },
        //查询绑定信息，statusCode =0   并且 data 有数据才表示之前已经绑定过，如果有数据，表示已经绑定，并且为登录状态。
        queryWechatBindInfo: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'usermanage/api/enterpriseInfo/queryWechatBindInfo'
            }, opts))
        },
        //查询微信否绑定过 
        boundWweixin: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/userLogin'
            }, opts))
        },
        //查询微信否绑定过 
        queryboundWweixin: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/bindWachatByMobile'
            }, opts))
        },
        // 线下支付获取商家银行信息
        getPayBankInfo: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('order/api/orderPay/enterprise/bankInfo', data, callback, otherSelf, {
                'gettype': true
            })
        },
        //使用code查询userInfo
        queryWechatUserInfo: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'usermanage/api/enterpriseInfo/queryWechatUserInfo'
            }, opts))
        },
        //使用code查询userInfo
        getWechatUserInfo: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'usermanage/api/enterpriseInfo/searchUserInfo'
            }, opts))
        },
        //插入绑定信息post请求只有statusCode=0 并且data=1表示插入成功，另外不可重复插入数据,插入数据成功并登陆成功
        saveWechatBindInfo: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'usermanage/api/enterpriseInfo/saveWechatBindInfo'
            }, opts))
        },
        //订货会--精选厂家商品列表
        orderMeetingDonation: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/queryPromotionFloor', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })
        },
        //订货会列表--赠品
        orderMeetingFactoryDetailLogoList: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/queryFactoryDetailLogoList', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            })
        }, //监测用户是否登录
        userlogin: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/userInfo'
            }, opts))
        }, //平台订货会——主会场专场列表
        platformMeetingList: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'mall/api/platformMeeting/platformMeetingList'
            }, opts))
        }, //平台订货会——
        platformQueryFloor: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'mall/api/platformMeeting/queryFloor'
            }, opts))
        }, //平台订货会——
        queryFloorDetail: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'mall/api/platformMeeting/queryFloorDetail'
            }, opts))
        },//平台订货会——分会场
        chapterlist: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/platformMeeting/queryDrugByPageForAll', data, callback, otherSelf, {
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: data
            });
        },//订货会--分会场独立出来菜单调用
        orderMeetingSaleMenu: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('mall/api/mOrderMeeting/mainMeetingMenuList', data, callback, otherSelf)
        },//用户中心--切换用户
        switchoverUser: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('passport/api/user/changeUser', data, callback, otherSelf, {
                'gettype': true
            })
        },//忘记密码--验证短信验证码
        checkYzmpassword: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/checkAppValidCode'
            }, opts))
        },//忘记密码--重置密码
        resetPasssword: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/resetAppPassword'
            }, opts))
        },//订单——微信支付
        getH5WechatpayParams: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/wechatPay/getWechatPayH5Params'
            }, opts))
        },//找回密码--发送短信验证码前的校验
        findPassWordjy: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/sendAppValidCodeSms'
            }, opts))
        },//验证原密码
        checkPassword: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/checkPassword'
            }, opts))
        },//修改原密码
        updatePassword: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/updatePassword'
            }, opts))
        },//到货通知
        addArrivalNotice: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'mall/api/addArrivalNotice'
            }, opts))
        },//常购清单
        getOftenBuyGoods: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/order/getOftenBuyGoods'
            }, opts))
        },//常购商家
        getChangMerchants: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/order/getChangMerchants'
            }, opts))
        },//订货会登录验证
        purchasUserLogin: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'passport/api/user/userLogin'
            }, opts))
        },//通用版
        listIndexFloor: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/mobileIndex/listIndexFloorNew', data, callback, otherSelf, {
                'gettype': true
            })
        },
        listRecommendIndexFloor: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/mobileIndex/listRecommendIndexFloor', data, callback, otherSelf, {
                'gettype': true
            })
        },//广告位
        AdlistIndexFloor: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/mobileIndex/listIndexFloor', data, callback, otherSelf, {
                'gettype': true
            })
        },//是否试点
        isCommonOrPilotSite: function (data, callback, otherSelf) {
            var self = this;
            return self.commonAjax('manage/api/mobileIndex/isCommonOrPilotSite', data, callback, otherSelf, {
                'gettype': true
            })
        },//是否支持线下支付
        getPayTypeArea: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/order/getPayTypeArea'
            }, opts))
        },//自营订单取消
        buyerCancelPayedOrder: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/order/buyerCancelPayedOrder'
            }, opts))
        },//获取加价购弹出层的数据
        loadPromotionChangeProduct: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/cart/loadPromotionChangeProduct'
            }, opts))
        },//更新进货单选中状态
        updateShoppingCartCheckStatus: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/cart/updateShoppingCartCheckStatus'
            }, opts))
        },//选中换购商品点击确定  
        updatePromotionChangeProduct: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/cart/updatePromotionChangeProduct'
            }, opts))
        },
        //药品分类
        listCategory: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'manage/api/self/listCategory'
            }, opts))
        },
        //删除赠品
        deletePromotionChangeProduct: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/cart/deletePromotionChangeProduct'
            }, opts))
        },
        //改版首页
        getNewIndex: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'manage/api/mobileIndex/listIndexFloor'
            }, opts))
        },
        //类目热销排行榜，采购排行榜
        listChartBySite: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'manage/api/mobileIndex/listChartBySite'
            }, opts))
        },
        //订单提交资质审核接口
        checkEnterpriseQualification: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/cart/checkEnterpriseQualification'
            }, opts))
        },
        //需求单接口
        demandOrder: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/order/demandOrder/add'
            }, opts))
        },
        //需求单计算金额
        recheckOrderMoney: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'order/api/cart/recheckOrderMoney'
            }, opts))
        },
        //首页--情报速递
        loadExpressDlivery: function (opts) {
            var self = this;
            self.ajax($.extend({
                url: 'manage/api/mobileIndex/loadExpressDlivery'
            }, opts))
        }
    };
//  h.init = function () {
//      template.helper('str_limit', function (str, num) {
//          // ..
//          if (str.length > num) {
//              return str.slice(0, num) + '...'
//          } else {
//              return str
//          }
//      });
//      template.helper('price', function (x, num) {
//          var f = parseFloat(x);
//          if (isNaN(f)) {
//              return false;
//          }
//          var f = Math.round(x * 100) / 100;
//          var s = f.toString();
//          var rs = s.indexOf('.');
//          if (rs < 0) {
//              rs = s.length;
//              s += '.';
//          }
//          while (s.length <= rs + 2) {
//              s += '0';
//          }
//          return s;
//      });
//      template.helper('autoImage', function (s, format) {
//          format = s || format;
//          return format;
//      });
//      this.download();
//      this.setBaseRem();
//      this.setUserInfo();
//      this.gotop();
//      this.floatIcon();
//      this.getToken();
//      //this.getLoctionCity();
//      this.getLoctionCityId();
//      this.borderChange();
//      this.WXshadow();
//      this.addChannel();
//      var debug = window.debug;
//      if (debug) {
//          $("html").addClass('debug_class')
//      }
//  };
//  window.refreshFunc = function () {
//      window.location.reload(true)
//  };


//  h.init();

   export default h;
