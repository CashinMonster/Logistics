import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import identifyCode from '@/components/identifyCode'
import payList from '@/components/payList'
import http from '../components/http'  //工具

Vue.use(Router)
Vue.prototype.$http = http
export default new Router({
  routes: [
      {
        path: '/',
        name: 'login',
        component: login,
        meta: {
          title: '登录',
            color: '#fff'
        }
      },
      {
          path: '/identifyCode',
          name: 'identifyCode',
          component: identifyCode,
          meta: {
              title: '验证码',
              color: '#fff'
          }
      },
      {
          path: '/payList',
          name: 'payList',
          component: payList,
          meta: {
              title: '物流中心',
              color: '#eee'
          }
      }
  ]
});


