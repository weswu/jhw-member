![logo.png](http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png)

# jhw-management-platform
> [机汇网后台管理](http://www.jihui88.com/member_new/index.html#/)（v4.0）

## Demo
![图片](https://pro.modao.cc/uploads3/images/1966/19661206/artboard_1527473050.png)

## 软件架构
- VUE2全家桶(vue vue-router vuex)
- [axios](https://github.com/axios/axios) ajax类
- [iview](http://v1.iviewui.com/docs/guide/install) 基于Vux的UI框架
- [阿里图标](http://iconfont.cn/)
- [sortablejs] 拖拉组件
- [vue-clipboard2] 复制

## Install

下载

```shell
npm install
```

## Run

启动服务器

```shell
npm run dev
```

打包

```shell
npm run build
```

## 使用

1.首页banner 相册管理 - （[系统]微信小程序Banner相册）

```html
账号：applet 密码：applet@181214
```

## 文件结构
```shell
.
├── build  项目构建配置
├── config  开发相关配置
├── platform  打包所需静态资源
└── src
    └── assets  项目静态资源
        ├── images  图片资源
        └── less  自定义CSS和变量
    └── components  业务组件
        ├── attachment  附件
        ├── common 共用模块
        ├── doc 文档帮助
        ├── group 组件
        ├── main 左侧导航
        └── ...
    └── pages  页面文件
        ├── account  账号管理（安全设置、员工账号管理、员工推广分析）
        ├── album  相册（回收站、水印）
        ├── category  分类（产品分类、新闻分类、产品敏感词、新闻敏感词）
        ├── cost  费用中心（待缴费、订单记录、已购产品）
        ├── enterprise  公司信息（基本资料、公司简介、招聘管理、友情链接、荣誉证书、合作伙伴、团队介绍、网络分布）
        ├── error-page  错误页面（401、404、500）
        ├── marketing  运营管理（运营流程）
        ├── member  客户管理（会员管理、会员等级配置、会员属性配置、网站会员注册）
        ├── message  消息中心（全部消息、未读消息、已读消息、消息接收人设置）
        ├── miniprogram  小程序（基础版、高级版）
        ├── news  新闻管理（新闻列表、新闻详情）
        ├── pc  网站（我的网站）
        ├── point  积分管理（积分列表、积分兑换、积分规则、推广）
        ├── product  产品管理（产品列表、产品详情、导入、下载）
        ├── shop  商城管理（订单列表、商品相关配置、支付方式管理、物流公司管理、物流单据设置、商品退货管理、营销管理）
        ├── static  站点管理（站点数据管理、SEO管理、域名备案、域名绑定、Sitemap生成、批量提交、第三方统计、便捷登录配置、附件存储服务）
        └── home 首页
    ├── router  路由配置（权限设置）
    └── utils  封装工具函数
        ├── diyaxios  接口请求
        ├── filter  自定义全局过滤
        ├── fun  自定义全局函数
        └── utils  左侧导航函数
    └── vuex  Vuex配置
```


## 技术支持
- [机汇网后台平面地址](https://pro.modao.cc/app/5c5bQDgEFovlgX6fdP4W77J2upRmHzb#screen=s4b3e7bdfa2152531100800)
- [机汇网内部文档（用户后台接口、界面编辑接口）](https://jihui88.oschina.io/jhw-api/?file=home-%E9%A6%96%E9%A1%B5)
