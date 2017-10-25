import axios from 'axios'
var host= require('./host.js')
import  common  from '@/common/js/common.js'

       function axiosHttp (url,data,obj) {
       
            var _defaults = {
                    gettype: false,
                    contentType: "application/json; charset=utf-8",
                    data: data
                },
                options = {},
                obj = obj || {};
            for (var key in _defaults) {
                options[key] = obj[key] || _defaults[key]
            }
         console.log(host.api)
            axios({
                // url: window.debug != true ? (host.api +  url) : ('./data/' + url + '.json'),
                url: options.gettype ? (url.indexOf('http') == -1 ? host.api + url : url) + '?' + data : (url.indexOf('http') == -1 ? host.api + url : url),
                headers: common.publicData,
                contentType: options.contentType,
                dataType: "json",
                data: options.gettype ? '' : options.data,
                method: options.gettype ? "get" : 'post',
            }).then((response) => {
                    response = response.data;
						console.log(response)
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
                        return response
                    }
                    
             
//              error: function () {
//                  otherSelf.AjaxTrue = true;
//                  self.msgShowDelay('网络异常,请稍后重试', 3)
//              }   
            
            //ksklklkklsd
            }).catch(
            	console.log('1122333')
            )
        }
export default axiosHttp;