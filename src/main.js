// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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
import './../static/ueditor1_4_3/ueditor.config.js'
import './../static/ueditor1_4_3/ueditor.all.min.js'
import './../static/ueditor1_4_3/lang/zh-cn/zh-cn.js'
Vue.use(iView)
// ajax
Vue.prototype.$http = Axios
Vue.prototype.$cookie = Cookie
// 复制
Vue.use(VueClipboard)
// vue config
Vue.config.productionTip = false
Vue.config.debug = true
// 标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
