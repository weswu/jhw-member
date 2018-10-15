
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import routes from './routers'
Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // 权限
  if (store && store.state.userInfo.privilege) {}
  // 标题
  if (to.meta.seoTitle) {
    document.title = to.meta.seoTitle
  }
  next()
})

export default router
