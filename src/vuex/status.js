// 存放各种常量
const state = {
  IMG_HOST: 'http://img.jihui88.com/',
  lanList: [
    { value: '1', text: '中文', type: 'cn' },
    { value: '2', text: '英文', type: 'en' }
  ],
  countryType: [
    { text: '中国', value: 'cn' },
    { text: '美国', value: 'en' },
    { text: '香港', value: 'hc' }
  ],
  // 会员属性
  memberAttrList: [
    { text: '文本', value: 'text' },
    { text: '数字', value: 'number' },
    { text: '字母', value: 'alphaint' },
    { text: '单选项', value: 'select' },
    { text: '多选项', value: 'checkbox' },
    { text: '日期', value: 'date' }
  ],
  // 付款状态
  paymentStatus: [
    { text: '未支付', value: 'unpaid', html: '<span style="color: #d0021b;">未支付</span>' },
    { text: '部分支付', value: 'partPayment', html: '<span style="color: #ff7e3e;">部分支付</span>' },
    { text: '已支付', value: 'paid', html: '<span style="color: #417505;">已支付</span>' },
    { text: '部分退款', value: 'partRefund', html: '<span style="color: #ff7e3e;">部分退款</span>' },
    { text: '全额退款', value: 'refunded', html: '<span style="color: #000000;">全额退款</span>' }
  ],
  // 配送状态
  shippingStatus: [
    { text: '未发货', value: 'unshipped', html: '<span style="color: #d0021b;">未发货</span>' },
    { text: '部分发贫', value: 'partShipped', html: '<span style="color: #ff7e3e;">部分发贫</span>' },
    { text: '已发货', value: 'shipped', html: '<span style="color: #417505;">已发货</span>' },
    { text: '部分退货', value: 'partReshiped', html: '<span>部分退货</span>' },
    { text: '已退货', value: 'reshiped', html: '<span>已退货</span>' }
  ],
  // 订单状态
  orderStatus: [
    { text: '未处理', value: 'unprocessed', html: '<span style="color: #d0021b;">未处理</span>' },
    { text: '已处理', value: 'processed', html: '<span style="color: #417505;">已处理</span>' },
    { text: '已完成', value: 'completed', html: '<span style="color: #5b5b5b;">已完成</span>' },
    { text: '已作废', value: 'invalid', html: '<span style="color: #a0a0a0;">已作废</span>' },
    { text: '已取消', value: 'cancel', html: '<span style="color: #d0021b;">已取消</span>' }
  ],
  // 退货类型
  disputeType: [
    { text: '仅退款 ', value: 'onlymoney' },
    { text: '退款并退货 ', value: 'goodandmoney' }
  ],
  // 退货状态
  disputeState: [
    { text: '未处理 ', value: 'unprocessed', html: '<span style="color: #d0021b;">未处理</span>' },
    { text: '处理中 ', value: 'processed', html: '<span style="color: #ff7e3e;">处理中</span>' },
    { text: '已退款 ', value: 'returned', html: '<span style="color: #417505;">已退款</span>' },
    { text: '已拒绝 ', value: 'invalid', html: '<span style="color: #417505;">已拒绝</span>' },
    { text: '已完成 ', value: 'completed', html: '<span style="color: #417505;">已完成</span>' },
    { text: '已关闭 ', value: 'closed', html: '<span style="color: #a0a0a0;">已关闭</span>' }
  ],
  // 支付方式(管理员自己设置的支付方式)
  paymentType: [
    { text: '预存款支付', value: 'deposit' },
    { text: '在线充值', value: 'recharge' },
    { text: '线下支付', value: 'offline' },
    { text: '在线支付', value: 'online' }
  ],
  // 订单日志状态
  orderLogType: [
    { text: '订单创建', value: 'create' },
    { text: '订单修改', value: 'modify' },
    { text: '订单支付', value: 'payment' },
    { text: '订单退款', value: 'refund' },
    { text: '订单发货', value: 'shipping' },
    { text: '订单退货', value: 'reship' },
    { text: '订单完成', value: 'completed' },
    { text: '订单作废', value: 'invlid' }
  ],
  // 证书分类
  certType: [
    { text: '基本证书', value: '01' },
    { text: '税务登记证', value: '07' },
    { text: '荣誉证书', value: '04' },
    { text: '营业执照', value: '06' },
    { text: '组织机构代码证', value: '08' },
    { text: '实地认证', value: '09' },
    { text: '其它证书', value: '05' }
  ],
  versionType: [
    { text: '自选模板', value: '297e2669600191860160021b8fcc007f', price: 600 },
    { text: '展示型网站', value: '2c9080ce60f7b2650160f7c2e3910025', price: 6800 },
    { text: '外贸型网站', value: '2c9080ce60f7b2650160f7c40283002d', price: 12800 },
    { text: '营销型网站', value: '2c9080ce60f7b2650160f7c3327f0028', price: 16800 },
    { text: '电商型网站', value: '2c9080ce60f7b2650160f7c495fd0033', price: 16800 },
    { text: '品牌型网站', value: '2c9080ce60f7b2650160f7c448650030', price: 25800 }
  ],
  // 三级导航
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
      { text: '待缴费', value: 'cost_paid' },
      { text: '消费记录', value: 'cost_order' },
      { text: '已购产品', value: 'cost_purchased' }
    ]
  },
  menuPoint: {
    title: '积分管理',
    menu: [
      { text: '积分列表', value: 'point' },
      { text: '积分兑换', value: 'point_goods' },
      { text: '积分规则', value: 'point_origin' },
      { text: '推广', value: 'poster_list' }
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
      { text: '域名绑定', value: 'bind' },
      { text: 'Sitemap生成', value: 'sitemap' },
      { text: '批量提交', value: 'seo_batch' },
      { text: '第三方统计', value: 'third_party_statistics' },
      { text: '便捷登录配置', value: 'convenient' },
      { text: '附件存储服务', value: 'storage_service' }
    ]
  },
  menu_bind_detail: {
    title: '绑定详情',
    menu: [
      { text: '基本信息', value: '0' }
    ]
  },
  menuEnter: {
    title: '公司信息',
    menu: [
      { text: '基本资料', value: 'enterprise' },
      { text: '公司简介', value: 'company' },
      { text: '招聘管理', value: 'recruit' },
      { text: '友情链接', value: 'link' },
      { text: '荣誉证书', value: 'cert' },
      { text: '合作伙伴', value: 'partner' }
    ]
  },
  menu_product: {
    title: '产品管理',
    menu: [
      { text: '产品列表', value: 'product' },
      { text: '产品分类', value: 'category/product' },
      { text: '导入', value: 'product_import' },
      { text: '下载', value: 'product_download' }
    ]
  },
  menu_product_detail: {
    title: '产品详情',
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
      { text: '商品评价', value: '0' },
      { text: '所有商品评价', value: '1' }
    ]
  },
  menu_news: {
    title: '新闻管理',
    menu: [
      { text: '新闻列表', value: 'news' },
      { text: '新闻分类', value: 'category/news' }
    ]
  },
  menu_news_detail: {
    title: '新闻详情',
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
      { text: '会员等级配置', value: 'member_rank' },
      { text: '会员属性配置', value: 'member_attr' },
      { text: '网站会员注册', value: 'member_register' }
    ]
  },
  menu_member_detail: {
    menu: [
      { text: '会员基本信息', value: '0' },
      { text: '会员属性', value: '1' }
    ]
  },
  menuShop: {
    title: '商城管理',
    menu: [
      { text: '订单管理', value: 'shop' },
      { text: '商品相关配置', value: 'shop_config' },
      { text: '支付方式管理', value: 'shop_pay' },
      { text: '物流公司管理', value: 'shop_delivery' },
      { text: '物流单据设置', value: 'shop_bill' },
      { text: '商品退货管理', value: 'shop_refund' },
      { text: '营销管理', value: 'coupon' }
    ]
  },
  menu_shop_detail: {
    menu: [
      { text: '订单信息', value: '0' },
      { text: '商品信息', value: '1' },
      { text: '订单支付', value: '2' },
      { text: '订单发货', value: '3' },
      { text: '收款记录', value: '4' },
      { text: '收货记录', value: '5' },
      { text: '订单日志', value: '6' }
    ]
  },
  menu_shop_pay_detail: {
    menu: [
      { text: '基本信息', value: '0' },
      { text: '介绍', value: '1' }
    ]
  },
  menu_shop_bill_detail: {
    menu: [
      { text: '基本信息', value: '0' }
    ]
  },
  menu_coupon_detail: {
    menu: [
      { text: '基础信息', value: '0' },
      { text: '基础规则', value: '1' }
    ]
  },
  menuPc: {
    title: '网站界面管理',
    menu: [
      { text: '我的网站', value: 'pc' }
    ]
  },
  menuMini: {
    title: '小程序界面管理',
    menu: [
      { text: '基础版', value: 'basis' },
      { text: '高级版', value: 'senior' }
    ]
  },
  menuWord: {
    title: '文档管理',
    menu: [
      { text: '更新日志', value: 'update' }
    ]
  },
  test_album: [
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: null,
      filename2: '路人超能2',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2017//09//15/cb9ea426-772f-4667-afc3-18ac954008d1.jpg',
      belongId: null,
      attId: 'Attach_0000000000000000001403056',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '125.120.86.154',
      filedesc: null,
      uploadTime: 1505440558943,
      technicView: null,
      _checked: false,
      editting: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: '路人头像3.jpg',
      filename2: '路人头像3.jpg',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2017//08//22/d45b87db-460a-42ba-beee-c5551ea5a7ee.jpg',
      belongId: null,
      attId: 'Attach_0000000000000000001391538',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '183.159.177.57',
      filedesc: null,
      uploadTime: 1503382354821,
      technicView: null,
      _checked: false,
      editting: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: '9e4246d9-7150-49f0-af69-237598418759.png',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2017//08//04/69521af9-edbf-4c83-b615-03d53f64c252.png',
      belongId: null,
      attId: 'Attach_0000000000000000001384336',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '36.24.223.42',
      filedesc: null,
      uploadTime: 1501815560527,
      technicView: null,
      _checked: false,
      editting: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: '大逃杀.jpg',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2017//06//01/94526c88-cd49-4a3f-a75e-b6a4d29b3378.jpg',
      belongId: null,
      attId: 'Attach_0000000000000000001353022',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '125.120.83.147',
      filedesc: null,
      uploadTime: 1496300661556,
      technicView: null,
      _checked: false,
      editting: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: 'timg.jpg',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2017//06//01/2be1866b-8f23-42a3-b34e-2cc5cfcbe2f9.jpg',
      belongId: null,
      attId: 'Attach_0000000000000000001353018',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '125.120.83.147',
      filedesc: null,
      uploadTime: 1496296124960,
      technicView: null,
      _checked: false,
      editting: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: 29,
      filename: '产品.png',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload/g/g2/ggggfj/picture/2018/06/06/bb79b2bf-8075-4f84-9f41-d881b956ff77.png',
      belongId: null,
      attId: 'Attach_0000000000000000001514776',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '10.30.197.254',
      filedesc: null,
      uploadTime: 1528285374461,
      technicView: null,
      _checked: false,
      editting: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: 28,
      filename: 'nopic.png',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload/g/g2/ggggfj/picture/2018/05/23/b7e30dee-599f-4867-b821-75e6b7b0d755.png',
      belongId: 'Album_00000000000000000000064887',
      attId: 'Attach_0000000000000000001507691',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '10.30.197.254',
      filedesc: null,
      uploadTime: 1527073768068,
      technicView: null,
      _checked: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: 27,
      filename: '1.png',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload/g/g2/ggggfj/picture/2018/05/22/97ec231a-1795-4b7c-9382-dc437383c5d2.png',
      belongId: null,
      attId: 'Attach_0000000000000000001507317',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '10.30.197.254',
      filedesc: null,
      uploadTime: 1526982781866,
      technicView: null,
      _checked: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: 'tmp_f20db1581edca3cecd0c2e3e9d13a3863e52b861fccf49ec.jpg',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2018//05//02/3686976e-b6fd-4d64-9862-fdee09780c39.jpg',
      belongId: null,
      attId: 'Attach_0000000000000000001493938',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '115.192.36.239',
      filedesc: null,
      uploadTime: 1525252073511,
      technicView: null,
      _checked: false
    },
    {
      state: '01',
      type: '01',
      content: null,
      sort: null,
      filename: '路人头像3.jpg',
      userId: 'User_000000000000000000000000082',
      serverPath: 'upload//g//g2//ggggfj//picture//2018//04//03/1d77f759-40ed-4c6e-b0e1-dec453dae438.jpg',
      belongId: null,
      attId: 'Attach_0000000000000000001476614',
      belongType: 'AD',
      linkUrl: null,
      storeType: null,
      serverIp: '125.122.222.10',
      filedesc: null,
      uploadTime: 1522733211003,
      technicView: null,
      _checked: false
    }
  ]
}

const getters = {}

const mutations = {
  setLanList (state, data) {
    state.lanList = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
