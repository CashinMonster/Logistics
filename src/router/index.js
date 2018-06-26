import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import identifyCode from '@/components/identifyCode'
import http from '../components/ajax';  //工具

Vue.use(Router)
Vue.prototype.$http = http
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
      {
          path: '/identifyCode',
          name: 'identifyCode',
          component: identifyCode,
          meta: {
              title: '验证码'
          }
      }
  ]
});


