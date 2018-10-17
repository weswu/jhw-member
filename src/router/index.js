
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import routes from './routers'
import { showThisMenuEle } from '@/utils/util'
Vue.use(Router)

const router = new Router({
  routes
})

const turnTo = (to, access, next) => {
  if (!access || showThisMenuEle(to, access)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  // 权限
  if (to.meta.title && !to.meta.access) turnTo(to, store.state.userInfo.privilege, next)
  // 标题
  if (to.meta.seoTitle) {
    document.title = to.meta.seoTitle
  }
  next()
})

export default router
