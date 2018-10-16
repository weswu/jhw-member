import Main from '@/components/main/main'
import SideMenu from '@/components/main/side_menu'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  showInMenu: (false) 设为true后在左侧菜单会显示该页面选项
 *  access: true 可访问该页面的权限数组，当前路由设置的权限不会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    name: 'index',
    components: require('@/pages/Home'),
    meta: {
      icon: 'ai-home',
      title: '首页',
      showInMenu: true
    }
  },
  {
    path: '/',
    name: 'yingxiao',
    redirect: '/flow_chart',
    component: Main,
    meta: {
      icon: 'yingxiao1',
      title: '运营管理',
      showInMenu: true
    },
    children: [
      {
        path: '',
        name: 'liucheng',
        meta: {
          icon: 'ziliucheng',
          title: '流程图',
          showInMenu: true,
          manage: 'flow_chart'
        },
        component: SideMenu,
        children: [
          {
            path: 'flow_chart',
            name: 'flow_chart',
            meta: {
              title: '企业数字化转型流程图',
              showInMenu: true
            },
            components: require('@/pages/marketing/flowChart')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: '2',
    redirect: '/static',
    component: Main,
    meta: {
      icon: 'fl-shuju',
      title: '数据管理中心',
      showInMenu: true
    },
    children: [
      {
        path: '',
        name: 'staticMan',
        meta: {
          icon: 'qiu',
          title: '站点管理',
          showInMenu: true,
          manage: 'static'
        },
        component: Main,
        children: [
          {
            path: 'static',
            name: 'static',
            meta: {
              title: '站点数据管理',
              showInMenu: true
            },
            components: require('@/pages/static/Static')
          },
          {
            path: 'seo',
            name: 'seo',
            meta: {
              title: 'SEO管理',
              showInMenu: true
            },
            components: require('@/pages/static/Seo')
          },
          {
            path: 'beian',
            name: 'beian',
            meta: {
              title: '域名备案',
              showInMenu: true
            },
            components: require('@/pages/static/Beian')
          },
          {
            path: 'bind',
            name: 'bind',
            meta: {
              title: '域名绑定',
              showInMenu: true
            },
            components: require('@/pages/static/Bind')
          },
          {
            path: 'sitemap',
            name: 'sitemap',
            meta: {
              title: 'Sitemap生成',
              showInMenu: true
            },
            components: require('@/pages/static/Sitemap')
          },
          {
            path: 'seo_batch',
            name: 'seo_batch',
            meta: {
              title: '批量提交',
              showInMenu: true
            },
            components: require('@/pages/static/SeoBatch')
          },
          {
            path: 'third_party_statistics',
            name: 'third_party_statistics',
            meta: {
              title: '第三方统计',
              showInMenu: true
            },
            components: require('@/pages/static/ThirdPartyStatistics')
          },
          {
            path: 'convenient',
            name: 'convenient',
            meta: {
              title: '便捷登录配置',
              showInMenu: true
            },
            components: require('@/pages/static/Convenient')
          },
          {
            path: 'storage_service',
            name: 'storage_service',
            meta: {
              title: '附件存储服务',
              showInMenu: true
            },
            components: require('@/pages/static/StorageService')
          }
        ]
      },
      {
        path: '',
        name: 'enterpriseMan',
        meta: {
          icon: 'kujialeqiyezhan_gongsishili',
          title: '公司信息',
          showInMenu: true,
          manage: 'enterprise'
        },
        component: Main,
        children: [
          {
            path: 'enterprise',
            name: 'enterprise',
            meta: {
              title: '基本资料',
              showInMenu: true
            },
            components: require('@/pages/enterprise/Enterprise')
          },
          {
            path: 'company',
            name: 'company',
            meta: {
              title: '公司简介',
              showInMenu: true
            },
            components: require('@/pages/enterprise/Company')
          },
          {
            path: 'recruit',
            name: 'recruit',
            meta: {
              title: '招聘管理',
              showInMenu: true
            },
            components: require('@/pages/enterprise/Recruit')
          },
          {
            path: 'link',
            name: 'link',
            meta: {
              title: '友情链接',
              showInMenu: true
            },
            components: require('@/pages/enterprise/Link')
          },
          {
            path: 'cert',
            name: 'cert',
            meta: {
              title: '荣誉证书',
              showInMenu: true
            },
            components: require('@/pages/enterprise/Cert')
          },
          {
            path: 'partner',
            name: 'partner',
            meta: {
              title: '合作伙伴',
              showInMenu: true
            },
            components: require('@/pages/enterprise/Partner')
          },
          {
            path: 'team_intro',
            name: 'team_intro',
            meta: {
              title: '团队介绍',
              showInMenu: true
            },
            components: require('@/pages/enterprise/TeamIntro')
          }
        ]
      },
      {
        path: '',
        name: 'productMan',
        meta: {
          icon: 'product',
          title: '产品管理',
          showInMenu: true,
          manage: 'product'
        },
        component: Main,
        children: [
          {
            path: 'product',
            name: 'product',
            meta: {
              title: '产品列表',
              showInMenu: true
            },
            components: require('@/pages/product/Product')
          },
          {
            path: 'product_category',
            name: 'category/product',
            meta: {
              title: '产品分类',
              id: 'product',
              showInMenu: true
            },
            components: require('@/pages/category/Category')
          },
          {
            path: 'product_import',
            name: 'product_import',
            meta: {
              title: '导入',
              showInMenu: true
            },
            components: require('@/pages/product/Import')
          },
          {
            path: 'product_download',
            name: 'product_download',
            meta: {
              title: '下载',
              showInMenu: true
            },
            components: require('@/pages/product/DownLoad')
          }
        ]
      },
      {
        path: '',
        name: 'newsMan',
        meta: {
          icon: 'xinwenzixun',
          title: '新闻管理',
          showInMenu: true,
          manage: 'news'
        },
        component: Main,
        children: [
          {
            path: 'news',
            name: 'news',
            meta: {
              title: '新闻列表',
              showInMenu: true
            },
            components: require('@/pages/news/News')
          },
          {
            path: 'news_category',
            name: 'category/news',
            meta: {
              title: '分类管理',
              id: 'news',
              showInMenu: true
            },
            components: require('@/pages/category/Category')
          }
        ]
      },
      {
        path: 'album',
        name: 'album',
        meta: {
          icon: 'xiangce',
          title: '相册管理',
          showInMenu: true
        },
        components: require('@/pages/album/Album')
      },
      {
        path: '',
        name: 'memberMan',
        meta: {
          icon: 'huiyuan',
          title: '客户管理',
          showInMenu: true,
          manage: 'member'
        },
        component: Main,
        children: [
          {
            path: 'member',
            name: 'member',
            meta: {
              title: '会员管理',
              showInMenu: true
            },
            components: require('@/pages/member/Member')
          },
          {
            path: 'member_rank',
            name: 'member_rank',
            meta: {
              title: '会员等级配置',
              showInMenu: true
            },
            components: require('@/pages/member/Rank')
          },
          {
            path: 'member_attr',
            name: 'member_attr',
            meta: {
              title: '会员属性配置',
              showInMenu: true
            },
            components: require('@/pages/member/Attr')
          },
          {
            path: 'member_register',
            name: 'member_register',
            meta: {
              title: '网站会员注册',
              showInMenu: true
            },
            components: require('@/pages/member/Register')
          }
        ]
      },
      {
        path: '',
        name: 'shopMan',
        meta: {
          icon: 'jiankangshangcheng',
          title: '商城管理',
          showInMenu: true,
          manage: 'shop'
        },
        component: Main,
        children: [
          {
            path: 'shop',
            name: 'shop',
            meta: {
              title: '订单列表',
              showInMenu: true
            },
            components: require('@/pages/shop/Shop')
          },
          {
            path: 'shop_config',
            name: 'shop_config',
            meta: {
              title: '商品相关配置',
              showInMenu: true
            },
            components: require('@/pages/shop/Config')
          },
          {
            path: 'shop_pay',
            name: 'shop_pay',
            meta: {
              title: '支付方式管理',
              showInMenu: true
            },
            components: require('@/pages/shop/Pay')
          },
          {
            path: 'shop_delivery',
            name: 'shop_delivery',
            meta: {
              title: '物流公司管理',
              showInMenu: true
            },
            components: require('@/pages/shop/Delivery')
          },
          {
            path: 'shop_bill',
            name: 'shop_bill',
            meta: {
              title: '物流单据设置',
              showInMenu: true
            },
            components: require('@/pages/shop/Bill')
          },
          {
            path: 'shop_refund',
            name: 'shop_refund',
            meta: {
              title: '商品退货管理',
              showInMenu: true
            },
            components: require('@/pages/shop/Refund')
          },
          {
            path: 'coupon',
            name: 'coupon',
            meta: {
              title: '营销管理',
              showInMenu: true
            },
            components: require('@/pages/shop/Coupon')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'weibiaoti',
    redirect: '/pc',
    component: Main,
    meta: {
      icon: 'weibiaoti1',
      title: '我的产品',
      showInMenu: true
    },
    children: [
      {
        path: '',
        name: 'pcMan',
        meta: {
          icon: 'diannao-tianchong',
          title: '网站',
          showInMenu: true,
          manage: 'pc'
        },
        component: SideMenu,
        children: [
          {
            path: 'pc',
            name: 'pc',
            meta: {
              title: '我的网站',
              showInMenu: true
            },
            components: require('@/pages/pc/Pc')
          }
        ]
      },
      {
        path: '',
        name: 'basisMan',
        meta: {
          icon: 'xiaochengxu',
          title: '小程序',
          showInMenu: true,
          manage: 'basis'
        },
        component: SideMenu,
        children: [
          {
            path: 'basis',
            name: 'basis',
            meta: {
              title: '基础版',
              showInMenu: true
            },
            components: require('@/pages/miniprogram/Basis')
          },
          {
            path: 'senior',
            name: 'senior',
            meta: {
              title: '高级版',
              showInMenu: true
            },
            components: require('@/pages/miniprogram/Senior')
          }
        ]
      },
      {
        path: 'wcd',
        name: 'wcd',
        meta: {
          title: '微传单',
          href: 'http://cps.jihui88.com/dashboard/login',
          icon: 'haibao',
          showInMenu: true
        }
      },
      {
        path: 'fenxiao',
        name: 'fenxiao',
        meta: {
          title: '微分销',
          href: 'http://wcd.jihui88.com/leaflet/index.html#/home_my',
          icon: 'fenxiao',
          showInMenu: true
        }
      }
    ]
  },
  {
    path: '/',
    name: '1',
    redirect: '/account',
    component: Main,
    meta: {
      icon: 'fl-renyuan',
      title: '账号信息',
      showInMenu: true
    },
    children: [
      {
        path: '',
        name: 'accountMan',
        meta: {
          icon: 'account-only',
          title: '账号管理',
          showInMenu: true,
          manage: 'account'
        },
        component: Main,
        children: [
          {
            path: 'account',
            name: 'account',
            meta: {
              title: '安全设置',
              showInMenu: true
            },
            components: require('@/pages/account/Account')
          },
          {
            path: 'employee_account',
            name: 'employee_account',
            meta: {
              title: '员工账号管理',
              showInMenu: true
            },
            components: require('@/pages/account/EmployeeAccount')
          },
          {
            path: 'employee_account_analysis',
            name: 'employee_account_analysis',
            meta: {
              title: '员工账号管理',
              showInMenu: true
            },
            components: require('@/pages/account/Analysis')
          }
        ]
      },
      {
        path: '',
        name: 'cost_paidMan',
        meta: {
          icon: 'price',
          title: '费用中心',
          showInMenu: true,
          manage: 'cost_paid'
        },
        component: Main,
        children: [
          {
            path: 'cost_paid',
            name: 'cost_paid',
            meta: {
              title: '待缴费',
              showInMenu: true
            },
            components: require('@/pages/cost/Paid')
          },
          {
            path: 'cost_order',
            name: 'cost_order',
            meta: {
              title: '订单记录',
              showInMenu: true
            },
            components: require('@/pages/cost/Order')
          },
          {
            path: 'cost_purchased',
            name: 'cost_purchased',
            meta: {
              title: '已购产品',
              showInMenu: true
            },
            components: require('@/pages/cost/Purchased')
          }
        ]
      },
      {
        path: '',
        name: 'pointMan',
        meta: {
          icon: 'jifen',
          title: '积分管理',
          showInMenu: true,
          manage: 'point'
        },
        component: Main,
        children: [
          {
            path: 'point',
            name: 'point',
            meta: {
              title: '积分列表',
              showInMenu: true
            },
            components: require('@/pages/point/Point')
          },
          {
            path: 'point_goods',
            name: 'point_goods',
            meta: {
              title: '积分兑换',
              showInMenu: true
            },
            components: require('@/pages/point/PointGoods')
          },
          {
            path: 'point_origin',
            name: 'point_origin',
            meta: {
              title: '积分规则',
              showInMenu: true
            },
            components: require('@/pages/point/PointOrigin')
          },
          {
            path: 'poster_list',
            name: 'poster_list',
            meta: {
              title: '推广',
              showInMenu: true
            },
            components: require('@/pages/point/Poster')
          }
        ]
      }
    ]
  },
  // 账号管理  meta用于刷新页面定位左侧菜单
  // { path: '/account', components: require('@/pages/account/Account'), meta: { open: '1', parent: 'account' } },
  // { path: '/employee_account', components: require('@/pages/account/EmployeeAccount'), meta: { open: '1', parent: 'account' } },
  // { path: '/employee_account_analysis', components: require('@/pages/account/Analysis'), meta: { open: '1', parent: 'account' } },
  // 费用
  // { path: '/cost_paid', components: require('@/pages/cost/Paid'), meta: { open: '1', parent: 'cost_paid' } },
  // { path: '/cost_order', components: require('@/pages/cost/Order'), meta: { open: '1', parent: 'cost_paid' } },
  // { path: '/cost_purchased', components: require('@/pages/cost/Purchased'), meta: { open: '1', parent: 'cost_paid' } },
  // 积分
  // { path: '/point', components: require('@/pages/point/Point'), meta: { open: '1', parent: 'point' } },
  // { path: '/point_goods', components: require('@/pages/point/PointGoods'), meta: { open: '1', parent: 'point' } },
  // { path: '/point_origin', components: require('@/pages/point/PointOrigin'), meta: { open: '1', parent: 'point' } },
  // { path: '/poster_list', components: require('@/pages/point/Poster'), meta: { open: '1', parent: 'point' } },
  // 消息
  { path: '/message', components: require('@/pages/message/Message') },
  { path: '/message/:id', components: require('@/pages/message/Message') },
  { path: '/messageMan', components: require('@/pages/message/MessageMan') },
  // 数据管理中心
  // 站点管理
  // { path: '/static', components: require('@/pages/static/Static'), meta: { open: '2', parent: 'static' } },
  // { path: '/seo', components: require('@/pages/static/Seo'), meta: { open: '2', parent: 'static' } },
  // { path: '/beian', components: require('@/pages/static/Beian'), meta: { open: '2', parent: 'static' } },
  // { path: '/bind', components: require('@/pages/static/Bind'), meta: { open: '2', parent: 'static' } },
  { path: '/bind/:id', components: require('@/pages/static/BindDetail'), meta: { open: '2', parent: 'static' } },
  // { path: '/sitemap', components: require('@/pages/static/Sitemap'), meta: { open: '2', parent: 'static' } },
  // { path: '/seo_batch', components: require('@/pages/static/SeoBatch'), meta: { open: '2', parent: 'static' } },
  // { path: '/third_party_statistics', components: require('@/pages/static/ThirdPartyStatistics'), meta: { open: '2', parent: 'static' } },
  // { path: '/convenient', components: require('@/pages/static/Convenient'), meta: { open: '2', parent: 'static' } },
  // { path: '/storage_service', components: require('@/pages/static/StorageService'), meta: { open: '2', parent: 'static' } },
  // 企业
  // { path: '/enterprise', components: require('@/pages/enterprise/Enterprise'), meta: { open: '2', parent: 'enterprise' } },
  // { path: '/company', components: require('@/pages/enterprise/Company'), meta: { open: '2', parent: 'enterprise' } },
  // { path: '/recruit', components: require('@/pages/enterprise/Recruit'), meta: { open: '2', parent: 'enterprise' } },
  // { path: '/link', components: require('@/pages/enterprise/Link'), meta: { open: '2', parent: 'enterprise' } },
  { path: '/link/:id', components: require('@/pages/enterprise/LinkDetail'), meta: { open: '2', parent: 'enterprise' } },
  // { path: '/cert', components: require('@/pages/enterprise/Cert'), meta: { open: '2', parent: 'enterprise' } },
  { path: '/cert/:id', components: require('@/pages/enterprise/CertDetail'), meta: { open: '2', parent: 'enterprise' } },
  // { path: '/partner', components: require('@/pages/enterprise/Partner'), meta: { open: '2', parent: 'enterprise' } },
  { path: '/partner/:id', components: require('@/pages/enterprise/LinkDetail'), meta: { open: '2', parent: 'enterprise' } },
  // { path: '/team_intro', components: require('@/pages/enterprise/TeamIntro'), meta: { open: '2', parent: 'enterprise' } },
  { path: '/team_intro/:id', components: require('@/pages/enterprise/LinkDetail'), meta: { open: '2', parent: 'enterprise' } },
  // 网站界面管理
  { path: '/pc', components: require('@/pages/pc/Pc'), meta: { parent: 'pc' } },
  // 商城
  // { path: '/shop', components: require('@/pages/shop/Shop'), meta: { open: '2', parent: 'shop' } },
  { path: '/shop/:id', components: require('@/pages/shop/ShopDetail'), meta: { open: '2', parent: 'shop' } },
  // { path: '/shop_config', components: require('@/pages/shop/Config'), meta: { open: '2', parent: 'shop' } },
  // { path: '/shop_pay', components: require('@/pages/shop/Pay'), meta: { open: '2', parent: 'shop' } },
  { path: '/shop_pay/:id', components: require('@/pages/shop/PayDetail'), meta: { open: '2', parent: 'shop' } },
  // { path: '/shop_delivery', components: require('@/pages/shop/Delivery'), meta: { open: '2', parent: 'shop' } },
  // { path: '/shop_bill', components: require('@/pages/shop/Bill'), meta: { open: '2', parent: 'shop' } },
  { path: '/shop_bill/:id', components: require('@/pages/shop/BillDetail'), meta: { open: '2', parent: 'shop' } },
  // { path: '/shop_refund', components: require('@/pages/shop/Refund'), meta: { open: '2', parent: 'shop' } },
  // { path: '/coupon', components: require('@/pages/shop/Coupon'), meta: { open: '2', parent: 'shop' } },
  { path: '/coupon/:id', components: require('@/pages/shop/CouponDetail'), meta: { open: '2', parent: 'shop' } },
  // 会员管理
  // { path: '/member', components: require('@/pages/member/Member'), meta: { open: '2', parent: 'member' } },
  { path: '/member/:id', components: require('@/pages/member/Detail'), meta: { open: '2', parent: 'member' } },
  // { path: '/member_rank', components: require('@/pages/member/Rank'), meta: { open: '2', parent: 'member' } },
  // { path: '/member_attr', components: require('@/pages/member/Attr'), meta: { open: '2', parent: 'member' } },
  // { path: '/member_register', components: require('@/pages/member/Register'), meta: { open: '2', parent: 'member' } },
  // 分类
  // { path: '/category/:id', components: require('@/pages/category/Category'), meta: { open: '2', parent: 'product' } },
  // 产品
  // { path: '/product', components: require('@/pages/product/Product'), meta: { open: '2', parent: 'product' } },
  { path: '/product/:id', components: require('@/pages/product/ProductDetail'), meta: { open: '2', parent: 'product' } },
  // { path: '/product_import', components: require('@/pages/product/Import'), meta: { open: '2', parent: 'product' } },
  // { path: '/product_download', components: require('@/pages/product/DownLoad'), meta: { open: '2', parent: 'product' } },
  // 评价
  { path: '/evaluate', components: require('@/pages/product/Evaluate'), meta: { open: '2', parent: 'product' } },
  { path: '/evaluate/:id', components: require('@/pages/product/Evaluate'), meta: { open: '2', parent: 'product' } },
  // 新闻
  // { path: '/news', components: require('@/pages/news/News'), meta: { open: '2', parent: 'news' } },
  { path: '/news/:id', components: require('@/pages/news/NewsDetail'), meta: { open: '2', parent: 'news' } },
  // 相册
  { path: '/album', components: require('@/pages/album/Album'), meta: { open: '2', parent: 'album' } },
  // 其它项目用
  { path: '/map', components: require('@/pages/enterprise/Amap') },
  { path: '/pic', components: require('@/pages/album//Pic') },
  { path: '/update', components: require('@/components/doc/update') },
  // default
  { path: '/401', name: 'error_401', meta: { access: true }, components: require('@/pages/error-page/401.vue') },
  { path: '/500', name: 'error_500', meta: { access: true }, components: require('@/pages/error-page/500.vue') },
  { path: '*', name: 'error_404', meta: { access: true }, components: require('@/pages/error-page/404.vue') }
]
