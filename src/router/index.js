import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import hello from '@/components/hello'

Vue.use(Router)

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
          path: '/hello',
          name: 'hello',
          component: hello,
          meta: {
              title: '验证码'
          }
      }
  ]
});


