import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', components: require('@/pages/Home') },
    // 账号管理  meta用于刷新页面定位左侧菜单
    { path: '/account', components: require('@/pages/account/Account'), meta: { open: '1', parent: 'account' } },
    { path: '/employee_account', components: require('@/pages/account/EmployeeAccount'), meta: { open: '1', parent: 'account' } },
    { path: '/employee_account_analysis', components: require('@/pages/account/Analysis'), meta: { open: '1', parent: 'account' } },
    // 费用
    { path: '/cost_paid', components: require('@/pages/cost/Paid'), meta: { open: '1', parent: 'cost_paid' } },
    { path: '/cost_order', components: require('@/pages/cost/Order'), meta: { open: '1', parent: 'cost_paid' } },
    { path: '/cost_purchased', components: require('@/pages/cost/Purchased'), meta: { open: '1', parent: 'cost_paid' } },
    // 积分
    { path: '/point', components: require('@/pages/point/Point'), meta: { open: '1', parent: 'point' } },
    { path: '/point_goods', components: require('@/pages/point/PointGoods'), meta: { open: '1', parent: 'point' } },
    { path: '/point_origin', components: require('@/pages/point/PointOrigin'), meta: { open: '1', parent: 'point' } },
    { path: '/poster_list', components: require('@/pages/point/Poster'), meta: { open: '1', parent: 'point' } },
    // 消息
    { path: '/message', components: require('@/pages/message/Message') },
    { path: '/message/:id', components: require('@/pages/message/Message') },
    { path: '/messageMan', components: require('@/pages/message/MessageMan') },
    // 数据管理中心
    // 站点管理
    { path: '/static', components: require('@/pages/static/Static'), meta: { open: '2', parent: 'static' } },
    { path: '/seo', components: require('@/pages/static/Seo'), meta: { open: '2', parent: 'static' } },
    { path: '/beian', components: require('@/pages/static/Beian'), meta: { open: '2', parent: 'static' } },
    { path: '/bind', components: require('@/pages/static/Bind'), meta: { open: '2', parent: 'static' } },
    { path: '/bind/:id', components: require('@/pages/static/BindDetail'), meta: { open: '2', parent: 'static' } },
    { path: '/sitemap', components: require('@/pages/static/Sitemap'), meta: { open: '2', parent: 'static' } },
    { path: '/seo_batch', components: require('@/pages/static/SeoBatch'), meta: { open: '2', parent: 'static' } },
    { path: '/third_party_statistics', components: require('@/pages/static/ThirdPartyStatistics'), meta: { open: '2', parent: 'static' } },
    { path: '/convenient', components: require('@/pages/static/Convenient'), meta: { open: '2', parent: 'static' } },
    { path: '/storage_service', components: require('@/pages/static/StorageService'), meta: { open: '2', parent: 'static' } },
    // 企业
    { path: '/enterprise', components: require('@/pages/enterprise/Enterprise'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/company', components: require('@/pages/enterprise/Company'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/recruit', components: require('@/pages/enterprise/Recruit'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/link', components: require('@/pages/enterprise/Link'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/link/:id', components: require('@/pages/enterprise/LinkDetail'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/cert', components: require('@/pages/enterprise/Cert'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/cert/:id', components: require('@/pages/enterprise/CertDetail'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/partner', components: require('@/pages/enterprise/Partner'), meta: { open: '2', parent: 'enterprise' } },
    { path: '/partner/:id', components: require('@/pages/enterprise/LinkDetail'), meta: { open: '2', parent: 'enterprise' } },
    // 分类
    { path: '/category/:id', components: require('@/pages/category/Category'), meta: { open: '2', parent: 'product' } },
    // 产品
    { path: '/product', components: require('@/pages/product/Product'), meta: { open: '2', parent: 'product' } },
    { path: '/product/:id', components: require('@/pages/product/ProductDetail'), meta: { open: '2', parent: 'product' } },
    { path: '/product_import', components: require('@/pages/product/Import'), meta: { open: '2', parent: 'product' } },
    { path: '/product_download', components: require('@/pages/product/DownLoad'), meta: { open: '2', parent: 'product' } },
    // 评价
    { path: '/evaluate', components: require('@/pages/product/Evaluate'), meta: { open: '2', parent: 'product' } },
    { path: '/evaluate/:id', components: require('@/pages/product/Evaluate'), meta: { open: '2', parent: 'product' } },
    // 新闻
    { path: '/news', components: require('@/pages/news/News'), meta: { open: '2', parent: 'news' } },
    { path: '/news/:id', components: require('@/pages/news/NewsDetail'), meta: { open: '2', parent: 'news' } },
    // 相册
    { path: '/album', components: require('@/pages/album/Album'), meta: { open: '2', parent: 'album' } },
    // 会员管理
    { path: '/member', components: require('@/pages/member/Member'), meta: { open: '2', parent: 'member' } },
    { path: '/member/:id', components: require('@/pages/member/Detail'), meta: { open: '2', parent: 'member' } },
    { path: '/member_rank', components: require('@/pages/member/Rank'), meta: { open: '2', parent: 'member' } },
    { path: '/member_attr', components: require('@/pages/member/Attr'), meta: { open: '2', parent: 'member' } },
    { path: '/member_register', components: require('@/pages/member/Register'), meta: { open: '2', parent: 'member' } },
    // 商城
    { path: '/shop', components: require('@/pages/shop/Shop'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop/:id', components: require('@/pages/shop/ShopDetail'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_config', components: require('@/pages/shop/Config'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_pay', components: require('@/pages/shop/Pay'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_pay/:id', components: require('@/pages/shop/PayDetail'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_delivery', components: require('@/pages/shop/Delivery'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_bill', components: require('@/pages/shop/Bill'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_bill/:id', components: require('@/pages/shop/BillDetail'), meta: { open: '2', parent: 'shop' } },
    { path: '/shop_refund', components: require('@/pages/shop/Refund'), meta: { open: '2', parent: 'shop' } },
    { path: '/coupon', components: require('@/pages/shop/Coupon'), meta: { open: '2', parent: 'shop' } },
    { path: '/coupon/:id', components: require('@/pages/shop/CouponDetail'), meta: { open: '2', parent: 'shop' } },
    // 网站界面管理
    { path: '/pc', components: require('@/pages/pc/Pc'), meta: { parent: 'pc' } },
    { path: '/pc_create', components: require('@/pages/pc/PcCreate'), meta: { parent: 'pc' } },
    // 网站界面管理
    { path: '/basis', components: require('@/pages/miniprogram/Basis'), meta: { parent: 'basis' } },
    { path: '/senior', components: require('@/pages/miniprogram/Senior'), meta: { parent: 'basis' } },
    // 其它项目用
    { path: '/map', components: require('@/pages/enterprise/Amap') },
    { path: '/pic', components: require('@/pages/album//Pic') },
    // default
    { path: '*', redirect: '/' }
  ]
})
