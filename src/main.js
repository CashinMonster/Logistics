// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'  //移动端适配（直接用px为单位就行，基于页面宽度为750px）
import qs from 'qs'  //qs 解决post请求后端接收不到的问题
import emComponent from './plugin/popUp/index'  //自定义的弹框插件

Vue.use(emComponent)
Vue.use(require('vue-wechat-title'))  //动态更改title

Vue.config.productionTip = false
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})






