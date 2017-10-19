import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
import  common  from '@/common/js/common.js'
Vue.use(VueResource) 
Vue.config.productionTip = false
Vue.prototype.HOST = ''
Vue.prototype.$common = common
/* eslint-disable no-new */
console.log(common)
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
