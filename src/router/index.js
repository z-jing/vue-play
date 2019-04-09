import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/mainPage'
import HelloWorld from '@/components/HelloWorld'
import startElementUI from '@/components/startElementUI'

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
    }]
  }]
})
