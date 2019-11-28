import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/mainPage'
import HelloWorld from '@/components/HelloWorld'
import startElementUI from '@/components/startElementUI'
import planDetail from '@/page/planDetail'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: mainPage,
    name: '',
    children: [{
      path: '/',
      component: HelloWorld,
    },{
      path: '/startElementUI',
      component: startElementUI
    },{
      path: '/tableTree',
      component: planDetail
    }]
  }]
})
