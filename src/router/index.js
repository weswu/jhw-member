import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', components: require('@/pages/Home') },
    // 账号管理
    { path: '/account', components: require('@/pages/account/Account'), meta: { open: '1', parent: 'account' } },
    { path: '/employee_account', components: require('@/pages/account/EmployeeAccount'), meta: { open: '1', parent: 'account' } },
    { path: '/employee_account_analysis', component: require('@/pages/account/Analysis').default, meta: { open: '1', parent: 'account' } },
    // 费用
    { path: '/cost_order', component: require('@/pages/cost/Order').default, meta: { open: '1', parent: 'cost_order' } },
    { path: '/cost_purchased', component: require('@/pages/cost/Purchased').default, meta: { open: '1', parent: 'cost_order' } },
    // 积分
    { path: '/point', component: require('@/pages/point/Point').default, meta: { open: '1', parent: 'point' } },
    { path: '/point_goods', component: require('@/pages/point/PointGoods').default, meta: { open: '1', parent: 'point' } },
    { path: '/point_origin', component: require('@/pages/point/PointOrigin').default, meta: { open: '1', parent: 'point' } },
    { path: '/poster_list', component: require('@/pages/point/Poster').default, meta: { open: '1', parent: 'point' } },
    // 消息
    { path: '/message', component: require('@/pages/message/Message').default },
    { path: '/message/:id', component: require('@/pages/message/Message').default },
    { path: '/messageMan', component: require('@/pages/message/MessageMan').default },
    // 数据管理中心
    // 站点管理
    { path: '/static', component: require('@/pages/static/Static').default, meta: { open: '2', parent: 'static' } },
    { path: '/seo', component: require('@/pages/static/Seo').default, meta: { open: '2', parent: 'static' } },
    { path: '/beian', component: require('@/pages/static/Beian').default, meta: { open: '2', parent: 'static' } },
    { path: '/bind', component: require('@/pages/static/Bind').default, meta: { open: '2', parent: 'static' } },
    { path: '/sitemap', component: require('@/pages/static/Sitemap').default, meta: { open: '2', parent: 'static' } },
    { path: '/seo_batch', component: require('@/pages/static/SeoBatch').default, meta: { open: '2', parent: 'static' } },
    { path: '/third_party_statistics', component: require('@/pages/static/ThirdPartyStatistics').default, meta: { open: '2', parent: 'static' } },
    { path: '/convenient', component: require('@/pages/static/Convenient').default, meta: { open: '2', parent: 'static' } },
    // 企业
    { path: '/enterprise', component: require('@/pages/enterprise/Enterprise').default, meta: { open: '2', parent: 'enterprise' } },
    { path: '/company', component: require('@/pages/enterprise/Company').default, meta: { open: '2', parent: 'enterprise' } },
    { path: '/recruit', component: require('@/pages/enterprise/Recruit').default, meta: { open: '2', parent: 'enterprise' } },
    { path: '/link', component: require('@/pages/enterprise/Link').default, meta: { open: '2', parent: 'enterprise' } },
    // 分类
    { path: '/category/:id', component: require('@/pages/category/Category').default, meta: { open: '2', parent: 'product' } },
    // 产品
    { path: '/product', component: require('@/pages/product/Product').default, meta: { open: '2', parent: 'product' } },
    { path: '/product/:id', component: require('@/pages/product/Detail').default, meta: { open: '2', parent: 'product' } },
    { path: '/product_import', component: require('@/pages/product/Import').default, meta: { open: '2', parent: 'product' } },
    { path: '/product_download', component: require('@/pages/product/DownLoad').default, meta: { open: '2', parent: 'product' } },
    // 评价
    { path: '/evaluate', component: require('@/pages/product/Evaluate').default, meta: { open: '2', parent: 'product' } },
    { path: '/evaluate/:id', component: require('@/pages/product/Evaluate').default, meta: { open: '2', parent: 'product' } },
    // 新闻
    { path: '/news', component: require('@/pages/news/News').default, meta: { open: '2', parent: 'news' } },
    { path: '/news/:id', component: require('@/pages/news/NewsDetail').default, meta: { open: '2', parent: 'news' } },
    // 相册
    { path: '/album', component: require('@/pages/album/Album').default, meta: { open: '2', parent: 'album' } },
    // 会员管理
    { path: '/member', component: require('@/pages/member/Member').default, meta: { open: '2', parent: 'member' } },
    { path: '/member/:id', component: require('@/pages/member/Detail').default, meta: { open: '2', parent: 'member' } },
    { path: '/member_rank', component: require('@/pages/member/Rank').default, meta: { open: '2', parent: 'member' } },
    { path: '/member_attr', component: require('@/pages/member/Attr').default, meta: { open: '2', parent: 'member' } },
    { path: '/member_register', component: require('@/pages/member/Register').default, meta: { open: '2', parent: 'member' } },
    // 商城
    { path: '/shop', component: require('@/pages/shop/Shop').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop/:id', component: require('@/pages/shop/ShopDetail').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_config', component: require('@/pages/shop/Config').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_pay', component: require('@/pages/shop/Pay').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_pay/:id', component: require('@/pages/shop/PayDetail').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_delivery', component: require('@/pages/shop/Delivery').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_bill', component: require('@/pages/shop/Bill').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_bill/:id', component: require('@/pages/shop/BillDetail').default, meta: { open: '2', parent: 'shop' } },
    { path: '/shop_refund', component: require('@/pages/shop/Refund').default, meta: { open: '2', parent: 'shop' } },
    { path: '/coupon', component: require('@/pages/shop/Coupon').default, meta: { open: '2', parent: 'shop' } },
    { path: '/coupon/:id', component: require('@/pages/shop/CouponDetail').default, meta: { open: '2', parent: 'shop' } },
    // 网站界面管理
    { path: '/pc', component: require('@/pages/pc/Pc').default, meta: { parent: 'pc' } },
    { path: '/pc_create', component: require('@/pages/pc/PcCreate').default, meta: { parent: 'pc' } },
    // 网站界面管理
    { path: '/basis', component: require('@/pages/miniprogram/Basis').default, meta: { parent: 'basis' } },
    { path: '/senior', component: require('@/pages/miniprogram/Senior').default, meta: { parent: 'basis' } },
    // 其它项目用
    { path: '/map', component: require('@/pages/enterprise/Map').default },
    // default
    { path: '*', redirect: '/' }
  ]
})
