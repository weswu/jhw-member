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
    { path: '/beian', component: require('@/pages/static/Beian').default },
    { path: '/bind', component: require('@/pages/static/Bind').default },
    { path: '/sitemap', component: require('@/pages/static/Sitemap').default },
    { path: '/seo_batch', component: require('@/pages/static/SeoBatch').default },
    { path: '/third_party_statistics', component: require('@/pages/static/ThirdPartyStatistics').default },
    { path: '/convenient', component: require('@/pages/static/Convenient').default },
    // 企业
    { path: '/enterprise', component: require('@/pages/enterprise/Enterprise').default },
    { path: '/company', component: require('@/pages/enterprise/Company').default },
    { path: '/recruit', component: require('@/pages/enterprise/Recruit').default },
    { path: '/link', component: require('@/pages/enterprise/Link').default },
    // 分类
    { path: '/category/:id', component: require('@/pages/category/Category').default },
    // 产品
    { path: '/product', component: require('@/pages/product/Product').default },
    { path: '/product/:id', component: require('@/pages/product/Detail').default },
    { path: '/product_import', component: require('@/pages/product/Import').default },
    { path: '/product_download', component: require('@/pages/product/DownLoad').default },
    // 评价
    { path: '/evaluate', component: require('@/pages/product/Evaluate').default },
    { path: '/evaluate/:id', component: require('@/pages/product/Evaluate').default },
    // 新闻
    { path: '/news', component: require('@/pages/news/News').default },
    { path: '/news/:id', component: require('@/pages/news/Detail').default },
    // 相册
    { path: '/album', component: require('@/pages/album/Album').default },
    // 会员管理
    { path: '/member', component: require('@/pages/member/Member').default },
    { path: '/member/:id', component: require('@/pages/member/Detail').default },
    { path: '/member_rank', component: require('@/pages/member/Rank').default },
    { path: '/member_attr', component: require('@/pages/member/Attr').default },
    { path: '/member_register', component: require('@/pages/member/Register').default },
    // 商城
    { path: '/shop', component: require('@/pages/shop/Shop').default },
    { path: '/shop/:id', component: require('@/pages/shop/ShopDetail').default },
    { path: '/shop_config', component: require('@/pages/shop/Config').default },
    { path: '/shop_pay', component: require('@/pages/shop/Pay').default },
    { path: '/shop_pay/:id', component: require('@/pages/shop/PayDetail').default },
    { path: '/shop_delivery', component: require('@/pages/shop/Delivery').default },
    { path: '/shop_bill', component: require('@/pages/shop/Bill').default },
    { path: '/shop_bill/:id', component: require('@/pages/shop/BillDetail').default },
    { path: '/shop_refund', component: require('@/pages/shop/Refund').default },
    { path: '/coupon', component: require('@/pages/shop/Coupon').default },
    { path: '/coupon/:id', component: require('@/pages/shop/CouponDetail').default },
    // default
    { path: '*', redirect: '/' }
  ]
})
