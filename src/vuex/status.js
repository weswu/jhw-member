// 存放各种常量
const state = {
  lanList: [
    { value: '1', text: '中文' },
    { value: '2', text: '英文' }
  ],
  menuAccount: {
    title: '账号管理',
    menu: [
      { text: '安全设置', value: 'account' },
      { text: '员工账号管理', value: 'employee_account' }
    ]
  },
  menuAnalysis: {
    title: '员工推广分析',
    menu: [
      { text: 'PC端', value: 'pc' },
      { text: '手机端', value: 'mobile' }
    ]
  },
  menuCost: {
    title: '费用中心',
    menu: [
      { text: '消费记录', value: 'cost_order' },
      { text: '已购产品', value: 'cost_purchased' }
    ]
  },
  menuPoint: {
    title: '积分管理',
    menu: [
      { text: '积分列表', value: 'point' },
      { text: '积分兑换', value: 'point_goods' },
      { text: '积分规则', value: 'point_origin' }
    ]
  },
  menuMessage: {
    title: '消息中心',
    menu: [
      { text: '全部消息', value: 'message' },
      { text: '未读消息', value: 'message/00', count: 0 },
      { text: '已读消息', value: 'message/01' },
      { text: '消息接收人设置', value: 'messageMan' }
    ]
  },
  menuStatic: {
    title: '站点管理',
    menu: [
      { text: '站点数据管理', value: 'static' },
      { text: 'SEO管理', value: 'seo' },
      { text: '域名备案', value: 'beian' },
      { text: 'Sitemap生成', value: 'sitemap' },
      { text: '批量提交', value: 'seo_batch' },
      { text: '第三方统计', value: 'third_party_statistics' },
      { text: '便捷登录配置', value: 'convenient' }
    ]
  },
  menuEnter: {
    title: '公司信息',
    menu: [
      { text: '基本资料', value: 'enterprise' },
      { text: '公司简介', value: 'company' },
      { text: '招聘管理', value: 'recruit' },
      { text: '友情链接', value: 'link' }
    ]
  },
  menu_product: {
    title: '产品管理',
    menu: [
      { text: '产品列表', value: 'product' },
      { text: '分类管理', value: 'category/product' },
      { text: '导入', value: 'product_import' },
      { text: '下载', value: 'product_download' }
    ]
  },
  menu_product_detail: {
    title: '返回',
    menu: [
      { text: '产品基本信息', value: '0' },
      { text: '电脑端产品内容', value: '1' },
      { text: '手机端产品内容', value: '2' },
      { text: '产品描述', value: '3' },
      { text: '产品卖点', value: '4' },
      { text: '商城属性', value: '5' },
      { text: '产品标签', value: '6' },
      { text: 'SEO设置', value: '7' }
    ]
  },
  menuEvaluate: {
    menu: [
      { text: '商品评价', value: '0' }
    ]
  },
  menu_news: {
    title: '新闻管理',
    menu: [
      { text: '新闻列表', value: 'news' },
      { text: '分类管理', value: 'category/news' }
    ]
  },
  menu_news_detail: {
    menu: [
      { text: '新闻基本信息', value: '0' },
      { text: '新闻内容', value: '1' },
      { text: '新闻标签', value: '2' },
      { text: 'SEO设置', value: '3' }
    ]
  },
  menuMember: {
    title: '客户管理',
    menu: [
      { text: '会员管理', value: 'member' },
      { text: '会员等级配置', value: '' },
      { text: '会员属性配置', value: '' },
      { text: '网站会员注册', value: '' }
    ]
  }
}

const getters = {}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
