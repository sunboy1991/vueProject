import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
import  common  from '@/common/js/common.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(Mint);
Vue.use(VueResource) 
Vue.config.productionTip = false
Vue.prototype.HOST = ''
Vue.prototype.$common = common
import axios from 'axios'
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
console.log(common.publicData.versionNum)
common.setBaseRem()

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  methods:{
  common:function(){
	  		this.$common.setBaseRem()
	  	}
  }
})
