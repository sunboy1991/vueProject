import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
Vue.use(VueResource) 
Vue.config.productionTip = false
Vue.prototype.HOST = ''
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
