import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header.vue'
import newindex from '@/components/newindex.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'header',
      component: header,
//    children: [
//      {
//        path: 'header',
//        component: header
//      }
//
//]
    },  
     {
      path: 'newindex',
      name: 'newindex',
      component: newindex,
//    children: [
//      {
//        path: 'header',
//        component: header
//      }
//
//]
    }   
  ]
})
