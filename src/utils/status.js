const status = {
  userprivilege: [
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/album/list,rest/api/album/attr/list/all',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000131',
      pname: '图片管理'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/album/detail',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000132',
      pname: '新建相册'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/watermarkAlbum/detail',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000133',
      pname: '水印设置保存'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/album/watermark/detail',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000134',
      pname: '批量清除图片水印'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/album/detail',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000135',
      pname: '修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/album/detail',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000136',
      pname: '删除相册'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'http://jihui88.com/commonutil/uploadUtil2',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000137',
      pname: '图片替换'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/album/attr/img/detail',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000138',
      pname: '删除图片'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/album/attr/list',
      belongId: 'Userpri_000000000000000000000131',
      moduleId: '图片管理',
      userprivilegeId: 'Userpri_000000000000000000000139',
      pname: '查看相册'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/product/list',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000090',
      pname: '产品'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/product/batch/del',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000091',
      pname: '批量删除'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/product/batch/transfer',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000092',
      pname: '批量转移分类'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'user/product/selectImportType',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000093',
      pname: '批量导入'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/product/batch/display',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000094',
      pname: '批量隐藏'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/product/detail',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000095',
      pname: '修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/product/detail',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000096',
      pname: '删除'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/product/detail',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000097',
      pname: 'seo'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/tag/detail',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000098',
      pname: '标签'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/product/detail',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000099',
      pname: '产品添加'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/attr/detail',
      belongId: 'Userpri_000000000000000000000099',
      moduleId: '产品添加',
      userprivilegeId: 'Userpri_000000000000000000000100',
      pname: '商城属性'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/tag/product',
      belongId: 'Userpri_000000000000000000000099',
      moduleId: '产品添加',
      userprivilegeId: 'Userpri_000000000000000000000101',
      pname: '产品标签'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'api/category/product',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000102',
      pname: '分类管理'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/user/advert/list',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000103',
      pname: '旺铺分类广告修改'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/user/advert/view',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000104',
      pname: '旺铺分类广告添加'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/category/detail',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000105',
      pname: '分类修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/category/detail',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000106',
      pname: '分类删除'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/seo/detail',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000107',
      pname: '分类seo'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/category/detail',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000108',
      pname: '分类添加'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/category/product/batch/transfer',
      belongId: 'Userpri_000000000000000000000102',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000109',
      pname: '分类批量转移分类'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'user/product/selectImportType',
      belongId: 'Userpri_000000000000000000000090',
      moduleId: '产品',
      userprivilegeId: 'Userpri_000000000000000000000110',
      pname: '产品导入'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/news/list',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000079',
      pname: '新闻'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/news/detail',
      belongId: 'Userpri_000000000000000000000079',
      moduleId: '新闻',
      userprivilegeId: 'Userpri_000000000000000000000080',
      pname: '添加'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/news/detail',
      belongId: 'Userpri_000000000000000000000079',
      moduleId: '新闻',
      userprivilegeId: 'Userpri_000000000000000000000081',
      pname: '批量删除'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/news/batch/transfer',
      belongId: 'Userpri_000000000000000000000079',
      moduleId: '新闻',
      userprivilegeId: 'Userpri_000000000000000000000082',
      pname: '批量转移分类'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/news/detail',
      belongId: 'Userpri_000000000000000000000079',
      moduleId: '新闻',
      userprivilegeId: 'Userpri_000000000000000000000083',
      pname: '修改'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/seo/detail',
      belongId: 'Userpri_000000000000000000000079',
      moduleId: '新闻',
      userprivilegeId: 'Userpri_000000000000000000000084',
      pname: 'seo'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/category/news',
      belongId: 'Userpri_000000000000000000000079',
      moduleId: '新闻',
      userprivilegeId: 'Userpri_000000000000000000000085',
      pname: '分类管理'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/category/detail',
      belongId: 'Userpri_000000000000000000000085',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000086',
      pname: '添加'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/category/detail',
      belongId: 'Userpri_000000000000000000000085',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000087',
      pname: '修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/category/detail',
      belongId: 'Userpri_000000000000000000000085',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000088',
      pname: '删除'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/category/news/batch/transfer',
      belongId: 'Userpri_000000000000000000000085',
      moduleId: '分类管理',
      userprivilegeId: 'Userpri_000000000000000000000089',
      pname: '批量转移分类'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/member/list',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000061',
      pname: '客户会员管理'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/member/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000062',
      pname: '修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/member/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000063',
      pname: '删除'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/member/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000064',
      pname: '添加'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/member/rank/list',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000065',
      pname: '会员等级查询'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/member/rank/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000066',
      pname: '会员等级添加'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/member/rank/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000067',
      pname: '会员等级修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/member/rank/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000068',
      pname: '会员等级删除'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/member/attr/list',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000069',
      pname: '会员属性 查询'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/member/attr/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000070',
      pname: '会员属性添加'
    },
    {
      state: '02',
      type: '01',
      sign: null,
      url: 'rest/api/member/attr/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000071',
      pname: '会员属性修改'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/member/attr/detail',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000072',
      pname: '会员属性删除'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/message/list',
      belongId: 'Userpri_000000000000000000000061',
      moduleId: '客户会员管理',
      userprivilegeId: 'Userpri_000000000000000000000073',
      pname: '留言管理'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/message/detail',
      belongId: 'Userpri_000000000000000000000073',
      moduleId: '留言管理',
      userprivilegeId: 'Userpri_000000000000000000000074',
      pname: '回复留言'
    },
    {
      state: '03',
      type: '01',
      sign: null,
      url: 'rest/api/message/list',
      belongId: 'Userpri_000000000000000000000073',
      moduleId: '留言管理',
      userprivilegeId: 'Userpri_000000000000000000000075',
      pname: '删除'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/message/detail',
      belongId: 'Userpri_000000000000000000000073',
      moduleId: '留言管理',
      userprivilegeId: 'Userpri_000000000000000000000076',
      pname: '添加'
    },
    {
      state: '01',
      type: '01',
      sign: null,
      url: 'rest/api/message/bind/detail',
      belongId: 'Userpri_000000000000000000000073',
      moduleId: '留言管理',
      userprivilegeId: 'Userpri_000000000000000000000077',
      pname: '绑定邮箱'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/user/blacklist/view',
      belongId: 'Userpri_000000000000000000000073',
      moduleId: '留言管理',
      userprivilegeId: 'Userpri_000000000000000000000078',
      pname: '黑名单'
    },
    {
      state: '04',
      type: '01',
      sign: null,
      url: 'rest/api/message/detail',
      belongId: 'Userpri_000000000000000000000073',
      moduleId: '留言管理',
      userprivilegeId: 'Userpri_000000000000000000000301',
      pname: '留言查看'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/order/list',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000040',
      pname: '商城'
    },
    {
      state: '04',
      type: '04',
      sign: null,
      url: 'rest/api/order/detail',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000042',
      pname: '查看'
    },
    {
      state: '02',
      type: '04',
      sign: null,
      url: 'rest/api/order/detail',
      belongId: 'Userpri_000000000000000000000042',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000043',
      pname: '修改'
    },
    {
      state: '04',
      type: '04',
      sign: null,
      url: 'rest/api/orderShipping/detail,rest/api/order/detail',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000044',
      pname: '处理 '
    },
    {
      state: '01',
      type: '04',
      sign: null,
      url: 'rest/api/orderPayment/detail',
      belongId: 'Userpri_000000000000000000000044',
      moduleId: '处理',
      userprivilegeId: 'Userpri_000000000000000000000045',
      pname: '订单支付添加'
    },
    {
      state: '02',
      type: '04',
      sign: null,
      url: 'rest/api/orderShipping/detail',
      belongId: 'Userpri_000000000000000000000044',
      moduleId: '处理',
      userprivilegeId: 'Userpri_000000000000000000000046',
      pname: '订单发货'
    },
    {
      state: '03',
      type: '04',
      sign: null,
      url: 'rest/api/order/batch/del',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000047',
      pname: '删除'
    },
    {
      state: '04',
      type: '04',
      sign: null,
      url: 'rest/api/paymentconfig/list',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000048',
      pname: '支付方式管理'
    },
    {
      state: '02',
      type: '04',
      sign: null,
      url: 'rest/api/paymentconfig/detail',
      belongId: 'Userpri_000000000000000000000048',
      moduleId: '支付方式管理',
      userprivilegeId: 'Userpri_000000000000000000000049',
      pname: '修改'
    },
    {
      state: '01',
      type: '04',
      sign: null,
      url: 'rest/api/paymentconfig/detail',
      belongId: 'Userpri_000000000000000000000048',
      moduleId: '支付方式管理',
      userprivilegeId: 'Userpri_000000000000000000000050',
      pname: '添加'
    },
    {
      state: '03',
      type: '04',
      sign: null,
      url: 'rest/api/paymentconfig/detail',
      belongId: 'Userpri_000000000000000000000048',
      moduleId: '支付方式管理',
      userprivilegeId: 'Userpri_000000000000000000000051',
      pname: '删除'
    },
    {
      state: '01',
      type: '04',
      sign: null,
      url: 'rest/api/deliverytype/list',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000052',
      pname: '配送方式管理'
    },
    {
      state: '02',
      type: '04',
      sign: null,
      url: 'rest/api/deliverytype/detail',
      belongId: 'Userpri_000000000000000000000052',
      moduleId: '配送方式管理',
      userprivilegeId: 'Userpri_000000000000000000000053',
      pname: '修改'
    },
    {
      state: '01',
      type: '04',
      sign: null,
      url: 'rest/api/deliverytype/detail',
      belongId: 'Userpri_000000000000000000000052',
      moduleId: '配送方式管理',
      userprivilegeId: 'Userpri_000000000000000000000054',
      pname: '添加'
    },
    {
      state: '03',
      type: '04',
      sign: null,
      url: 'rest/api/deliverytype/detail',
      belongId: 'Userpri_000000000000000000000052',
      moduleId: '配送方式管理',
      userprivilegeId: 'Userpri_000000000000000000000055',
      pname: '删除'
    },
    {
      state: '04',
      type: '04',
      sign: null,
      url: 'rest/api/deliverycorp/list',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000056',
      pname: '物流公司管理'
    },
    {
      state: '02',
      type: '04',
      sign: null,
      url: 'rest/api/deliverycorp/detail',
      belongId: 'Userpri_000000000000000000000056',
      moduleId: '物流公司管理',
      userprivilegeId: 'Userpri_000000000000000000000057',
      pname: '修改'
    },
    {
      state: '04',
      type: '04',
      sign: null,
      url: 'rest/api/deliverycorpSingle/list',
      belongId: 'Userpri_000000000000000000000040',
      moduleId: '商城',
      userprivilegeId: 'Userpri_000000000000000000000058',
      pname: '物流单据设置'
    },
    {
      state: '01',
      type: '04',
      sign: null,
      url: 'rest/api/deliverycorpSingle/detail',
      belongId: 'Userpri_000000000000000000000058',
      moduleId: '物流单据设置',
      userprivilegeId: 'Userpri_000000000000000000000059',
      pname: '添加'
    },
    {
      state: '03',
      type: '04',
      sign: null,
      url: 'rest/api/deliverycorpSingle/list',
      belongId: 'Userpri_000000000000000000000058',
      moduleId: '物流单据设置',
      userprivilegeId: 'Userpri_000000000000000000000060',
      pname: '删除'
    },
    {
      state: '02',
      type: '04',
      sign: null,
      url: 'rest/api/deliverycorpSingle',
      belongId: 'Userpri_000000000000000000000058',
      moduleId: '物流单据设置',
      userprivilegeId: 'Userpri_000000000000000000000130',
      pname: '修改'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/navigator/list',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000011',
      pname: '网站管理'
    },
    {
      state: '04',
      type: '03',
      sign: null,
      url: 'rest/api/userdefined/list',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '手机网站,网站管理',
      userprivilegeId: 'Userpri_000000000000000000000008',
      pname: '自定义模块管理'
    },
    {
      state: '02',
      type: '02',
      sign: null,
      url: 'rest/api/userdefined/detail',
      belongId: 'Userpri_000000000000000000000008',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000018',
      pname: '修改'
    },
    {
      state: '03',
      type: '02',
      sign: null,
      url: 'rest/api/userdefined/detail',
      belongId: 'Userpri_000000000000000000000008',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000019',
      pname: '删除'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/userdefined/detail',
      belongId: 'Userpri_000000000000000000000008',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000020',
      pname: '添加'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/navigator/detail',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000012',
      pname: '导航添加'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/navigator/batch/transfer',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000013',
      pname: '批量转移导航'
    },
    {
      state: '02',
      type: '02',
      sign: null,
      url: 'rest/api/navigator/detail',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000015',
      pname: '导航修改'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/static',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000016',
      pname: '导航发布'
    },
    {
      state: '03',
      type: '02',
      sign: null,
      url: 'rest/api/navigator/detail',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000017',
      pname: '导航删除'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/maintain',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000021',
      pname: '外观设计,会员后台设计'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/bind/list',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000022',
      pname: '域名绑定'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/bind/detail',
      belongId: 'Userpri_000000000000000000000022',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000023',
      pname: '域名添加'
    },
    {
      state: '03',
      type: '02',
      sign: null,
      url: 'rest/api/bind/detail',
      belongId: 'Userpri_000000000000000000000022',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000024',
      pname: '域名删除'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/enterprise/industry',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000025',
      pname: '基本信息'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/enterprise/detail',
      belongId: 'Userpri_000000000000000000000025',
      moduleId: '基本信息',
      userprivilegeId: 'Userpri_000000000000000000000026',
      pname: '基本信息添加,网络工商标识添加'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/technic/detail',
      belongId: 'Userpri_000000000000000000000025',
      moduleId: '基本信息',
      userprivilegeId: 'Userpri_000000000000000000000027',
      pname: '技术实力添加'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/job/list',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000029',
      pname: '招聘管理'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/job/detail',
      belongId: 'Userpri_000000000000000000000029',
      moduleId: '招聘管理',
      userprivilegeId: 'Userpri_000000000000000000000030',
      pname: '添加'
    },
    {
      state: '02',
      type: '02',
      sign: null,
      url: 'rest/api/job/detail',
      belongId: 'Userpri_000000000000000000000029',
      moduleId: '招聘管理',
      userprivilegeId: 'Userpri_000000000000000000000031',
      pname: '修改'
    },
    {
      state: '03',
      type: '02',
      sign: null,
      url: 'rest/api/job/detail',
      belongId: 'Userpri_000000000000000000000029',
      moduleId: '招聘管理',
      userprivilegeId: 'Userpri_000000000000000000000032',
      pname: '删除'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/analysis/list',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000033',
      pname: '第三方统计'
    },
    {
      state: '01',
      type: '02',
      sign: null,
      url: 'rest/api/analysis/detail',
      belongId: 'Userpri_000000000000000000000033',
      moduleId: '第三方统计',
      userprivilegeId: 'Userpri_000000000000000000000034',
      pname: '添加'
    },
    {
      state: '02',
      type: '02',
      sign: null,
      url: 'rest/api/analysis/detail',
      belongId: 'Userpri_000000000000000000000033',
      moduleId: '第三方统计',
      userprivilegeId: 'Userpri_000000000000000000000035',
      pname: '修改'
    },
    {
      state: '03',
      type: '02',
      sign: null,
      url: 'rest/api/analysis/detail',
      belongId: 'Userpri_000000000000000000000033',
      moduleId: '第三方统计',
      userprivilegeId: 'Userpri_000000000000000000000036',
      pname: '删除'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/link/list',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000037',
      pname: '友情链接'
    },
    {
      state: '02',
      type: '02',
      sign: null,
      url: 'rest/api/link/detail',
      belongId: 'Userpri_000000000000000000000037',
      moduleId: '友情链接',
      userprivilegeId: 'Userpri_000000000000000000000038',
      pname: '修改'
    },
    {
      state: '03',
      type: '02',
      sign: null,
      url: 'rest/api/link/detail',
      belongId: 'Userpri_000000000000000000000037',
      moduleId: '友情链接',
      userprivilegeId: 'Userpri_000000000000000000000039',
      pname: '删除'
    },
    {
      state: '01',
      type: '02',
      sign: '',
      url: 'rest/api/link/detail',
      belongId: 'Userpri_000000000000000000000037',
      moduleId: '友情链接',
      userprivilegeId: 'Userpri_000000000000000000000113',
      pname: '添加'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/sincerity/detail',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000009',
      pname: '诚信管理'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/cert/list/san',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000014',
      pname: '三证'
    },
    {
      state: '04',
      type: '02',
      sign: '',
      url: 'rest/api/profile/detail/all',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000140',
      pname: '备案'
    },
    {
      state: '04',
      type: '02',
      sign: '',
      url: 'rest/api/webinfo/detail',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000141',
      pname: '站点管理'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: '/rest/api/static/list',
      belongId: 'Userpri_000000000000000000000011',
      moduleId: '网站管理',
      userprivilegeId: 'Userpri_000000000000000000000177',
      pname: '静态化'
    },
    {
      state: '04',
      type: '02',
      sign: null,
      url: 'rest/api/mobile/navigator/list',
      belongId: null,
      moduleId: null,
      userprivilegeId: 'Userpri_000000000000000000000001',
      pname: '手机网站'
    },
    {
      state: '01',
      type: '03',
      sign: null,
      url: 'rest/api/mobile/navigator/detail',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站',
      userprivilegeId: 'Userpri_000000000000000000000002',
      pname: '导航添加,自定义模块添加'
    },
    {
      state: '01',
      type: '03',
      sign: null,
      url: 'rest/api/static/list',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站,网站管理',
      userprivilegeId: 'Userpri_000000000000000000000003',
      pname: '静态化'
    },
    {
      state: '02',
      type: '03',
      sign: null,
      url: 'rest/api/mobile/navigator/detail',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站',
      userprivilegeId: 'Userpri_000000000000000000000004',
      pname: '导航修改,自定义模块修改'
    },
    {
      state: '01',
      type: '03',
      sign: null,
      url: 'rest/mobileStatic',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站',
      userprivilegeId: 'Userpri_000000000000000000000005',
      pname: '导航发布'
    },
    {
      state: '04',
      type: '03',
      sign: null,
      url: 'rest/api/seo/detail',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站,网站管理',
      userprivilegeId: 'Userpri_000000000000000000000006',
      pname: '导航seo优化'
    },
    {
      state: '03',
      type: '03',
      sign: null,
      url: 'rest/api/mobile/navigator/detail',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站',
      userprivilegeId: 'Userpri_000000000000000000000007',
      pname: '导航删除,自定义模块删除'
    },
    {
      state: '04',
      type: '03',
      sign: null,
      url: 'rest/mobileMaintain',
      belongId: 'Userpri_000000000000000000000001',
      moduleId: '手机网站',
      userprivilegeId: 'Userpri_000000000000000000000010',
      pname: '外观设计'
    }
  ]
}

export default status
