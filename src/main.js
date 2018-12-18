// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './vuex/store'
import Axios from './utils/diyaxios'
import iView from 'iview'
import VueClipboard from 'vue-clipboard2'
import Cookie from 'vue-cookie'
import './assets/base.less'
import './utils/filters'
import './utils/fun'
// 百度编辑器
import './../platform/ueditor1_4_3/ueditor.config.js'
import './../platform/ueditor1_4_3/ueditor.all.min.js'
import './../platform/ueditor1_4_3/lang/zh-cn/zh-cn.js'
Vue.use(iView)
// ajax
Vue.prototype.$http = Axios
Vue.prototype.$cookie = Cookie
// 复制
Vue.use(VueClipboard)
// vue config
Vue.config.productionTip = false
Vue.config.debug = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
