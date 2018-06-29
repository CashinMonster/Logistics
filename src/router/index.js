import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import identifyCode from '@/components/identifyCode'
import payList from '@/components/payList'
import detailInfo from '@/components/detailInfo'

import http from '../http/http'  //工具

Vue.use(Router)

Vue.prototype.$http = http
export default new Router({
  routes: [
      {
          path: '/',
          name: 'payList',
          component: payList
      },
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
          path: '/identifyCode',
          name: 'identifyCode',
          component: identifyCode
      },
      {
          path: '/detailInfo',
          name: 'detailInfo',
          component: detailInfo
      },

  ]
});


