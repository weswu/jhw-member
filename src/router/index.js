import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', components: require('@/pages/Home') },
    // 账号管理
    { path: '/account', components: require('@/pages/account/Account') },
    { path: '/employee_account', components: require('@/pages/account/EmployeeAccount') },
    { path: '/employee_account_analysis', component: require('@/pages/account/Analysis').default },
    // 费用
    { path: '/cost_order', component: require('@/pages/cost/Order').default },
    { path: '/cost_purchased', component: require('@/pages/cost/Purchased').default },
    // 积分
    { path: '/point', component: require('@/pages/point/Point').default },
    { path: '/point_goods', component: require('@/pages/point/PointGoods').default },
    { path: '/point_origin', component: require('@/pages/point/PointOrigin').default },
    // 消息
    { path: '/message', component: require('@/pages/message/Message').default },
    { path: '/message/:id', component: require('@/pages/message/Message').default },
    { path: '/messageMan', component: require('@/pages/message/MessageMan').default },
    // 数据管理中心
    // 站点管理
    { path: '/static', component: require('@/pages/static/Static').default },
    { path: '/seo', component: require('@/pages/static/Seo').default },
    // 企业
    { path: '/enterprise', component: require('@/pages/enterprise/Enterprise').default },
    { path: '/company', component: require('@/pages/enterprise/Company').default },
    { path: '/sincerity', component: require('@/pages/enterprise/Sincerity').default },
    // 产品
    { path: '/product', component: require('@/pages/product/Product').default },
    // 新闻
    { path: '/news', component: require('@/pages/news/News').default },
    // 分类
    { path: '/category/:id', component: require('@/pages/category/Category').default },
    // 相册
    { path: '/album', component: require('@/pages/album/Album').default },
    // 会员管理
    { path: '/member', component: require('@/pages/member/Member').default },
    // default
    { path: '*', redirect: '/' }
  ]
})
